import { useEffect, useState } from "react";

export default function TechGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="tech-grid-wrapper">
      <div className="grid-pattern" />
      <div
        className="grid-spotlight"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 254, 0.05), rgba(157, 78, 221, 0.02) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}
