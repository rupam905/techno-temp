import React, { useRef, useEffect, useCallback, useMemo } from "react";
import "./ProfileCard.css";

// Include your full gradient definitions here as in your previous CSS
const DEFAULT_BEHIND_GRADIENT = "...";
const DEFAULT_INNER_GRADIENT = "...";
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v, fMin, fMax, tMin, tMax) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));
const easeInOutCubic = x =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

function ProfileCard({
  avatarUrl,
  miniAvatarUrl,
  iconUrl,
  grainUrl,
  behindGradient = DEFAULT_BEHIND_GRADIENT,
  innerGradient = DEFAULT_INNER_GRADIENT,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  name,
  title,
  handle,
  status,
  contactText,
  showUserInfo = true,
  onContactClick = () => {}
}) {
  const wrapRef = useRef();
  const cardRef = useRef();

  const handlers = useMemo(() => {
    if (!enableTilt) return null;
    let raf;
    const update = (ox, oy, card, wrap) => {
      const { clientWidth: w, clientHeight: h } = card;
      const px = clamp((100 / w) * ox);
      const py = clamp((100 / h) * oy);
      const cx = px - 50;
      const cy = py - 50;
      Object.entries({
        "--pointer-x": `${px}%`,
        "--pointer-y": `${py}%`,
        "--background-x": `${adjust(px, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(py, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(cx, cy) / 50)}`,
        "--pointer-from-top": `${py / 100}`,
        "--pointer-from-left": `${px / 100}`,
        "--rotate-x": `${round(-cx / 5)}deg`,
        "--rotate-y": `${round(cy / 4)}deg`,
      }).forEach(([k, v]) => wrap.style.setProperty(k, v));
    };
    const smooth = (dur, sx, sy, card, wrap) => {
      const start = performance.now();
      const tx = wrap.clientWidth / 2;
      const ty = wrap.clientHeight / 2;
      const loop = now => {
        const t = clamp((now - start) / dur);
        const e = easeInOutCubic(t);
        update(adjust(e, 0, 1, sx, tx), adjust(e, 0, 1, sy, ty), card, wrap);
        if (t < 1) raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    return { update, createSmoothAnimation: smooth, cancel: () => raf && cancelAnimationFrame(raf) };
  }, [enableTilt]);

  const onMove = useCallback(e => {
    const c = cardRef.current;
    const w = wrapRef.current;
    if (!c || !w || !handlers) return;
    const r = c.getBoundingClientRect();
    handlers.update(e.clientX - r.left, e.clientY - r.top, c, w);
  }, [handlers]);

  const onEnter = useCallback(() => {
    const c = cardRef.current; const w = wrapRef.current;
    handlers?.cancel();
    w?.classList.add("active");
    c?.classList.add("active");
  }, [handlers]);

  const onLeave = useCallback(e => {
    const c = cardRef.current; const w = wrapRef.current;
    if (!c || !w || !handlers) return;
    handlers.createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, e.offsetX, e.offsetY, c, w);
    w.classList.remove("active");
    c.classList.remove("active");
  }, [handlers]);

  useEffect(() => {
    if (!enableTilt || !handlers) return;
    const c = cardRef.current;
    const w = wrapRef.current;
    c.addEventListener("pointerenter", onEnter);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerleave", onLeave);
    const ix = w.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const iy = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    handlers.update(ix, iy, c, w);
    handlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, ix, iy, c, w);
    return () => {
      c.removeEventListener("pointerenter", onEnter);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerleave", onLeave);
      handlers.cancel();
    };
  }, [enableTilt, handlers, onEnter, onMove, onLeave]);

  const style = useMemo(() => ({
    "--icon": iconUrl ? `url(${iconUrl})` : "none",
    "--grain": grainUrl ? `url(${grainUrl})` : "none",
    "--behind-gradient": showBehindGradient ? behindGradient : "none",
    "--inner-gradient": innerGradient
  }), [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`} style={style}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${name} avatar`}
              loading="lazy"
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name} mini avatar`}
                      loading="lazy"
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(ProfileCard);
