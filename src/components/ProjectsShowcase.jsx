import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";

// Browser Mockup Window wrapper for Web & Desktop projects
function BrowserMockup({ children, url }) {
  return (
    <div className="browser-mockup">
      {/* Browser top window bar */}
      <div className="browser-mockup-header">
        <div className="browser-dot-buttons">
          <span className="dot dot-close" />
          <span className="dot dot-minimize" />
          <span className="dot dot-maximize" />
        </div>
        <div className="browser-address-bar">{url}</div>
      </div>
      {/* Inner viewport */}
      <div className="browser-mockup-body">
        {children}
        <div className="browser-scanlines" />
      </div>
    </div>
  );
}

// Smartphone Mockup Frame wrapper for Mobile apps (like FITTY video)
function PhoneMockup({ children }) {
  return (
    <div className="phone-mockup">
      <div className="phone-bezel">
        <div className="phone-speaker" />
        <div className="phone-dynamic-island" />
        <div className="phone-screen-content">
          {children}
          <div className="phone-screen-shine" />
        </div>
      </div>
    </div>
  );
}

// LazyVideo component using IntersectionObserver to prevent preloading heavy assets
function LazyVideo({ src, className, ...props }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // load when within 200px of viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ width: "100%", height: "100%" }}>
      {inView ? (
        <video
          src={src}
          className={className}
          preload="none"
          {...props}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "#050508" }} />
      )}
    </div>
  );
}

// Special Coming Soon layout card
function ComingSoonCard({ project }) {
  return (
    <motion.div
      className="coming-soon-banner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="coming-soon-pattern" />
      
      {/* Decorative Technical Crosshairs */}
      <span className="tech-crosshair top-left">+</span>
      <span className="tech-crosshair top-right">+</span>
      <span className="tech-crosshair bottom-left">+</span>
      <span className="tech-crosshair bottom-right">+</span>

      <div className="coming-soon-inner">
        <div className="coming-soon-badge">
          <span className="coming-soon-pulse-dot" />
          {project.tag}
        </div>
        <h3 className="coming-soon-title">{project.title}</h3>
        <p className="coming-soon-desc">{project.desc}</p>
        
        <div className="coming-soon-footer">
          <span className="coming-soon-decor-text">SYSTEMS_ROADMAP_PHASE_02</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsShowcase({ projects, setSelectedProject }) {
  return (
    <section id="projects" className="projects-section-container">
      <div className="projects-atmosphere-glow cyan" />
      <div className="projects-atmosphere-glow purple" />

      <div className="projects-section-header">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">
          Real work we’ve delivered — from IoT robotics to full-stack platforms.
        </p>
      </div>

      <div className="projects-showcase-stage">
        {projects.map((project, idx) => {
          if (project.id === "coming-soon") {
            return <ComingSoonCard key={project.id} project={project} />;
          }

          const isEven = idx % 2 === 0;
          const projectUrl = `roviotek.site/${project.id}`;

          return (
            <motion.div
              key={project.id}
              className={`project-showcase-row ${isEven ? "row-normal" : "row-reverse"}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* MEDIA COLUMN — Centerpiece */}
              <div 
                className="project-media-col clickable"
                onClick={() => setSelectedProject(project)}
              >
                {project.mediaType === "video" ? (
                  <PhoneMockup>
                    <LazyVideo
                      src={project.mediaSrc}
                      className="project-mockup-media-element"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </PhoneMockup>
                ) : (
                  <BrowserMockup url={projectUrl}>
                    <div className="project-browser-image-wrapper">
                      <img
                        src={project.mediaSrc}
                        alt={project.title}
                        className="project-mockup-media-element zoom-on-hover"
                      />
                    </div>
                  </BrowserMockup>
                )}
              </div>

              {/* DETAILS COLUMN */}
              <div className="project-details-col">
                <div className="project-meta-row">
                  <span className="project-category-badge">{project.tag}</span>
                </div>
                
                <h3 
                  className="project-display-title clickable"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.title}
                </h3>
                
                <p className="project-display-desc">{project.desc}</p>

                {/* Technologies Pills */}
                {project.tech.length > 0 && (
                  <div className="project-tech-pills-row">
                    {project.tech.map((t, index) => (
                      <span key={index} className="tech-pill-micro-redefined">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Explore Action Link */}
                <div className="project-action-wrapper">
                  <Magnetic>
                    <button
                      className="project-explore-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      Explore Project Details <span className="btn-arrow">→</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
