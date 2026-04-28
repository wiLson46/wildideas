// Core primitives — LogoMark with hover reassembly, Button w/ magnetic, Icons.

const LogoMark = ({ size = 24, color = 'currentColor', animated = false, hoverable = false, style = {} }) => {
  const [hovered, setHovered] = React.useState(false);
  // Start "entered" = true for non-animated uses; animated marks flip to entered after a rAF
  const [entered, setEntered] = React.useState(!animated);

  React.useEffect(() => {
    if (!animated) return;
    // Ensure we always end up entered, even if rAF is throttled
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setEntered(true));
    });
    const fallback = setTimeout(() => setEntered(true), 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); };
  }, [animated]);

  // The three polygons of the W
  const polys = [
    { id: 'main', points: "150.5 2.06 100.5 202.06 .5 52.06 .5 102.06 100.5 302.06 150.5 102.06 200.5 302.06 300.5 102.06 300.5 52.06 200.5 202.06 150.5 2.06",
      from: 'translate(0px,-90px)', delay: 0 },
    { id: 'left', points: "10.5 42.06 90.5 162.06 110.5 102.06 10.5 42.06",
      from: 'translate(-70px,-30px) rotate(-20deg)', delay: 90 },
    { id: 'right', points: "290.5 42.06 210.5 162.06 190.5 102.06 290.5 42.06",
      from: 'translate(70px,-30px) rotate(20deg)', delay: 140 },
  ];

  // If this instance is not animated, always render fully visible at rest (no transform, no opacity tricks)
  const staticRender = !animated;

  return (
    <svg
      viewBox="0 0 301 303.49"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{ display: 'block', overflow: 'visible', cursor: hoverable ? 'pointer' : 'inherit', ...style }}
      aria-hidden="true"
    >
      <g fill={color} style={{ transformOrigin: '150px 150px' }}>
        {polys.map(p => {
          if (staticRender) {
            const hoverT = hoverable && hovered && p.id !== 'main'
              ? (p.id === 'left' ? 'translate(-14px,-6px) rotate(-8deg)' : 'translate(14px,-6px) rotate(8deg)')
              : 'translate(0,0) rotate(0)';
            return (
              <polygon key={p.id} points={p.points} style={{
                transformBox: 'fill-box', transformOrigin: 'center',
                transform: hoverT,
                opacity: 1,
                transition: 'transform 420ms cubic-bezier(.34,1.56,.64,1)',
              }} />
            );
          }
          const hoverT = hoverable && hovered && p.id !== 'main'
            ? (p.id === 'left' ? 'translate(-14px,-6px) rotate(-8deg)' : 'translate(14px,-6px) rotate(8deg)')
            : 'translate(0,0) rotate(0)';
          return (
            <polygon key={p.id} points={p.points} style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: entered ? hoverT : p.from,
              opacity: entered ? 1 : 0,
              transition: `transform 700ms cubic-bezier(.34,1.56,.64,1) ${p.delay}ms, opacity 500ms ease ${p.delay}ms`,
            }} />
          );
        })}
      </g>
    </svg>
  );
};

// Magnetic button — subtle cursor-following translate
const MagneticButton = ({ children, variant = 'primary', onClick, strength = 14, style = {}, ...props }) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const [pressed, setPressed] = React.useState(false);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setT({ x: (x / r.width) * strength * 2, y: (y / r.height) * strength * 2 });
  };
  const reset = () => setT({ x: 0, y: 0 });

  const variants = {
    primary: {
      background: 'var(--wi-red)', color: '#fff',
      boxShadow: pressed ? '0 2px 0 0 var(--wi-ink)' : '0 8px 0 0 var(--wi-ink)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--wi-fg)',
      border: '2px solid var(--wi-fg)',
      boxShadow: 'none',
    },
    dark: {
      background: 'var(--wi-fg)', color: 'var(--wi-bg)',
      boxShadow: 'none',
    },
  };

  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => { reset(); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: 'var(--wi-font-display)',
        fontWeight: 600, fontSize: 15,
        padding: '16px 28px',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        transform: `translate(${t.x}px, ${t.y - (pressed ? 0 : 0)}px) scale(${pressed ? 0.97 : 1})`,
        transition: 'transform 220ms cubic-bezier(.16,1,.3,1), box-shadow 180ms ease, background 220ms, color 220ms, border-color 220ms',
        ...variants[variant],
        ...style,
      }}
      {...props}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        transform: `translate(${t.x * 0.4}px, ${t.y * 0.4}px)`,
        transition: 'transform 220ms cubic-bezier(.16,1,.3,1)',
      }}>
        {children}
      </span>
    </button>
  );
};

const Icon = ({ name, size = 20, stroke = 1.75 }) => {
  const paths = {
    'arrow-right': <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    'arrow-up-right': <><path d="M7 7h10v10"/><path d="M7 17 17 7"/></>,
    'sun': <><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></>,
    'moon': <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></>,
    'mail': <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></>,
    'x': <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }} aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

// Fade-up on scroll
const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        opacity: visible ? 1 : 0,
        transition: `transform 720ms cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 520ms ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Object.assign(window, { LogoMark, MagneticButton, Icon, Reveal });
