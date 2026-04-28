// Multi-row brand marquee — oversized "WILD IDEAS" looping in alternating directions.

const MarqueeRow = ({ items, direction = 'left', duration = 40, fontSize = 160, variant = 'outline' }) => {
  // Duplicate enough times to fill
  const loop = [...items, ...items, ...items, ...items];
  const color = variant === 'filled' ? 'var(--wi-red)' : 'transparent';
  const stroke = variant === 'outline' ? 'var(--wi-fg)' : (variant === 'ink' ? 'var(--wi-fg)' : 'var(--wi-red)');
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div
        className={direction === 'left' ? 'wi-mq-left' : 'wi-mq-right'}
        style={{
          display: 'flex', gap: 'clamp(24px, 6vw, 48px)', whiteSpace: 'nowrap',
          animationDuration: `${duration}s`,
          willChange: 'transform',
        }}
      >
        {loop.map((txt, i) => (
          <span key={i} style={{
            fontFamily: 'var(--wi-font-display)',
            fontWeight: 700,
            fontSize: `clamp(${fontSize * 0.5}px, ${fontSize * 0.1}vw, ${fontSize}px)`,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: variant === 'filled' ? '#fff' : (variant === 'ink' ? 'var(--wi-fg)' : 'transparent'),
            WebkitTextStroke: variant === 'outline' ? `1.5px ${stroke}` : undefined,
            textStroke: variant === 'outline' ? `1.5px ${stroke}` : undefined,
            display: 'inline-flex', alignItems: 'center', gap: 'clamp(24px, 6vw, 48px)',
            flexShrink: 0,
            padding: '0.05em 0',
          }}>
            {txt}
            <span style={{
              width: fontSize * 0.14, height: fontSize * 0.14,
              borderRadius: 999, background: 'var(--wi-red)',
              display: 'inline-block', flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
};

const MarqueeBand = ({ speed = 40, overlay = false, fontSize = 180 }) => (
  <section aria-hidden="true" style={{
    padding: overlay ? 0 : '40px 0',
    borderTop: overlay ? 'none' : '1px solid var(--wi-border)',
    borderBottom: overlay ? 'none' : '1px solid var(--wi-border)',
    background: overlay ? 'transparent' : 'var(--wi-bg-alt)',
    position: 'relative',
    overflow: 'hidden',
    pointerEvents: 'none',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <MarqueeRow items={["WILD IDEAS", "WILD IDEAS", "WILD IDEAS"]} direction="left"  duration={35} fontSize={fontSize} variant="ink" />
      <MarqueeRow items={["WILD IDEAS", "WILD IDEAS", "WILD IDEAS"]} direction="right" duration={20} fontSize={fontSize} variant="ink" />
    </div>
  </section>
);

Object.assign(window, { MarqueeRow, MarqueeBand });
