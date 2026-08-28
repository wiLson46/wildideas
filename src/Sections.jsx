// Hero, Work, Contact, Footer

const ThemePill = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: 4,
        borderRadius: 999,
        background: 'var(--wi-bg-alt)',
        border: '1px solid var(--wi-border)',
        cursor: 'pointer',
        position: 'relative',
        width: 64, height: 32,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3, left: isDark ? 33 : 3,
        width: 26, height: 26, borderRadius: 999,
        background: 'var(--wi-fg)',
        transition: 'left 320ms cubic-bezier(.34,1.56,.64,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--wi-bg)',
      }}>
        <Icon name={isDark ? 'moon' : 'sun'} size={14} />
      </span>
      <span style={{ position: 'absolute', left: 10, top: 9, color: isDark ? 'var(--wi-fg-3)' : 'transparent', transition: 'color 200ms' }}>
        <Icon name="sun" size={14} />
      </span>
      <span style={{ position: 'absolute', right: 10, top: 9, color: !isDark ? 'var(--wi-fg-3)' : 'transparent', transition: 'color 200ms' }}>
        <Icon name="moon" size={14} />
      </span>
    </button>
  );
};

const LanguagePill = ({ lang, setLang }) => {
  const isEn = lang === 'en';
  return (
    <button
      aria-label="Toggle language"
      onClick={() => setLang(isEn ? 'es' : 'en')}
      style={{
        position: 'relative',
        padding: 4,
        borderRadius: 999,
        background: 'var(--wi-bg-alt)',
        border: '1px solid var(--wi-border)',
        cursor: 'pointer',
        width: 76, height: 32,
        fontFamily: 'var(--wi-font-mono)',
        fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
        lineHeight: 1,
        display: 'flex',
      }}
    >
      {/* Sliding thumb */}
      <span style={{
        position: 'absolute',
        top: 3, left: isEn ? 39 : 3,
        width: 34, height: 24, borderRadius: 999,
        background: 'var(--wi-fg)',
        transition: 'left 320ms cubic-bezier(.34,1.56,.64,1)',
        zIndex: 0,
      }} />
      {/* Both labels in a flex row — center themselves vertically */}
      <span style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: !isEn ? 'var(--wi-bg)' : 'var(--wi-fg-3)',
        fontWeight: !isEn ? 700 : 400,
        transition: 'color 200ms',
      }}>ES</span>
      <span style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isEn ? 'var(--wi-bg)' : 'var(--wi-fg-3)',
        fontWeight: isEn ? 700 : 400,
        transition: 'color 200ms',
      }}>EN</span>
    </button>
  );
};

const Nav = ({ theme, setTheme, lang, setLang, t, onContactClick }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 16, left: 16, right: 16, zIndex: 50,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <nav style={{
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', maxWidth: 1280,
        padding: '10px 10px 10px 20px',
        background: scrolled ? 'color-mix(in srgb, var(--wi-bg) 82%, transparent)' : 'color-mix(in srgb, var(--wi-bg) 55%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid var(--wi-border)',
        borderRadius: 999,
        boxShadow: scrolled ? 'var(--wi-shadow-md)' : 'var(--wi-shadow-sm)',
        transition: 'all 280ms cubic-bezier(.16,1,.3,1)',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--wi-fg)' }}>
          <LogoMark size={22} color="var(--wi-red)" hoverable />
          <span className="wi-nav-logo-text" style={{ fontFamily: 'var(--wi-font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>Wild Ideas</span>
        </a>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)',
          fontFamily: 'var(--wi-font-mono)', fontSize: 11,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          <a href="#work" style={{ color: 'var(--wi-fg)', textDecoration: 'none' }}>{t?.navWork || 'Work'}</a>
          <a href="#contact" style={{ color: 'var(--wi-fg)', textDecoration: 'none' }}>{t?.navContact || 'Contact'}</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LanguagePill lang={lang} setLang={setLang} />
          <ThemePill theme={theme} setTheme={setTheme} />
        </div>
      </nav>
    </div>
  );
};

// ------------- HERO -------------

const Hero = ({ logoScale = 1, marqueeOn = true, marqueeSpeed = 40, t, onContactClick, onSeeWork }) => {
  const [parallax, setParallax] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setParallax({
      x: (e.clientX - cx) / cx * 10,
      y: (e.clientY - cy) / cy * 10,
    });
  };

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 15vh, 120px) 16px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Oversized viewport-clipped W */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: `${140 * logoScale}vmin`,
          height: `${140 * logoScale}vmin`,
          transform: `translate(${parallax.x * 0.6}px, ${parallax.y * 0.6}px)`,
          transition: 'transform 400ms cubic-bezier(.16,1,.3,1)',
        }} aria-hidden="true">
          <LogoMark size="100%" color="var(--wi-red)" animated style={{ pointerEvents: 'auto' }} />
        </div>
      </div>

      {/* Marquee overlay — sits between the W and the foreground chrome */}
      {marqueeOn && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
          mixBlendMode: 'difference',
        }}>
          <div style={{ width: '100%' }}>
            <MarqueeBand overlay fontSize={120} />
          </div>
        </div>
      )}

      {/* Top-right eyebrow */}
      <div style={{
        position: 'absolute', top: 'clamp(80px, 12vh, 120px)', right: 'clamp(24px, 5vw, 48px)',
        fontFamily: 'var(--wi-font-mono)', fontSize: 11,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--wi-fg-2)', textAlign: 'right',
        mixBlendMode: 'difference',
        zIndex: 2,
      }}>
        Wild Ideas<br />
        <span style={{ color: 'var(--wi-red)' }}>{t?.heroEyebrow || 'Freelance · Est. 2019'}</span>
      </div>

      {/* Bottom-right scroll cue */}
      <div style={{
        position: 'absolute', bottom: 48, right: 48,
        fontFamily: 'var(--wi-font-mono)', fontSize: 11,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--wi-fg-2)', zIndex: 2,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span>{t?.scroll || 'Scroll'}</span>
        <span style={{ display: 'inline-block', width: 30, height: 1, background: 'var(--wi-fg-2)' }} />
      </div>

      {/* Center — removed Portfolio/2026 pill per request */}
    </section>
  );
};

// ------------- WORK -------------

const WorkCard = ({ item, index }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={item.href || "#"}
      onClick={(e) => { if (!item.href) e.preventDefault(); }}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--wi-surface)',
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid var(--wi-border)',
        boxShadow: hover ? '0 14px 0 0 var(--wi-fg)' : '0 6px 0 0 var(--wi-fg)',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 360ms cubic-bezier(.16,1,.3,1), box-shadow 260ms ease',
      }}
    >
      <div aria-hidden="true" style={{
        aspectRatio: '5 / 4',
        background: item.cover,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {item.motif === 'W' && (
          <div style={{
            width: '60%',
            transform: hover ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
            transition: 'transform 500ms cubic-bezier(.16,1,.3,1)',
          }}>
            <LogoMark size="100%" color={item.motifColor} />
          </div>
        )}
        {item.motif === 'type' && (
          <div style={{
            fontFamily: 'var(--wi-font-display)',
            fontWeight: 700, color: item.motifColor,
            fontSize: 'clamp(100px, 20vw, 180px)', letterSpacing: '-0.06em', lineHeight: 1.1,
          }}>{item.motifText}</div>
        )}
        {item.motif === 'grid' && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(${item.motifColor} 1px, transparent 1px),linear-gradient(90deg,${item.motifColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        )}
        {item.motif === 'img' && (
          <div style={{
            width: '70%',
            transform: hover ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
            transition: 'transform 500ms cubic-bezier(.16,1,.3,1)',
          }}>
            <img
              src={item.motifSrc}
              alt={item.client}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'var(--wi-font-mono)', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          background: 'rgba(34,37,44,0.6)', color: '#fff',
          backdropFilter: 'blur(6px)',
          padding: '5px 10px', borderRadius: 999,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{
          fontFamily: 'var(--wi-font-mono)', fontWeight: 700, fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--wi-red)',
        }}>
          {item.discipline} / {item.year}
        </div>
        <h3 style={{
          fontFamily: 'var(--wi-font-display)',
          fontWeight: 700, margin: 0,
          fontSize: 24, lineHeight: 1.2,
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: 'var(--wi-font-body)',
          fontSize: 14, lineHeight: 1.55, margin: 0,
          color: 'var(--wi-fg-2)',
        }}>{item.outcome}</p>
        <div style={{
          marginTop: 'auto', paddingTop: 14,
          borderTop: '1px solid var(--wi-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--wi-font-mono)', fontSize: 12,
          color: 'var(--wi-fg-3)',
        }}>
          <span>{item.client}</span>
          <span style={{
            color: hover ? 'var(--wi-red)' : 'var(--wi-fg)',
            transform: hover ? 'translateX(4px)' : 'none',
            transition: 'all 220ms cubic-bezier(.16,1,.3,1)',
            fontFamily: 'var(--wi-font-display)', fontWeight: 600, fontSize: 14,
          }}>View →</span>
        </div>
      </div>
    </a>
  );
};

const MiniCard = ({ item }) => {
  const [hover, setHover] = React.useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 14, padding: '28px 20px',
        background: 'var(--wi-surface)',
        borderRadius: 'var(--wi-r-lg)',
        border: '1px solid var(--wi-border)',
        boxShadow: hover ? '0 8px 0 0 var(--wi-fg)' : '0 4px 0 0 var(--wi-fg)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 360ms cubic-bezier(.16,1,.3,1), box-shadow 260ms ease',
        cursor: item.href ? 'pointer' : 'default',
        textDecoration: 'none', color: 'inherit',
      }}
    >
      <LogoMark size={36} color="var(--wi-red)" />
      <span style={{
        fontFamily: 'var(--wi-font-mono)', fontSize: 11,
        fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--wi-fg-2)',
      }}>
        {item.name}
      </span>
    </div>
  );
  return item.href
    ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
    : inner;
};

const MiniWork = ({ items }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16,
    marginTop: 20,
  }} className="wi-mini-grid">
    {items.map(it => (
      <MiniCard key={it.id} item={it} />
    ))}
  </div>
);

const Work = ({ items, miniItems, t }) => (
  <section id="work" style={{
    maxWidth: 1280,
    margin: '0 auto',
    padding: '120px 32px 96px',
  }}>
    <Reveal>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{
            fontFamily: 'var(--wi-font-mono)', fontWeight: 700, fontSize: 12,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--wi-red)', marginBottom: 14,
          }}>
            {t?.workEyebrow || 'Selected work'}
          </div>
          <h2 style={{
            fontFamily: 'var(--wi-font-display)', fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            margin: 0, maxWidth: 900,
          }}>
            {t ? (<>{t.workHeadline[0]} <span style={{ color: 'var(--wi-red)' }}>{t.workHeadline[1]}</span> {t.workHeadline[2]}</>) : (<>Three favourites. <span style={{ color: 'var(--wi-red)' }}>Forty-odd more</span> in the drawer.</>)}
          </h2>
        </div>
      </header>
    </Reveal>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 28,
    }} className="wi-work-grid">
      {items.map((it, i) => (
        <Reveal key={it.id} delay={i * 120} style={{ height: '100%' }}>
          <WorkCard item={it} index={i} />
        </Reveal>
      ))}
    </div>
    {miniItems?.length > 0 && <MiniWork items={miniItems} />}
  </section>
);

// ------------- CONTACT -------------

// Fisheye dot grid — base contrast pattern that bulges outward and
// reddens around the cursor. DOM-mutates dots directly (no React re-render).
const FisheyeGrid = () => {
  const containerRef = React.useRef(null);
  const dotsRef = React.useRef([]);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const SPACING = 30;
  const RADIUS = 200;

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dots = React.useMemo(() => {
    if (!size.w || !size.h) return [];
    const cols = Math.ceil(size.w / SPACING) + 1;
    const rows = Math.ceil(size.h / SPACING) + 1;
    const offsetX = (size.w - (cols - 1) * SPACING) / 2;
    const offsetY = (size.h - (rows - 1) * SPACING) / 2;
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ x: offsetX + c * SPACING, y: offsetY + r * SPACING });
      }
    }
    return arr;
  }, [size]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || !dots.length) return;
    const parent = container.parentElement;
    if (!parent) return;
    let raf = 0;
    let pending = null;

    const reset = () => {
      const els = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const el = els[i];
        if (!el) continue;
        el.setAttribute('cx', d.x);
        el.setAttribute('cy', d.y);
        el.setAttribute('r', 1.6);
        el.style.fill = 'var(--wi-bg)';
        el.style.opacity = 0.24;
      }
    };

    const apply = (mx, my) => {
      const els = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const el = els[i];
        if (!el) continue;
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const t = 1 - dist / RADIUS;
          const ease = t * t;
          const push = ease * 22;
          const angle = Math.atan2(dy, dx);
          el.setAttribute('cx', d.x + Math.cos(angle) * push);
          el.setAttribute('cy', d.y + Math.sin(angle) * push);
          el.setAttribute('r', 1.6 + ease * 4.5);
          el.style.fill = `color-mix(in srgb, var(--wi-red) ${Math.round(ease * 100)}%, var(--wi-bg))`;
          el.style.opacity = 0.24 + ease * 0.76;
        } else {
          el.setAttribute('cx', d.x);
          el.setAttribute('cy', d.y);
          el.setAttribute('r', 1.6);
          el.style.fill = 'var(--wi-bg)';
          el.style.opacity = 0.24;
        }
      }
    };

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      pending = { mx: e.clientX - rect.left, my: e.clientY - rect.top };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending) apply(pending.mx, pending.my);
          raf = 0;
        });
      }
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', reset);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dots]);

  return (
    <div ref={containerRef} aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" style={{ display: 'block' }}>
        {dots.map((d, i) => (
          <circle
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            cx={d.x} cy={d.y} r={1.6}
            style={{ fill: 'var(--wi-bg)', opacity: 0.24 }}
          />
        ))}
      </svg>
    </div>
  );
};

const Contact = ({ t, onContactClick }) => (
  <section id="contact" style={{
    padding: '0 24px 80px',
  }}>
    <Reveal>
      <div className="wi-contact-bg" style={{
        background: 'var(--wi-fg)',
        color: 'var(--wi-bg)',
        borderRadius: 40,
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(24px, 5vw, 56px)',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}>
        <FisheyeGrid />
        <div aria-hidden="true" style={{
          position: 'absolute', right: -140, bottom: -180,
          width: 620, height: 620, opacity: 0.07, pointerEvents: 'none', zIndex: 0,
        }}>
          <LogoMark size="100%" color="var(--wi-bg)" />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            fontFamily: 'var(--wi-font-mono)', fontWeight: 700, fontSize: 12,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--wi-red)',
          }}>
            {t?.contactEyebrow || "Let's talk"}
          </div>
          <h2 style={{
            fontFamily: 'var(--wi-font-display)', fontWeight: 700,
            fontSize: 'clamp(44px, 7vw, 88px)',
            lineHeight: 1.1, letterSpacing: '-0.035em',
            margin: 0,
            paddingTop: '0.05em',
          }}>
            {t ? (<>{t.contactHeadline[0]}<br />{t.contactHeadline[1]} <span style={{ color: 'var(--wi-red)' }}>{t.contactHeadline[2]}</span></>) : (<>Tell me what you're<br />building. <span style={{ color: 'var(--wi-red)' }}>Seriously.</span></>)}
          </h2>
          <p style={{
            fontFamily: 'var(--wi-font-body)', fontSize: 19, lineHeight: 1.55,
            color: 'var(--wi-sand)', margin: 0, maxWidth: 560,
          }}>
            {t?.contactCopy || "Two sentences is plenty. I'll reply within a day with honest thoughts on fit, timeline, and what it'd cost."}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 16, flexWrap: 'wrap' }}>
            <MagneticButton variant="primary" onClick={onContactClick} aria-haspopup="dialog">
              {t?.startProject || 'Start a project'} <Icon name="arrow-right" size={16} />
            </MagneticButton>
            <a href="mailto:wildideas.ok@gmail.com" style={{
              fontFamily: 'var(--wi-font-mono)', fontSize: 14,
              color: 'var(--wi-bg)', textDecoration: 'none',
              padding: '16px 26px', borderRadius: 999,
              border: '1.5px solid color-mix(in srgb, var(--wi-bg) 24%, transparent)',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <Icon name="mail" size={16} /> wildideas.ok@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

// ------------- FOOTER -------------

const Footer = ({ t }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="wi-footer" style={{
      borderTop: '1px solid var(--wi-border)',
    }}>
      <div className="wi-footer-inner" style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 20,
        fontFamily: 'var(--wi-font-mono)', fontSize: 11,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--wi-fg-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
          <LogoMark size={18} color="var(--wi-red)" />
          <span>© {year} Wild Ideas{t?.footer ? ` · ${t.footer}` : ''}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
          <a href="https://github.com/wiLson46" style={{ color: 'var(--wi-fg)', textDecoration: 'none' }}>Github ↗</a>
          <a href="https://www.linkedin.com/in/wilsonericsola/" style={{ color: 'var(--wi-fg)', textDecoration: 'none' }}>Linkedin ↗</a>
          <a href="mailto:wildideas.ok@gmail.com" style={{ color: 'var(--wi-fg)', textDecoration: 'none' }}>Email ↗</a>
        </div>
      </div>
    </footer>
  );
};

// ------------- CONTACT PANEL -------------

// TODO: Reemplazar con la URL de tu deploy de Google Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOyeLM3DAgocqCezGaFATk8tnzZf9hM23IKY4mPiaCYij7V1aGiBjjaOWA76_X9A_wJw/exec';

const ContactPanel = ({ open, onClose, t }) => {
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error
  React.useEffect(() => { if (!open) setStatus('idle'); }, [open]);
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.elements['wi-name'].value,
      email: form.elements['wi-email'].value,
      message: form.elements['wi-message'].value,
    };
    setStatus('sending');
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.result === 'ok') {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(34,37,44,0.55)',
        backdropFilter: 'blur(6px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 260ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--wi-bg)',
          color: 'var(--wi-fg)',
          borderRadius: 32,
          maxWidth: 560, width: '100%',
          padding: 'clamp(24px, 5vw, 40px)',
          boxShadow: 'var(--wi-shadow-lg)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: 'transform 360ms cubic-bezier(.34,1.56,.64,1)',
          position: 'relative',
        }}
      >
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 16,
          width: 36, height: 36, borderRadius: 999, border: 'none',
          background: 'var(--wi-bg-alt)', color: 'var(--wi-fg)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="x" size={16} /></button>

        {status === 'idle' || status === 'sending' || status === 'error' ? (
          <>
            <div style={{
              fontFamily: 'var(--wi-font-mono)', fontWeight: 700, fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--wi-red)', marginBottom: 14,
            }}>{t?.formEyebrow || 'New project'}</div>
            <h3 id="contact-form-title" style={{
              fontFamily: 'var(--wi-font-display)', fontWeight: 700,
              fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.025em',
              margin: '0 0 20px',
            }}>{t?.formTitle || 'Say hi.'}</h3>
            {status === 'error' && (
              <div style={{
                fontFamily: 'var(--wi-font-mono)', fontSize: 12,
                color: 'var(--wi-red)', marginBottom: 14,
                padding: '10px 14px', borderRadius: 10,
                background: 'var(--wi-red-50)',
                border: '1px solid var(--wi-red-200)',
              }}>
                {t?.formError || 'Something went wrong. Please try again or email me directly.'}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input name="wi-name" aria-label={t?.fName || 'Your name'} placeholder={t?.fName || 'Your name'} required style={inputStyle} autoFocus disabled={status === 'sending'} />
              <input name="wi-email" aria-label={t?.fEmail || 'Email'} placeholder={t?.fEmail || 'Email'} type="email" required style={inputStyle} disabled={status === 'sending'} />
              <textarea name="wi-message" aria-label={t?.fMsg || 'Leave a message'} placeholder={t?.fMsg || 'Leave a message...'} rows={4} required style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--wi-font-body)' }} disabled={status === 'sending'} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                <MagneticButton type="submit" variant="primary" style={{ opacity: status === 'sending' ? 0.6 : 1, pointerEvents: status === 'sending' ? 'none' : 'auto' }}>
                  {status === 'sending'
                    ? (t?.sending || 'Sending...')
                    : (<>{t?.send || 'Send'} <Icon name="arrow-right" size={16} /></>)
                  }
                </MagneticButton>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 80, margin: '0 auto 20px' }}>
              <LogoMark size="100%" color="var(--wi-red)" animated />
            </div>
            <h3 style={{
              fontFamily: 'var(--wi-font-display)', fontWeight: 700,
              fontSize: 28, letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}>{t?.got || 'Got it.'}</h3>
            <p style={{
              fontFamily: 'var(--wi-font-body)', color: 'var(--wi-fg-2)',
              margin: 0,
            }}>{t?.gotSub || "I'll be in touch within a day."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  fontFamily: 'var(--wi-font-body)',
  fontSize: 15,
  padding: '14px 16px',
  borderRadius: 12,
  border: '1px solid var(--wi-border)',
  background: 'var(--wi-bg-alt)',
  color: 'var(--wi-fg)',
  outline: 'none',
};

Object.assign(window, { Nav, Hero, Work, WorkCard, MiniCard, MiniWork, Contact, FisheyeGrid, Footer, ContactPanel, ThemePill, LanguagePill });
