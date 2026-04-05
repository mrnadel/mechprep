/**
 * Insert distractorExplanations into psychology course files.
 *
 * For each question, generates a 1-sentence explanation for each wrong option,
 * then inserts the distractorExplanations block after the explanation field.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'psychology', 'units');

function extractBlocks(lines) {
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const typeMatch = trimmed.match(/^type:\s*'(multiple-choice|scenario|pick-the-best|true-false)',?$/);
    if (!typeMatch) continue;
    const type = typeMatch[1];
    let objStart = -1;
    for (let k = i - 1; k >= Math.max(0, i - 3); k--) {
      if (lines[k].trim() === '{') { objStart = k; break; }
    }
    if (objStart === -1) continue;
    let depth = 0, objEnd = -1;
    for (let k = objStart; k < lines.length; k++) {
      for (const ch of lines[k]) { if (ch === '{') depth++; if (ch === '}') depth--; }
      if (depth === 0) { objEnd = k; break; }
    }
    if (objEnd === -1) continue;
    const blockText = lines.slice(objStart, objEnd + 1).join('\n');
    if (blockText.includes('distractorExplanations')) continue;

    let expEndIdx = -1;
    for (let k = objStart; k <= objEnd; k++) {
      if (lines[k].trim().startsWith('explanation:')) {
        for (let m = k; m <= objEnd; m++) {
          const lt = lines[m].trimEnd();
          if (lt.endsWith("',") || lt.endsWith('",')) { expEndIdx = m; break; }
        }
        break;
      }
    }
    if (expEndIdx === -1) continue;

    const indent = lines[expEndIdx].match(/^(\s*)/)[1];
    const idMatch = blockText.match(/id:\s*'([^']+)'/);
    const qMatch = blockText.match(/question:\s*'((?:[^'\\]|\\.)*)'/);
    const eMatch = blockText.match(/explanation:\s*'((?:[^'\\]|\\.)*)'/);
    const qId = idMatch ? idMatch[1] : 'unknown';
    const qText = qMatch ? qMatch[1] : '';
    const expText = eMatch ? eMatch[1] : '';

    if (type === 'true-false') {
      const cMatch = blockText.match(/correctAnswer:\s*(true|false)/);
      if (!cMatch) continue;
      blocks.push({
        afterLine: expEndIdx, id: qId, type, question: qText, explanation: expText,
        correctAnswer: cMatch[1] === 'true', indent,
      });
    } else {
      const options = [];
      const optSec = blockText.match(/options:\s*\[([\s\S]*?)\]/);
      if (optSec) {
        [...optSec[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].forEach(m => options.push(m[1]));
      }
      const ciMatch = blockText.match(/correctIndex:\s*(\d+)/);
      if (!ciMatch) continue;
      const sMatch = blockText.match(/scenario:\s*'((?:[^'\\]|\\.)*)'/);
      blocks.push({
        afterLine: expEndIdx, id: qId, type, question: qText, explanation: expText,
        options, correctIdx: parseInt(ciMatch[1]),
        scenario: sMatch ? sMatch[1] : '', indent,
      });
    }
  }
  return blocks;
}

function generateDistractorText(block) {
  // This returns the distractorExplanations object as a formatted string
  const indent = block.indent;

  if (block.type === 'true-false') {
    const wrongIdx = block.correctAnswer ? 1 : 0;
    const wrongLabel = wrongIdx === 0 ? 'True' : 'False';
    // Generate explanation for why the wrong answer is wrong
    return null; // Will be handled by the main map
  }

  return null; // Handled by the main map
}

function buildInsertionText(block, explanationsMap) {
  const indent = block.indent;
  if (block.type === 'true-false') {
    const wrongIdx = block.correctAnswer ? 1 : 0;
    const exp = explanationsMap[block.id];
    if (!exp) return null;
    return `${indent}distractorExplanations: {\n${indent}  ${wrongIdx}: '${exp[wrongIdx]}',\n${indent}},`;
  } else {
    const exp = explanationsMap[block.id];
    if (!exp) return null;
    const entries = [];
    for (let i = 0; i < block.options.length; i++) {
      if (i === block.correctIdx) continue;
      if (exp[i]) {
        entries.push(`${indent}  ${i}: '${exp[i]}',`);
      }
    }
    if (entries.length === 0) return null;
    return `${indent}distractorExplanations: {\n${entries.join('\n')}\n${indent}},`;
  }
}

function processFile(filePath, explanationsMap) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const blocks = extractBlocks(lines);

  // Build insertion list (sorted by line number descending so insertions don't shift indices)
  const insertions = [];
  for (const block of blocks) {
    const text = buildInsertionText(block, explanationsMap);
    if (text) {
      insertions.push({ afterLine: block.afterLine, text });
    }
  }

  // Sort descending by line number
  insertions.sort((a, b) => b.afterLine - a.afterLine);

  // Insert
  for (const ins of insertions) {
    lines.splice(ins.afterLine + 1, 0, ins.text);
  }

  fs.writeFileSync(filePath, lines.join('\n'));
  return { total: blocks.length, inserted: insertions.length };
}

// ============================================================================
// DISTRACTOR EXPLANATIONS DATA
// ============================================================================
// Key: question id -> { wrongOptionIndex: 'explanation' }

const explanations = {
  // =====================================================================
  // section-11-mental-health-part1.ts
  // =====================================================================

  // Unit 1: What is Mental Illness?
  'psy-sec11-u1-L1-Q1': { 0: 'Psychologists use multiple criteria together (the 4 Ds), not a single one, because no single factor reliably identifies abnormality.' },
  'psy-sec11-u1-L1-Q3': {
    0: 'Culture profoundly influences how abnormality is defined and which behaviors are considered pathological.',
    2: 'Many non-Western cultures have valid frameworks for understanding mental health that differ from Western definitions.',
    3: 'Cultural context matters for people of all ages, not just children.',
  },
  'psy-sec11-u1-L1-Q5': {
    1: 'Labeling someone as "a depressive individual" defines the person by their diagnosis rather than recognizing them as a person first.',
    2: 'Calling someone "a depressed person" still leads with the condition rather than the individual.',
    3: 'Describing "someone who is depressive" uses the condition as the primary descriptor rather than acknowledging the person first.',
  },
  'psy-sec11-u1-L2-Q1': { 0: 'The APA does publish the DSM, so saying it does not would be incorrect.' },
  'psy-sec11-u1-L2-Q2': {
    0: 'The DSM provides diagnostic criteria but does not prescribe specific medications for disorders.',
    2: 'The DSM catalogs mental disorders, not every possible human behavior.',
    3: 'The DSM is a clinical tool for trained professionals, not a self-diagnosis replacement for therapy.',
  },
  'psy-sec11-u1-L2-Q4': {
    0: 'Its original inclusion reflected prevailing cultural attitudes, not an accident.',
    2: 'The APA continued publishing the DSM after 1973 and still publishes it today.',
    3: 'Homosexuality was removed entirely as a disorder, not relocated to another manual.',
  },
  'psy-sec11-u1-L3-Q2': {
    0: 'Clinical interviews are a standard part of the diagnostic process.',
    1: 'Comparing symptoms to DSM criteria is a core diagnostic step.',
    2: 'Reviewing medical and family history is a standard diagnostic practice.',
  },
  'psy-sec11-u1-L3-Q4': {
    0: 'The DSM explicitly allows and expects multiple diagnoses when criteria for more than one disorder are met.',
    2: 'Experiencing symptoms of two disorders simultaneously is well-documented and does not indicate exaggeration.',
    3: 'The DSM allows clinicians to assign as many diagnoses as are supported by the evidence.',
  },
  'psy-sec11-u1-L4-Q1': { 0: 'The biopsychosocial model explicitly considers multiple interacting causes, not a single one.' },
  'psy-sec11-u1-L4-Q3': {
    0: 'Genetic vulnerability alone is not sufficient; environmental stress is also needed to trigger a disorder.',
    1: 'Stress alone does not always cause mental illness; a predisposition is also required.',
    3: 'The diathesis-stress model identifies a clear, predictable pattern of vulnerability plus stressor.',
  },
  'psy-sec11-u1-L4-Q4': {
    1: 'The diathesis-stress model focuses on vulnerability meeting a trigger, but here both siblings had similar stressors with different outcomes, pointing to broader interacting factors.',
    2: 'The medical model overlooks psychological and social factors that also contribute to depression.',
    3: 'The moral model is outdated and falsely attributes mental illness to personal weakness.',
  },
  'psy-sec11-u1-L5-Q1': {
    0: '1 in 100 greatly underestimates the prevalence; the actual rate is about 1 in 5.',
    1: '1 in 50 is still much lower than the actual prevalence of about 1 in 5 adults per year.',
    2: '1 in 20 underestimates prevalence; approximately 20% (1 in 5) of adults are affected annually.',
  },
  'psy-sec11-u1-L5-Q2': { 0: 'Lifetime prevalence is close to 50%, so it would be false to deny this well-established finding.' },
  'psy-sec11-u1-L5-Q5': {
    0: 'Dismissing persistent symptoms as normal minimizes the person\\\'s experience and discourages help-seeking.',
    2: 'While sleep and exercise help, persistent symptoms lasting weeks suggest a clinical condition that warrants professional evaluation.',
    3: 'Telling someone to stop overthinking dismisses the reality of their symptoms and delays needed help.',
  },

  // Unit 2: Anxiety Disorders
  'psy-sec11-u2-L1-Q1': { 0: 'Normal anxiety is adaptive and helpful; it only becomes harmful when excessive, persistent, and impairing.' },
  'psy-sec11-u2-L1-Q3': {
    0: 'Mood disorders like depression are very common but are the second most prevalent category after anxiety disorders.',
    2: 'Personality disorders affect a smaller percentage of the population than anxiety disorders.',
    3: 'Psychotic disorders like schizophrenia affect roughly 1% of the population, far less than anxiety disorders.',
  },
  'psy-sec11-u2-L1-Q5': {
    0: 'Temporary worry that resolves after exam week is a normal stress response, not an anxiety disorder.',
    2: 'Brief nervousness before a specific event is a normal adaptive response.',
    3: 'Worry that appears only around deadlines and then passes is a typical stress response.',
  },
  'psy-sec11-u2-L2-Q1': { 0: 'GAD involves worry about many different topics, which is what makes it "generalized" rather than focused.' },
  'psy-sec11-u2-L2-Q2': {
    0: 'Two weeks is the duration criterion for major depressive disorder, not GAD.',
    1: 'One month is too short; GAD requires at least 6 months of excessive worry.',
    3: 'One year exceeds the minimum requirement; 6 months is the threshold for GAD diagnosis.',
  },
  'psy-sec11-u2-L2-Q4': {
    0: 'Sudden surges of intense fear describe panic disorder, not GAD.',
    2: 'Extreme fear of one specific object or situation describes a specific phobia, not GAD.',
    3: 'Repetitive checking of locks and appliances describes OCD compulsions, not GAD.',
  },
  'psy-sec11-u2-L2-Q5': {
    1: 'Age alone is not a diagnostic criterion for GAD.',
    2: 'Ruling out physical causes is important but not the strongest diagnostic indicator.',
    3: 'Irritability is one possible symptom but does not alone support a GAD diagnosis.',
  },
  'psy-sec11-u2-L3-Q1': { 0: 'Panic attacks do peak within minutes, so denying this would contradict well-established clinical evidence.' },
  'psy-sec11-u2-L3-Q2': {
    0: 'Most panic attacks resolve on their own and do not require medical treatment.',
    2: 'Panic attacks can occur unexpectedly in any situation, including safe ones.',
    3: 'Emergency rooms treat many conditions but do not specialize in panic disorder.',
  },
  'psy-sec11-u2-L3-Q5': {
    0: 'Fear of spiders is a specific phobia (arachnophobia), not agoraphobia.',
    2: 'Agoraphobia involves more than just open spaces; it includes any situation where escape seems difficult.',
    3: 'Fear of social embarrassment describes social anxiety disorder, not agoraphobia.',
  },
  'psy-sec11-u2-L3-Q6': {
    0: 'Avoiding multiple locations after recurrent attacks goes beyond normal caution.',
    1: 'Social anxiety involves fear of judgment, not fear triggered by panic attacks in various locations.',
    3: 'The avoidance extends to multiple settings, not just transportation, suggesting a broader pattern.',
  },
  'psy-sec11-u2-L4-Q1': { 0: 'Phobias involve fear that is out of proportion to actual danger, not proportional to it.' },
  'psy-sec11-u2-L4-Q3': {
    0: 'Operant conditioning involves consequences shaping behavior, not a direct pairing of stimulus and fear response.',
    2: 'Observational learning involves watching others, but this child was directly bitten.',
    3: 'Information transfer involves being told about danger, not experiencing it firsthand.',
  },
  'psy-sec11-u2-L4-Q4': {
    0: 'Biological preparedness does not mean phobias are entirely genetic; it means evolution primes us to learn certain fears faster.',
    2: 'Anyone can develop phobias regardless of specific genes; preparedness affects the ease of learning, not the capacity.',
    3: 'Phobias arise from learning experiences and evolutionary predispositions, not brain damage.',
  },
  'psy-sec11-u2-L5-Q1': { 0: 'Shyness is a normal personality trait, while social anxiety disorder involves disabling fear and avoidance.' },
  'psy-sec11-u2-L5-Q2': {
    0: 'Fear of crowds and open spaces describes agoraphobia, not social anxiety disorder.',
    2: 'Fear of having a panic attack describes panic disorder, not social anxiety.',
    3: 'Fear of a specific object like spiders is a specific phobia, not social anxiety disorder.',
  },
  'psy-sec11-u2-L5-Q4': {
    0: 'Feeling nervous but presenting successfully is a normal response, not a disorder.',
    2: 'Preparing extra notes is a healthy coping strategy, not evidence of a disorder.',
    3: 'Seeking tips from colleagues is adaptive behavior, not avoidance.',
  },
  'psy-sec11-u2-L6-Q2': { 0: 'In anxiety disorders the amygdala is overactive, not underactive, causing excessive alarm responses.' },
  'psy-sec11-u2-L6-Q4': {
    0: 'SSRIs primarily affect serotonin reuptake, not GABA levels directly.',
    2: 'SSRIs do not block all stress hormones; they specifically target serotonin reuptake.',
    3: 'SSRIs modulate brain chemistry over time but do not permanently suppress the amygdala.',
  },
  'psy-sec11-u2-L6-Q5': {
    0: 'If anxiety were 100% genetic, identical twins would always share the disorder, which they do not.',
    1: 'Twin studies clearly show a significant genetic component to anxiety disorders.',
    3: 'Anyone can develop anxiety disorders regardless of twin status.',
  },
  'psy-sec11-u2-L6-Q6': {
    0: 'Identical twins share the same genes, so genetic differences cannot explain the divergent outcomes.',
    2: 'Twin studies show GAD does have a genetic component of 30-40%.',
    3: 'There is no evidence the unaffected twin is suppressing symptoms; different life experiences are the more parsimonious explanation.',
  },

  // Unit 3: Depression
  'psy-sec11-u3-L1-Q1': { 0: 'The DSM does require at least 2 weeks, so denying this would be incorrect.' },
  'psy-sec11-u3-L1-Q4': {
    0: 'Anxiety and panic attacks are features of anxiety disorders, not the core criteria for depression.',
    2: 'Insomnia and weight loss are associated symptoms but are not the 2 required core criteria.',
    3: 'Fatigue and difficulty concentrating are supporting symptoms but not the core diagnostic pair.',
  },
  'psy-sec11-u3-L1-Q5': {
    0: 'Dismissing the experience as boredom ignores the clinical significance of persistent anhedonia.',
    2: 'Normalizing weeks of inability to enjoy anything minimizes a potentially serious condition.',
    3: 'Suggesting exercise alone for persistent anhedonia overlooks the need for professional assessment.',
  },
  'psy-sec11-u3-L2-Q1': { 0: 'Depression involves multiple factors including genetics, brain structure, and life experiences, not just serotonin.' },
  'psy-sec11-u3-L2-Q3': {
    0: '5% greatly underestimates the genetic contribution, which twin studies place around 40%.',
    2: '90% overstates heritability; environmental factors account for roughly 60% of depression risk.',
    3: 'Twin studies provide strong evidence that genetics do play a role in depression.',
  },
  'psy-sec11-u3-L2-Q5': {
    0: 'Chronic stress has well-documented effects on brain structure and function.',
    2: 'Stress affects both physical and mental health through shared biological pathways like the cortisol system.',
    3: 'A single stressful event does not always cause depression; chronic stress is typically the concern.',
  },
  'psy-sec11-u3-L2-Q6': {
    1: 'Small hippocampal size is associated with depression but does not invariably cause it.',
    2: 'Hippocampal damage from cortisol is a gradual process, not an instant destruction of neurons.',
    3: 'Brain imaging studies consistently show structural differences associated with depression.',
  },
  'psy-sec11-u3-L3-Q1': { 0: 'Beck\\\'s cognitive triad does involve negative thoughts about self, world, and future, so denying this is incorrect.' },
  'psy-sec11-u3-L3-Q4': {
    0: 'An optimistic style attributes failures to temporary, specific, and external causes, not permanent and personal ones.',
    2: 'A realistic style involves accurate assessment, not the distorted permanent/pervasive/personal pattern described.',
    3: 'An external style attributes problems to outside factors, but this person attributes failures internally ("it\\\'s all my fault").',
  },
  'psy-sec11-u3-L3-Q5': {
    0: 'Active problem-solving moves toward solutions, while rumination circles without resolution.',
    2: 'Avoidance is a different maladaptive strategy; rumination is the opposite, involving excessive focus on problems.',
    3: 'Talking through problems with a therapist is a constructive coping method, not rumination.',
  },
  'psy-sec11-u3-L3-Q6': {
    0: 'Statements like "I\\\'m stupid" and "everything I try fails" are cognitive distortions, not rational self-assessments.',
    2: 'Replaying negative thoughts for weeks without action is a harmful pattern, not a healthy coping strategy.',
    3: 'Brief disappointment is normal, but weeks of self-blame and inaction suggest clinical significance beyond simple disappointment.',
  },
  'psy-sec11-u3-L4-Q1': { 0: 'Not everyone who faces major stressors develops depression; protective factors buffer the impact.' },
  'psy-sec11-u3-L4-Q3': {
    0: 'Poverty does not create a genetic predisposition; it creates chronic environmental stress.',
    2: 'The relationship is bidirectional; poverty both contributes to and is worsened by depression.',
    3: 'Extensive research shows a strong relationship between poverty and elevated depression rates.',
  },
  'psy-sec11-u3-L4-Q5': {
    0: 'Brain chemistry is only one contributor; the biopsychosocial model includes psychological and social factors too.',
    1: 'Negative thinking contributes but does not fully explain depression without considering biology and social context.',
    3: 'Stressful life events increase risk but cannot explain depression without considering biological and psychological factors.',
  },
  'psy-sec11-u3-L5-Q1': {
    0: 'Persistent depressive disorder is milder than MDD, not more severe.',
    2: 'Persistent depressive disorder involves depressed mood and psychological symptoms, not only physical ones.',
    3: 'Depressed mood is the defining feature of persistent depressive disorder.',
  },
  'psy-sec11-u3-L5-Q2': { 0: 'Double depression is a real clinical phenomenon where dysthymia and MDD episodes co-occur.' },
  'psy-sec11-u3-L5-Q4': {
    0: 'Exposure therapy treats phobias and anxiety disorders, not seasonal affective disorder.',
    2: 'ECT is used for severe, treatment-resistant depression, not specifically for seasonal patterns.',
    3: 'Psychodynamic therapy is not a targeted treatment for the light-deprivation mechanism of SAD.',
  },
  'psy-sec11-u3-L5-Q5': {
    0: 'MDD alone does not explain the chronic 3-year baseline of mild symptoms.',
    1: 'SAD follows a seasonal pattern, while this person has chronic symptoms year-round with periodic worsening.',
    3: 'Three years of persistent low mood with functional impairment goes well beyond normal fluctuations.',
  },
  'psy-sec11-u3-L6-Q1': { 0: 'This gender gap is well-documented across cultures, so denying it would be factually incorrect.' },
  'psy-sec11-u3-L6-Q2': {
    0: 'Men can and do experience depression; it affects all genders.',
    2: 'The DSM applies equally to all genders and does not exclude men.',
    3: 'Men are less likely to seek treatment immediately, which contributes to underdiagnosis.',
  },
  'psy-sec11-u3-L6-Q5': {
    0: 'Teens experience depression at significant rates, especially during adolescence.',
    2: 'Adolescent depression often persists and predicts adult depression if untreated.',
    3: 'MDD can be diagnosed in children and adolescents, not only adults.',
  },
  'psy-sec11-u3-L6-Q6': {
    0: 'Unexplained physical symptoms in the absence of medical findings suggest a genuine condition, not malingering.',
    1: 'When no medical cause is found, psychological factors should be considered rather than dismissed.',
    3: 'A mental health evaluation is more appropriate than physical therapy alone for medically unexplained symptoms.',
  },

  // Unit 4: Review
  'psy-sec11-u4-L1-Q2': {
    0: 'The medical model focuses narrowly on biological factors, not the full interaction of biology, psychology, and social context.',
    1: 'The moral model is an outdated framework that blames individuals for mental illness.',
    3: 'The behavioral model focuses only on learned behaviors, not the full biopsychosocial picture.',
  },
  'psy-sec11-u4-L1-Q4': { 0: 'The DSM is primarily used in North America; many countries use the WHO\\\'s ICD system instead.' },
  'psy-sec11-u4-L1-Q6': {
    0: 'The medical model alone cannot explain why the disorder appeared only after the stressor.',
    2: 'The moral model falsely attributes mental illness to personal moral failings.',
    3: 'The clear sequence of vulnerability plus stressor suggests a predictable pattern, not random chance.',
  },
  'psy-sec11-u4-L2-Q2': {
    0: 'GAD involves chronic broad worry, not the sudden panic attacks and location avoidance described here.',
    2: 'Social anxiety centers on fear of judgment, not unexpected physical panic attacks.',
    3: 'A specific phobia of grocery stores would not explain attacks in other locations.',
  },
  'psy-sec11-u4-L2-Q3': {
    0: 'The hippocampus is involved in memory formation, not the primary fear response.',
    1: 'The cerebellum coordinates movement and balance, not fear responses.',
    3: 'Broca\\\'s area is involved in speech production, not fear processing.',
  },
  'psy-sec11-u4-L2-Q6': { 0: 'Anxiety disorders are the most common category, so denying this would be factually incorrect.' },
  'psy-sec11-u4-L3-Q2': {
    0: 'Insomnia and fatigue are supporting symptoms of MDD but not the required core diagnostic pair.',
    2: 'Weight changes and guilt are associated symptoms but not the two core criteria.',
    3: 'Difficulty concentrating and restlessness are supporting symptoms, not the core diagnostic pair.',
  },
  'psy-sec11-u4-L3-Q5': {
    0: 'Genetics alone cannot explain depression when psychological and social factors are also present.',
    1: 'Job loss alone is insufficient to explain depression without considering genetic vulnerability and cognitive style.',
    3: 'Depression is not a choice; it results from interacting biological, psychological, and social factors.',
  },
  'psy-sec11-u4-L3-Q6': { 0: 'The 2:1 gender ratio in depression diagnosis is well-established across cultures.' },

  // Unit 5: Bipolar Disorder
  'psy-sec11-u5-L1-Q1': { 0: 'Bipolar episodes last days to weeks, not hours, making them fundamentally different from everyday mood shifts.' },
  'psy-sec11-u5-L1-Q2': {
    0: 'Bipolar disorder includes both depressive and manic/hypomanic episodes, not depression alone.',
    2: 'Severity comparisons are not the distinguishing factor; the presence of mania is.',
    3: 'They are distinct disorders with different symptom patterns and treatments.',
  },
  'psy-sec11-u5-L1-Q5': {
    0: 'The extreme decrease in sleep, impulsive spending, and pressured speech go far beyond normal enthusiasm.',
    1: 'Sleeping only 3 hours, maxing out credit cards, and incomprehensible rapid speech are not hallmarks of a productive week.',
    3: 'The described symptoms are manic (elevated energy, impulsivity), not depressive (sadness, fatigue).',
  },
  'psy-sec11-u5-L2-Q1': { 0: 'Bipolar II has different features (hypomania vs full mania), and its depressive episodes can be equally severe.' },
  'psy-sec11-u5-L2-Q3': {
    0: 'They are distinct disorders with different episode types and treatment approaches.',
    2: 'Bipolar II prominently features severe depressive episodes alongside hypomania.',
    3: 'Bipolar II is a well-established diagnosis recognized by clinicians worldwide.',
  },
  'psy-sec11-u5-L2-Q5': {
    0: 'The hypomanic periods indicate more than unipolar depression.',
    1: 'Bipolar I requires full manic episodes, but this person\\\'s elevated periods were less severe and did not require hospitalization.',
    3: 'GAD involves chronic worry, not alternating mood episodes.',
  },
  'psy-sec11-u5-L3-Q1': {
    0: '10-15% drastically underestimates bipolar disorder\\\'s heritability, which is among the highest of any mental disorder.',
    1: '30-40% is the heritability rate for depression; bipolar disorder is substantially higher at 80-85%.',
    3: 'No psychiatric condition is 100% heritable; environmental factors always play some role.',
  },
  'psy-sec11-u5-L3-Q2': { 0: 'Bipolar disorder is polygenic, with many genes contributing small effects rather than one causative gene.' },
  'psy-sec11-u5-L3-Q5': {
    0: 'Bipolar symptoms can closely resemble depression, anxiety, and other conditions, especially early on.',
    2: 'Many clinicians initially miss bipolar disorder because depressive episodes often present first.',
    3: 'Bipolar disorder shares symptoms with depression, anxiety, and other conditions, creating diagnostic overlap.',
  },
  'psy-sec11-u5-L4-Q1': { 0: 'Bipolar disorder is a chronic condition requiring ongoing management, not a one-time cure.' },
  'psy-sec11-u5-L4-Q2': {
    0: 'Diet has minimal direct effect on bipolar relapse compared to medication adherence.',
    2: 'Television watching is not a recognized cause of bipolar relapse.',
    3: 'While stress contributes, stopping medication is the single most common relapse trigger.',
  },
  'psy-sec11-u5-L4-Q4': {
    0: 'Feeling stable on medication does not mean the condition is cured; it means the medication is working.',
    2: 'Doubling medication without medical guidance is dangerous and not appropriate advice.',
    3: 'Medication is a cornerstone of bipolar treatment and is necessary for most people with the disorder.',
  },
  'psy-sec11-u5-L5-Q1': {
    0: 'Cyclothymia specifically involves sub-threshold mood shifts that do not reach full manic criteria.',
    2: 'Cyclothymia requires at least 2 years of symptoms, far longer than a few weeks.',
    3: 'Cyclothymia and bipolar disorders differ in the severity and duration of mood episodes.',
  },
  'psy-sec11-u5-L5-Q4': { 0: 'Research consistently shows people with bipolar disorder are more often victimized than violent.' },
  'psy-sec11-u5-L5-Q5': {
    0: 'Agreeing with a casual misuse of the term reinforces stigma and misinformation.',
    2: 'Normalizing a clinical diagnosis trivializes the experiences of those who actually have bipolar disorder.',
    3: 'There is no evidence the coworker has a disorder; the comment reflects casual misuse of a clinical term.',
  },

  // Unit 6: PTSD and Trauma
  'psy-sec11-u6-L1-Q1': { 0: 'Trauma is defined by the individual\\\'s subjective response, not solely by the objective severity of the event.' },
  'psy-sec11-u6-L1-Q2': {
    0: 'Trauma can result from many experiences beyond combat, including accidents, abuse, and natural disasters.',
    2: 'Psychological trauma can occur without physical injury, such as witnessing violence or experiencing abuse.',
    3: 'Traumatic events can happen at any age, not only during childhood.',
  },
  'psy-sec11-u6-L1-Q5': {
    0: 'Fear intensity does not determine PTSD development; many other factors play a role.',
    1: 'PTSD is not about emotional weakness; it reflects how the brain processes overwhelming experiences.',
    3: 'Only a minority of people who experience trauma develop PTSD, so it is not an inevitable outcome.',
  },
  'psy-sec11-u6-L2-Q2': { 0: 'The 1-month minimum is required for a PTSD diagnosis, so denying this contradicts DSM criteria.' },
  'psy-sec11-u6-L2-Q3': {
    0: 'Flashbacks are involuntary and cannot be controlled, unlike deliberate recall.',
    2: 'Flashbacks can occur while awake, not just during sleep; nighttime re-experiencing is classified as nightmares.',
    3: 'Flashbacks are linked to actual traumatic experiences, not to imagination.',
  },
  'psy-sec11-u6-L2-Q6': {
    0: 'A startle response to a sudden noise is not a flashback, which involves re-experiencing the traumatic event.',
    1: 'Avoidance involves steering clear of trauma reminders, not an exaggerated physical reaction to noise.',
    2: 'Negative mood changes involve persistent negative beliefs and emotions, not a physical startle reflex.',
  },
  'psy-sec11-u6-L3-Q2': {
    0: 'People with PTSD do not deliberately choose to relive their trauma; the re-experiencing is involuntary.',
    2: 'Most memories are experienced as past events; the present-tense quality of trauma memories is abnormal.',
    3: 'The prefrontal cortex is actually underactive in PTSD, reducing its ability to regulate the amygdala.',
  },
  'psy-sec11-u6-L3-Q4': { 0: 'In PTSD the amygdala is overactive, not underactive, creating exaggerated threat responses.' },
  'psy-sec11-u6-L3-Q5': {
    0: 'The hippocampus fails to properly file the memory, which is why flashbacks occur.',
    2: 'The prefrontal cortex is typically underactive in PTSD, not overactive.',
    3: 'A sensory cue triggering a full fear response and flashback is characteristic of PTSD, not normal recall.',
  },
  'psy-sec11-u6-L4-Q1': { 0: 'Complex PTSD results from prolonged, repeated trauma, not a single incident.' },
  'psy-sec11-u6-L4-Q3': {
    0: 'The ACE study demonstrated a strong dose-response relationship between childhood adversity and adult health.',
    2: 'Emotional abuse, neglect, and household dysfunction also significantly affect adult health outcomes.',
    3: 'ACEs create lasting effects that persist into adulthood, affecting health across the lifespan.',
  },
  'psy-sec11-u6-L5-Q2': { 0: 'Avoidance provides short-term relief but maintains PTSD long-term by preventing trauma processing.' },
  'psy-sec11-u6-L5-Q3': {
    0: 'Avoidance does provide short-term relief, which is why people continue using it despite long-term harm.',
    2: 'Avoidance maintains the disorder by preventing the brain from processing the trauma memory.',
    3: 'The DSM lists avoidance as a symptom of PTSD, not as a recovery pathway.',
  },
  'psy-sec11-u6-L5-Q5': {
    0: 'Distorted beliefs can be changed through therapy; medication alone does not address thought patterns.',
    2: 'Avoiding all discussion of trauma prevents the processing needed for recovery.',
    3: 'Relaxation techniques alone do not address the distorted trauma-related beliefs that maintain PTSD.',
  },
  'psy-sec11-u6-L6-Q1': { 0: 'Trauma-informed care does ask "what happened to you?" to understand behavior in context.' },
  'psy-sec11-u6-L6-Q2': {
    0: 'Forcing immediate trauma confrontation can re-traumatize the person, violating trauma-informed principles.',
    2: 'Ignoring trauma history prevents understanding the root causes of a person\\\'s difficulties.',
    3: 'Trauma-informed care applies to all settings and all people, not just those with a formal PTSD diagnosis.',
  },
  'psy-sec11-u6-L6-Q5': {
    0: 'Punitive responses ignore the underlying trauma and can worsen the student\\\'s condition.',
    2: 'Ignoring behavior fails to provide the support the student needs and misses an opportunity for intervention.',
    3: 'Publicly discussing a student\\\'s home situation violates privacy and could cause further harm.',
  },
  'psy-sec11-u6-L6-Q6': { 0: 'Post-traumatic growth and ongoing suffering can coexist; growth does not eliminate the effects of trauma.' },

  // Unit 7: OCD and Related Disorders
  'psy-sec11-u7-L1-Q1': { 0: 'OCD involves distressing intrusive thoughts and compulsive rituals, not mere preferences for tidiness.' },
  'psy-sec11-u7-L1-Q4': {
    0: 'Compulsions provide only temporary relief and never permanently eliminate the underlying obsession.',
    2: 'Compulsions do reduce anxiety temporarily, which is precisely why they become reinforced.',
    3: 'Compulsions are repetitive patterns that persist and escalate over time.',
  },
  'psy-sec11-u7-L1-Q5': {
    0: 'Checking once and leaving is a normal, proportionate response to security concerns.',
    2: 'Extra caution with valuables is a rational, one-time precaution, not a compulsion.',
    3: 'Asking a neighbor for help during vacation is a practical precaution, not an anxiety-driven compulsion.',
  },
  'psy-sec11-u7-L2-Q2': { 0: 'People with harm-related OCD are horrified by their thoughts and are not at elevated risk of acting on them.' },
  'psy-sec11-u7-L2-Q4': {
    0: 'Less than 5 minutes of compulsive behavior would not typically meet the threshold for clinical significance.',
    1: 'About 15 minutes is below the typical clinical threshold of at least 1 hour per day.',
    3: 'Exactly 8 hours is not a diagnostic criterion; the threshold is at least 1 hour or significant impairment.',
  },
  'psy-sec11-u7-L3-Q1': { 0: 'ERP involves resisting compulsions while facing triggers, not performing compulsions more frequently.' },
  'psy-sec11-u7-L3-Q3': {
    0: 'OCD is strongly linked to serotonin dysfunction, which is why SSRIs are effective.',
    2: 'Higher doses are prescribed because OCD requires more serotonin modulation, not because lower doses are dangerous.',
    3: 'SSRIs are a first-line pharmacological treatment for OCD and are commonly prescribed.',
  },
  'psy-sec11-u7-L3-Q5': {
    0: 'Performing the compulsion immediately reinforces the OCD cycle rather than breaking it.',
    2: 'Simply telling someone their fear is irrational does not teach the brain to tolerate anxiety naturally.',
    3: 'Avoiding the trigger entirely prevents the learning that anxiety can decrease without the ritual.',
  },
  'psy-sec11-u7-L4-Q1': { 0: 'In BDD, the perceived flaws are typically minimal or not noticeable to others.' },
  'psy-sec11-u7-L4-Q2': {
    0: 'Body weight concerns are more associated with eating disorders, not BDD\\\'s OCD-like pattern.',
    2: 'BDD can occur independently of OCD; they share a pattern but are separate diagnoses.',
    3: 'The DSM groups BDD with OCD-related disorders due to shared obsessive-compulsive features, not because all appearance concerns are grouped together.',
  },
  'psy-sec11-u7-L4-Q5': {
    0: 'Telling someone to stop checking dismisses their distress without addressing the underlying condition.',
    1: 'Suggesting cosmetic surgery reinforces the false belief that appearance is the problem rather than the distorted perception.',
    3: 'Normalizing the experience minimizes the severity of spending hours in distress over a flaw others cannot see.',
  },
  'psy-sec11-u7-L5-Q1': { 0: 'Hoarding disorder is a recognized mental condition, not a result of laziness.' },
  'psy-sec11-u7-L5-Q2': {
    0: 'Collecting valuable items purposefully is different from the inability to discard that defines hoarding.',
    2: 'Occasional messiness is normal and does not render living spaces unusable.',
    3: 'Owning many items in an organized way is not the same as the disabling clutter seen in hoarding.',
  },
  'psy-sec11-u7-L5-Q4': {
    0: 'Forced clearing almost never solves the problem because the person typically reaccumulates.',
    2: 'Forced clearing is not the recommended treatment; gradual, voluntary sorting with therapeutic support is.',
    3: 'Forced clearing causes severe distress and usually leads to reaccumulation.',
  },

  // Unit 8: Schizophrenia
  'psy-sec11-u8-L1-Q1': { 0: 'Psychosis is a symptom (loss of contact with reality) that can appear across multiple disorders, not a diagnosis itself.' },
  'psy-sec11-u8-L1-Q3': {
    0: 'Visual hallucinations are more common in other conditions; auditory hallucinations dominate in schizophrenia.',
    2: 'Olfactory hallucinations are rare in schizophrenia compared to auditory ones.',
    3: 'Tactile hallucinations occur but are much less common than auditory hallucinations in schizophrenia.',
  },
  'psy-sec11-u8-L1-Q6': {
    0: 'A delusion is a false belief, while hearing a voice is a perceptual experience (hallucination), not a belief.',
    2: 'Hearing a commentary voice that others cannot hear goes beyond normal internal dialogue.',
    3: 'Retaining insight does not rule out psychosis; some people with hallucinations know the experience is unusual.',
  },
  'psy-sec11-u8-L2-Q1': { 0: 'Schizophrenia involves psychotic symptoms like hallucinations and delusions, not multiple personalities.' },
  'psy-sec11-u8-L2-Q2': {
    0: 'Multiple personalities are a feature of dissociative identity disorder, not schizophrenia.',
    1: 'Mood state splitting describes bipolar disorder, not the meaning of "schizophrenia."',
    3: 'The name refers to a split from reality, not a physical split between brain hemispheres.',
  },
  'psy-sec11-u8-L2-Q5': {
    0: 'Negative symptoms are often less dramatic than positive symptoms but more persistently impairing.',
    2: 'Positive symptoms can be very serious and distressing, but they respond better to medication.',
    3: 'Negative symptoms primarily impair social and daily functioning, not just physical health.',
  },
  'psy-sec11-u8-L2-Q6': {
    0: 'Positive symptoms involve additions like hallucinations, not the reductions described here.',
    2: 'While medications can have side effects, the described symptoms are core negative features of schizophrenia.',
    3: 'Flat affect, alogia, avolition, and social withdrawal are well-established negative symptoms of schizophrenia.',
  },
  'psy-sec11-u8-L3-Q1': {
    0: '5% greatly underestimates the concordance rate for identical twins.',
    2: '75% overestimates the concordance rate, which is approximately 48%.',
    3: '100% concordance would mean schizophrenia is entirely genetic, but environmental factors clearly play a role.',
  },
  'psy-sec11-u8-L3-Q2': { 0: 'The less-than-100% concordance rate proves that environment, not just genetics, contributes to schizophrenia.' },
  'psy-sec11-u8-L3-Q5': {
    0: 'People with schizophrenia typically have larger, not smaller, ventricles.',
    2: 'An abnormally large cerebellum is not a characteristic finding in schizophrenia.',
    3: 'Many studies have documented structural brain differences in schizophrenia.',
  },
  'psy-sec11-u8-L3-Q6': {
    0: 'If genetics alone were the cause, all siblings with the same genes should develop the disorder.',
    1: 'Cannabis use is one risk factor but does not alone cause schizophrenia without genetic vulnerability.',
    3: 'The clear pattern of genetic risk plus environmental stressors points to an identifiable causal model.',
  },
  'psy-sec11-u8-L4-Q1': { 0: 'Antipsychotics primarily target positive symptoms; negative symptoms are much harder to treat pharmacologically.' },
  'psy-sec11-u8-L4-Q4': {
    0: 'CBTp is a psychotherapy, not a medication.',
    2: 'CBTp is a form of talk therapy, not a neuroimaging technique.',
    3: 'CBTp is an evidence-based psychological therapy, not a housing arrangement.',
  },
  'psy-sec11-u8-L4-Q6': {
    0: 'Medication alone without psychosocial support produces worse outcomes than integrated treatment.',
    1: 'For schizophrenia, therapy alone without medication is generally insufficient to manage psychotic symptoms.',
    3: 'Permanent hospitalization is not the standard of care; community-based integrated treatment produces better outcomes.',
  },
  'psy-sec11-u8-L5-Q1': { 0: 'People with schizophrenia are more likely to be victims of violence than perpetrators.' },
  'psy-sec11-u8-L5-Q2': {
    0: 'Scientific research generally counters stigma by providing accurate data about schizophrenia.',
    2: 'Accurate educational content reduces stigma rather than creating it.',
    3: 'Mental health professionals work to reduce stigma, not perpetuate it.',
  },
  'psy-sec11-u8-L5-Q5': {
    0: 'Encouraging avoidance reinforces the harmful stereotype that people with schizophrenia are dangerous.',
    2: 'Ignoring and hoping they move away perpetuates exclusion and stigma.',
    3: 'Denying the existence of schizophrenia is factually incorrect and unhelpful.',
  },
  'psy-sec11-u8-L5-Q6': { 0: 'With modern integrated treatment, many people with schizophrenia achieve meaningful recovery and independence.' },
  'psy-sec11-u8-L6-Q2': { 0: 'Schizoaffective disorder does combine psychotic and mood symptoms, so denying this is incorrect.' },
  'psy-sec11-u8-L6-Q3': {
    0: 'Psychotic episodes in early childhood are extremely rare; onset typically occurs in late adolescence to early adulthood.',
    2: 'While late-onset psychosis can occur, the most common age of first episode is 18-25.',
    3: 'First psychotic episodes most commonly occur decades earlier than age 65.',
  },
  'psy-sec11-u8-L6-Q6': {
    0: 'Waiting 6 months delays critical early intervention that improves long-term outcomes.',
    1: 'Psychosis is a brain-based condition that cannot be resolved through willpower alone.',
    3: 'Avoiding the student reinforces stigma and delays the help they need.',
  },

  // =====================================================================
  // section-11-mental-health-part2.ts
  // =====================================================================

  // Unit 9: Review (bipolar, PTSD, OCD, schizophrenia)
  'psy-sec11-u9-L1-Q1': { 0: 'Bipolar disorder does involve alternating mania and depression, so denying this contradicts the diagnosis.' },
  'psy-sec11-u9-L1-Q3': {
    0: 'The hippocampus processes memory, not the primary fear response that becomes overactive in PTSD.',
    1: 'The cerebellum coordinates movement, not threat detection or fear responses.',
    3: 'The occipital lobe processes vision and is not involved in the hyperactive fear response of PTSD.',
  },
  'psy-sec11-u9-L1-Q4': {
    1: 'Bipolar I includes depression, and bipolar II includes hypomania, not the reverse.',
    2: 'Bipolar I is not age-specific; both types can appear at any age.',
    3: 'Bipolar II is not more severe overall; it has milder highs (hypomania) but equally severe depressive episodes.',
  },
  'psy-sec11-u9-L1-Q6': {
    1: 'PTSD flashbacks are tied to specific traumatic events, not the manic-depressive cycle described here.',
    2: 'GAD involves chronic worry, not the alternating episodes of elevated energy and deep sadness.',
    3: 'MDD does not include the manic phase of reduced sleep, grandiose plans, and rapid speech.',
  },
  'psy-sec11-u9-L2-Q1': { 0: 'Most people with OCD do have insight, so denying this contradicts the clinical evidence.' },
  'psy-sec11-u9-L2-Q4': {
    1: 'Obsessions come first as intrusive thoughts; compulsions develop as a response to reduce the anxiety they cause.',
    2: 'Obsessions and compulsions are functionally linked in a reinforcing cycle, not unrelated co-occurrences.',
    3: 'Compulsions can take many forms including checking, washing, and counting, not just violent thoughts.',
  },
  'psy-sec11-u9-L2-Q5': {
    0: 'Serotonin deficiency is more associated with depression and OCD, not the primary hypothesis for schizophrenia.',
    2: 'GABA excess is not the leading hypothesis for schizophrenia; dopamine dysregulation is.',
    3: 'Acetylcholine depletion is more associated with Alzheimer\\\'s disease than schizophrenia.',
  },
  'psy-sec11-u9-L2-Q6': {
    1: 'Paranoid delusions in schizophrenia feel completely real; this person recognizes their behavior as excessive.',
    2: 'GAD involves generalized worry, not the specific repetitive checking pattern driven by intrusive thoughts.',
    3: 'Manic episodes involve elevated mood and energy, not repetitive anxiety-driven checking rituals.',
  },
  'psy-sec11-u9-L3-Q1': { 0: 'Depressed mood is a transdiagnostic symptom found in multiple disorders including bipolar, PTSD, and MDD.' },
  'psy-sec11-u9-L3-Q2': {
    0: 'Bipolar depression can be equally severe as major depression; severity is not the distinguishing factor.',
    1: 'Major depression does not typically include hallucinations; psychotic features are a separate specifier.',
    3: 'Duration alone does not distinguish the two; the key difference is the presence of manic/hypomanic episodes.',
  },
  'psy-sec11-u9-L3-Q4': {
    0: 'Hallucinations suggest a psychotic component not typical of MDD alone.',
    2: 'PTSD involves trauma-related symptoms, and schizophrenia involves psychosis; they are different conditions.',
    3: 'The described symptoms do not match OCD or bipolar disorder patterns.',
  },
  'psy-sec11-u9-L3-Q6': {
    1: 'Many symptoms like sadness and sleep problems overlap across multiple disorders.',
    2: 'Clinicians routinely diagnose comorbid conditions when multiple disorders are present.',
    3: 'Symptoms vary considerably between different disorders, which is why full assessment matters.',
  },

  // Unit 10: Personality Disorders
  'psy-sec11-u10-L1-Q1': { 0: 'Rigid, pervasive personality traits causing distress or impairment do define a personality disorder.' },
  'psy-sec11-u10-L1-Q2': {
    1: 'Having unusual traits alone does not constitute a disorder; rigidity and impairment are required.',
    2: 'Personality changes after age 50 may indicate other conditions; personality disorders typically emerge earlier.',
    3: 'Scoring differently on a test does not indicate a disorder unless the traits are rigid and impairing.',
  },
  'psy-sec11-u10-L1-Q5': {
    1: 'Personality disorders typically emerge in adolescence or early adulthood, not after age 40.',
    2: 'Early childhood is too young for personality patterns to have fully solidified into a disorder.',
    3: 'Personality disorders develop from enduring patterns, not a single traumatic event.',
  },
  'psy-sec11-u10-L1-Q6': {
    1: 'The pattern described is rigid, pervasive, and impairing, going far beyond occasional suspicion.',
    2: 'Personality disorders typically emerge in adolescence or early adulthood, not after age 30.',
    3: 'A personality disorder can be diagnosed independently of other conditions like depression.',
  },
  'psy-sec11-u10-L2-Q1': { 0: 'Cluster A involves odd or eccentric behavior; dramatic behavior is Cluster B.' },
  'psy-sec11-u10-L2-Q2': {
    1: 'Schizoid personality disorder involves emotional detachment and preference for solitude, not suspicion.',
    2: 'Schizotypal personality disorder involves odd beliefs and eccentric behavior, not primarily distrust.',
    3: 'Avoidant personality disorder involves social avoidance due to fear of rejection, not suspicion of others.',
  },
  'psy-sec11-u10-L2-Q4': {
    1: 'They are qualitatively different conditions, not the same condition at different severity levels.',
    2: 'Paranoid personality disorder does not involve hallucinations or hearing voices.',
    3: 'Paranoid thinking can be a feature of schizophrenia, though it manifests differently than in the personality disorder.',
  },
  'psy-sec11-u10-L2-Q6': {
    1: 'Schizotypal PD involves odd beliefs and perceptual experiences, not just emotional coldness.',
    2: 'Paranoid PD involves pervasive distrust, not the emotional detachment described here.',
    3: 'MDD involves depressive episodes, not a lifelong pattern of emotional detachment and preference for solitude.',
  },
  'psy-sec11-u10-L3-Q1': { 0: 'Cluster B is indeed characterized by dramatic, emotional, or erratic behavior.' },
  'psy-sec11-u10-L3-Q2': {
    0: 'Narcissistic PD involves grandiosity and need for admiration, not a pattern of violating others\\\'s rights.',
    1: 'Borderline PD involves emotional instability and fear of abandonment, not systematic rights violations.',
    3: 'Histrionic PD involves attention-seeking and excessive emotionality, not disregard for others\\\'s rights.',
  },
  'psy-sec11-u10-L3-Q5': {
    0: 'With appropriate treatment, many people with personality disorders show significant improvement.',
    2: 'Psychotherapy, particularly DBT and schema therapy, is often more effective than medication alone for personality disorders.',
    3: 'Most people with personality disorders are not violent; this is a harmful stereotype.',
  },
  'psy-sec11-u10-L3-Q6': {
    1: 'Narcissistic PD centers on grandiosity and need for admiration, not the fear of abandonment and emotional instability described.',
    2: 'Antisocial PD involves disregard for others\\\'s rights, not the emotional volatility and abandonment fears described.',
    3: 'Histrionic PD involves attention-seeking, not the pattern of idealization-devaluation and emptiness described.',
  },
  'psy-sec11-u10-L4-Q1': { 0: 'OCPD is a personality pattern of rigidity and perfectionism, distinct from OCD\\\'s intrusive thoughts and compulsive rituals.' },
  'psy-sec11-u10-L4-Q2': {
    1: 'They share social avoidance but differ in depth and pervasiveness; avoidant PD is a more enduring personality pattern.',
    2: 'Avoidant PD does not involve delusional thinking or hallucinations.',
    3: 'Both conditions involve social difficulties but differ in origin and pervasiveness.',
  },
};

// Continue with remaining files in subsequent sections...
// For now, let's add the remaining IDs we need

// I'll generate the rest programmatically based on patterns and then process

function processAllFiles() {
  const files = [
    'section-11-mental-health-part1.ts',
    'section-11-mental-health-part2.ts',
    'section-12-therapy-part1.ts',
    'section-12-therapy-part2.ts',
    'section-13-applied-part1.ts',
    'section-13-applied-part2.ts',
    'section-14-research-part1.ts',
    'section-14-research-part2.ts',
    'section-15-capstone-part1.ts',
    'section-15-capstone-part2.ts',
  ];

  let totalInserted = 0;
  let totalMissing = 0;

  for (const f of files) {
    const fp = path.join(BASE, f);
    const content = fs.readFileSync(fp, 'utf8');
    const lines = content.split('\n');
    const blocks = extractBlocks(lines);

    let missing = 0;
    for (const b of blocks) {
      if (!explanations[b.id]) {
        missing++;
        // Output question data for missing IDs so we can generate them
        if (b.type === 'true-false') {
          console.log(`MISSING: ${b.id} | TF | correct=${b.correctAnswer} | Q: ${b.question}`);
        } else {
          console.log(`MISSING: ${b.id} | ${b.type} | ci=${b.correctIdx} | Q: ${b.question}`);
          b.options.forEach((o, i) => console.log(`  ${i}${i === b.correctIdx ? '*' : ' '}: ${o}`));
        }
      }
    }

    if (missing > 0) {
      console.log(`${f}: ${blocks.length} questions, ${missing} MISSING explanations`);
    } else {
      const result = processFile(fp, explanations);
      console.log(`${f}: inserted ${result.inserted}/${result.total}`);
    }
    totalInserted += blocks.length - missing;
    totalMissing += missing;
  }

  console.log(`\nTotal: ${totalInserted} ready, ${totalMissing} missing`);
}

processAllFiles();
