/**
 * Finance course SVG diagrams — inline SVGs for teaching cards and questions.
 * Style: Duolingo palette, flat fills, no outlines, rounded everything.
 */

// ═══════════════════════════════
// CONCEPT ICONS (small, per-question)
// ═══════════════════════════════

/** Single gold coin */
export const iconCoin = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="64" r="42" fill="#E7A601"/>
  <circle cx="60" cy="60" r="42" fill="#FFC800"/>
  <circle cx="60" cy="60" r="32" fill="#FFD54F"/>
  <circle cx="60" cy="60" r="26" fill="#FFC800"/>
  <text x="60" y="70" text-anchor="middle" font-size="28" font-weight="900" fill="#E7A601" font-family='Nunito, sans-serif'>$</text>
  <circle cx="46" cy="46" r="6" fill="#FFE680" opacity="0.6"/>
</svg>`;

/** Stack of coins growing */
export const iconCoinStack = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="36" cy="92" rx="20" ry="6" fill="#E7A601"/>
  <rect x="16" y="80" width="40" height="12" rx="4" fill="#FFC800"/>
  <ellipse cx="36" cy="80" rx="20" ry="6" fill="#FFD54F"/>

  <ellipse cx="60" cy="82" rx="20" ry="6" fill="#E7A601"/>
  <rect x="40" y="62" width="40" height="20" rx="4" fill="#FFC800"/>
  <ellipse cx="60" cy="62" rx="20" ry="6" fill="#FFD54F"/>

  <ellipse cx="84" cy="72" rx="20" ry="6" fill="#E7A601"/>
  <rect x="64" y="40" width="40" height="32" rx="4" fill="#FFC800"/>
  <ellipse cx="84" cy="40" rx="20" ry="6" fill="#FFD54F"/>
  <circle cx="76" cy="34" r="4" fill="#FFE680" opacity="0.5"/>
</svg>`;

/** Coffee cup */
export const iconCoffee = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="28" y="36" width="56" height="64" rx="10" fill="#A56644"/>
  <rect x="28" y="36" width="56" height="20" rx="10" fill="#CD7900"/>
  <rect x="82" y="50" width="16" height="24" rx="8" fill="none" stroke="#A56644" stroke-width="6"/>
  <ellipse cx="56" cy="36" rx="30" ry="8" fill="#E5A259"/>
  <rect x="22" y="96" width="68" height="8" rx="4" fill="#8B5722"/>
  <path d="M42,26 Q46,16 50,26" fill="none" stroke="#D2E4E8" stroke-width="3" stroke-linecap="round"/>
  <path d="M54,22 Q58,10 62,22" fill="none" stroke="#D2E4E8" stroke-width="3" stroke-linecap="round"/>
</svg>`;

/** Piggy bank */
export const iconPiggy = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="58" cy="68" rx="38" ry="30" fill="#FFAADE"/>
  <ellipse cx="58" cy="70" rx="38" ry="30" fill="#FF7EB3"/>
  <circle cx="88" cy="56" r="8" fill="#FFAADE"/>
  <circle cx="32" cy="58" r="6" fill="#FFAADE"/>
  <ellipse cx="94" cy="64" rx="6" ry="4" fill="#FF7EB3"/>
  <circle cx="94" cy="62" r="2" fill="#4B4B4B"/>
  <circle cx="80" cy="52" r="3" fill="#4B4B4B"/>
  <rect x="44" y="90" width="8" height="14" rx="4" fill="#FFAADE"/>
  <rect x="64" y="90" width="8" height="14" rx="4" fill="#FFAADE"/>
  <rect x="48" y="30" width="20" height="6" rx="3" fill="#FFC800"/>
  <circle cx="52" cy="28" r="4" fill="#FFC800"/>
  <circle cx="64" cy="28" r="4" fill="#FFC800"/>
</svg>`;

/** Paycheck/receipt */
export const iconPaycheck = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="16" width="80" height="92" rx="8" fill="#DDF4FF"/>
  <rect x="20" y="16" width="80" height="24" rx="8" fill="#1CB0F6"/>
  <text x="60" y="33" text-anchor="middle" font-size="11" font-weight="800" fill="white" font-family='Nunito, sans-serif'>PAYCHECK</text>
  <rect x="30" y="50" width="50" height="6" rx="3" fill="#84D8FF"/>
  <rect x="30" y="62" width="40" height="6" rx="3" fill="#84D8FF"/>
  <rect x="30" y="74" width="45" height="6" rx="3" fill="#84D8FF"/>
  <rect x="30" y="90" width="60" height="8" rx="4" fill="#58CC02"/>
  <text x="60" y="97" text-anchor="middle" font-size="8" font-weight="800" fill="white" font-family='Nunito, sans-serif'>NET: $3,200</text>
</svg>`;

/** Shopping bag (wants) */
export const iconShoppingBag = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="24" y="40" width="72" height="64" rx="12" fill="#FF9600"/>
  <rect x="24" y="40" width="72" height="16" rx="8" fill="#CC6B00"/>
  <path d="M42,40 L42,28 Q42,16 60,16 Q78,16 78,28 L78,40" fill="none" stroke="#CC6B00" stroke-width="5" stroke-linecap="round"/>
  <circle cx="60" cy="74" r="12" fill="#FFC800"/>
  <text x="60" y="79" text-anchor="middle" font-size="14" font-weight="900" fill="#CC6B00" font-family='Nunito, sans-serif'>$</text>
</svg>`;

/** House (needs/rent) */
export const iconHouse = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="28" y="52" width="64" height="48" rx="6" fill="#58CC02"/>
  <polygon points="60,18 16,56 104,56" fill="#58A700"/>
  <rect x="48" y="68" width="24" height="32" rx="4" fill="#A56644"/>
  <circle cx="66" cy="84" r="2.5" fill="#E7A601"/>
  <rect x="34" y="60" width="14" height="14" rx="3" fill="#84D8FF"/>
  <rect x="72" y="60" width="14" height="14" rx="3" fill="#84D8FF"/>
</svg>`;

/** Calendar (monthly) */
export const iconCalendar = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="24" width="80" height="76" rx="10" fill="#1CB0F6"/>
  <rect x="20" y="24" width="80" height="22" rx="10" fill="#0F85BD"/>
  <rect x="38" y="16" width="6" height="16" rx="3" fill="#0F85BD"/>
  <rect x="76" y="16" width="6" height="16" rx="3" fill="#0F85BD"/>
  <text x="60" y="40" text-anchor="middle" font-size="10" font-weight="800" fill="white" font-family='Nunito, sans-serif'>MONTH</text>
  <rect x="28" y="54" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="44" y="54" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="60" y="54" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="76" y="54" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="28" y="70" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="44" y="70" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="60" y="70" width="12" height="10" rx="3" fill="#58CC02"/>
  <rect x="76" y="70" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="28" y="86" width="12" height="10" rx="3" fill="#84D8FF"/>
  <rect x="44" y="86" width="12" height="10" rx="3" fill="#84D8FF"/>
</svg>`;

/** Balance scale (needs vs wants) */
export const iconScale = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="56" y="28" width="8" height="60" rx="4" fill="#4B4B4B"/>
  <polygon points="60,92 48,102 72,102" fill="#4B4B4B"/>
  <rect x="20" y="24" width="80" height="8" rx="4" fill="#4B4B4B"/>
  <rect x="16" y="30" width="30" height="6" rx="3" fill="#58CC02"/>
  <rect x="8" y="36" width="46" height="24" rx="8" fill="#D7FFB8"/>
  <text x="31" y="52" text-anchor="middle" font-size="9" font-weight="800" fill="#58A700" font-family='Nunito, sans-serif'>NEEDS</text>
  <rect x="74" y="30" width="30" height="6" rx="3" fill="#FF9600"/>
  <rect x="66" y="36" width="46" height="24" rx="8" fill="#FFF0D4"/>
  <text x="89" y="52" text-anchor="middle" font-size="9" font-weight="800" fill="#CC6B00" font-family='Nunito, sans-serif'>WANTS</text>
</svg>`;

/** Subscription/recurring */
export const iconSubscription = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="30" width="80" height="52" rx="10" fill="#CE82FF"/>
  <rect x="30" y="40" width="60" height="32" rx="6" fill="#E8D5FF"/>
  <circle cx="60" cy="56" r="10" fill="#CE82FF"/>
  <polygon points="56,52 66,56 56,60" fill="white"/>
  <text x="60" y="96" text-anchor="middle" font-size="10" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$13/mo</text>
  <path d="M82,96 Q100,96 100,82 Q100,68 88,68" fill="none" stroke="#CE82FF" stroke-width="3" stroke-linecap="round"/>
  <polygon points="86,64 92,68 86,72" fill="#CE82FF"/>
</svg>`;

/** Calculator */
export const iconCalculator = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="26" y="14" width="68" height="92" rx="12" fill="#1CB0F6"/>
  <rect x="32" y="22" width="56" height="24" rx="6" fill="#0F85BD"/>
  <text x="60" y="40" text-anchor="middle" font-size="14" font-weight="800" fill="#BBF2FF" font-family='Nunito, sans-serif'>365</text>
  <rect x="32" y="54" width="14" height="12" rx="4" fill="#84D8FF"/>
  <rect x="52" y="54" width="14" height="12" rx="4" fill="#84D8FF"/>
  <rect x="72" y="54" width="14" height="12" rx="4" fill="#84D8FF"/>
  <rect x="32" y="72" width="14" height="12" rx="4" fill="#84D8FF"/>
  <rect x="52" y="72" width="14" height="12" rx="4" fill="#84D8FF"/>
  <rect x="72" y="72" width="14" height="12" rx="4" fill="#FFC800"/>
  <rect x="32" y="90" width="34" height="12" rx="4" fill="#84D8FF"/>
  <rect x="72" y="90" width="14" height="12" rx="4" fill="#58CC02"/>
</svg>`;

/** Emergency fund shield */
export const iconShield = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <path d="M60,14 Q20,30 20,56 Q20,88 60,108 Q100,88 100,56 Q100,30 60,14Z" fill="#58CC02"/>
  <path d="M60,24 Q30,36 30,56 Q30,80 60,98 Q90,80 90,56 Q90,36 60,24Z" fill="#A5ED6E"/>
  <text x="60" y="56" text-anchor="middle" font-size="24" font-weight="900" fill="#58A700" font-family='Nunito, sans-serif'>$</text>
  <text x="60" y="76" text-anchor="middle" font-size="10" font-weight="800" fill="#58A700" font-family='Nunito, sans-serif'>500</text>
</svg>`;

/** Automation/gear */
export const iconAutomation = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="30" fill="#1CB0F6"/>
  <circle cx="60" cy="60" r="20" fill="#84D8FF"/>
  <circle cx="60" cy="60" r="8" fill="#1CB0F6"/>
  <rect x="56" y="24" width="8" height="12" rx="4" fill="#1CB0F6"/>
  <rect x="56" y="84" width="8" height="12" rx="4" fill="#1CB0F6"/>
  <rect x="24" y="56" width="12" height="8" rx="4" fill="#1CB0F6"/>
  <rect x="84" y="56" width="12" height="8" rx="4" fill="#1CB0F6"/>
  <path d="M38,90 Q28,104 46,104" fill="none" stroke="#FFC800" stroke-width="3" stroke-linecap="round"/>
  <polygon points="48,100 48,108 54,104" fill="#FFC800"/>
</svg>`;

/** Snack bag */
export const iconSnack = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="28" width="60" height="72" rx="8" fill="#FF9600"/>
  <rect x="30" y="28" width="60" height="22" rx="8" fill="#CC6B00"/>
  <rect x="42" y="18" width="36" height="14" rx="4" fill="#FF9600"/>
  <circle cx="60" cy="70" r="14" fill="#FFC800"/>
  <text x="60" y="76" text-anchor="middle" font-size="14" font-weight="900" fill="#CC6B00" font-family='Nunito, sans-serif'>$2</text>
  <rect x="38" y="34" width="44" height="4" rx="2" fill="#E7A601"/>
</svg>`;

/** Phone */
export const iconPhone = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="32" y="14" width="56" height="92" rx="12" fill="#4B4B4B"/>
  <rect x="36" y="24" width="48" height="68" rx="6" fill="#84D8FF"/>
  <rect x="42" y="34" width="36" height="8" rx="4" fill="#1CB0F6"/>
  <rect x="42" y="48" width="28" height="8" rx="4" fill="#1CB0F6" opacity="0.6"/>
  <rect x="42" y="62" width="32" height="8" rx="4" fill="#1CB0F6" opacity="0.4"/>
  <circle cx="60" cy="100" r="4" fill="#777"/>
  <rect x="50" y="18" width="20" height="4" rx="2" fill="#777"/>
</svg>`;

/** Magnifying glass / detective */
export const iconDetective = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="52" cy="52" r="30" fill="#DDF4FF"/>
  <circle cx="52" cy="52" r="24" fill="#BBF2FF"/>
  <circle cx="52" cy="52" r="18" fill="#DDF4FF"/>
  <text x="52" y="58" text-anchor="middle" font-size="16" font-weight="900" fill="#1CB0F6" font-family='Nunito, sans-serif'>$?</text>
  <rect x="72" y="72" width="12" height="36" rx="6" fill="#A56644" transform="rotate(-45 78 90)"/>
  <rect x="72" y="72" width="12" height="10" rx="6" fill="#CD7900" transform="rotate(-45 78 77)"/>
</svg>`;

/** Bus / transport */
export const iconTransport = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="30" width="80" height="54" rx="14" fill="#1CB0F6"/>
  <rect x="20" y="30" width="80" height="20" rx="14" fill="#0F85BD"/>
  <rect x="28" y="54" width="24" height="18" rx="4" fill="#84D8FF"/>
  <rect x="60" y="54" width="24" height="18" rx="4" fill="#84D8FF"/>
  <rect x="88" y="54" width="8" height="18" rx="4" fill="#84D8FF"/>
  <circle cx="38" cy="90" r="8" fill="#4B4B4B"/>
  <circle cx="38" cy="90" r="4" fill="#777"/>
  <circle cx="82" cy="90" r="8" fill="#4B4B4B"/>
  <circle cx="82" cy="90" r="4" fill="#777"/>
  <rect x="14" y="56" width="8" height="14" rx="4" fill="#FFC800"/>
  <rect x="98" y="56" width="8" height="14" rx="4" fill="#FF4B4B"/>
</svg>`;

/** Warning / budget gap */
export const iconWarning = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,16 104,96 16,96" fill="#FFC800"/>
  <polygon points="60,28 94,90 26,90" fill="#FFE680"/>
  <rect x="56" y="46" width="8" height="24" rx="4" fill="#CC6B00"/>
  <circle cx="60" cy="78" r="5" fill="#CC6B00"/>
</svg>`;

/** Tax / government building */
export const iconTax = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="80" width="80" height="12" rx="4" fill="#FF7878"/>
  <rect x="16" y="72" width="88" height="12" rx="4" fill="#FF4B4B"/>
  <polygon points="60,20 16,60 104,60" fill="#FF4B4B"/>
  <polygon points="60,28 24,56 96,56" fill="#FF7878"/>
  <rect x="30" y="56" width="10" height="20" rx="3" fill="#FFB2B2"/>
  <rect x="46" y="56" width="10" height="20" rx="3" fill="#FFB2B2"/>
  <rect x="62" y="56" width="10" height="20" rx="3" fill="#FFB2B2"/>
  <rect x="78" y="56" width="10" height="20" rx="3" fill="#FFB2B2"/>
  <circle cx="60" cy="40" r="6" fill="#FFDFE0"/>
  <text x="60" y="44" text-anchor="middle" font-size="8" font-weight="900" fill="#FF4B4B" font-family='Nunito, sans-serif'>$</text>
</svg>`;

// ── Lesson 0: Small Money, Big Difference ──

export const coinGrowthStaircase = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="120" width="60" height="30" rx="6" fill="#FFC800"/>
  <rect x="34" y="124" width="52" height="4" rx="2" fill="#E7A601"/>
  <text x="60" y="112" text-anchor="middle" font-size="13" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$1</text>
  <text x="60" y="158" text-anchor="middle" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>per day</text>

  <rect x="130" y="80" width="60" height="70" rx="6" fill="#FFC800"/>
  <rect x="134" y="84" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="134" y="94" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="134" y="104" width="52" height="4" rx="2" fill="#E7A601"/>
  <text x="160" y="72" text-anchor="middle" font-size="13" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$30</text>
  <text x="160" y="158" text-anchor="middle" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>per month</text>

  <rect x="230" y="30" width="60" height="120" rx="6" fill="#FFC800"/>
  <rect x="234" y="34" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="234" y="44" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="234" y="54" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="234" y="64" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="234" y="74" width="52" height="4" rx="2" fill="#E7A601"/>
  <rect x="234" y="84" width="52" height="4" rx="2" fill="#E7A601"/>
  <text x="260" y="22" text-anchor="middle" font-size="13" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$365</text>
  <text x="260" y="158" text-anchor="middle" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>per year</text>

  <path d="M95,135 L125,115" stroke="#58CC02" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M195,110 L225,75" stroke="#58CC02" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`;

export const timelineArrow = `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="35" width="300" height="30" rx="15" fill="#D7FFB8"/>
  <circle cx="60" cy="50" r="18" fill="#FFC800"/>
  <text x="60" y="55" text-anchor="middle" font-size="10" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$1</text>
  <text x="60" y="82" text-anchor="middle" font-size="9" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>daily</text>

  <circle cx="160" cy="50" r="22" fill="#FFC800"/>
  <text x="160" y="55" text-anchor="middle" font-size="11" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$30</text>
  <text x="160" y="82" text-anchor="middle" font-size="9" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>monthly</text>

  <circle cx="260" cy="50" r="26" fill="#FFC800"/>
  <text x="260" y="55" text-anchor="middle" font-size="12" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$365</text>
  <text x="260" y="82" text-anchor="middle" font-size="9" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>yearly</text>

  <polygon points="100,50 90,44 90,56" fill="#58CC02"/>
  <polygon points="205,50 195,44 195,56" fill="#58CC02"/>
</svg>`;

// ── Lesson 4: The Latte Factor ──

export const coffeeYearlyCost = `<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="20" width="70" height="90" rx="10" fill="#A56644"/>
  <rect x="34" y="24" width="62" height="60" rx="8" fill="#CD7900"/>
  <rect x="20" y="40" width="14" height="20" rx="7" fill="#A56644"/>
  <ellipse cx="65" cy="24" rx="30" ry="6" fill="#E5A259"/>
  <circle cx="65" cy="50" r="6" fill="#E5A259" opacity="0.5"/>
  <text x="65" y="100" text-anchor="middle" font-size="14" font-weight="900" fill="#4B4B4B" font-family='Nunito, sans-serif'>$5</text>
  <text x="65" y="128" text-anchor="middle" font-size="10" font-weight="700" fill="#777" font-family='Nunito, sans-serif'>per day</text>

  <text x="140" y="65" text-anchor="middle" font-size="20" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>\u00d7 365</text>

  <rect x="190" y="10" width="100" height="110" rx="12" fill="#FFC800"/>
  <rect x="196" y="16" width="88" height="14" rx="4" fill="#E7A601"/>
  <rect x="196" y="36" width="88" height="14" rx="4" fill="#E7A601"/>
  <rect x="196" y="56" width="88" height="14" rx="4" fill="#E7A601"/>
  <rect x="196" y="76" width="88" height="14" rx="4" fill="#E7A601"/>
  <rect x="196" y="96" width="88" height="14" rx="4" fill="#E7A601"/>
  <text x="240" y="138" text-anchor="middle" font-size="16" font-weight="900" fill="#4B4B4B" font-family='Nunito, sans-serif'>$1,825</text>
  <text x="240" y="152" text-anchor="middle" font-size="9" font-weight="700" fill="#777" font-family='Nunito, sans-serif'>per year!</text>
</svg>`;

// ── Lesson 2: Where It All Goes ──

export const spendingPieChart = `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
  <circle cx="120" cy="90" r="75" fill="#E2E8F0"/>
  <path d="M120,90 L120,15 A75,75 0 0,1 185,47 Z" fill="#58CC02"/>
  <path d="M120,90 L185,47 A75,75 0 0,1 195,90 Z" fill="#1CB0F6"/>
  <path d="M120,90 L195,90 A75,75 0 0,1 175,150 Z" fill="#CE82FF"/>
  <path d="M120,90 L175,150 A75,75 0 0,1 120,165 Z" fill="#FF9600"/>
  <path d="M120,90 L120,165 A75,75 0 0,1 55,140 Z" fill="#FF4B4B"/>
  <path d="M120,90 L55,140 A75,75 0 0,1 45,90 Z" fill="#FFC800"/>
  <path d="M120,90 L45,90 A75,75 0 0,1 120,15 Z" fill="#FFAADE"/>
  <circle cx="120" cy="90" r="25" fill="white"/>

  <rect x="220" y="20" width="12" height="12" rx="3" fill="#FFAADE"/>
  <text x="238" y="30" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Rent 35%</text>
  <rect x="220" y="40" width="12" height="12" rx="3" fill="#58CC02"/>
  <text x="238" y="50" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Food 15%</text>
  <rect x="220" y="60" width="12" height="12" rx="3" fill="#1CB0F6"/>
  <text x="238" y="70" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Transport 10%</text>
  <rect x="220" y="80" width="12" height="12" rx="3" fill="#CE82FF"/>
  <text x="238" y="90" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Fun 15%</text>
  <rect x="220" y="100" width="12" height="12" rx="3" fill="#FF9600"/>
  <text x="238" y="110" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Subs 10%</text>
  <rect x="220" y="120" width="12" height="12" rx="3" fill="#FF4B4B"/>
  <text x="238" y="130" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Savings 5%</text>
  <rect x="220" y="140" width="12" height="12" rx="3" fill="#FFC800"/>
  <text x="238" y="150" font-size="10" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Other 10%</text>
</svg>`;

export const fixedVsVariable = `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
  <text x="90" y="18" text-anchor="middle" font-size="11" font-weight="800" fill="#58A700" font-family='Nunito, sans-serif'>FIXED</text>
  <rect x="30" y="24" width="120" height="28" rx="8" fill="#58CC02"/>
  <text x="90" y="43" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Rent $1,200</text>
  <rect x="30" y="58" width="120" height="28" rx="8" fill="#58CC02"/>
  <text x="90" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Phone $80</text>
  <rect x="30" y="92" width="120" height="28" rx="8" fill="#58CC02"/>
  <text x="90" y="111" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Insurance $150</text>
  <text x="90" y="140" text-anchor="middle" font-size="9" font-weight="600" fill="#58A700" font-family='Nunito, sans-serif'>Same every month</text>

  <text x="230" y="18" text-anchor="middle" font-size="11" font-weight="800" fill="#CC6B00" font-family='Nunito, sans-serif'>VARIABLE</text>
  <rect x="170" y="24" width="120" height="28" rx="8" fill="#FF9600"/>
  <text x="230" y="43" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Groceries $300</text>
  <rect x="170" y="58" width="100" height="28" rx="8" fill="#FF9600"/>
  <text x="220" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Gas $80</text>
  <rect x="170" y="92" width="80" height="28" rx="8" fill="#FF9600"/>
  <text x="210" y="111" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Fun $120</text>
  <text x="230" y="140" text-anchor="middle" font-size="9" font-weight="600" fill="#CC6B00" font-family='Nunito, sans-serif'>Changes each month</text>
</svg>`;

// ── Lesson 1: The Paycheck Reality ──

export const paycheckBreakdown = `<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <text x="160" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>YOUR $4,000 PAYCHECK</text>
  <rect x="20" y="24" width="280" height="36" rx="10" fill="#58CC02"/>
  <text x="160" y="47" text-anchor="middle" font-size="13" font-weight="800" fill="white" font-family='Nunito, sans-serif'>$4,000 Gross Pay</text>

  <rect x="20" y="70" width="224" height="36" rx="10" fill="#1CB0F6"/>
  <text x="132" y="93" text-anchor="middle" font-size="13" font-weight="800" fill="white" font-family='Nunito, sans-serif'>$3,200 Net (yours!)</text>

  <rect x="250" y="70" width="50" height="14" rx="4" fill="#FF4B4B"/>
  <text x="275" y="81" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Federal</text>
  <rect x="250" y="86" width="50" height="10" rx="4" fill="#FF7878"/>
  <text x="275" y="94" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family='Nunito, sans-serif'>State</text>
  <rect x="250" y="98" width="50" height="8" rx="4" fill="#FFB2B2"/>
  <text x="275" y="105" text-anchor="middle" font-size="6" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>FICA</text>

  <text x="275" y="125" text-anchor="middle" font-size="10" font-weight="800" fill="#FF4B4B" font-family='Nunito, sans-serif'>-$800</text>
  <text x="275" y="136" text-anchor="middle" font-size="8" font-weight="600" fill="#777" font-family='Nunito, sans-serif'>taxes</text>
</svg>`;

export const taxFlowDiagram = `<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">
  <rect x="110" y="6" width="100" height="28" rx="10" fill="#FF4B4B"/>
  <text x="160" y="24" text-anchor="middle" font-size="11" font-weight="800" fill="white" font-family='Nunito, sans-serif'>Your Taxes</text>

  <line x1="130" y1="34" x2="50" y2="60" stroke="#FF7878" stroke-width="2" stroke-linecap="round"/>
  <line x1="150" y1="34" x2="120" y2="60" stroke="#FF7878" stroke-width="2" stroke-linecap="round"/>
  <line x1="170" y1="34" x2="200" y2="60" stroke="#FF7878" stroke-width="2" stroke-linecap="round"/>
  <line x1="190" y1="34" x2="270" y2="60" stroke="#FF7878" stroke-width="2" stroke-linecap="round"/>

  <rect x="15" y="62" width="70" height="50" rx="10" fill="#1CB0F6"/>
  <text x="50" y="82" text-anchor="middle" font-size="18">🛣️</text>
  <text x="50" y="102" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Roads</text>

  <rect x="95" y="62" width="70" height="50" rx="10" fill="#58CC02"/>
  <text x="130" y="82" text-anchor="middle" font-size="18">🏫</text>
  <text x="130" y="102" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Schools</text>

  <rect x="175" y="62" width="70" height="50" rx="10" fill="#CE82FF"/>
  <text x="210" y="82" text-anchor="middle" font-size="18">🏥</text>
  <text x="210" y="102" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Hospitals</text>

  <rect x="255" y="62" width="60" height="50" rx="10" fill="#FF9600"/>
  <text x="285" y="82" text-anchor="middle" font-size="18">🚒</text>
  <text x="285" y="102" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family='Nunito, sans-serif'>Fire Dept</text>
</svg>`;

// ── Lesson 3: Needs vs Wants ──

export const needsVsWants = `<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="6" width="140" height="28" rx="10" fill="#58CC02"/>
  <text x="80" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="white" font-family='Nunito, sans-serif'>NEEDS</text>

  <rect x="170" y="6" width="140" height="28" rx="10" fill="#FF9600"/>
  <text x="240" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="white" font-family='Nunito, sans-serif'>WANTS</text>

  <rect x="15" y="42" width="130" height="24" rx="8" fill="#D7FFB8"/>
  <text x="80" y="58" text-anchor="middle" font-size="10" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>🏠 Housing</text>
  <rect x="15" y="72" width="130" height="24" rx="8" fill="#D7FFB8"/>
  <text x="80" y="88" text-anchor="middle" font-size="10" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>🥦 Basic food</text>
  <rect x="15" y="102" width="130" height="24" rx="8" fill="#D7FFB8"/>
  <text x="80" y="118" text-anchor="middle" font-size="10" font-weight="700" fill="#58A700" font-family='Nunito, sans-serif'>🚌 Transportation</text>

  <rect x="175" y="42" width="130" height="24" rx="8" fill="#FFF0D4"/>
  <text x="240" y="58" text-anchor="middle" font-size="10" font-weight="700" fill="#CC6B00" font-family='Nunito, sans-serif'>🎮 Gaming</text>
  <rect x="175" y="72" width="130" height="24" rx="8" fill="#FFF0D4"/>
  <text x="240" y="88" text-anchor="middle" font-size="10" font-weight="700" fill="#CC6B00" font-family='Nunito, sans-serif'>🍕 Restaurant</text>
  <rect x="175" y="102" width="130" height="24" rx="8" fill="#FFF0D4"/>
  <text x="240" y="118" text-anchor="middle" font-size="10" font-weight="700" fill="#CC6B00" font-family='Nunito, sans-serif'>👟 Designer shoes</text>
</svg>`;

// ── Lesson 5: Your First Budget ──

export const budget502020 = `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
  <text x="160" y="16" text-anchor="middle" font-size="12" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>THE 50/30/20 RULE</text>

  <circle cx="120" cy="100" r="72" fill="#E2E8F0"/>
  <path d="M120,100 L120,28 A72,72 0 0,1 182,136 Z" fill="#58CC02"/>
  <path d="M120,100 L182,136 A72,72 0 0,1 58,136 Z" fill="#1CB0F6"/>
  <path d="M120,100 L58,136 A72,72 0 0,1 120,28 Z" fill="#FFC800"/>

  <text x="145" y="70" font-size="14" font-weight="900" fill="white" font-family='Nunito, sans-serif'>50%</text>
  <text x="130" y="145" font-size="12" font-weight="900" fill="white" font-family='Nunito, sans-serif'>30%</text>
  <text x="80" y="80" font-size="11" font-weight="900" fill="white" font-family='Nunito, sans-serif'>20%</text>

  <rect x="210" y="40" width="16" height="16" rx="4" fill="#58CC02"/>
  <text x="232" y="53" font-size="12" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Needs</text>
  <text x="232" y="66" font-size="9" font-weight="600" fill="#777" font-family='Nunito, sans-serif'>rent, food, bills</text>

  <rect x="210" y="85" width="16" height="16" rx="4" fill="#1CB0F6"/>
  <text x="232" y="98" font-size="12" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Wants</text>
  <text x="232" y="111" font-size="9" font-weight="600" fill="#777" font-family='Nunito, sans-serif'>fun, dining, hobbies</text>

  <rect x="210" y="130" width="16" height="16" rx="4" fill="#FFC800"/>
  <text x="232" y="143" font-size="12" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Savings</text>
  <text x="232" y="156" font-size="9" font-weight="600" fill="#777" font-family='Nunito, sans-serif'>emergency, goals</text>
</svg>`;

export const budgetBarSplit = `<svg viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg">
  <text x="160" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$4,000 NET PAY</text>

  <rect x="20" y="26" width="164" height="32" rx="8" fill="#58CC02"/>
  <text x="102" y="46" text-anchor="middle" font-size="11" font-weight="800" fill="white" font-family='Nunito, sans-serif'>$2,000 Needs</text>

  <rect x="186" y="26" width="74" height="32" rx="8" fill="#1CB0F6"/>
  <text x="223" y="46" text-anchor="middle" font-size="10" font-weight="800" fill="white" font-family='Nunito, sans-serif'>$1,200</text>

  <rect x="262" y="26" width="42" height="32" rx="8" fill="#FFC800"/>
  <text x="283" y="46" text-anchor="middle" font-size="10" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>$800</text>

  <text x="102" y="72" text-anchor="middle" font-size="9" font-weight="600" fill="#58A700" font-family='Nunito, sans-serif'>50% Needs</text>
  <text x="223" y="72" text-anchor="middle" font-size="9" font-weight="600" fill="#0F85BD" font-family='Nunito, sans-serif'>30% Wants</text>
  <text x="283" y="72" text-anchor="middle" font-size="9" font-weight="600" fill="#E7A601" font-family='Nunito, sans-serif'>20% Save</text>
</svg>`;

// ── Lesson 6: Pay Yourself First ──

export const payYourselfFirst = `<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <text x="160" y="14" text-anchor="middle" font-size="9" font-weight="800" fill="#4B4B4B" font-family='Nunito, sans-serif'>TWO APPROACHES</text>

  <rect x="10" y="24" width="140" height="20" rx="6" fill="#FF4B4B"/>
  <text x="80" y="38" text-anchor="middle" font-size="8" font-weight="800" fill="white" font-family='Nunito, sans-serif'>WRONG WAY</text>

  <rect x="10" y="50" width="140" height="22" rx="6" fill="#FFB2B2"/>
  <text x="80" y="65" text-anchor="middle" font-size="9" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Paycheck</text>
  <text x="80" y="80" text-anchor="middle" font-size="14" fill="#4B4B4B">↓</text>
  <rect x="10" y="88" width="140" height="22" rx="6" fill="#FFB2B2"/>
  <text x="80" y="103" text-anchor="middle" font-size="9" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Spend everything</text>
  <text x="80" y="118" text-anchor="middle" font-size="14" fill="#4B4B4B">↓</text>
  <text x="80" y="136" text-anchor="middle" font-size="10" font-weight="800" fill="#FF4B4B" font-family='Nunito, sans-serif'>$0 saved 😰</text>

  <rect x="170" y="24" width="140" height="20" rx="6" fill="#58CC02"/>
  <text x="240" y="38" text-anchor="middle" font-size="8" font-weight="800" fill="white" font-family='Nunito, sans-serif'>RIGHT WAY</text>

  <rect x="170" y="50" width="140" height="22" rx="6" fill="#D7FFB8"/>
  <text x="240" y="65" text-anchor="middle" font-size="9" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Paycheck</text>
  <text x="240" y="80" text-anchor="middle" font-size="14" fill="#4B4B4B">↓</text>
  <rect x="170" y="88" width="60" height="22" rx="6" fill="#FFC800"/>
  <text x="200" y="103" text-anchor="middle" font-size="9" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Save first!</text>
  <rect x="236" y="88" width="74" height="22" rx="6" fill="#D7FFB8"/>
  <text x="273" y="103" text-anchor="middle" font-size="9" font-weight="700" fill="#4B4B4B" font-family='Nunito, sans-serif'>Then spend</text>
  <text x="240" y="136" text-anchor="middle" font-size="10" font-weight="800" fill="#58CC02" font-family='Nunito, sans-serif'>$600+ saved! 🎉</text>
</svg>`;
