import React, { useEffect, useRef, useState } from 'react';

interface EntryAnimationProps {
  onDone: () => void;
}

// Choreographed shard configs — hand-tuned rather than Math.random() per mount so the sequence
// always reads as a deliberate assembly converging on the portal core, never a random scatter
// that might clump or overlap awkwardly on a given load. Spread across a much wider delay range
// now that the whole sequence is longer, so shards keep arriving throughout instead of all being
// done in the first second.
const SHARDS = [
  { x: -60, y: -40, z: -1000, rz: -35, delay: 0 },
  { x: 55, y: -55, z: -800, rz: 40, delay: 0.18 },
  { x: -70, y: 35, z: -1250, rz: -60, delay: 0.36 },
  { x: 65, y: 45, z: -900, rz: 55, delay: 0.1 },
  { x: 0, y: -78, z: -1100, rz: 20, delay: 0.5 },
  { x: 0, y: 72, z: -750, rz: -20, delay: 0.26 },
  { x: -90, y: 0, z: -1050, rz: -80, delay: 0.64 },
  { x: 90, y: 5, z: -850, rz: 75, delay: 0.06 },
  { x: -42, y: -80, z: -1350, rz: -15, delay: 0.78 },
  { x: 48, y: 80, z: -1000, rz: 30, delay: 0.44 },
  { x: -58, y: 65, z: -1150, rz: -50, delay: 0.92 },
  { x: 62, y: -65, z: -1300, rz: 65, delay: 0.32 },
  { x: -30, y: -55, z: -1400, rz: 45, delay: 1.06 },
  { x: 35, y: 58, z: -1200, rz: -45, delay: 0.58 },
] as const;

// 6.4s — long enough for the hypercube + ring spectacle to actually register instead of flashing
// by, short enough to never feel like it's holding the app hostage.
const TOTAL_MS = 6400;
const LEAVE_MS = 900;

/**
 * The site's entry animation — a full-viewport 3D portal. A hypercube (two cubes built from real
 * `transform-style: preserve-3d` faces, tumbling independently on different axes at different
 * speeds so they visibly rotate *through* each other) sits inside six counter-rotating glass rings
 * at increasing depth, while shards fly in from deep 3D space and dissolve into a pulsing core
 * that eventually flashes and reveals the app. Every animated property here is `transform`,
 * `opacity`, or `filter` — the only three properties a browser can composite on the GPU without
 * re-running layout/paint — specifically so a dozen-plus simultaneously animating elements stays
 * smooth; the very first version of this animated `clip-path` across the whole viewport for its
 * reveal, which is NOT compositor-friendly and was the main source of visible jank. No animation
 * library, no JS render loop — pure CSS keyframes.
 */
export const EntryAnimation: React.FC<EntryAnimationProps> = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    setTimeout(onDone, LEAVE_MS);
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

        {/* The hypercube: an outer and inner cube, each independently tumbling on its own axis
            and speed, occupying the same 3D space — two solid objects visibly passing through
            each other is the actual "impossible" geometry here, not an illusion that only reads
            from one exact angle, so it holds up correctly under continuous rotation. */}
        <div className="entry-anim__hypercube entry-anim__hypercube--outer">
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div key={face} className={`entry-anim__face entry-anim__face--outer entry-anim__face--${face}`} />
          ))}
        </div>
        <div className="entry-anim__hypercube entry-anim__hypercube--inner">
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div key={face} className={`entry-anim__face entry-anim__face--inner entry-anim__face--${face}`} />
          ))}
        </div>

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
