'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { X, ArrowLeft, Rocket, Sparkles, ChevronRight } from 'lucide-react';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { useCourseStore } from '@/store/useCourseStore';
import { getProfession } from '@/data/professions';
import { analytics } from '@/lib/mixpanel';

// ── Types ────────────────────────────────────────────────────

type CountryCode = 'US' | 'GB' | 'AU' | 'CA' | 'IL' | 'EU' | 'INT';
type ExperienceLevel = 0 | 1 | 2 | 3;
type PlacementChoice = 'scratch' | 'test' | 'advanced';
type GoalChoice = 'interview' | 'refresh' | 'exam' | 'curiosity';
type CommitmentChoice = 5 | 10 | 15 | 20;

export interface CourseIntroData {
  experienceLevel: ExperienceLevel;
  placementChoice: PlacementChoice;
  goal: GoalChoice;
  dailyMinutes: CommitmentChoice;
  completedAt: string;
}

// ── Data ─────────────────────────────────────────────────────

const EXPERIENCE_OPTIONS = [
  { level: 0 as const, bars: 1, label: "I'm completely new", sub: 'Never studied this' },
  { level: 1 as const, bars: 2, label: 'I know the basics', sub: 'Took a course or two' },
  { level: 2 as const, bars: 3, label: 'I use this at work', sub: 'Comfortable with core topics' },
  { level: 3 as const, bars: 4, label: 'I could teach it', sub: 'Deep expertise' },
];

const GOAL_OPTIONS: { value: GoalChoice; icon: string; label: string }[] = [
  { value: 'interview', icon: '💼', label: 'Job interviews' },
  { value: 'refresh', icon: '🔄', label: 'Knowledge refresh' },
  { value: 'exam', icon: '📝', label: 'Exam preparation' },
  { value: 'curiosity', icon: '💡', label: 'Personal curiosity' },
];

const COMMITMENT_OPTIONS: { value: CommitmentChoice; label: string; tag: string; icon: string }[] = [
  { value: 5, label: '5 min', tag: 'Casual', icon: '🌱' },
  { value: 10, label: '10 min', tag: 'Regular', icon: '🔥' },
  { value: 15, label: '15 min', tag: 'Serious', icon: '⚡' },
  { value: 20, label: '20+ min', tag: 'Intense', icon: '🚀' },
];

const COUNTRY_OPTIONS: { value: CountryCode; flag: string; label: string }[] = [
  { value: 'US', flag: '\uD83C\uDDFA\uD83C\uDDF8', label: 'United States' },
  { value: 'GB', flag: '\uD83C\uDDEC\uD83C\uDDE7', label: 'United Kingdom' },
  { value: 'AU', flag: '\uD83C\uDDE6\uD83C\uDDFA', label: 'Australia' },
  { value: 'CA', flag: '\uD83C\uDDE8\uD83C\uDDE6', label: 'Canada' },
  { value: 'IL', flag: '\uD83C\uDDEE\uD83C\uDDF1', label: 'Israel' },
  { value: 'EU', flag: '\uD83C\uDDEA\uD83C\uDDFA', label: 'Europe' },
  { value: 'INT', flag: '\uD83C\uDF0D', label: 'Other' },
];

/** Professions that show the country selection step. */
const COUNTRY_STEP_PROFESSIONS = new Set(['personal-finance']);

// ── Signal bars ──────────────────────────────────────────────

function SignalBars({ count, color }: { count: number; color: string }) {
  const heights = [6, 10, 14, 18];
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" className="flex-shrink-0">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={1 + i * 6}
          y={20 - h}
          width={4}
          rx={1.5}
          height={h}
          fill={i < count ? color : '#E2E8F0'}
        />
      ))}
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────

interface CourseIntroFlowProps {
  onComplete: (data: CourseIntroData) => void;
  onDismiss: () => void;
}

export function CourseIntroFlow({ onComplete, onDismiss }: CourseIntroFlowProps) {
  useScrollLock(true);
  const { status: authStatus } = useSession();
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const profession = getProfession(activeProfession);
  const professionName = profession?.name ?? 'this course';
  const accent = profession?.color ?? '#3B82F6';

  const needsCountry = COUNTRY_STEP_PROFESSIONS.has(activeProfession);

  const [step, setStep] = useState(0);
  const [country, setCountry] = useState<CountryCode | null>(null);
  const [experience, setExperience] = useState<ExperienceLevel | null>(null);
  const [placement, setPlacement] = useState<PlacementChoice | null>(null);
  const [goal, setGoal] = useState<GoalChoice | null>(null);
  const [commitment, setCommitment] = useState<CommitmentChoice | null>(null);

  const skipPlacement = experience === 0;

  // Map visual step index to logical step index, skipping placement when needed.
  // With country:    0=country, 1=experience, 2=placement, 3=goal, 4=commitment, 5=launch
  // Without country: 0=experience, 1=placement, 2=goal, 3=commitment, 4=launch
  // Placement is auto-skipped when experience === 0.
  const getLogicalStep = (s: number) => {
    let logical = s;
    const placementLogical = needsCountry ? 2 : 1;
    if (skipPlacement && logical >= placementLogical) logical += 1;
    return logical;
  };
  const logicalStep = getLogicalStep(step);

  // Total visual steps (what the user sees)
  const baseSteps = needsCountry ? 6 : 5; // country + experience + placement + goal + commitment + launch
  const totalSteps = skipPlacement ? baseSteps - 1 : baseSteps;

  const canContinue = () => {
    if (needsCountry) {
      switch (logicalStep) {
        case 0: return country !== null;       // country
        case 1: return experience !== null;    // experience
        case 2: return placement !== null;     // placement
        case 3: return goal !== null;          // goal
        case 4: return commitment !== null;    // commitment
        case 5: return true;                   // launch
        default: return false;
      }
    }
    switch (logicalStep) {
      case 0: return experience !== null;
      case 1: return placement !== null;
      case 2: return goal !== null;
      case 3: return commitment !== null;
      case 4: return true;
      default: return false;
    }
  };

  const handleCountrySelect = useCallback((code: CountryCode) => {
    setCountry(code);
    // Persist to localStorage immediately
    try { localStorage.setItem('octokeen-country', code); } catch { /* SSR guard */ }
    // If authenticated, also persist to server
    if (authStatus === 'authenticated') {
      fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: code }),
      }).catch(() => { /* best-effort */ });
    }
  }, [authStatus]);

  const handleNext = useCallback(() => {
    const expLogical = needsCountry ? 1 : 0;
    if (logicalStep === expLogical && experience === 0) {
      setPlacement('scratch');
    }
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      const data: CourseIntroData = {
        experienceLevel: experience!,
        placementChoice: placement ?? 'scratch',
        goal: goal!,
        dailyMinutes: commitment!,
        completedAt: new Date().toISOString(),
      };
      analytics.milestone({ type: 'course_intro_completed', name: `intro_${activeProfession}`, value: 1 });
      onComplete(data);
    }
  }, [step, totalSteps, logicalStep, experience, placement, goal, commitment, activeProfession, onComplete, needsCountry]);

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const mascotConfigBase = [
    { pose: 'excited' as const, bubble: `How much ${professionName} do you know?` },
    { pose: 'thinking' as const, bubble: "Let's find the right starting point!" },
    { pose: 'proud' as const, bubble: "What's driving you?" },
    { pose: 'winking' as const, bubble: 'How often will you practice?' },
    { pose: 'celebrating' as const, bubble: "You're all set! Let's go!" },
  ];
  const mascotConfig = needsCountry
    ? [{ pose: 'excited' as const, bubble: 'Where are you based?' }, ...mascotConfigBase]
    : mascotConfigBase;
  const launchLogical = needsCountry ? 5 : 4;
  const mascot = mascotConfig[logicalStep] ?? mascotConfig[0];
  const launchText = placement === 'test' ? 'Take Placement Test' : 'Start Learning';
  const enabled = canContinue();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Full-screen panel, same bg as app body */}
        <motion.div
          className="w-full h-full sm:h-auto sm:max-w-sm sm:rounded-3xl sm:shadow-2xl overflow-hidden flex flex-col relative"
          style={{ backgroundColor: '#FAFAFA' }}
          role="dialog"
          aria-modal="true"
          aria-label="Course introduction"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Top bar: back + progress + close */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-1">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="w-9 h-9 rounded-full hover:bg-surface-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-surface-400" />
              </button>
            ) : (
              <div className="w-9" />
            )}

            <div className="flex-1 h-2.5 bg-surface-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accent }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            <button
              onClick={onDismiss}
              className="w-9 h-9 rounded-full hover:bg-surface-100 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-surface-400" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 flex flex-col justify-center sm:flex-initial overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-4"
              >
                {/* Mascot centered with speech bubble below */}
                <div className="text-center mb-5">
                  <motion.div
                    initial={{ scale: 0.6, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="inline-block"
                  >
                    <MascotWithGlow pose={mascot.pose} size={96} />
                  </motion.div>
                  <div
                    className="inline-block mt-2 px-5 py-2.5 rounded-2xl relative"
                    style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}
                  >
                    {/* Little triangle pointing up */}
                    <div
                      className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{ backgroundColor: 'white', borderLeft: '1px solid #E2E8F0', borderTop: '1px solid #E2E8F0' }}
                    />
                    <p className="text-sm font-bold text-surface-800 relative">{mascot.bubble}</p>
                  </div>
                </div>

                {/* Step content */}
                {needsCountry && logicalStep === 0 && (
                  <StepCountry selected={country} onSelect={handleCountrySelect} accent={accent} />
                )}
                {logicalStep === (needsCountry ? 1 : 0) && (
                  <StepExperience selected={experience} onSelect={setExperience} accent={accent} />
                )}
                {logicalStep === (needsCountry ? 2 : 1) && (
                  <StepPlacement selected={placement} onSelect={setPlacement} experience={experience!} accent={accent} />
                )}
                {logicalStep === (needsCountry ? 3 : 2) && (
                  <StepGoal selected={goal} onSelect={setGoal} accent={accent} />
                )}
                {logicalStep === (needsCountry ? 4 : 3) && (
                  <StepCommitment selected={commitment} onSelect={setCommitment} accent={accent} />
                )}
                {logicalStep === launchLogical && (
                  <StepLaunch professionName={professionName} commitment={commitment!} placement={placement!} accent={accent} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer CTA */}
          <div className="shrink-0 px-6 pb-8 sm:pb-5">
            <motion.button
              onClick={handleNext}
              disabled={!enabled}
              whileTap={enabled ? { y: 4, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
              className="w-full py-4 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 select-none"
              style={{
                backgroundColor: enabled ? accent : '#E2E8F0',
                boxShadow: enabled ? `0 4px 0 color-mix(in srgb, ${accent} 70%, #000)` : '0 4px 0 #CBD5E1',
                color: enabled ? '#fff' : '#94A3B8',
              }}
            >
              {logicalStep === launchLogical ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  {launchText}
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Step: Country Selection (personal-finance only) ──────────
// Grid of country cards with flag + label

function StepCountry({ selected, onSelect, accent }: { selected: CountryCode | null; onSelect: (v: CountryCode) => void; accent: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {COUNTRY_OPTIONS.map((opt) => {
        const active = selected === opt.value;
        return (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
            style={{
              backgroundColor: active ? `color-mix(in srgb, ${accent} 6%, white)` : 'white',
              border: active ? `2px solid ${accent}` : '2px solid #E2E8F0',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{opt.flag}</span>
            <span className="text-xs font-bold text-surface-700 leading-tight">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Step: Experience Level ───────────────────────────────────
// Cards with signal bars, title + subtitle, colored left border on active

function StepExperience({ selected, onSelect, accent }: { selected: ExperienceLevel | null; onSelect: (v: ExperienceLevel) => void; accent: string }) {
  return (
    <div className="space-y-2">
      {EXPERIENCE_OPTIONS.map((opt) => {
        const active = selected === opt.level;
        return (
          <motion.button
            key={opt.level}
            onClick={() => onSelect(opt.level)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
            style={{
              backgroundColor: active ? `color-mix(in srgb, ${accent} 6%, white)` : 'white',
              border: active ? `2px solid ${accent}` : '2px solid #E2E8F0',
              borderLeftWidth: active ? '4px' : '2px',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <SignalBars count={opt.bars} color={active ? accent : '#CBD5E1'} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-surface-800">{opt.label}</p>
              <p className="text-xs text-surface-400">{opt.sub}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Step 1: Placement Choice ─────────────────────────────────
// Larger cards with emoji icon box, title + subtitle

function StepPlacement({
  selected,
  onSelect,
  experience,
  accent,
}: {
  selected: PlacementChoice | null;
  onSelect: (v: PlacementChoice) => void;
  experience: ExperienceLevel;
  accent: string;
}) {
  const options: { value: PlacementChoice; icon: string; title: string; subtitle: string }[] = [
    { value: 'scratch', icon: '📖', title: 'Start from scratch', subtitle: 'Begin with the fundamentals' },
    { value: 'test', icon: '🧭', title: 'Find my level', subtitle: 'Quick placement test to skip ahead' },
  ];

  if (experience >= 3) {
    options.push({ value: 'advanced', icon: '🚀', title: 'Jump to advanced', subtitle: 'Skip straight to the later units' });
  }

  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const active = selected === opt.value;
        return (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all"
            style={{
              backgroundColor: active ? `color-mix(in srgb, ${accent} 6%, white)` : 'white',
              border: active ? `2px solid ${accent}` : '2px solid #E2E8F0',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: active ? `color-mix(in srgb, ${accent} 12%, white)` : '#F1F5F9' }}
            >
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-surface-800">{opt.title}</p>
              <p className="text-xs text-surface-400 mt-0.5">{opt.subtitle}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Step 2: Goal ─────────────────────────────────────────────
// Horizontal cards with emoji + text, 2-column grid

function StepGoal({ selected, onSelect, accent }: { selected: GoalChoice | null; onSelect: (v: GoalChoice) => void; accent: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {GOAL_OPTIONS.map((opt) => {
        const active = selected === opt.value;
        return (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
            style={{
              backgroundColor: active ? `color-mix(in srgb, ${accent} 6%, white)` : 'white',
              border: active ? `2px solid ${accent}` : '2px solid #E2E8F0',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span className="text-xs font-bold text-surface-700 leading-tight">{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Step 3: Daily Commitment ─────────────────────────────────
// Horizontal row of square-ish cards

function StepCommitment({ selected, onSelect, accent }: { selected: CommitmentChoice | null; onSelect: (v: CommitmentChoice) => void; accent: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {COMMITMENT_OPTIONS.map((opt) => {
        const active = selected === opt.value;
        return (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex flex-col items-center gap-1.5 p-4 rounded-xl text-center transition-all"
            style={{
              backgroundColor: active ? `color-mix(in srgb, ${accent} 6%, white)` : 'white',
              border: active ? `2px solid ${accent}` : '2px solid #E2E8F0',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span className="text-sm font-extrabold text-surface-800">{opt.label}</span>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: active ? `color-mix(in srgb, ${accent} 15%, white)` : '#F1F5F9',
                color: active ? accent : '#94A3B8',
              }}
            >
              {opt.tag}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Step 4: Launch ───────────────────────────────────────────
// Summary card with stats, accent-colored header

function StepLaunch({
  professionName,
  commitment,
  placement,
  accent,
}: {
  professionName: string;
  commitment: CommitmentChoice;
  placement: PlacementChoice;
  accent: string;
}) {
  return (
    <div>
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="text-center mb-5"
      >
        <div
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, white)` }}
        >
          <Rocket className="w-8 h-8" style={{ color: accent }} />
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
        <div className="px-5 py-4 text-center" style={{ backgroundColor: `color-mix(in srgb, ${accent} 8%, white)` }}>
          <h3 className="text-lg font-extrabold text-surface-900">Ready to go!</h3>
          <p className="text-xs text-surface-500 mt-1">
            {placement === 'test' ? "We'll find your level first." : "Starting from the beginning."}
          </p>
        </div>
        <div className="px-5 py-4 flex divide-x divide-surface-200">
          <div className="flex-1 text-center">
            <p className="text-xl font-extrabold text-surface-900">{commitment}</p>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">min/day</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-extrabold text-surface-900">{professionName.split(' ')[0]}</p>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">course</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xl font-extrabold text-surface-900">
              {placement === 'scratch' ? '1' : placement === 'advanced' ? '6+' : '?'}
            </p>
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">start unit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
