// Top-level app: state, step indicator, frame, navigation, Tweaks panel.

const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6c63ff",
  "density": "cozy",
  "showStats": true,
  "showSparkles": true,
  "showFrame": "auto"
}/*EDITMODE-END*/;

function App() {
  const [step, setStep] = useStateApp(0);
  const [data, setData] = useStateApp({
    level: 'alvl',
    subjects: [
      { id: 1, name: 'Biology', color: 'teal',   date: new Date(2026, 5, 12).toISOString() },
      { id: 2, name: 'Maths',   color: 'violet', date: new Date(2026, 5, 18).toISOString() },
      { id: 3, name: 'History', color: 'amber',  date: new Date(2026, 5, 5).toISOString()  },
    ],
    style: 'morning',
    hours: 15,
  });

  const [tweaks, setTweaks] = useStateApp(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useStateApp(false);

  // Apply accent CSS variable from tweaks
  useEffectApp(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    // derive a slightly lighter "accent-2"
    document.documentElement.style.setProperty('--accent-2', tweaks.accent === '#6c63ff' ? '#8b85ff' : tweaks.accent);
    const c = tweaks.accent.replace('#','');
    const r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.18)`);
  }, [tweaks.accent]);

  // Tweaks host protocol
  useEffectApp(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    setTweaks(t => ({ ...t, [k]: v }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const TOTAL = 5;
  const next = () => setStep(s => Math.min(s + 1, TOTAL - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const finish = () => setStep(0); // loop for prototype

  const renderScreen = () => {
    const props = { data, setData, onNext: next };
    switch (step) {
      case 0: return <ScreenLevel {...props} />;
      case 1: return <ScreenSubjects {...props} />;
      case 2: return <ScreenDeadlines {...props} />;
      case 3: return <ScreenStyle {...props} onGenerate={next} />;
      case 4: return <ScreenMagic data={data} tweaks={tweaks} onFinish={finish} />;
      default: return null;
    }
  };

  const screenInner = (
    <div className="screen">
      {/* Step indicator */}
      <div className="stepper">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`step-bar ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Skip on screens 1-3 */}
      {step > 0 && step < 4 && (
        <button className="skip-link" onClick={back}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon.ChevL /> Back
          </span>
        </button>
      )}

      <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {renderScreen()}
      </div>
    </div>
  );

  // Determine whether to show device frame
  const [isMobile, setIsMobile] = useStateApp(typeof window !== 'undefined' && window.innerWidth <= 640);
  useEffectApp(() => {
    const r = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  const useFrame = tweaks.showFrame === 'on' ? true : tweaks.showFrame === 'off' ? false : !isMobile;

  return (
    <>
      <div className="stage">
        {useFrame ? (
          <div className="frame-wrap ios-device-wrap">
            <IOSDevice width={402} height={874} dark={true}>
              {screenInner}
            </IOSDevice>
          </div>
        ) : (
          <div className="frame-wrap" style={{ width: '100%', height: '100vh' }}>
            <div className="mobile-shell" style={{ display: 'block' }}>{screenInner}</div>
          </div>
        )}

        {/* Side nav arrows (desktop only) */}
        {useFrame && (
          <>
            <button className="side-nav prev" onClick={back} disabled={step === 0} aria-label="Back">
              <Icon.ChevL />
            </button>
            <button className="side-nav next" onClick={next} disabled={step === TOTAL - 1} aria-label="Next">
              <Icon.ChevR />
            </button>
          </>
        )}
      </div>

      {tweaksOpen && (
        <TweaksPanel
          tweaks={tweaks}
          setTweak={setTweak}
          step={step}
          setStep={setStep}
          onClose={() => {
            setTweaksOpen(false);
            window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
          }}
        />
      )}
    </>
  );
}

function TweaksPanel({ tweaks, setTweak, step, setStep, onClose }) {
  const accents = [
    { name: 'Violet (default)', value: '#6c63ff' },
    { name: 'Indigo',           value: '#5b8def' },
    { name: 'Coral',            value: '#ff6b6b' },
    { name: 'Mint',             value: '#10b981' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 24, right: 24,
      width: 280,
      background: '#13131f',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 16,
      boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
      zIndex: 1000,
      color: '#f0f0f5',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Tweaks</div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.05)',
          border: 'none',
          color: '#8888aa',
          width: 24, height: 24, borderRadius: 6,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon.Close /></button>
      </div>

      {/* Jump to step */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Jump to step
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              onClick={() => setStep(n - 1)}
              style={{
                flex: 1,
                background: step === n - 1 ? tweaks.accent : 'rgba(255,255,255,0.04)',
                border: '1px solid ' + (step === n - 1 ? tweaks.accent : 'rgba(255,255,255,0.07)'),
                color: step === n - 1 ? 'white' : '#f0f0f5',
                padding: '8px 0',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >{n}</button>
          ))}
        </div>
      </div>

      {/* Accent */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Accent
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {accents.map(a => (
            <button
              key={a.value}
              onClick={() => setTweak('accent', a.value)}
              title={a.name}
              style={{
                flex: 1,
                aspectRatio: '1',
                background: a.value,
                border: tweaks.accent === a.value ? '2px solid white' : '2px solid transparent',
                borderRadius: 10,
                cursor: 'pointer',
                boxShadow: tweaks.accent === a.value ? `0 0 0 2px ${a.value}, 0 4px 12px ${a.value}66` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Frame */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 11, color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Device frame
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { v: 'auto', l: 'Auto' },
            { v: 'on',   l: 'iPhone' },
            { v: 'off',  l: 'Fullscreen' },
          ].map(o => (
            <button
              key={o.v}
              onClick={() => setTweak('showFrame', o.v)}
              style={{
                flex: 1,
                background: tweaks.showFrame === o.v ? 'rgba(108, 99, 255, 0.2)' : 'rgba(255,255,255,0.04)',
                border: '1px solid ' + (tweaks.showFrame === o.v ? tweaks.accent : 'rgba(255,255,255,0.07)'),
                color: tweaks.showFrame === o.v ? tweaks.accent : '#f0f0f5',
                padding: '8px 0',
                borderRadius: 8,
                fontSize: 11.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >{o.l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
