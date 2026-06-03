import { useEffect, useRef } from "react";

export default function TechGrid() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="tech-grid-wrapper">
      <div className="grid-pattern" />
      <div
        ref={spotlightRef}
        className="grid-spotlight"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(0, 242, 254, 0.05), rgba(157, 78, 221, 0.02) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}
