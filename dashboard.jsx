// Dashboard.jsx — Aced home screen
// Mobile-first, 390px frame. Dark mode only.

const C = {
  bg: '#080810',
  surface: '#12121f',
  surfaceHi: '#161624',
  accent: '#6c63ff',
  accentSoft: 'rgba(108,99,255,0.15)',
  accentSofter: 'rgba(108,99,255,0.08)',
  green: '#22c55e',
  amber: '#f59e0b',
  red: '#ef4444',
  teal: '#14b8a6',
  text: '#f0f0f5',
  text2: '#8888aa',
  text3: '#5a5a78',
  border: 'rgba(255,255,255,0.07)',
  borderHi: 'rgba(255,255,255,0.12)',
};

// ─── Icons (stroke=currentColor so we can color via CSS) ──────────────
const Icon = {
  bell: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  flame: (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 2c.5 3-.5 5-2 6.5C8.5 10.5 6 13 6 16.5A6.5 6.5 0 0 0 18.5 18c.5-3-1-5.5-3-7C14 9.5 13 7 12.5 2z"/>
      <path d="M11 13c-.5 1.5-2 2.5-2 4.5A2.5 2.5 0 0 0 13.5 18c.2-1.3-.5-2.3-1.5-3-.7-.5-1-1.2-1-2z" fill="#fff" fillOpacity="0.35"/>
    </svg>
  ),
  arrow: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  chevron: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  ),
  plus: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  // Nav icons
  home: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z" fillOpacity={active ? 0.22 : 0}/>
    </svg>
  ),
  calendar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2.5"/>
      <path d="M3 10h18M8 3v4M16 3v4"/>
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  timer: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13.5" r="7.5"/>
      <path d="M12 9.5v4l2.5 2M9 2.5h6M12 6V3"/>
    </svg>
  ),
  user: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8.5" r="4"/>
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
    </svg>
  ),
};

// ─── Top app bar ──────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="flex items-center justify-between" style={{ padding: '8px 20px 4px' }}>
      <div style={{
        fontFamily: 'Inter, system-ui', fontWeight: 800, fontSize: 22,
        letterSpacing: -0.5, color: C.accent,
      }}>
        Aced<span style={{ color: C.accent, opacity: 0.55 }}>.</span>
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <button aria-label="Notifications" style={{
          width: 40, height: 40, borderRadius: 12, position: 'relative',
          background: C.surface, border: `1px solid ${C.border}`,
          color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          {Icon.bell}
          <span style={{
            position: 'absolute', top: 9, right: 10, width: 8, height: 8,
            borderRadius: 999, background: C.accent,
            boxShadow: `0 0 0 2px ${C.surface}`,
          }} />
        </button>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'linear-gradient(135deg, #6c63ff 0%, #a855f7 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 13, color: '#fff', letterSpacing: 0.3,
          border: `1px solid rgba(255,255,255,0.12)`,
        }}>JA</div>
      </div>
    </div>
  );
}

// ─── Greeting block ───────────────────────────────────────────────────
function Greeting() {
  return (
    <div style={{ padding: '14px 20px 18px' }}>
      <div style={{
        color: C.text3, fontSize: 12, fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6,
      }}>
        Tuesday, 13 May
      </div>
      <h1 style={{
        fontFamily: 'Inter, system-ui', fontWeight: 800, fontSize: 24,
        color: C.text, letterSpacing: -0.6, lineHeight: 1.15, margin: 0,
      }}>
        Good evening, Jawad <span style={{ display: 'inline-block' }}>👋</span>
      </h1>
      <p style={{
        marginTop: 6, marginBottom: 0, color: C.text2,
        fontSize: 14, fontWeight: 400, lineHeight: 1.4,
      }}>
        You have <span style={{ color: C.text, fontWeight: 600 }}>3 sessions</span> planned today.
      </p>
    </div>
  );
}

// ─── Stat pills row ───────────────────────────────────────────────────
function StreakPill() {
  return (
    <div style={{
      flex: 1, padding: '14px 14px', borderRadius: 16,
      background: `linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)`,
      border: `1px solid rgba(245,158,11,0.18)`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        borderRadius: 999, background: 'rgba(245,158,11,0.10)', filter: 'blur(20px)',
      }} />
      <div className="flex items-center" style={{ gap: 8, position: 'relative' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 10,
          background: 'rgba(245,158,11,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.amber,
        }}>{Icon.flame}</div>
        <div style={{ color: C.text2, fontSize: 11, fontWeight: 500, letterSpacing: 0.2 }}>STREAK</div>
      </div>
      <div style={{
        marginTop: 8, fontFamily: 'Inter, system-ui', fontWeight: 800,
        fontSize: 22, color: C.text, letterSpacing: -0.5, lineHeight: 1,
      }}>
        12 <span style={{ fontSize: 13, fontWeight: 600, color: C.text2, letterSpacing: 0 }}>days</span>
      </div>
      <div style={{ marginTop: 4, color: C.amber, fontSize: 11, fontWeight: 600 }}>
        +1 from yesterday
      </div>
    </div>
  );
}

function ProgressPill() {
  const pct = 9 / 15; // 60%
  const r = 22; const cx = 26; const cy = 26;
  const circ = 2 * Math.PI * r;
  // 3/4 arc (270deg) from bottom-left around top to bottom-right
  const arcLen = circ * 0.75;
  return (
    <div style={{
      flex: 1, padding: '14px 12px', borderRadius: 16,
      background: `linear-gradient(135deg, ${C.accentSoft} 0%, ${C.accentSofter} 100%)`,
      border: `1px solid rgba(108,99,255,0.22)`,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        position: 'absolute', top: -20, left: -20, width: 80, height: 80,
        borderRadius: 999, background: 'rgba(108,99,255,0.18)', filter: 'blur(22px)',
      }} />
      <svg width="46" height="46" viewBox="0 0 52 52" style={{ flexShrink: 0, position: 'relative' }}>
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b80ff"/>
            <stop offset="100%" stopColor="#6c63ff"/>
          </linearGradient>
        </defs>
        {/* Track 3/4 arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5"
          strokeDasharray={`${arcLen} ${circ}`} strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        {/* Progress */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#arcGrad)" strokeWidth="5"
          strokeDasharray={`${arcLen * pct} ${circ}`} strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        <text x={cx} y={cy + 4} textAnchor="middle" fill={C.text}
          style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 13, letterSpacing: -0.3 }}>60%</text>
      </svg>
      <div style={{ position: 'relative', minWidth: 0 }}>
        <div style={{ color: C.text2, fontSize: 10, fontWeight: 600, letterSpacing: 0.4 }}>WEEKLY</div>
        <div style={{
          marginTop: 4, fontFamily: 'Inter', fontWeight: 800,
          fontSize: 18, color: C.text, letterSpacing: -0.4, lineHeight: 1, whiteSpace: 'nowrap',
        }}>
          9<span style={{ color: C.text2, fontWeight: 600, fontSize: 14 }}>/15</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.text2, marginLeft: 2 }}>hrs</span>
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="flex" style={{ gap: 10, padding: '0 20px' }}>
      <StreakPill />
      <ProgressPill />
    </div>
  );
}

// ─── Session card ────────────────────────────────────────────────────
function SessionCard({ subject, task, duration, color, recommended }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      background: recommended
        ? `linear-gradient(135deg, rgba(108,99,255,0.10) 0%, ${C.surface} 60%)`
        : C.surface,
      border: `1px solid ${recommended ? 'rgba(108,99,255,0.28)' : C.border}`,
      padding: '14px 14px 14px 18px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: recommended ? `0 0 0 4px rgba(108,99,255,0.06), 0 8px 24px rgba(108,99,255,0.10)` : 'none',
      overflow: 'hidden',
    }}>
      {/* left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 10, bottom: 10, width: 4,
        background: color, borderRadius: 999,
        boxShadow: `0 0 12px ${color}55`,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 3 }}>
          <span style={{
            fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: C.text,
            letterSpacing: -0.3,
          }}>{subject}</span>
          {recommended && (
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
              color: C.accent, background: 'rgba(108,99,255,0.16)',
              padding: '2px 6px', borderRadius: 6, textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>Now</span>
          )}
        </div>
        <div style={{
          color: C.text2, fontSize: 13, fontWeight: 400, lineHeight: 1.35,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{task}</div>
        <div className="flex items-center" style={{ gap: 6, marginTop: 8, whiteSpace: 'nowrap' }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: C.text2,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${C.border}`,
            padding: '3px 8px', borderRadius: 8, whiteSpace: 'nowrap',
          }}>{duration}m</span>
          <span style={{ fontSize: 11, color: C.text3 }}>·</span>
          <span style={{ fontSize: 11, color: C.text3, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {recommended ? '6:00–7:30 PM' : duration === 60 ? '8:00–9:00 PM' : '9:15–10:00 PM'}
          </span>
        </div>
      </div>
      <button style={{
        flexShrink: 0,
        background: recommended ? C.accent : 'rgba(255,255,255,0.06)',
        color: recommended ? '#fff' : C.text,
        border: 'none', borderRadius: 12,
        padding: '0 12px', height: 38, minWidth: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: 'Inter', fontWeight: 600, fontSize: 13,
        cursor: 'pointer',
        boxShadow: recommended ? '0 4px 14px rgba(108,99,255,0.45)' : 'none',
      }}>
        Start <span style={{ display: 'inline-flex' }}>{Icon.arrow}</span>
      </button>
    </div>
  );
}

function TodaySection() {
  return (
    <div style={{ padding: '24px 20px 4px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <div className="flex items-baseline" style={{ gap: 8 }}>
          <h2 style={{
            margin: 0, fontFamily: 'Inter', fontWeight: 800, fontSize: 18,
            color: C.text, letterSpacing: -0.4, whiteSpace: 'nowrap',
          }}>Today</h2>
          <span style={{ color: C.text3, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>3 sessions · 3h 15m</span>
        </div>
        <button style={{
          background: 'transparent', border: 'none', color: C.accent,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 2, padding: 4,
        }}>View all <span style={{ display: 'inline-flex', opacity: 0.8 }}>{Icon.chevron}</span></button>
      </div>
      <div className="flex flex-col" style={{ gap: 10 }}>
        <SessionCard subject="Biology" task="Chapter 7: Cell division" duration={90} color={C.teal} recommended />
        <SessionCard subject="Maths" task="Past paper: Algebra" duration={60} color={C.accent} />
        <SessionCard subject="History" task="Essay plan: WW2 causes" duration={45} color={C.amber} />
      </div>
    </div>
  );
}

// ─── Deadlines strip ─────────────────────────────────────────────────
function DeadlineChip({ subject, title, date, daysLeft, urgency }) {
  const dot = urgency === 'red' ? C.red : urgency === 'amber' ? C.amber : C.green;
  return (
    <div style={{
      flexShrink: 0, width: 180,
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: '12px 14px',
      position: 'relative',
    }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
          textTransform: 'uppercase', color: C.text2,
        }}>{subject}</span>
        <span style={{
          width: 8, height: 8, borderRadius: 999, background: dot,
          boxShadow: `0 0 8px ${dot}80`,
        }} />
      </div>
      <div style={{
        fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: C.text,
        letterSpacing: -0.3, lineHeight: 1.25,
      }}>{title}</div>
      <div className="flex items-baseline" style={{ gap: 6, marginTop: 8 }}>
        <span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18, color: dot, letterSpacing: -0.4, lineHeight: 1 }}>
          {daysLeft}
        </span>
        <span style={{ fontSize: 11, color: C.text2, fontWeight: 500 }}>days · {date}</span>
      </div>
    </div>
  );
}

function DeadlinesSection() {
  return (
    <div style={{ padding: '20px 0 16px' }}>
      <div className="flex items-center justify-between" style={{ padding: '0 20px', marginBottom: 12 }}>
        <h2 style={{
          margin: 0, fontFamily: 'Inter', fontWeight: 800, fontSize: 18,
          color: C.text, letterSpacing: -0.4,
        }}>Upcoming deadlines</h2>
        <button style={{
          background: 'transparent', border: 'none', color: C.accent,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 4,
        }}>3</button>
      </div>
      <div style={{
        display: 'flex', gap: 10, padding: '0 20px',
        overflowX: 'auto', WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        <DeadlineChip subject="Biology" title="Final Exam" date="12 Jun" daysLeft={30} urgency="red" />
        <DeadlineChip subject="History" title="Essay Submission" date="28 May" daysLeft={15} urgency="amber" />
        <DeadlineChip subject="Maths" title="Final Exam" date="18 Jun" daysLeft={36} urgency="green" />
        <DeadlineChip subject="English" title="Coursework" date="04 Jul" daysLeft={52} urgency="green" />
      </div>
    </div>
  );
}

// ─── Bottom nav ──────────────────────────────────────────────────────
function NavItem({ icon, label, active }) {
  return (
    <button style={{
      flex: 1, height: 56, background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 3, color: active ? C.accent : C.text2,
      position: 'relative',
    }}>
      {icon}
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: 0.2,
      }}>{label}</span>
      {active && (
        <span style={{
          position: 'absolute', bottom: 6, width: 4, height: 4, borderRadius: 999,
          background: C.accent, boxShadow: `0 0 8px ${C.accent}`,
        }} />
      )}
    </button>
  );
}

function BottomNav() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      paddingBottom: 28, // space for home indicator
      background: 'linear-gradient(180deg, rgba(8,8,16,0) 0%, rgba(8,8,16,0.95) 35%, #080810 100%)',
      pointerEvents: 'none',
    }}>
      <div style={{
        margin: '0 12px', borderRadius: 22,
        background: 'rgba(18,18,31,0.88)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: `1px solid ${C.borderHi}`,
        display: 'flex', alignItems: 'center',
        boxShadow: '0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.3)',
        pointerEvents: 'auto',
      }}>
        <NavItem icon={Icon.home(true)} label="Home" active />
        <NavItem icon={Icon.calendar} label="Calendar" />
        <NavItem icon={Icon.target} label="Goals" />
        <NavItem icon={Icon.timer} label="Timer" />
        <NavItem icon={Icon.user} label="Profile" />
      </div>
    </div>
  );
}

// ─── FAB ─────────────────────────────────────────────────────────────
function FAB() {
  return (
    <button aria-label="Add" style={{
      position: 'absolute', right: 22, bottom: 100, zIndex: 40,
      width: 56, height: 56, borderRadius: 18,
      background: `linear-gradient(135deg, #8b80ff 0%, ${C.accent} 100%)`,
      border: '1px solid rgba(255,255,255,0.18)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 12px 28px rgba(108,99,255,0.55), inset 0 1px 0 rgba(255,255,255,0.25)',
    }}>{Icon.plus}</button>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div style={{
      position: 'relative', height: '100%', width: '100%',
      background: C.bg,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: C.text, overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 360, height: 240, borderRadius: 999,
        background: 'radial-gradient(closest-side, rgba(108,99,255,0.22), transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Scroll area */}
      <div style={{
        position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden',
        paddingTop: 56, // dynamic island + status bar clearance
        paddingBottom: 120, // nav clearance
        zIndex: 1,
        scrollbarWidth: 'none',
      }}>
        <TopBar />
        <Greeting />
        <StatsRow />
        <TodaySection />
        <DeadlinesSection />
      </div>
      <FAB />
      <BottomNav />
    </div>
  );
}

Object.assign(window, { Dashboard });
