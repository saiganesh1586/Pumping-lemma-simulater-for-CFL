/* ═══════════════════════════════════════════════════════════════
   Pumping Lemma Simulator — script.js  (Visual Interactive v2)
   ═══════════════════════════════════════════════════════════════ */

/* ─── Language definitions ──────────────────────────────────────────────── */
const LANGUAGES = {
  anbn: {
    name: 'L = { aⁿbⁿ }',
    alphabet: /^[ab]+$/, alphabetHint: 'alphabet: {a, b}',
    example: () => { const n = Math.max(2, Math.floor(Math.random()*3)+2); return 'a'.repeat(n)+'b'.repeat(n); },
    defaultP: s => Math.floor(s.length/2)+1,
    validate: s => check_equal_ab(s),
    description: "Equal a's followed by equal b's"
  },
  balancedParen: {
    name: 'Balanced Parentheses',
    alphabet: /^[()]+$/, alphabetHint: 'alphabet: {(, )}',
    example: () => { const pool=['(())','()()','((()))','(()())','()(())']; return pool[Math.floor(Math.random()*pool.length)]; },
    defaultP: s => Math.floor(s.length/2)+1,
    validate: s => check_balanced_parentheses(s),
    description: 'Every ( is matched with a closing )'
  },
  palindrome: {
    name: 'Palindromes',
    alphabet: /^[ab]+$/, alphabetHint: 'alphabet: {a, b}',
    example: () => { const pool=['aba','abba','aabaa','abba','aabbaa']; return pool[Math.floor(Math.random()*pool.length)]; },
    defaultP: s => Math.floor(s.length/2)+1,
    validate: s => check_palindrome(s),
    description: 'Reads the same forwards and backwards'
  },
  anbncn: {
    name: 'L = { aⁿbⁿcⁿ }',
    alphabet: /^[abc]+$/, alphabetHint: 'alphabet: {a, b, c}',
    example: () => { const n=Math.max(2,Math.floor(Math.random()*3)+2); return 'a'.repeat(n)+'b'.repeat(n)+'c'.repeat(n); },
    defaultP: s => Math.floor(s.length/3)+1,
    validate: s => check_equal_abc(s),
    description: "Equal number of a's, b's, and c's"
  },
  abcd: {
    name: 'L = { aⁿbⁿcⁿdⁿ }',
    alphabet: /^[abcd]+$/, alphabetHint: 'alphabet: {a, b, c, d}',
    example: () => { const n=Math.max(1,Math.floor(Math.random()*2)+2); return 'a'.repeat(n)+'b'.repeat(n)+'c'.repeat(n)+'d'.repeat(n); },
    defaultP: s => Math.floor(s.length/4)+1,
    validate: s => check_abcd(s),
    description: "Equal number of a's, b's, c's and d's"
  },
  ww: {
    name: 'L = { ww }',
    alphabet: /^[ab]+$/, alphabetHint: 'alphabet: {a, b}',
    example: () => { const pool=['ab','ba','aa','bb','aba','bab']; const w=pool[Math.floor(Math.random()*pool.length)]; return w+w; },
    defaultP: s => Math.floor(s.length/2)+1,
    validate: s => check_ww(s),
    description: 'A string repeated exactly twice'
  },
  anbmcn: {
    name: 'L = { aⁿbᵐcⁿ }',
    alphabet: /^[abc]+$/, alphabetHint: 'alphabet: {a, b, c}',
    example: () => { const n=Math.max(2,Math.floor(Math.random()*3)+2); const m=Math.max(1,Math.floor(Math.random()*3)+1); return 'a'.repeat(n)+'b'.repeat(m)+'c'.repeat(n); },
    defaultP: s => Math.floor(s.length/3)+1,
    validate: s => check_anbmcn(s),
    description: "Equal a's and c's separated by any number of b's"
  },
  aprime: {
    name: 'L = { aᵖ (p is prime) }',
    alphabet: /^a+$/, alphabetHint: 'alphabet: {a}',
    example: () => { const primes=[2,3,5,7,11,13]; const p=primes[Math.floor(Math.random()*primes.length)]; return 'a'.repeat(p); },
    defaultP: s => Math.floor(s.length/2)+1,
    validate: s => check_prime_a(s),
    description: 'A sequence of a\'s where the length is a prime number'
  }
};

/* ─── Validation helpers ──────────────────────────────────────────────── */

/** L = aⁿbⁿ — original */
function check_equal_ab(s) {
  const m = s.match(/^(a+)(b+)$/);
  if (!m) return false;
  return m[1].length === m[2].length;
}

/** L = { w | #a = #b } (any order) */
function check_equal_ab_any_order(s) {
  if (!/^[ab]+$/.test(s)) return false;
  const ac = (s.match(/a/g) || []).length;
  const bc = (s.match(/b/g) || []).length;
  return ac === bc;
}

/** L = aⁿbm where n > m */
function check_more_a_than_b(s) {
  const m = s.match(/^(a+)(b*)$/);
  if (!m) return false;
  return m[1].length > m[2].length;
}

/** L = Balanced Parentheses */
function check_balanced_parentheses(s) {
  if (!/^[()]*$/.test(s)) return false;
  let depth = 0;
  for (const ch of s) {
    if (ch === '(') depth++;
    else { depth--; if (depth < 0) return false; }
  }
  return depth === 0;
}

/** L = { ww } */
function check_ww(s) {
  if (s.length % 2 !== 0) return false;
  const mid = s.length / 2;
  return s.slice(0, mid) === s.slice(mid);
}

/** L = aⁿbᵐcⁿ */
function check_anbmcn(s) {
  const m = s.match(/^(a+)(b+)(c+)$/);
  if (!m) return false;
  return m[1].length === m[3].length;
}

/** L = aᵖ where p is prime */
function check_prime_a(s) {
  if (!/^a+$/.test(s)) return false;
  const n = s.length;
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/** Central dispatcher */
function validate(langKey, s) {
  const lang = LANGUAGES[langKey];
  if (lang && lang.validate) return lang.validate(s);
  return false;
}

/* ─── Decomposition ────────────────────────────────────────────────── */
/**
 * Find a valid decomposition of s into (u, v, x, y, z) such that:
 *   |vxy| <= p  and  |vy| >= 1
 */
function decompose(s, p) {
  const n = s.length;
  const windowStart = 0;
  const windowLen = Math.min(p, n);
  const w = windowLen;
  let vStart, vEnd, yStart, yEnd;

  if (w >= 2) {
    vStart = 0;
    vEnd   = Math.max(1, Math.floor(w / 3));
    yStart = Math.min(vEnd + 1, w - 1);
    yEnd   = Math.min(vEnd + 2, w);
  } else {
    vStart = 0; vEnd = 1;
    yStart = 1; yEnd = 1;
  }

  const absVStart = windowStart + vStart;
  const absVEnd   = windowStart + vEnd;
  const absYStart = windowStart + yStart;
  const absYEnd   = windowStart + yEnd;

  const u = s.slice(0, absVStart);
  const v = s.slice(absVStart, absVEnd);
  const x = s.slice(absVEnd, absYStart);
  const y = s.slice(absYStart, absYEnd);
  const z = s.slice(absYEnd);

  if (v.length + y.length === 0) return decompose_fallback(s, p);
  return { u, v, x, y, z };
}

function decompose_fallback(s, p) {
  const u = '';
  const v = s[0] || 'a';
  const x = s.length > 2 ? s[1] : '';
  const y = s.length > 2 ? s[2] : (s.length > 1 ? s[1] : '');
  const z = s.slice(v.length + x.length + y.length);
  return { u, v, x, y, z };
}

/* ─── Pumping ──────────────────────────────────────────────────────── */
function pump(u, v, x, y, z, i) {
  return u + v.repeat(i) + x + y.repeat(i) + z;
}

/* ─── Simulation State ─────────────────────────────────────────────── */
let simState = { s: '', langKey: '', p: 0, u: '', v: '', x: '', y: '', z: '', pumpIdx: 0 };

/* ─── DOM helpers ──────────────────────────────────────────────────── */

/** Original helper — kept for decomp display */
function makeCharBoxes(str, colorClass, delay = 0) {
  return str.split('').map((ch, i) => {
    const b = document.createElement('span');
    b.className = 'char-box';
    b.textContent = ch;
    b.style.setProperty('--i', i + delay);
    if (colorClass) b.classList.add(colorClass);
    return b;
  });
}

/** NEW — wraps each char in a box + index number beneath it */
function makeCharBoxesIndexed(str, colorClass, startIdx = 0) {
  return str.split('').map((ch, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'char-box-wrapper';

    const b = document.createElement('span');
    b.className = 'char-box';
    b.textContent = ch;
    b.style.setProperty('--i', i + startIdx);
    if (colorClass) b.classList.add(colorClass);
    wrapper.appendChild(b);

    const idx = document.createElement('span');
    idx.className = 'char-idx';
    idx.textContent = i + startIdx;
    wrapper.appendChild(idx);

    return wrapper;
  });
}

/** Part group for decomposition display (updated: staggered animation) */
function makePartGroup(str, partClass, label, groupIdx = 0) {
  const g = document.createElement('div');
  g.className = `part-group ${partClass}`;
  g.style.animationDelay = `${groupIdx * 0.1}s`;

  const lbl = document.createElement('span');
  lbl.className = 'part-label';
  lbl.textContent = label;
  g.appendChild(lbl);

  if (str.length === 0) {
    const e = document.createElement('span');
    e.className = 'empty-box';
    e.textContent = '∅';
    g.appendChild(e);
  } else {
    makeCharBoxes(str, '').forEach(b => g.appendChild(b));
  }

  return g;
}

function showElement(el) { el.classList.remove('hidden'); }

/* ─── Manual Decomposition State ──────────────────────────────────── */
let decompMode    = 'auto';  // 'auto' | 'manual'
let splitPositions = [];      // sorted array of 0-4 positions (1..n-1)

/* ─── Step Navigation ──────────────────────────────────────────────── */
function goToStep(n) {
  // Hide all step cards (including 1.5)
  [1, 2, 3, 4].forEach(i => {
    document.getElementById(`step${i}Card`).classList.add('hidden');
    document.getElementById(`prog${i}`).classList.remove('active', 'done');
  });
  const s15 = document.getElementById('step15Card');
  if (s15) s15.classList.add('hidden');

  [['1','2'], ['2','3'], ['3','4']].forEach(([a, b]) => {
    const line = document.getElementById(`line${a}${b}`);
    if (line) line.classList.remove('active');
  });

  if (n === 15) {
    // Step 1.5 — show as part of step-1 in progress bar
    document.getElementById('prog1').classList.add('active');
    const card = document.getElementById('step15Card');
    card.classList.remove('hidden');
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = '';
    updateBanner(15);
  } else {
    // Mark completed steps + their connecting lines
    for (let i = 1; i < n; i++) {
      document.getElementById(`prog${i}`).classList.add('done');
      const line = document.getElementById(`line${i}${i + 1}`);
      if (line) line.classList.add('active');
    }
    document.getElementById(`prog${n}`).classList.add('active');

    const card = document.getElementById(`step${n}Card`);
    card.classList.remove('hidden');
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = '';
    updateBanner(n);
  }

  setTimeout(() => {
    document.getElementById('stepProgress').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function updateBanner(step) {
  const { s, langKey, p, u, v, x, y, z, pumpIdx } = simState;
  const banners = {
    1: {
      icon: '📝',
      title: `Examining the string "${s}"`,
      desc: `Length |s| = ${s.length} ≥ p = ${p}. The pumping lemma applies. Each character is shown as a separate indexed block below.`
    },
    15: {
      icon: '✏️',
      title: 'Manual Decomposition — Place 4 dividers',
      desc: `Click the orange lines between characters to set split boundaries for u·v·x·y·z. All 4 must satisfy |vxy| ≤ p = ${p}.`
    },
    2: {
      icon: '✂️',
      title: `Splitting  s  into  u · v · x · y · z  (${decompMode === 'manual' ? 'Manual' : 'Auto'})`,
      desc: `v = "${v || 'ε'}" (green) and y = "${y || 'ε'}" (red) are the pumped parts. Constraints: |vxy| = ${v.length + x.length + y.length} ≤ p = ${p},  |vy| = ${v.length + y.length} > 0.`
    },
    3: {
      icon: '🔁',
      title: `Pumping — currently showing  i = ${pumpIdx}`,
      desc: getPumpBannerDesc(pumpIdx)
    },
    4: {
      icon: '🏁',
      title: 'Final Verdict',
      desc: 'Based on whether all pumped strings stay in the language, we decide if the pumping lemma is satisfied or violated.'
    }
  };

  const b = banners[step] || banners[1];
  document.getElementById('bannerIcon').textContent  = b.icon;
  document.getElementById('bannerTitle').textContent = b.title;
  document.getElementById('bannerDesc').textContent  = b.desc;
}

function getPumpBannerDesc(i) {
  const { v, y } = simState;
  if (i === 0) return `i = 0: v "${v || 'ε'}" and y "${y || 'ε'}" are REMOVED. The string shrinks. Check if it remains in the language.`;
  if (i === 1) return `i = 1: v and y are unchanged — this reproduces the original string. Should still be in the language.`;
  if (i === 2) return `i = 2: v "${v || 'ε'}" and y "${y || 'ε'}" are each DOUBLED. The string grows. Check if it remains in the language.`;
  return '';
}

/* ─── Step Renderers ───────────────────────────────────────────────── */

function renderStep1() {
  const { s, p, langKey } = simState;

  const origDisp = document.getElementById('origStringDisplay');
  origDisp.innerHTML = '';
  makeCharBoxesIndexed(s, '').forEach(b => origDisp.appendChild(b));

  document.getElementById('strLenInfo').textContent = `|s| = ${s.length}`;
  document.getElementById('pInfo').textContent       = `p = ${p}`;
  document.getElementById('langInfo').textContent    = `Language: ${LANGUAGES[langKey].name}`;
}

function renderStep2() {
  const { u, v, x, y, z } = simState;

  // Update mode chip on Step 2 header
  const chip = document.getElementById('decompModeChip');
  if (chip) {
    chip.textContent = decompMode === 'manual' ? 'Manual' : 'Auto';
    chip.className = 'decomp-mode-chip ' + (decompMode === 'manual' ? 'chip-manual' : 'chip-auto');
  }

  const decompDisp = document.getElementById('decompDisplay');
  decompDisp.innerHTML = '';

  const parts = [
    { str: u, cls: 'part-u', lbl: 'u' },
    { str: v, cls: 'part-v', lbl: 'v' },
    { str: x, cls: 'part-x', lbl: 'x' },
    { str: y, cls: 'part-y', lbl: 'y' },
    { str: z, cls: 'part-z', lbl: 'z' }
  ];
  parts.forEach((p_, pi) => {
    decompDisp.appendChild(makePartGroup(p_.str, p_.cls, p_.lbl, pi));
  });

  const decompInfo = document.getElementById('decompInfo');
  decompInfo.innerHTML = '';
  const infos = [
    { label: '|u|',   val: u.length },
    { label: '|v|',   val: v.length },
    { label: '|x|',   val: x.length },
    { label: '|y|',   val: y.length },
    { label: '|z|',   val: z.length },
    { label: '|vxy|', val: v.length + x.length + y.length },
    { label: '|vy|',  val: v.length + y.length }
  ];
  infos.forEach(({ label, val }) => {
    const box = document.createElement('div');
    box.className = 'dinfo-box';
    box.innerHTML = `<div class="dinfo-label">${label}</div><div class="dinfo-val">${val}</div>`;
    decompInfo.appendChild(box);
  });
}

function renderStep3(pumpIdx) {
  simState.pumpIdx = pumpIdx;
  const { u, v, x, y, z, langKey } = simState;
  const i = pumpIdx;

  // Update i-dot indicators
  document.querySelectorAll('.pump-i-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === i);
    dot.classList.toggle('done', idx < i);
  });

  document.getElementById('pumpPrevBtn').disabled = (i === 0);
  document.getElementById('pumpNextBtn').disabled = (i === 2);

  const step3Next = document.getElementById('step3Next');
  if (i === 2) step3Next.classList.remove('hidden');
  else step3Next.classList.add('hidden');

  // Build single pump card
  const pumpResults = document.getElementById('pumpResults');
  pumpResults.innerHTML = '';

  const pumped  = pump(u, v, x, y, z, i);
  const isValid = validate(langKey, pumped);

  const card = document.createElement('div');
  card.className = 'pump-card pump-card-animated';

  // Header row
  const header = document.createElement('div');
  header.className = 'pump-header';
  header.innerHTML = `
    <span class="i-badge">i = ${i}</span>
    <span class="pump-title">uv<sup>${i}</sup>xy<sup>${i}</sup>z</span>
    <span class="pump-len">|s| = ${pumped.length}</span>
  `;
  card.appendChild(header);

  // Action chip
  const pumpLabel = document.createElement('div');
  pumpLabel.className = 'pump-action-label';
  if (i === 0)
    pumpLabel.innerHTML = `<span class="pump-action-chip pump-action-remove">Removing</span> v and y — string shrinks`;
  else if (i === 1)
    pumpLabel.innerHTML = `<span class="pump-action-chip pump-action-same">Keeping</span> v and y — original string`;
  else
    pumpLabel.innerHTML = `<span class="pump-action-chip pump-action-grow">Duplicating</span> v and y — string grows`;
  card.appendChild(pumpLabel);

  // Colored string visualization
  const strDiv = document.createElement('div');
  strDiv.className = 'pump-string';

  const segments = [
    { str: u,           cls: 'part-u', isPumped: false },
    { str: v.repeat(i), cls: 'part-v', isPumped: true  },
    { str: x,           cls: 'part-x', isPumped: false },
    { str: y.repeat(i), cls: 'part-y', isPumped: true  },
    { str: z,           cls: 'part-z', isPumped: false }
  ];

  let globalIdx = 0;
  segments.forEach(seg => {
    if (seg.str.length === 0) {
      // Show ghost placeholder for removed v / y
      if (seg.isPumped && i === 0) {
        const ghost = document.createElement('span');
        ghost.className = `ghost-box ${seg.cls}`;
        ghost.textContent = seg.cls === 'part-v' ? '(v⁰)' : '(y⁰)';
        strDiv.appendChild(ghost);
      }
      return;
    }
    seg.str.split('').forEach((ch, ci) => {
      const b = document.createElement('span');
      b.className = `char-box ${seg.cls}`;
      if (seg.isPumped && i > 1)  b.classList.add('pumped-highlight');
      if (seg.isPumped && i === 0) b.classList.add('pumped-removed');
      b.textContent = ch;
      b.style.setProperty('--i', globalIdx);
      strDiv.appendChild(b);
      globalIdx++;
    });
  });

  if (pumped.length === 0) {
    const e = document.createElement('span');
    e.className = 'empty-string-label';
    e.textContent = '(empty string ε)';
    strDiv.appendChild(e);
  }
  card.appendChild(strDiv);

  // Verdict chip
  const vChip = document.createElement('span');
  vChip.className = `verdict-chip ${isValid ? 'verdict-valid' : 'verdict-invalid'}`;
  vChip.innerHTML = isValid
    ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> In ${LANGUAGES[langKey].name}`
    : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="#f87171" stroke-width="2" stroke-linecap="round"/></svg> NOT in ${LANGUAGES[langKey].name}`;
  card.appendChild(vChip);

  // Explanation text
  const exp = document.createElement('div');
  exp.className = 'pump-explain';
  exp.textContent = buildPumpExplanation(langKey, pumped, u, v, x, y, z, i, isValid);
  card.appendChild(exp);

  pumpResults.appendChild(card);
  updateBanner(3);
}

function renderStep4() {
  const { u, v, x, y, z, langKey, s } = simState;
  const results    = [0, 1, 2].map(i => validate(langKey, pump(u, v, x, y, z, i)));
  const anyInvalid = results.some(r => !r);

  const verdictEl = document.getElementById('verdict');
  const explEl    = document.getElementById('explanation');

  verdictEl.className = 'verdict ' + (anyInvalid ? 'fail' : 'pass');

  if (anyInvalid) {
    verdictEl.innerHTML = `
      <div class="verdict-icon">❌</div>
      <div>
        <div class="verdict-text">Pumping Test FAILED</div>
        <div class="verdict-sub">The string <strong>"${s}"</strong> breaks under this decomposition!</div>
      </div>`;
    explEl.innerHTML = buildFinalExplanation(langKey, s, u, v, x, y, z, results, false);
  } else {
    verdictEl.innerHTML = `
      <div class="verdict-icon">✅</div>
      <div>
        <div class="verdict-text">Pumping condition SATISFIED</div>
        <div class="verdict-sub">All pumped strings remain in the language for this decomposition.</div>
      </div>`;
    explEl.innerHTML = buildFinalExplanation(langKey, s, u, v, x, y, z, results, true);
  }
}

/* ─── Main simulation ──────────────────────────────────────────────── */
function runSimulation() {
  const langKey = document.getElementById('langSelect').value;
  const rawStr  = document.getElementById('stringInput').value.trim();
  const p       = parseInt(document.getElementById('pumpInput').value, 10);
  const errBox  = document.getElementById('inputError');

  errBox.classList.add('hidden');

  if (!rawStr) { showError('Please enter a string to simulate.'); return; }
  if (isNaN(p) || p < 1) { showError('Pumping length p must be at least 1.'); return; }
  if (rawStr.length < p) {
    showError(`The string |s| = ${rawStr.length} must be ≥ p = ${p}. Try a longer string or smaller p.`); return;
  }
  // Per-language alphabet check
  const lang = LANGUAGES[langKey];
  if (lang?.alphabet && !lang.alphabet.test(rawStr)) {
    showError(`Invalid characters for this language. ${lang.alphabetHint}.`); return;
  }

  const s = rawStr;
  const { u, v, x, y, z } = decompose(s, p);

  // Store global simulation state
  simState = { s, langKey, p, u, v, x, y, z, pumpIdx: 0 };

  // Show the simulation UI
  document.getElementById('simArea').classList.remove('hidden');
  document.getElementById('stepProgress').classList.remove('hidden');

  // Reset pump indicator dots
  document.querySelectorAll('.pump-i-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === 0);
    dot.classList.remove('done');
  });
  document.getElementById('step3Next').classList.add('hidden');

  // Render & show step 1
  renderStep1();
  goToStep(1);
}

/* ─── Explanation builders ─────────────────────────────────────────── */
function buildPumpExplanation(langKey, pumped, u, v, x, y, z, i, isValid) {
  const base = `String: "${pumped || 'ε'}" (length ${pumped.length}). `;

  switch (langKey) {
    case 'anbn': {
      const ac = (pumped.match(/^a*/)?.[0] || '').length;
      const bc = (pumped.match(/b+$/)?.[0] || '').length;
      return base + `Has ${ac} a's and ${bc} b's. ${ac === bc ? 'Equal → valid.' : `Unequal (${ac} ≠ ${bc}) → invalid.`}`;
    }
    case 'balancedParen': {
      const ok = check_balanced_parentheses(pumped);
      let depth = 0, minDepth = 0;
      for (const ch of pumped) { ch === '(' ? depth++ : depth--; minDepth = Math.min(minDepth, depth); }
      return base + `Max depth: ${Math.max(0,depth)}. ${ok ? 'Balanced → valid.' : `Not balanced (depth ${depth}, min ${minDepth}) → invalid.`}`;
    }
    case 'palindrome': {
      const rev = pumped.split('').reverse().join('');
      return base + `Reversed: "${rev}". ${pumped === rev ? 'Same → palindrome (valid).' : 'Different → not a palindrome (invalid).'}`;
    }
    case 'anbncn': {
      const m = pumped.match(/^(a*)(b*)(c*)$/);
      if (!m) return base + 'Characters out of order → invalid.';
      const [, as, bs, cs] = m;
      return base + `Has ${as.length} a's, ${bs.length} b's, ${cs.length} c's. ` +
        (as.length === bs.length && bs.length === cs.length ? 'All equal → valid.' : 'Not all equal → invalid.');
    }
    case 'abcd': {
      const m = pumped.match(/^(a*)(b*)(c*)(d*)$/);
      if (!m) return base + 'Characters out of order → invalid.';
      const [, as, bs, cs, ds] = m;
      const allEq = as.length===bs.length && bs.length===cs.length && cs.length===ds.length;
      return base + `Has ${as.length} a's, ${bs.length} b's, ${cs.length} c's, ${ds.length} d's. ${allEq ? 'All equal → valid.' : 'Not all equal → invalid.'}`;
    }
    case 'ww': {
      const isEven = pumped.length % 2 === 0;
      if (!isEven) return base + `Length ${pumped.length} is odd → invalid.`;
      const mid = pumped.length / 2;
      const w1 = pumped.slice(0, mid);
      const w2 = pumped.slice(mid);
      return base + `w1="${w1}", w2="${w2}". ${w1===w2 ? 'Matches → valid.' : 'Mismatch → invalid.'}`;
    }
    case 'anbmcn': {
      const m = pumped.match(/^(a*)(b*)(c*)$/);
      if (!m) return base + 'Characters out of order → invalid.';
      const [, as, bs, cs] = m;
      return base + `Has ${as.length} a's, ${bs.length} b's, ${cs.length} c's. ${as.length === cs.length ? 'a=c → valid.' : `a≠c (${as.length}≠${cs.length}) → invalid.`}`;
    }
    case 'aprime': {
      const n = pumped.length;
      const isPrime = check_prime_a(pumped);
      return base + `Length is ${n}. ${isPrime ? 'Prime → valid.' : 'Not prime → invalid.'}`;
    }
    default:
      return base + (isValid ? 'Valid.' : 'Invalid.');
  }
}

function buildFinalExplanation(langKey, s, u, v, x, y, z, results, allPass) {
  const failedAt = results.map((r, i) => (!r ? `i=${i}` : null)).filter(Boolean);

  const langDesc = {
    anbn:           "For L = { aⁿbⁿ }, pumping adds extra a's or b's unevenly, destroying equality.",
    balancedParen:  "For balanced parentheses, pumping '(' without consistently matching ')' breaks balance.",
    palindrome:     "For palindromes, pumping one side without identical pumping symmetrically breaks the mirror symmetry.",
    anbncn:         "For L = { aⁿbⁿcⁿ }, pumping in one or two regions changes their counts without adjusting the other(s).",
    abcd:           "For L = { aⁿbⁿcⁿdⁿ }, pumping in any region disrupts equality across all four counts.",
    ww:             "For L = { ww }, pumping changes the length or structure so the first half no longer matches the second half.",
    anbmcn:         "For L = { aⁿbᵐcⁿ }, pumping a's or c's unequally breaks the requirement that n matches.",
    aprime:         "For L = { aᵖ }, repeatedly adding |vy| inevitably produces a composite string length."
  }[langKey] || 'Pumping changes the structural property that defines this language rules.';

  if (!allPass) {
    return `<strong>Why this fails:</strong> The decomposition s = "${u}" · "${v}" · "${x}" · "${y}" · "${z}" was tried with |vxy| = ${v.length + x.length + y.length} ≤ p and |vy| = ${v.length + y.length} > 0. Yet pumped strings at ${failedAt.join(', ')} fall outside the language.<br><br>${langDesc}<br><br>By the Pumping Lemma, any failure here demonstrates how pumping breaks the defining structure of this language.`;
  } else {
    return `<strong>Note:</strong> This particular decomposition satisfies the pumping condition. The Pumping Lemma requires <em>all</em> valid decompositions to be tested to prove anything conclusively.<br><br>${langDesc}`;
  }
}

/* ─── UI helpers ───────────────────────────────────────────────────── */
function showError(msg) {
  const e = document.getElementById('inputError');
  e.textContent = msg;
  e.classList.remove('hidden');
}

function autoFill() {
  const langKey = document.getElementById('langSelect').value;
  const lang    = LANGUAGES[langKey];
  const str     = lang.example(null);
  document.getElementById('stringInput').value = str;
  document.getElementById('pumpInput').value   = lang.defaultP(str);
}

function reset() {
  document.getElementById('simArea').classList.add('hidden');
  document.getElementById('stepProgress').classList.add('hidden');
  document.getElementById('inputError').classList.add('hidden');
  [1, 2, 3, 4].forEach(i => document.getElementById(`step${i}Card`).classList.add('hidden'));
  const s15 = document.getElementById('step15Card');
  if (s15) s15.classList.add('hidden');
  splitPositions = [];
  document.getElementById('inputSection').scrollIntoView({ behavior: 'smooth' });
}

/* ─── Event listeners ──────────────────────────────────────────────── */
document.getElementById('startBtn').addEventListener('click', runSimulation);
document.getElementById('autoBtn').addEventListener('click', autoFill);
document.getElementById('resetBtn').addEventListener('click', reset);

// Step-by-step navigation — mode-aware
document.getElementById('step1Next').addEventListener('click', () => {
  if (decompMode === 'manual') {
    initSplitEditor();
    goToStep(15);
  } else {
    renderStep2();
    goToStep(2);
  }
});

document.getElementById('step2Prev').addEventListener('click', () => {
  if (decompMode === 'manual') goToStep(15);
  else goToStep(1);
});

// Step 1.5 (manual split editor) navigation
document.getElementById('step15Prev').addEventListener('click', () => { goToStep(1); });
document.getElementById('step15Next').addEventListener('click', applyManualSplit);
document.getElementById('splitClearBtn').addEventListener('click', clearAllSplits);

document.getElementById('step2Next').addEventListener('click', () => { renderStep3(0); goToStep(3); });
document.getElementById('step3Prev').addEventListener('click', () => { goToStep(2); });
document.getElementById('step3Next').addEventListener('click', () => { renderStep4(); goToStep(4); });
document.getElementById('step4Prev').addEventListener('click', () => { goToStep(3); });

// Decomposition mode toggle buttons
document.getElementById('modeAutoBtn').addEventListener('click', () => setDecompMode('auto'));
document.getElementById('modeManualBtn').addEventListener('click', () => setDecompMode('manual'));

// Pump i-stepper buttons
document.getElementById('pumpPrevBtn').addEventListener('click', () => {
  if (simState.pumpIdx > 0) renderStep3(simState.pumpIdx - 1);
});
document.getElementById('pumpNextBtn').addEventListener('click', () => {
  if (simState.pumpIdx < 2) renderStep3(simState.pumpIdx + 1);
});

// Keyboard shortcut for string input
document.getElementById('stringInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') runSimulation();
});

// Clear error on language change + update alphabet hint
document.getElementById('langSelect').addEventListener('change', () => {
  document.getElementById('inputError').classList.add('hidden');
  updateLangHint();
});

// Pre-fill on page load
window.addEventListener('DOMContentLoaded', () => { autoFill(); updateLangHint(); });

/* ─── Dynamic alphabet hint ────────────────────────────────────────── */
function updateLangHint() {
  const key  = document.getElementById('langSelect').value;
  const lang = LANGUAGES[key];
  const hint = document.getElementById('alphabetHint');
  if (hint && lang) hint.textContent = `(${lang.alphabetHint})`;
}

/* ═══════════════════════════════════════════════════════════════════════
   MANUAL DECOMPOSITION ENGINE  (v3)
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Mode toggle ─────────────────────────────────────────────────────── */
function setDecompMode(mode) {
  decompMode = mode;
  document.getElementById('modeAutoBtn').classList.toggle('active', mode === 'auto');
  document.getElementById('modeManualBtn').classList.toggle('active', mode === 'manual');
}

/* ── Build click-to-split editor ─────────────────────────────────────── */
function initSplitEditor() {
  const { s, p } = simState;
  const n = s.length;
  splitPositions = [];

  const display = document.getElementById('splitEditorDisplay');
  display.innerHTML = '';

  for (let i = 0; i <= n; i++) {
    // Divider slot BEFORE char i (for i=0 to n)
    const slot = document.createElement('div');
    slot.className = 'divider-slot';
    slot.dataset.pos = i;
    const lbl = document.createElement('span');
    lbl.className = 'divider-label';
    slot.appendChild(lbl);
    slot.addEventListener('click', () => onDividerClick(i));
    display.appendChild(slot);

    // Character box (only strictly before n)
    if (i < n) {
      const wrap = document.createElement('div');
      wrap.className = 'split-char-wrap';
      const charBox = document.createElement('div');
      charBox.className = 'split-char-box';
      charBox.dataset.charIdx = i;

      const box = document.createElement('span');
      box.className = 'char-box';
      box.textContent = s[i];
      box.style.setProperty('--i', i);
      charBox.appendChild(box);

      const idxEl = document.createElement('span');
      idxEl.className = 'char-idx';
      idxEl.textContent = i;
      charBox.appendChild(idxEl);

      wrap.appendChild(charBox);
      display.appendChild(wrap);
    }
  }

  refreshSplitPreview();
  updateSplitConstraints();
  updateSplitCount();
}

/* ── Handle divider click ─────────────────────────────────────────────── */
function onDividerClick(pos) {
  const currentCount = splitPositions.filter(p => p === pos).length;
  const otherSplits  = splitPositions.filter(p => p !== pos);

  let nextCount = currentCount + 1;
  // If adding one exceeds 4, reset this position to 0 (effectively removing it)
  if (otherSplits.length + nextCount > 4) {
    nextCount = 0;
  }

  splitPositions = [...otherSplits];
  for (let i = 0; i < nextCount; i++) {
    splitPositions.push(pos);
  }
  splitPositions.sort((a, b) => a - b); // keep sorted

  syncDividerSlots();
  colorCharBoxes();
  refreshSplitPreview();
  updateSplitConstraints();
  updateSplitCount();
}

/* ── Clear all splits ─────────────────────────────────────────────────── */
function clearAllSplits() {
  splitPositions = [];
  syncDividerSlots();
  colorCharBoxes();
  refreshSplitPreview();
  updateSplitConstraints();
  updateSplitCount();
}

/* ── Sync visual state of divider slots ─────────────────────────────── */
function syncDividerSlots() {
  const LABELS = ['u|v', 'v|x', 'x|y', 'y|z'];
  document.querySelectorAll('.divider-slot').forEach(slot => {
    const pos = parseInt(slot.dataset.pos);
    const indices = []; // indices in splitPositions that match this slot
    for (let i = 0; i < splitPositions.length; i++) {
      if (splitPositions[i] === pos) indices.push(i);
    }

    const placed = indices.length > 0;
    slot.classList.toggle('placed', placed);
    slot.classList.toggle('multiple', indices.length > 1);

    const lbl = slot.querySelector('.divider-label');
    if (lbl) {
      if (placed) {
        lbl.innerHTML = indices.map(idx => LABELS[idx]).join('<br/>');
      } else {
        lbl.innerHTML = '';
      }
    }
  });
}

/* ── Assign a part name (u/v/x/y/z) to each character index ─────────── */
function getCharPart(charIdx) {
  const NAMES = ['u', 'v', 'x', 'y', 'z'];
  let seg = 0;
  for (const p of splitPositions) {
    if (charIdx >= p) seg++;
    else break;
  }
  return NAMES[Math.min(seg, 4)];
}

/* ── Colour the character boxes in the split editor ─────────────────── */
function colorCharBoxes() {
  document.querySelectorAll('.split-char-box').forEach(box => {
    const i    = parseInt(box.dataset.charIdx);
    box.dataset.part = splitPositions.length > 0 ? getCharPart(i) : '';
  });
}

/* ── Live split preview (coloured u·v·x·y·z groups) ─────────────────── */
function refreshSplitPreview() {
  const preview = document.getElementById('splitPreviewDisplay');
  if (!preview) return;
  preview.innerHTML = '';

  if (splitPositions.length === 0) {
    preview.innerHTML = '<span style="color:var(--muted);font-size:12px;font-style:italic;">Place dividers above to see the live split preview…</span>';
    return;
  }

  const { s } = simState;
  const n = s.length;
  const NAMES   = ['u', 'v', 'x', 'y', 'z'];
  const CLASSES = ['part-u', 'part-v', 'part-x', 'part-y', 'part-z'];
  const bounds  = [0, ...splitPositions, n];

  bounds.slice(0, -1).forEach((start, si) => {
    const end    = bounds[si + 1];
    const segStr = s.slice(start, end);
    const grp    = makePartGroup(segStr, CLASSES[si], NAMES[si], si);
    preview.appendChild(grp);
  });
}

/* ── Extract u,v,x,y,z from current split positions ─────────────────── */
function getDecompFromSplits() {
  if (splitPositions.length !== 4) return null;
  const { s } = simState;
  const [d1, d2, d3, d4] = splitPositions;
  return { u: s.slice(0, d1), v: s.slice(d1, d2), x: s.slice(d2, d3), y: s.slice(d3, d4), z: s.slice(d4) };
}

/* ── Update constraint check chips ─────────────────────────────────── */
function updateSplitConstraints() {
  const { p } = simState;
  const placed = splitPositions.length;

  // cc1: need all 4 dividers
  setConstraintChip('cc1', placed === 4 ? 'pass' : 'pending');

  if (placed === 4) {
    const [d1, d2, d3, d4] = splitPositions;
    const vxyl = d4 - d1;              // |vxy|
    const vyl  = (d2 - d1) + (d4 - d3); // |vy|

    const ok2 = vxyl <= p;
    const ok3 = vyl > 0;

    document.getElementById('ccVxyText').textContent = `|vxy| = ${vxyl} ≤ p = ${p}`;
    setConstraintChip('cc2', ok2 ? 'pass' : 'fail');
    setConstraintChip('cc3', ok3 ? 'pass' : 'fail');

    document.getElementById('step15Next').disabled = !(ok2 && ok3);

    const errEl = document.getElementById('splitError');
    if (!ok2) {
      errEl.textContent = `Invalid: |vxy| = ${vxyl} exceeds p = ${p}. Move the 1st and 4th dividers closer together so the vxy segment fits within p characters.`;
      errEl.classList.remove('hidden');
    } else {
      errEl.classList.add('hidden');
    }
  } else {
    document.getElementById('ccVxyText').textContent = '|vxy| ≤ p';
    setConstraintChip('cc2', 'pending');
    setConstraintChip('cc3', 'pending');
    document.getElementById('step15Next').disabled = true;
    document.getElementById('splitError').classList.add('hidden');
  }
}

function setConstraintChip(id, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('cc-pass', 'cc-fail');
  if (state === 'pass') el.classList.add('cc-pass');
  if (state === 'fail') el.classList.add('cc-fail');
  el.querySelector('.cc-icon').textContent = state === 'pass' ? '✓' : state === 'fail' ? '✗' : '○';
}

function updateSplitCount() {
  const badge = document.getElementById('splitCount');
  if (!badge) return;
  badge.textContent = `${splitPositions.length} / 4`;
  badge.classList.toggle('complete', splitPositions.length === 4);
}

/* ── Apply manual split → go to Step 2 ──────────────────────────────── */
function applyManualSplit() {
  const decomp = getDecompFromSplits();
  if (!decomp) return;
  // Override simState's uvxyz with user's choice
  simState.u = decomp.u;
  simState.v = decomp.v;
  simState.x = decomp.x;
  simState.y = decomp.y;
  simState.z = decomp.z;
  renderStep2();
  goToStep(2);
}
