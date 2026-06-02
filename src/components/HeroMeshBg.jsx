import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * HeroMeshBg — GSAP-animated gradient blob background
 * Two large radial blobs that slowly breathe and drift.
 * Scoped to the hero section only.
 */
export default function HeroMeshBg() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    const tl1 = gsap.timeline({ repeat: -1, yoyo: true, ease: 'power2.inOut' });
    tl1.to(blob1Ref.current, { x: 90, y: -70, scale: 1.18, duration: 9 });

    const tl2 = gsap.timeline({ repeat: -1, yoyo: true, delay: 3.5, ease: 'power2.inOut' });
    tl2.to(blob2Ref.current, { x: -70, y: 90, scale: 1.22, duration: 11 });

    const tl3 = gsap.timeline({ repeat: -1, yoyo: true, delay: 6, ease: 'sine.inOut' });
    tl3.to(blob3Ref.current, { x: 40, y: -40, scale: 0.88, opacity: 0.4, duration: 13 });

    return () => { tl1.kill(); tl2.kill(); tl3.kill(); };
  }, []);

  return (
    <div className="hero-mesh-bg" aria-hidden="true">
      <div ref={blob1Ref} className="hero-mesh-blob hero-mesh-blob--cyan" />
      <div ref={blob2Ref} className="hero-mesh-blob hero-mesh-blob--purple" />
      <div ref={blob3Ref} className="hero-mesh-blob hero-mesh-blob--blue" />
    </div>
  );
}
