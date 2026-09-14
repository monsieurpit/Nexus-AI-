import React, { useEffect, useRef, useState } from 'react';

interface EntryAnimationProps {
  onDone: () => void;
}

// Choreographed shard configs — hand-tuned rather than Math.random() per mount so the sequence
// always reads as a deliberate assembly converging on the portal core, never a random scatter
// that might clump or overlap awkwardly on a given load.
const SHARDS = [
  { x: -60, y: -40, z: -900, rz: -35, delay: 0 },
  { x: 55, y: -55, z: -700, rz: 40, delay: 0.04 },
  { x: -70, y: 35, z: -1100, rz: -60, delay: 0.08 },
  { x: 65, y: 45, z: -800, rz: 55, delay: 0.03 },
  { x: 0, y: -70, z: -1000, rz: 20, delay: 0.1 },
  { x: 0, y: 65, z: -650, rz: -20, delay: 0.06 },
  { x: -85, y: 0, z: -950, rz: -80, delay: 0.12 },
  { x: 85, y: 5, z: -750, rz: 75, delay: 0.02 },
  { x: -40, y: -75, z: -1200, rz: -15, delay: 0.14 },
  { x: 45, y: 75, z: -900, rz: 30, delay: 0.09 },
  { x: -55, y: 60, z: -1050, rz: -50, delay: 0.16 },
  { x: 60, y: -60, z: -1150, rz: 65, delay: 0.05 },
] as const;

const TOTAL_MS = 2900;

/**
 * The site's entry animation — a full-viewport 3D portal made of counter-rotating glass rings
 * (each spinning a different direction/speed, at increasing depth, which is the part that reads
 * as physically "impossible" for solid glass) with shards flying in from deep 3D space to
 * assemble around a pulsing core, then an aperture-open reveal into the actual app. Pure CSS
 * (transform-style: preserve-3d + keyframes) — no animation library, so it costs nothing in
 * bundle size and never needs a JS render loop. Plays once per page load; skippable by click/key,
 * and never rendered at all when the user has disabled it or the OS requests reduced motion (both
 * checked by the caller before this component is even mounted).
 */
export const EntryAnimation: React.FC<EntryAnimationProps> = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    // Matches the reveal keyframe's own duration below — gives the aperture-open transition time
    // to actually play instead of hard-cutting the overlay away.
    setTimeout(onDone, 550);
  };

  useEffect(() => {
    const t = setTimeout(finish, TOTAL_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`entry-anim ${leaving ? 'entry-anim--leaving' : ''}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Skip entry animation"
    >
      <div className="entry-anim__scene">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`entry-anim__ring entry-anim__ring--${i}`} />
        ))}
        {SHARDS.map((s, i) => (
          <div
            key={i}
            className="entry-anim__shard"
            style={
              {
                '--sx': `${s.x}vmin`,
                '--sy': `${s.y}vmin`,
                '--sz': `${s.z}px`,
                '--srz': `${s.rz}deg`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="entry-anim__core" />
      </div>
      <div className="entry-anim__brand">NEXUS</div>
      <div className="entry-anim__skip">click or press any key to skip</div>
    </div>
  );
};
