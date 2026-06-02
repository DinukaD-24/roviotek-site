import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG paths for the 15 technologies (standard, highly recognizable icons)
const logos = {
  html: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 11.202.001.242-2.724H5.356l.72 8.16h8.408l-.36 4.026-3.148.85-3.15-.85-.2-2.278H4.81l.388 4.393L11.976 21l6.78-1.83.67-7.42H8.531z" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm4.814 12.474h8.41l-.36 4.005-3.15.85-3.147-.85-.2-2.254H4.811l.387 4.368L11.977 21l6.78-1.83.674-7.553H6.556l-.232-2.718h12.56l.243-2.724H5.357l.72 8.163.237 2.6z" />
    </svg>
  ),
  react: (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="tech-icon-svg">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  angular: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2L2 5.5l1.5 12.5 8.5 4 8.5-4 1.5-12.5L12 2zm0 3.3l5.5 11h-2.2l-1.1-2.5H9.8l-1.1 2.5H6.5l5.5-11zm1.7 6.7L12 8.3 10.3 12h3.4z" />
    </svg>
  ),
  php: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 13.5H8.7v-7h1.5v2.3h1.8c1.3 0 2.2.8 2.2 2.3s-.9 2.4-2.2 2.4zm5.5 0h-1.5v-7h1.5v2.3h1.8c1.3 0 2.2.8 2.2 2.3s-.9 2.4-2.2 2.4z" />
    </svg>
  ),
  springBoot: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.8 1.1 5.3 3 7.1V22h3v-2.3c2 .7 4.1.7 6 0V22h3v-2.9c1.9-1.8 3-4.3 3-7.1 0-5.5-4.5-10-10-10zm-1 12.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8l3.8-3.8c.8-.8 2-.8 2.8 0s.8 2 0 2.8L11 14.5z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm7.5 14.1l-7.5 4.2-7.5-4.2V8.9l7.5-4.2 7.5 4.2v7.2z M12 6.5l-4.5 2.5v5l4.5 2.5 4.5-2.5v-5L12 6.5z" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M22.6 11.4L12.6 1.4c-.8-.8-2-.8-2.8 0L8.2 3c-.2-.1-.4-.2-.7-.2-.8 0-1.5.7-1.5 1.5 0 .2.05.4.1.6L4.3 6.7c-.2-.05-.4-.1-.6-.1-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.6 0 1.1-.3 1.3-.8l2.5.6c.05.2.1.4.2.5v5.3c-.5.3-.8.8-.8 1.4 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.6-.3-1.1-.8-1.4V10c.5-.3.8-.8.8-1.4 0-.2-.05-.4-.1-.6l2.3-2.3c.2.05.4.1.6.1.2 0 .4-.05.6-.1l10 10c.8.8.8 2 0 2.8l-1.6 1.6c-.8.8-2 .8-2.8 0l-4-4c-.3.2-.6.3-1 .3-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5c.4 0 .7.1 1 .3l4 4 1.6-1.6c.8-.8.8-2 0-2.8z" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M13.9 8.2h-2.1v2.1h2.1V8.2zm2.7-2.7h-2.1v2.1h2.1V5.5zm0 2.7h-2.1v2.1h2.1V8.2zm2.7 0h-2.1v2.1h2.1V8.2zm2.7 0h-2.1v2.1H22V8.2zm-8.1-2.7h-2.1v2.1h2.1V5.5zm-2.7 0H8.5v2.1h2.1V5.5zm0 2.7H8.5v2.1h2.1V8.2zm-2.7 0H5.8v2.1h2.1V8.2zM2.4 12.3c-.1 0-.2.1-.2.2v.3c.1 1.7.5 3.3 1.3 4.8.9 1.7 2.3 3.1 4.1 4 1.8.9 3.8 1.4 5.9 1.4 5.1 0 9.2-3.1 10-7.3.2-1 .1-1.8-.1-2.7-.1-.4-.4-.6-.8-.6h-3.4c-.6 0-1.1.2-1.5.6-.8.8-1.9 1.3-3.1 1.3H8.3c-1.3 0-2.5-.7-3.2-1.8L2.4 12.3z" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3.3 1.6 6.2 4.1 8l.9-1.2C4.8 17.3 3.5 14.8 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 2.8-1.3 5.3-3.5 6.8l.9 1.2c2.5-1.8 4.1-4.7 4.1-8 0-5.5-4.5-10-10-10zm-1.8 6.5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3.6c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-3.6zm.5 1.5h2.6v3.6h-2.6V10zm8.3 8.3c-2.3 2.3-6.1 2.3-8.5 0l-.9.9c2.9 2.9 7.4 2.9 10.3 0l-.9-.9z" />
    </svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.2.71 4.22 1.92 5.88l1.35-1.35C4.47 15.29 4 13.71 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.71-.47 3.29-1.27 4.53l1.35 1.35C21.29 16.22 22 14.2 22 12c0-5.52-4.48-10-10-10zm.5 4.5c-2.48 0-4.5 2.02-4.5 4.5v1.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5V11c0-2.48-2.02-4.5-4.5-4.5zm-3 6V11c0-1.65 1.35-3 3-3s3 1.35 3 3v1.5c0 1.65-1.35 3-3 3s-3-1.35-3-3z M12 18.5c-2.5 0-4.5 1.5-5.5 3.5h11c-1-2-3-3.5-5.5-3.5z" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12.1 2.2c-.3 0-.6.1-.9.3C10 3.2 9.5 4.7 9.8 6.2c.2 1.1.8 2.2 1.6 3 .3.3.6.5.9.7-.3-.6-.5-1.3-.5-2.1 0-2.1 1.7-3.8 3.8-3.8.4 0 .9.1 1.3.2C16 3 14.2 2.2 12.1 2.2zM8.3 8.7C6.7 9.7 5.7 11.4 5.7 13.3c0 2.1 1.2 3.9 3 4.9.4.2.8.4 1.3.5-.8-.7-1.3-1.7-1.3-2.9 0-2.3 1.9-4.2 4.2-4.2.5 0 .9.1 1.3.2C13.2 10.3 10.8 9.3 8.3 8.7z M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.5.92 4.78 2.44 6.53L4.1 21.2l2.67-1.78C8.36 20.73 10.1 21.2 12 21.2c5.52 0 10-4.48 10-10S17.52 2 12 2zm1.5 13.5H9.7v-2.3h3.8v2.3zm0-3.8H9.7V9.4h3.8v2.3z" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M12 2C10.5 4 8 8 8 11.5c0 2.8 1.8 4.7 4 4.7s4-1.9 4-4.7C16 8 13.5 4 12 2zm-1.5 9.5c0-1.4.7-2.8 1.5-3.8.8 1 1.5 2.4 1.5 3.8s-.7 2.3-1.5 2.3-1.5-.9-1.5-2.3z M12 18.2c-.3 0-.6.1-.8.2L9.5 21c-.4.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l1.7-1.7c.3-.3.3-.8 0-1.1l-.9-.7z" />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" className="tech-icon-svg">
      <path d="M3.9 19.3L5.4 7.2c.1-.8.9-1.3 1.6-.9l3.5 2.1 4.5-8.5c.3-.6 1.2-.6 1.5 0l2.7 5.1 2.3-4.3c.3-.6 1.2-.6 1.5 0l2.6 4.9 1.1 9.3c.1 1.1-.6 2.1-1.7 2.3L12.5 24c-.3.1-.7.1-1 0L4.7 21.6c-1-.2-1.7-1.2-1.6-2.3z" />
    </svg>
  ),
};

const techItems = [
  {
    id: "html",
    name: "HTML",
    category: "frontend",
    desc: "Semantic document structures and accessibility-compliant web skeletons.",
    glowColor: "rgba(227, 79, 38, 0.12)",
    brandColor: "#e34f26",
    logoKey: "html",
  },
  {
    id: "css",
    name: "CSS",
    category: "frontend",
    desc: "Modern layouts, responsive design tokens, and fluid typography engines.",
    glowColor: "rgba(21, 114, 182, 0.12)",
    brandColor: "#1572b6",
    logoKey: "css",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    desc: "Declarative, component-based user interfaces with virtual DOM efficiency.",
    glowColor: "rgba(97, 218, 251, 0.12)",
    brandColor: "#61dafb",
    logoKey: "react",
  },
  {
    id: "angular",
    name: "Angular",
    category: "frontend",
    desc: "Enterprise-grade structure for complex client application frameworks.",
    glowColor: "rgba(221, 0, 49, 0.12)",
    brandColor: "#dd0031",
    logoKey: "angular",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    desc: "Flexible and time-tested server-side scripting supporting API layers.",
    glowColor: "rgba(119, 123, 180, 0.12)",
    brandColor: "#777bb4",
    logoKey: "php",
  },
  {
    id: "springBoot",
    name: "Spring Boot",
    category: "backend",
    desc: "Production-ready Java microservices with secure, scalable design.",
    glowColor: "rgba(109, 179, 63, 0.12)",
    brandColor: "#6db33f",
    logoKey: "springBoot",
  },
  {
    id: "nodejs",
    name: "NodeJS",
    category: "backend",
    desc: "Asynchronous event-driven runtime environment for scalable system architectures.",
    glowColor: "rgba(51, 153, 51, 0.12)",
    brandColor: "#339933",
    logoKey: "nodejs",
  },
  {
    id: "git",
    name: "Git",
    category: "devops",
    desc: "Distributed version control and optimized developer collaboration workflows.",
    glowColor: "rgba(240, 80, 50, 0.12)",
    brandColor: "#f05032",
    logoKey: "git",
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    desc: "Container isolation ensuring seamless parity between build environments.",
    glowColor: "rgba(36, 150, 237, 0.12)",
    brandColor: "#2496ed",
    logoKey: "docker",
  },
  {
    id: "aws",
    name: "AWS",
    category: "devops",
    desc: "Elastic cloud compute, serverless deployment pipelines, and global delivery.",
    glowColor: "rgba(255, 153, 0, 0.12)",
    brandColor: "#ff9900",
    logoKey: "aws",
  },
  {
    id: "postman",
    name: "Postman testing tools",
    category: "devops",
    desc: "Automated API verification suites, sandboxed scripting, and endpoint assertions.",
    glowColor: "rgba(255, 108, 55, 0.12)",
    brandColor: "#ff6c37",
    logoKey: "postman",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "databases",
    desc: "Highly-performant relational tables with query indexing and caching.",
    glowColor: "rgba(0, 117, 143, 0.12)",
    brandColor: "#00758f",
    logoKey: "mysql",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    desc: "Advanced open-source relational engine with object-relational extensions.",
    glowColor: "rgba(65, 105, 225, 0.12)",
    brandColor: "#4169e1",
    logoKey: "postgresql",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "databases",
    desc: "Scalable document-oriented NoSQL storage built for dynamic JSON schemas.",
    glowColor: "rgba(71, 162, 72, 0.12)",
    brandColor: "#47a248",
    logoKey: "mongodb",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "databases",
    desc: "Real-time key-value sync, serverless cloud storage, and security configurations.",
    glowColor: "rgba(255, 202, 40, 0.12)",
    brandColor: "#ffca28",
    logoKey: "firebase",
  },
];

const categoryLabels = [
  { id: "all", label: "All Capabilities" },
  { id: "frontend", label: "Front-End" },
  { id: "backend", label: "Back-End" },
  { id: "databases", label: "Databases" },
  { id: "devops", label: "DevOps & Cloud" },
];

function TechCard({ tech, isHighlighted, activeCategory }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const matchesCategory = activeCategory === "all" || tech.category === activeCategory;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`tech-showcase-card ${isHighlighted ? "active-highlight" : ""} ${
        matchesCategory ? "category-match" : "category-dimmed"
      }`}
      layout
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        "--glow-color": tech.glowColor,
        "--brand-color": tech.brandColor,
      }}
    >
      {/* Background radial mouse glow */}
      <div className="tech-card-glow-overlay" />

      {/* Decorative corners */}
      <span className="card-border-corner top-left" />
      <span className="card-border-corner top-right" />
      <span className="card-border-corner bottom-left" />
      <span className="card-border-corner bottom-right" />

      <div className="tech-showcase-card-inner">
        <div className="tech-showcase-icon-frame">
          {logos[tech.logoKey]}
        </div>
        <div className="tech-showcase-text">
          <span className="tech-showcase-category-tag">{tech.category}</span>
          <h4 className="tech-showcase-card-title">{tech.name}</h4>
          <p className="tech-showcase-card-desc">{tech.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStackShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredLayer, setHoveredLayer] = useState(null);

  const handleLayerHover = (layer) => {
    setHoveredLayer(layer);
  };

  const handleLayerClick = (layer) => {
    setActiveCategory(layer);
  };

  // Determine which cards should highlight based on diagram hover or active tab
  const getIsCardHighlighted = (tech) => {
    if (hoveredLayer) {
      return tech.category === hoveredLayer;
    }
    return activeCategory === "all" || tech.category === activeCategory;
  };

  return (
    <section id="tech-stack" className="tech-stack-section-wrapper">
      <div className="tech-section-header">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          We use cutting edge technologies to build robust solutions
        </p>
      </div>

      <div className="tech-showcase-layout">
        {/* LEFT COLUMN — Interactive Architecture Canvas Map */}
        <div className="tech-arch-diagram-col">
          <div className="arch-card-glass">
            <div className="arch-card-header">
              <span className="arch-status-indicator" />
              <span className="arch-header-title">System Architecture Ecosystem</span>
            </div>

            <div className="arch-svg-container">
              <svg viewBox="0 0 500 450" className="arch-system-svg" fill="none">
                {/* Defs for gradients, filters, and glow paths */}
                <defs>
                  <linearGradient id="cyber-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  
                  <radialGradient id="node-glow-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>

                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Animated Connection Pathways */}
                {/* 1. Client to API (Logic) */}
                <path
                  d="M 250 110 L 250 180"
                  className={`arch-conn-path ${
                    hoveredLayer === "frontend" || hoveredLayer === "backend" || activeCategory === "frontend" || activeCategory === "backend"
                      ? "path-active"
                      : ""
                  }`}
                />
                
                {/* 2. API (Logic) to Database */}
                <path
                  d="M 250 240 L 250 310"
                  className={`arch-conn-path ${
                    hoveredLayer === "backend" || hoveredLayer === "databases" || activeCategory === "backend" || activeCategory === "databases"
                      ? "path-active"
                      : ""
                  }`}
                />

                {/* 3. Operations (DevOps) encircling pathway */}
                <path
                  d="M 400 210 C 400 90, 250 90, 250 110"
                  className={`arch-conn-path path-devops ${
                    hoveredLayer === "devops" || activeCategory === "devops" ? "path-active" : ""
                  }`}
                />
                <path
                  d="M 400 210 C 400 330, 250 330, 250 310"
                  className={`arch-conn-path path-devops ${
                    hoveredLayer === "devops" || activeCategory === "devops" ? "path-active" : ""
                  }`}
                />

                {/* LAYER NODES */}
                {/* 1. FRONT-END LAYER */}
                <g
                  className={`arch-node-group ${
                    hoveredLayer === "frontend" || activeCategory === "frontend" ? "node-active" : ""
                  }`}
                  onMouseEnter={() => handleLayerHover("frontend")}
                  onMouseLeave={() => handleLayerHover(null)}
                  onClick={() => handleLayerClick("frontend")}
                >
                  <circle cx="250" cy="80" r="45" className="node-glow-circle" fill="url(#node-glow-grad)" />
                  <rect x="180" y="55" width="140" height="50" rx="8" className="node-border-rect" />
                  <text x="250" y="80" className="node-label-main" textAnchor="middle">
                    User Interface
                  </text>
                  <text x="250" y="95" className="node-label-sub" textAnchor="middle">
                    FRONT-END LAYER
                  </text>
                </g>

                {/* 2. BACK-END LAYER */}
                <g
                  className={`arch-node-group ${
                    hoveredLayer === "backend" || activeCategory === "backend" ? "node-active" : ""
                  }`}
                  onMouseEnter={() => handleLayerHover("backend")}
                  onMouseLeave={() => handleLayerHover(null)}
                  onClick={() => handleLayerClick("backend")}
                >
                  <circle cx="250" cy="210" r="45" className="node-glow-circle" fill="url(#node-glow-grad)" />
                  <rect x="180" y="185" width="140" height="50" rx="8" className="node-border-rect" />
                  <text x="250" y="210" className="node-label-main" textAnchor="middle">
                    APIs & Logic
                  </text>
                  <text x="250" y="225" className="node-label-sub" textAnchor="middle">
                    BACK-END LAYER
                  </text>
                </g>

                {/* 3. DATABASES LAYER */}
                <g
                  className={`arch-node-group ${
                    hoveredLayer === "databases" || activeCategory === "databases" ? "node-active" : ""
                  }`}
                  onMouseEnter={() => handleLayerHover("databases")}
                  onMouseLeave={() => handleLayerHover(null)}
                  onClick={() => handleLayerClick("databases")}
                >
                  <circle cx="250" cy="340" r="45" className="node-glow-circle" fill="url(#node-glow-grad)" />
                  <rect x="180" y="315" width="140" height="50" rx="8" className="node-border-rect" />
                  <text x="250" y="340" className="node-label-main" textAnchor="middle">
                    Persistence
                  </text>
                  <text x="250" y="355" className="node-label-sub" textAnchor="middle">
                    DATABASES LAYER
                  </text>
                </g>

                {/* 4. DEVOPS & INFRASTRUCTURE */}
                <g
                  className={`arch-node-group node-side-wrap ${
                    hoveredLayer === "devops" || activeCategory === "devops" ? "node-active" : ""
                  }`}
                  onMouseEnter={() => handleLayerHover("devops")}
                  onMouseLeave={() => handleLayerHover(null)}
                  onClick={() => handleLayerClick("devops")}
                >
                  <circle cx="400" cy="210" r="45" className="node-glow-circle" fill="url(#node-glow-grad)" />
                  <rect x="330" y="185" width="140" height="50" rx="8" className="node-border-rect" />
                  <text x="400" y="210" className="node-label-main" textAnchor="middle">
                    Operations
                  </text>
                  <text x="400" y="225" className="node-label-sub" textAnchor="middle">
                    DEVOPS & CLOUD
                  </text>
                </g>
              </svg>
            </div>
            <div className="arch-diagram-legend">
              <p>💡 Hover over nodes to highlight categories and connection pathways.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Filterable Capability Showcase Grid */}
        <div className="tech-showcase-grid-col">
          {/* Categories Filter Pills */}
          <div className="tech-pills-container">
            {categoryLabels.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tech-filter-pill ${activeCategory === cat.id ? "pill-active" : ""}`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    className="pill-active-bg"
                    layoutId="techTabHighlight"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <motion.div className="tech-cards-grid-redefined" layout>
            <AnimatePresence mode="popLayout">
              {techItems.map((tech) => {
                const isHighlighted = getIsCardHighlighted(tech);
                return (
                  <TechCard
                    key={tech.id}
                    tech={tech}
                    isHighlighted={isHighlighted}
                    activeCategory={activeCategory}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
