// All 5 onboarding screens for Aced.
// Crisp, neutral tone. Confident AI moments (chips, sparkles, regenerate).

const { useState, useEffect, useRef, useMemo } = React;

const SUBJECT_PALETTE = [
  { name: 'violet', color: '#6c63ff' },
  { name: 'teal',   color: '#14b8a6' },
  { name: 'rose',   color: '#f43f5e' },
  { name: 'amber',  color: '#f59e0b' },
  { name: 'sky',    color: '#38bdf8' },
  { name: 'lime',   color: '#84cc16' },
];

const colorFor = (name) => SUBJECT_PALETTE.find(p => p.name === name)?.color || '#6c63ff';

// ─────────────────────────────────────────────────────────────
// Screen 1 — Study level
// ─────────────────────────────────────────────────────────────
function ScreenLevel({ data, setData, onNext }) {
  const levels = [
    { id: 'gcse',  label: 'GCSE',       sub: 'Years 10–11',     I: Icon.GCSE },
    { id: 'alvl',  label: 'A-Level',    sub: 'Sixth Form',      I: Icon.ALevel },
    { id: 'uni',   label: 'University', sub: 'Undergrad / postgrad', I: Icon.University },
    { id: 'other', label: 'Other',      sub: 'BTEC, IB, self-study',  I: Icon.Other },
  ];

  return (
    <>
      <div className="content slide-enter">
        <div className="eyebrow">Step 01 · About you</div>
        <h1 className="title" style={{ marginTop: 14 }}>Let's build your week.</h1>
        <p className="subtitle">What are you studying?</p>

        <div style={{
          marginTop: 26,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}>
          {levels.map(l => {
            const sel = data.level === l.id;
            return (
              <button
                key={l.id}
                className={`opt-card ${sel ? 'selected' : ''}`}
                style={{ minHeight: 122, textAlign: 'left' }}
                onClick={() => setData(d => ({ ...d, level: l.id }))}
              >
                <div className="icon-wrap"><l.I /></div>
                <div>
                  <div className="label">{l.label}</div>
                  <div className="sub">{l.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="footer">
        <button
          className="btn-primary"
          disabled={!data.level}
          onClick={onNext}
        >
          Continue
          <Icon.Arrow />
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2 — Subjects
// ─────────────────────────────────────────────────────────────
function ScreenSubjects({ data, setData, onNext }) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  const addSubject = () => {
    const name = draft.trim();
    if (!name) return;
    const usedColors = data.subjects.map(s => s.color);
    const available = SUBJECT_PALETTE.find(p => !usedColors.includes(p.name)) || SUBJECT_PALETTE[data.subjects.length % SUBJECT_PALETTE.length];
    setData(d => ({
      ...d,
      subjects: [...d.subjects, { id: Date.now(), name, color: available.name, date: null }],
    }));
    setDraft('');
    inputRef.current?.focus();
  };

  const removeSubject = (id) => {
    setData(d => ({ ...d, subjects: d.subjects.filter(s => s.id !== id) }));
  };

  // AI suggestions based on level
  const suggestions = useMemo(() => {
    const have = data.subjects.map(s => s.name.toLowerCase());
    const all = {
      gcse:  ['English', 'Geography', 'French', 'Chemistry', 'Physics'],
      alvl:  ['Physics', 'Chemistry', 'Economics', 'Psychology', 'English Lit'],
      uni:   ['Statistics', 'Linear Algebra', 'Macro', 'Programming', 'Ethics'],
      other: ['English', 'Maths', 'Science', 'Business'],
    };
    return (all[data.level] || all.alvl).filter(s => !have.includes(s.toLowerCase())).slice(0, 3);
  }, [data.level, data.subjects]);

  const pickSuggestion = (name) => {
    const usedColors = data.subjects.map(s => s.color);
    const available = SUBJECT_PALETTE.find(p => !usedColors.includes(p.name)) || SUBJECT_PALETTE[0];
    setData(d => ({
      ...d,
      subjects: [...d.subjects, { id: Date.now(), name, color: available.name, date: null }],
    }));
  };

  return (
    <>
      <div className="content slide-enter">
        <div className="eyebrow">Step 02 · Subjects</div>
        <h1 className="title" style={{ marginTop: 14 }}>What subjects are you taking?</h1>
        <p className="subtitle">Add up to 8. You can change these later.</p>

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          <input
            ref={inputRef}
            className="input"
            placeholder="e.g. Biology"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addSubject(); }}
            style={{ flex: 1 }}
          />
          <button
            className="btn-primary"
            style={{ width: 96, height: 52, fontSize: 14, gap: 4, flexShrink: 0 }}
            disabled={!draft.trim() || data.subjects.length >= 8}
            onClick={addSubject}
          >
            <Icon.Plus /> Add
          </button>
        </div>

        {/* AI suggestion chips */}
        {suggestions.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, color: 'var(--accent)',
              fontFamily: 'JetBrains Mono, monospace',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 8,
              whiteSpace: 'nowrap',
            }}>
              <Icon.Sparkle /> Suggested for you
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => pickSuggestion(s)}
                  style={{
                    background: 'rgba(108, 99, 255, 0.08)',
                    border: '1px dashed rgba(108, 99, 255, 0.4)',
                    color: 'var(--accent-2)',
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                  }}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chips */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            fontSize: 11, color: 'var(--text-3)',
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 10,
          }}>
            Your subjects · {data.subjects.length}/8
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.subjects.map((s, i) => (
              <span key={s.id} className="chip" style={{ animationDelay: `${i * 0.04}s` }}>
                <span className="dot" style={{ background: colorFor(s.color) }} />
                {s.name}
                <span className="x" onClick={() => removeSubject(s.id)}><Icon.Close /></span>
              </span>
            ))}
            {data.subjects.length === 0 && (
              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>None yet — add one above.</span>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <button
          className="btn-primary"
          disabled={data.subjects.length === 0}
          onClick={onNext}
        >
          Continue
          <Icon.Arrow />
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 3 — Deadlines
// ─────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_LONG = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function fmtDate(iso) {
  if (!iso) return 'Pick date';
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function MiniCal({ value, onPick, onClose }) {
  const initial = value ? new Date(value) : new Date(2026, 5, 1); // Jun 2026
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });

  const first = new Date(view.y, view.m, 1);
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const startDow = (first.getDay() + 6) % 7; // Mon = 0
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selStr = value ? new Date(value).toDateString() : '';

  return (
    <div className="cal-pop" onClick={e => e.stopPropagation()}>
      <div className="cal-hdr">
        <button onClick={() => setView(v => ({ y: v.m === 0 ? v.y - 1 : v.y, m: (v.m + 11) % 12 }))}><Icon.ChevL /></button>
        <div className="m">{MONTHS_LONG[view.m]} {view.y}</div>
        <button onClick={() => setView(v => ({ y: v.m === 11 ? v.y + 1 : v.y, m: (v.m + 1) % 12 }))}><Icon.ChevR /></button>
      </div>
      <div className="cal-grid">
        {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="cal-hd">{d}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const date = new Date(view.y, view.m, d);
          const isSel = date.toDateString() === selStr;
          return (
            <div
              key={i}
              className={`cal-d ${isSel ? 'sel' : ''}`}
              onClick={() => { onPick(date.toISOString()); onClose(); }}
            >{d}</div>
          );
        })}
      </div>
    </div>
  );
}

function ScreenDeadlines({ data, setData, onNext }) {
  const [openId, setOpenId] = useState(null);

  const setDate = (id, iso) => {
    setData(d => ({ ...d, subjects: d.subjects.map(s => s.id === id ? { ...s, date: iso } : s) }));
  };

  const allSet = data.subjects.every(s => s.date);

  return (
    <>
      <div className="content slide-enter">
        <div className="eyebrow">Step 03 · Deadlines</div>
        <h1 className="title" style={{ marginTop: 14 }}>When are your deadlines?</h1>
        <p className="subtitle">Exam date or final submission. We'll work backwards.</p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}
             onClick={() => setOpenId(null)}>
          {data.subjects.map((s) => (
            <div key={s.id} className="deadline-row">
              <div className="swatch" style={{ background: colorFor(s.color) }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="name">{s.name}</div>
                <div className="meta">{s.date ? `Final · ${new Date(s.date).toLocaleDateString('en-GB', { weekday: 'short' })}` : 'Set a date'}</div>
              </div>
              <div style={{ position: 'relative' }}>
                <button
                  className="date-pill"
                  onClick={(e) => { e.stopPropagation(); setOpenId(openId === s.id ? null : s.id); }}
                  style={s.date ? { borderColor: 'rgba(108,99,255,0.4)', background: 'rgba(108,99,255,0.08)', color: 'var(--accent-2)' } : {}}
                >
                  <Icon.Cal />
                  {fmtDate(s.date)}
                </button>
                {openId === s.id && (
                  <MiniCal
                    value={s.date}
                    onPick={(iso) => setDate(s.id, iso)}
                    onClose={() => setOpenId(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 18, padding: '12px 14px',
          background: 'rgba(108, 99, 255, 0.06)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
          borderRadius: 12,
          display: 'flex', gap: 10, alignItems: 'flex-start',
          fontSize: 12.5,
          color: 'var(--text-2)',
          lineHeight: 1.45,
        }}>
          <div style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }}><Icon.Sparkle /></div>
          <div><span style={{ color: 'var(--text)' }}>Aced will space sessions evenly</span> until each date, with more weight on harder subjects.</div>
        </div>
      </div>

      <div className="footer">
        <button
          className="btn-primary"
          disabled={!allSet}
          onClick={onNext}
        >
          {allSet ? 'Continue' : `${data.subjects.filter(s => s.date).length}/${data.subjects.length} set`}
          {allSet && <Icon.Arrow />}
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 4 — Work style
// ─────────────────────────────────────────────────────────────
function ScreenStyle({ data, setData, onNext, onGenerate }) {
  const styles = [
    { id: 'morning', label: 'Morning person', sub: '6–11am peak',  I: Icon.Morning },
    { id: 'night',   label: 'Night owl',      sub: '8pm–1am peak', I: Icon.NightOwl },
    { id: 'flex',    label: 'Flexible',       sub: 'Wherever it fits', I: Icon.Flexible },
  ];

  const setHours = (h) => setData(d => ({ ...d, hours: Math.max(1, Math.min(40, Math.round(h))) }));

  const trackRef = useRef(null);
  const dragging = useRef(false);

  const handleDrag = (clientX) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setHours(1 + t * 39);
  };

  useEffect(() => {
    const mv = (e) => { if (dragging.current) handleDrag(e.clientX ?? e.touches?.[0]?.clientX); };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', mv);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', mv);
      window.removeEventListener('touchend', up);
    };
  }, []);

  const pct = ((data.hours - 1) / 39) * 100;
  const dailyAvg = (data.hours / 7).toFixed(1);

  return (
    <>
      <div className="content slide-enter">
        <div className="eyebrow">Step 04 · Rhythm</div>
        <h1 className="title" style={{ marginTop: 14 }}>When do you work best?</h1>
        <p className="subtitle">We'll schedule study during your sharpest hours.</p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {styles.map(s => {
            const sel = data.style === s.id;
            return (
              <button
                key={s.id}
                className={`opt-card ${sel ? 'selected' : ''}`}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: '14px 16px', textAlign: 'left' }}
                onClick={() => setData(d => ({ ...d, style: s.id }))}
              >
                <div className="icon-wrap" style={{ width: 44, height: 44, borderRadius: 12 }}><s.I /></div>
                <div style={{ flex: 1 }}>
                  <div className="label">{s.label}</div>
                  <div className="sub">{s.sub}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 999,
                  border: sel ? '6px solid var(--accent)' : '1.5px solid var(--border-2)',
                  background: sel ? 'white' : 'transparent',
                  transition: 'all 0.18s',
                }} />
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div style={{ marginTop: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Weekly study hours</div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              color: 'var(--text-2)',
            }}>~{dailyAvg}h / day</div>
          </div>
          <div className="slider-wrap">
            <div className="slider-track" ref={trackRef}
                 onMouseDown={(e) => { dragging.current = true; handleDrag(e.clientX); }}
                 onTouchStart={(e) => { dragging.current = true; handleDrag(e.touches[0].clientX); }}>
              <div className="slider-fill" style={{ width: `${pct}%` }} />
              <div className="slider-thumb" style={{ left: `${pct}%` }}>
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--accent)',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 4px 12px rgba(108, 99, 255, 0.4)',
                }}>
                  {data.hours} hrs/week
                </div>
              </div>
            </div>
            <div className="slider-labels">
              <span>1</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <button
          className="btn-primary"
          disabled={!data.style}
          onClick={onGenerate}
        >
          <Icon.Sparkle />
          Generate my week
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 5 — THE MAGIC MOMENT
// ─────────────────────────────────────────────────────────────

// Hard-coded week schedule per spec.
const WEEK_SCHEDULE = [
  { day: 'Mon', date: 11, blocks: [{ subjId: 'biology', start: '16:00', end: '17:30' }] },
  { day: 'Tue', date: 12, blocks: [{ subjId: 'maths',   start: '17:00', end: '18:30' }] },
  { day: 'Wed', date: 13, blocks: [{ subjId: 'history', start: '16:00', end: '17:00' }] },
  { day: 'Thu', date: 14, blocks: [{ subjId: 'biology', start: '15:00', end: '16:00' }] },
  { day: 'Fri', date: 15, blocks: [{ subjId: 'history', start: '15:00', end: '16:00' }] },
  { day: 'Sat', date: 16, blocks: [{ subjId: 'maths',   start: '10:00', end: '11:30' }] },
  { day: 'Sun', date: 17, blocks: [] },
];

// Map subject names → palette. Tries to match user's subjects first; falls back to defaults.
function resolveSubjects(userSubjects) {
  const norm = (s) => s.toLowerCase();
  const defaults = {
    biology: { name: 'Biology', color: '#14b8a6' },
    maths:   { name: 'Maths',   color: '#6c63ff' },
    history: { name: 'History', color: '#f59e0b' },
  };
  const found = { ...defaults };
  for (const key of ['biology', 'maths', 'history']) {
    const match = userSubjects.find(u => norm(u.name).includes(key === 'maths' ? 'math' : key));
    if (match) found[key] = { name: match.name, color: colorFor(match.color) };
  }
  // If user has none of these, use first three of their subjects
  const hasKeyword = userSubjects.some(u => /biology|math|history/i.test(u.name));
  if (!hasKeyword && userSubjects.length >= 1) {
    const list = userSubjects.slice(0, 3);
    const keys = ['biology', 'maths', 'history'];
    list.forEach((u, i) => { if (keys[i]) found[keys[i]] = { name: u.name, color: colorFor(u.color) }; });
    // If fewer than 3 user subjects, pad with default name/color but keep distinct
    for (let i = list.length; i < 3; i++) {
      found[keys[i]] = defaults[keys[i]];
    }
  }
  return found;
}

function fmtTime(t24) {
  const [h, m] = t24.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const h12 = ((h + 11) % 12) + 1;
  return m === 0 ? `${h12}${period}` : `${h12}:${m.toString().padStart(2, '0')}${period}`;
}

function durationMin(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh - sh) * 60 + (em - sm);
}

function ScreenMagic({ data, tweaks, onFinish }) {
  const subjects = useMemo(() => resolveSubjects(data.subjects), [data.subjects]);
  const [regenKey, setRegenKey] = useState(0);
  const [toast, setToast] = useState(null);
  const [shuffled, setShuffled] = useState(WEEK_SCHEDULE);

  // After mount, animate values in
  const totalSessions = shuffled.reduce((n, d) => n + d.blocks.length, 0);
  const totalMins = shuffled.reduce((n, d) => n + d.blocks.reduce((m, b) => m + durationMin(b.start, b.end), 0), 0);
  const totalHrs = (totalMins / 60).toFixed(1);

  const regenerate = () => {
    // Re-shuffle blocks across days to give a sense of "AI regenerated".
    const allBlocks = WEEK_SCHEDULE.flatMap(d => d.blocks);
    const shuffledBlocks = [...allBlocks].sort(() => Math.random() - 0.5);
    const newWeek = WEEK_SCHEDULE.map(d => ({ ...d, blocks: [] }));
    // Distribute back, mostly weekdays
    let bIdx = 0;
    const order = [0, 2, 1, 3, 4, 5]; // Mon, Wed, Tue, Thu, Fri, Sat
    for (const idx of order) {
      if (bIdx < shuffledBlocks.length) {
        newWeek[idx].blocks = [shuffledBlocks[bIdx++]];
      }
    }
    // Shift times slightly
    newWeek.forEach(d => {
      d.blocks = d.blocks.map(b => {
        const shift = (Math.floor(Math.random() * 5) - 2);
        const [sh, sm] = b.start.split(':').map(Number);
        const [eh, em] = b.end.split(':').map(Number);
        const ns = Math.max(8, Math.min(20, sh + shift));
        const ne = Math.max(ns + 1, Math.min(22, eh + shift));
        return { ...b, start: `${ns.toString().padStart(2,'0')}:${sm.toString().padStart(2,'0')}`, end: `${ne.toString().padStart(2,'0')}:${em.toString().padStart(2,'0')}` };
      });
    });
    setShuffled(newWeek);
    setRegenKey(k => k + 1);
    setToast('Week regenerated');
    setTimeout(() => setToast(null), 1800);
  };

  // ── DRAG TO RESCHEDULE ────────────────────────────────
  const [dragInfo, setDragInfo] = useState(null); // {fromDay, blockIdx, x, y}
  const [hoverDay, setHoverDay] = useState(null);
  const dayRefs = useRef({});

  const onBlockPointerDown = (e, dayIdx, blockIdx) => {
    e.preventDefault();
    const pt = e.touches ? e.touches[0] : e;
    setDragInfo({ fromDay: dayIdx, blockIdx, x: pt.clientX, y: pt.clientY });
  };

  useEffect(() => {
    if (!dragInfo) return;
    const move = (e) => {
      const pt = e.touches ? e.touches[0] : e;
      setDragInfo(d => d && ({ ...d, x: pt.clientX, y: pt.clientY }));
      // hit test
      let found = null;
      for (const [k, el] of Object.entries(dayRefs.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (pt.clientX >= r.left && pt.clientX <= r.right && pt.clientY >= r.top && pt.clientY <= r.bottom) {
          found = parseInt(k, 10); break;
        }
      }
      setHoverDay(found);
    };
    const up = () => {
      if (dragInfo && hoverDay != null && hoverDay !== dragInfo.fromDay) {
        // move block
        setShuffled(prev => {
          const next = prev.map(d => ({ ...d, blocks: [...d.blocks] }));
          const block = next[dragInfo.fromDay].blocks.splice(dragInfo.blockIdx, 1)[0];
          if (block) next[hoverDay].blocks.push(block);
          return next;
        });
        setToast('Moved');
        setTimeout(() => setToast(null), 1200);
      }
      setDragInfo(null);
      setHoverDay(null);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [dragInfo, hoverDay]);

  return (
    <>
      <div className="magic-bg" />
      <div className="content slide-enter" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: 'var(--accent)',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          <Icon.Sparkle /> Generated by Aced
        </div>

        <h1 className="title" style={{ marginTop: 14, fontSize: 32 }}>
          Your week is ready.
        </h1>
        <p className="subtitle">
          Aced built this around your deadlines and your time.
        </p>

        {/* Stats */}
        <div className="magic-stats">
          <div className="stat">
            <div className="n">{totalSessions}</div>
            <div className="l">SESSIONS</div>
          </div>
          <div className="stat">
            <div className="n">{totalHrs}h</div>
            <div className="l">FOCUS TIME</div>
          </div>
          <div className="stat">
            <div className="n">{data.subjects.length}</div>
            <div className="l">SUBJECTS</div>
          </div>
        </div>

        {/* Week view */}
        <div className="week-card" style={{ marginTop: 14 }} key={regenKey}>
          <div className="shimmer" key={`sh-${regenKey}`} />

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '4px 4px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 4,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>This week</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
                11 – 17 MAY 2026
              </div>
            </div>
            <button
              onClick={regenerate}
              style={{
                background: 'rgba(108, 99, 255, 0.08)',
                border: '1px solid rgba(108, 99, 255, 0.3)',
                color: 'var(--accent-2)',
                padding: '6px 10px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
              }}
            >
              <Icon.Sparkle /> Regenerate
            </button>
          </div>

          {shuffled.map((day, di) => {
            const isToday = di === 0;
            const isHover = hoverDay === di && dragInfo;
            return (
              <div
                key={day.day}
                className="day-row"
                ref={el => dayRefs.current[di] = el}
                style={{
                  animationDelay: `${0.18 + di * 0.07}s`,
                  background: isHover ? 'rgba(108, 99, 255, 0.08)' : 'transparent',
                  borderRadius: isHover ? 8 : 0,
                  transition: 'background 0.15s',
                }}
              >
                <div className={`day-label ${isToday ? 'today' : ''}`}>
                  <div className="d">{day.day}</div>
                  <div className="dt">{day.date} May</div>
                </div>
                <div className="day-blocks">
                  {day.blocks.length === 0 ? (
                    <span className="free-pill">FREE</span>
                  ) : (
                    day.blocks.map((b, bi) => {
                      // Figure subject from id
                      const subj = subjects[b.subjId] || { name: '?', color: '#888' };
                      const dur = durationMin(b.start, b.end);
                      const durStr = dur >= 60 ? `${(dur/60).toFixed(dur%60 ? 1 : 0)}h` : `${dur}m`;
                      const isDragging = dragInfo && dragInfo.fromDay === di && dragInfo.blockIdx === bi;
                      return (
                        <div
                          key={bi}
                          className="session-block"
                          style={{
                            background: `linear-gradient(135deg, ${subj.color}22, ${subj.color}10)`,
                            borderColor: `${subj.color}44`,
                            animationDelay: `${0.35 + di * 0.07}s`,
                            cursor: 'grab',
                            opacity: isDragging ? 0.5 : undefined,
                            touchAction: 'none',
                          }}
                          onMouseDown={(e) => onBlockPointerDown(e, di, bi)}
                          onTouchStart={(e) => onBlockPointerDown(e, di, bi)}
                        >
                          <div className="sb-bar" style={{ background: subj.color }} />
                          <div className="sb-body">
                            <div className="sb-name">{subj.name}</div>
                            <div className="sb-time">{fmtTime(b.start)} – {fmtTime(b.end)} · {durStr}</div>
                          </div>
                          <span className="spark"><Icon.Sparkle /></span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="legend">
          {Object.entries(subjects).map(([k, s]) => (
            <div key={k} className="legend-item">
              <div className="lg-dot" style={{ background: s.color }} />
              {s.name}
            </div>
          ))}
        </div>

        {/* Hint */}
        <div style={{
          marginTop: 16,
          padding: 12,
          background: 'rgba(255, 255, 255, 0.025)',
          border: '1px dashed var(--border-2)',
          borderRadius: 12,
          display: 'flex', gap: 10, alignItems: 'center',
          fontSize: 12,
          color: 'var(--text-2)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'rgba(108, 99, 255, 0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 2v12M8 2L5 5M8 2l3 3M8 14l-3-3M8 14l3-3" strokeLinecap="round" />
            </svg>
          </div>
          <div>Drag any block to a different day. Hold to reorder.</div>
        </div>

        {/* Drag ghost */}
        {dragInfo && (() => {
          const day = shuffled[dragInfo.fromDay];
          const b = day?.blocks[dragInfo.blockIdx];
          if (!b) return null;
          const subj = subjects[b.subjId] || { name: '?', color: '#888' };
          return (
            <div style={{
              position: 'fixed',
              left: dragInfo.x - 80,
              top: dragInfo.y - 18,
              pointerEvents: 'none',
              zIndex: 200,
              padding: '9px 11px',
              background: `linear-gradient(135deg, ${subj.color}44, ${subj.color}22)`,
              border: `1px solid ${subj.color}`,
              borderRadius: 10,
              minWidth: 160,
              display: 'flex', gap: 8, alignItems: 'center',
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 4px ${subj.color}22`,
              transform: 'rotate(-1.5deg) scale(1.04)',
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ width: 3, alignSelf: 'stretch', background: subj.color, borderRadius: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{subj.name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-2)', fontFamily: 'JetBrains Mono, monospace', marginTop: 1 }}>
                  {fmtTime(b.start)} – {fmtTime(b.end)}
                </div>
              </div>
              <span style={{ color: 'var(--accent)' }}><Icon.Sparkle /></span>
            </div>
          );
        })()}
      </div>

      <div className="footer" style={{ position: 'relative', zIndex: 2 }}>
        <button className="btn-primary" onClick={onFinish}>
          Let's go
          <Icon.Arrow />
        </button>
        <button className="share-link" onClick={() => { setToast('Link copied'); setTimeout(() => setToast(null), 1500); }}>
          <Icon.Share /> Share your plan
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

Object.assign(window, {
  ScreenLevel, ScreenSubjects, ScreenDeadlines, ScreenStyle, ScreenMagic,
  SUBJECT_PALETTE, colorFor,
});
