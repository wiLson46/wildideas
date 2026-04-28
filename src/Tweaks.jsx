// Tweaks panel — accent color, marquee speed, logo size, theme

const TWEAK_CONTROLS = ({ tweaks, setTweak, onClose }) => {
  const [dragging, setDragging] = React.useState(false);
  const [pos, setPos] = React.useState({ right: 20, bottom: 20 });

  return (
    <div
      style={{
        position: 'fixed',
        right: pos.right, bottom: pos.bottom,
        zIndex: 120,
        width: 'calc(100vw - 40px)',
        maxWidth: 300,
        background: 'var(--wi-bg)',
        border: '1px solid var(--wi-border)',
        borderRadius: 20,
        boxShadow: 'var(--wi-shadow-lg)',
        padding: 18,
        fontFamily: 'var(--wi-font-body)',
        color: 'var(--wi-fg)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{
          fontFamily: 'var(--wi-font-mono)', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--wi-red)',
        }}>Tweaks</div>
        <button onClick={onClose} aria-label="Close tweaks" style={{
          width: 28, height: 28, borderRadius: 999, border: 'none',
          background: 'var(--wi-bg-alt)', color: 'var(--wi-fg)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="x" size={14} /></button>
      </div>

      {/* Accent color */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--wi-font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wi-fg-2)', marginBottom: 8 }}>Accent</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { c: '#E14658', name: 'Red' },
            { c: '#3F3250', name: 'Plum' },
            { c: '#D89A3E', name: 'Amber' },
            { c: '#3F7D5B', name: 'Forest' },
            { c: '#22252C', name: 'Ink' },
          ].map(({ c, name }) => (
            <button key={c} onClick={() => setTweak('accent', c)} title={name} style={{
              width: 32, height: 32, borderRadius: 999,
              background: c,
              border: tweaks.accent === c ? '2px solid var(--wi-fg)' : '1px solid var(--wi-border)',
              cursor: 'pointer', padding: 0,
              transform: tweaks.accent === c ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 180ms',
            }} />
          ))}
        </div>
      </div>

      {/* Marquee speed */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--wi-font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wi-fg-2)' }}>Marquee speed</span>
          <span style={{ fontFamily: 'var(--wi-font-mono)', fontSize: 11, color: 'var(--wi-fg)' }}>{tweaks.marqueeSpeed}s</span>
        </div>
        <input type="range" min="15" max="80" value={tweaks.marqueeSpeed} onChange={(e) => setTweak('marqueeSpeed', parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--wi-red)' }} />
      </div>

      {/* Logo scale */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--wi-font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wi-fg-2)' }}>Logo size</span>
          <span style={{ fontFamily: 'var(--wi-font-mono)', fontSize: 11, color: 'var(--wi-fg)' }}>{tweaks.logoScale.toFixed(2)}×</span>
        </div>
        <input type="range" min="0.5" max="1.3" step="0.05" value={tweaks.logoScale} onChange={(e) => setTweak('logoScale', parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--wi-red)' }} />
      </div>

      {/* Marquee toggle */}
      <div style={{ marginBottom: 4 }}>
        <label style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--wi-font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wi-fg-2)',
          cursor: 'pointer',
        }}>
          <span>Marquee band</span>
          <span
            onClick={() => setTweak('marqueeOn', !tweaks.marqueeOn)}
            style={{
              width: 36, height: 20, borderRadius: 999,
              background: tweaks.marqueeOn ? 'var(--wi-red)' : 'var(--wi-bg-alt)',
              border: '1px solid var(--wi-border)',
              position: 'relative', cursor: 'pointer',
              transition: 'background 200ms',
            }}
          >
            <span style={{
              position: 'absolute', top: 2, left: tweaks.marqueeOn ? 18 : 2,
              width: 14, height: 14, borderRadius: 999, background: '#fff',
              transition: 'left 220ms cubic-bezier(.34,1.56,.64,1)',
            }} />
          </span>
        </label>
      </div>
    </div>
  );
};

const TweaksHost = ({ tweaks, setTweak }) => {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setActive(true);
      if (e.data?.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const close = () => {
    setActive(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  if (!active) return null;
  return <TWEAK_CONTROLS tweaks={tweaks} setTweak={setTweak} onClose={close} />;
};

Object.assign(window, { TweaksHost });
