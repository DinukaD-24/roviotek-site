import { useState, useEffect } from "react";
import "./index.css";

import { ColorBends } from './ColorBends';
import LetterGlitch from './LetterGlitch';
import SplashCursor from './SplashCursor';

import webAppIcon from "./assets/website_webapp_development_image.png";
import desktopIcon from "./assets/desktop_application_development_image.png";
import roboticIcon from "./assets/robotic_integrations_image.png";
import logoImg from "./assets/roviotek_logo.png";
import CountUp from "react-countup";

// Team member imports
import sandunImg from "./assets/Sandun_Sulakshana.png";
import tharanaImg from "./assets/Tharana_Hasintha.png";
import dinukaImg from "./assets/Dinuka_Daksitha.png";
import nimuthuImg from "./assets/Nimuthu_Sipsara.png";
import pasinduImg from "./assets/Pasindu_Tharaka.png";
import kavinduImg from "./assets/Kavindu_Dilhara.png";
import anuruddhaImg from "./assets/Anuruddha_Shanaka.png";

// Tech stack imports
import frontendImg from "./assets/Frontend.png";
import backendImg from "./assets/Backend.png";
import devopsImg from "./assets/DevOps_Tools_Cloud.png";
import databaseImg from "./assets/Databases.png";

// Social imports
import whatsappSvg from "./assets/whatsapp.svg";
import linkedinSvg from "./assets/linkedin.svg";
import instagramSvg from "./assets/instagram.svg";
import facebookSvg from "./assets/facebook.svg";

// Project media imports
import libriooImg from "./assets/librioo.jpeg";
import hotelImg from "./assets/hotel_Management_System.png";
import librarynetImg from "./assets/librarynet.jpeg";
import fittyVid from "./assets/fitty.mp4";

const services = [
  {
    img: webAppIcon,
    title: "Website/Mobile app Development",
    desc: "We build performant and secure web & mobile applications.",
  },
  {
    img: desktopIcon,
    title: "Desktop Application Development",
    desc: "Robust desktop applications customized to your requirements.",
  },
  {
    img: roboticIcon,
    title: "Robotic Integration",
    desc: "Seamlessly integrate automated solutions to maximize your efficiency.",
  },
];

const techStack = [
  {
    title: "Front-End",
    desc: "HTML, CSS, React, Angular",
    img: frontendImg,
  },
  {
    title: "Back-End",
    desc: "PHP, Spring Boot, NodeJS",
    img: backendImg,
  },
  {
    title: "DevOps, Tools & Cloud",
    desc: "Git, Docker, AWS, Postman testing tools",
    img: devopsImg,
  },
  {
    title: "Databases",
    desc: "MySQL, PostgreSQL, MongoDB, Firebase",
    img: databaseImg,
  },
];

const team = [
  {
    name: "Sandun Sulakshana",
    role: "Founder, Backend Developer",
    avatar: sandunImg,
    socials: { linkedin: "https://www.linkedin.com/in/sandun-sulakshana-465188328/", github: "https://github.com/sandun80"}
  },
  {
    name: "Tharana Hasintha",
    role: "Project Manager, Full Stack Developer",
    avatar: tharanaImg,
    socials: { linkedin: "https://www.linkedin.com/in/tharanahasintha/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Dinuka Daksitha",
    role: "Frontend Developer",
    avatar: dinukaImg,
    socials: { linkedin: "https://www.linkedin.com/in/dinuka-ilangakoon-3ab81a335/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Nimuthu Sipsara",
    role: "IOT Developer, AI Integration Developer",
    avatar: nimuthuImg,
    socials: { linkedin: "https://www.linkedin.com/in/nimuthusw/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Pasindu Tharaka",
    role: "Frontend Developer",
    avatar: pasinduImg,
    socials: { linkedin: "https://www.linkedin.com/in/pasindu-tharaka-1a660a333/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Kavindu Dilhara",
    role: "Backend Developer",
    avatar: kavinduImg,
    socials: { linkedin: "https://www.linkedin.com/in/kavindu-jayasinghe-877174335/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Anuruddha Shanaka",
    role: "UI Designer",
    avatar: anuruddhaImg,
    socials: { linkedin: "https://www.linkedin.com/in/anuruddha-shanaka-687056380/", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  }
];

const projects = [
  {
    id: "librioo",
    tag: "IoT + Web",
    title: "Librioo Smart Library Robot",
    desc: "A smart library assistant robot with line-following navigation and an admin panel to manage books, members, and shelf routing.",
    mediaType: "image",
    mediaSrc: libriooImg,
    tech: ["ESP32", "Arduino", "Spring Boot", "MySQL", "React"],
    links: [
      { text: "Work With Us", href: "#contact", primary: true },
      { text: "View Services", href: "#services", primary: false }
    ]
  },
  {
    id: "hotel",
    tag: "Desktop Application",
    title: "Hotel Management System",
    desc: "This is a comprehensive hotel management system designed to streamline room bookings, check-ins, and check-outs. It allows easy management of room inventory and guest information, ensuring efficient operations and a seamless experience for both staff and guests.",
    mediaType: "image",
    mediaSrc: hotelImg,
    tech: ["Java", "Swing", "MySQL"],
    links: [
      { text: "Work with us", href: "#contact", primary: true },
      { text: "View Services", href: "#services", primary: false }
    ]
  },
  {
    id: "librarynet",
    tag: "Web Application",
    title: "LibraryNet",
    desc: "LibraryNet is an online library platform that allows users to read and borrow books digitally. Borrowed books are stored in your profile for a set period, giving you seamless access to your reading materials anytime, anywhere.",
    mediaType: "image",
    mediaSrc: librarynetImg,
    tech: ["Java", "Springboot", "Hibernate", "Html/CSS", "Postgresql"],
    links: [
      { text: "Work with us", href: "#contact", primary: true },
      { text: "Our Services", href: "#services", primary: false }
    ]
  },
  {
    id: "fitty",
    tag: "Mobile App",
    title: "FITTY",
    desc: "FITTY is a user-friendly clothing mobile app crafted with a polished UI/UX design in Figma and brought to life as a fully functional application using React Native — delivering a seamless and stylish shopping experience on mobile.",
    mediaType: "video",
    mediaSrc: fittyVid,
    tech: ["Figma", "React Native"],
    links: [
      { text: "Work with us", href: "#contact", primary: true },
      { text: "View Services", href: "#services", primary: false }
    ]
  },
  {
    id: "coming-soon",
    tag: "IOT + AI",
    title: "Coming Soon...",
    desc: "We are developing highly innovative IoT and AI-powered systems designed to automate real-world processes with cutting-edge machine learning model deployment.",
    mediaType: "placeholder",
    tech: [],
    links: [
      { text: "Work with us", href: "#contact", primary: true },
      { text: "View Services", href: "#services", primary: false }
    ]
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="noise" />

      {/* SplashCursor fluid simulation */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#94a3b8"
      />

      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">
          <img src={logoImg} alt="RovioTek Logo" className="nav-logo-img" />
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Our Services</a>
          <a href="#projects">Projects</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#team">Our Team</a>
          <a href="#contact">Contact</a>
          <a href="#reviews">Reviews</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        {/* ColorBends — primary background, fully visible */}
        <ColorBends
          color="#465F6C"
          speed={0.2}
          frequency={1.0}
          noise={0.15}
          bandWidth={0.14}
          rotation={90}
          fadeTop={0.75}
          iterations={1}
          intensity={1.3}
          style={{ zIndex: 0 }}
        />

        {/* LetterGlitch overlay */}
        <LetterGlitch
          glitchSpeed={50}
          opacity={0.15}
        />


        {/* Hero content sits above both backgrounds */}
        <div className="hero-content reveal visible">
          <h1 className="hero-title">We build<br /><span className="highlight">A Smart Future</span><br />with you</h1>
          <p className="hero-subtitle">Where Software Meets Ingenuity</p>
          <div className="hero-actions">
            <a href="#services" className="btn-primary">Get Started</a>
            <a href="#contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about">
        <div className="section-header reveal">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">We are a passionate software company building smart, scalable solutions that make a real difference.</p>
        </div>
        <div className="about-grid reveal">
          <div className="about-text-col">
            <p className="about-description">
              RovioTek was founded with a simple mission to bridge the gap between complex technology and real-world business needs. From IoT integrations and AI-powered systems to slick web apps and desktop tools, we craft solutions that scale. Our team of highly skilled engineers and designers work collaboratively to deliver exceptional results on every project.
            </p>
            
            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-number">
                  <CountUp end={3} 
                  duration={2} 
                  suffix="+" 
                  enableScrollSpy={true}
                  scrollSpyDelay={200}
                  />
                  </span>
                <span className="stat-label">Projects Delivered</span>
              </div>

              <div className="about-stat">
                <span className="stat-number">
                  <CountUp end={7} 
                  duration={2} 
                  enableScrollSpy={true}
                  scrollSpyDelay={200}
                  />
                </span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="about-stat">
                <span className="stat-number">
                  <CountUp end={100} 
                  duration={2} 
                  suffix="%" 
                  enableScrollSpy={true}
                  scrollSpyDelay={200}
                  />
                </span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services">
        <div className="section-header reveal">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Providing cutting edge software solutions tailored to your needs</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="service-icon"><img src={s.img} alt={s.title} /></div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <a href="#contact" className="service-link">Get Started <span>→</span></a>
            </div>
          ))}
        </div>
      </section>

      {/* Our Projects */}
      <section id="projects">
        <div className="section-header reveal">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Real work we’ve delivered — from IoT robotics to full-stack platforms.
          </p>
        </div>

        <div className="projects-scroll reveal">
          {projects.map((project) => (
            <div 
              className={`project-card ${project.id !== 'coming-soon' ? 'clickable' : ''}`}
              key={project.id}
              onClick={() => {
                if (project.id !== 'coming-soon') {
                  setSelectedProject(project);
                }
              }}
            >
              {project.mediaSrc && (
                <div className="project-media">
                  {project.mediaType === "video" ? (
                    <video
                      src={project.mediaSrc}
                      className="project-media-asset"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img src={project.mediaSrc} alt={project.title} className="project-media-asset" />
                  )}
                </div>
              )}
              <div className="project-top">
                <span className="project-tag">{project.tag}</span>
                <h3 className="project-title">{project.title}</h3>
                {project.desc && <p className="project-desc">{project.desc}</p>}
              </div>

              {project.tech.length > 0 && (
                <div className="project-tech">
                  {project.tech.map((t, idx) => (
                    <span className="project-pill" key={idx}>{t}</span>
                  ))}
                </div>
              )}

              <div className="project-actions">
                {project.links.map((link, idx) => (
                  <a 
                    className={`project-link ${link.primary ? '' : 'ghost'}`} 
                    href={link.href}
                    key={idx}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link.text} <span>→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack">
        <div className="section-header reveal">
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">We use cutting edge technologies to build robust solutions</p>
        </div>
        <div className="tech-grid">
          {techStack.map((t, i) => (
            <div className="tech-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="tech-image">
                <img src={t.img} alt={t.title} />
              </div>
              <div className="tech-content">
                <h4 className="tech-title">{t.title}</h4>
                <p className="tech-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section id="team">
        <div className="section-header reveal">
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Meet Our Team of Experts</h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
            Our talented team is dedicated to delivering cutting-edge software solutions with passion and expertise.
          </p>
        </div>
        <div className="team-grid">
          {team.map((m, i) => (
            <div className="team-member reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="team-avatar">
                <img src={m.avatar} alt={m.name} />
              </div>
              <h4 className="team-name">{m.name}</h4>
              <p className="team-role">{m.role}</p>
              <div className="team-socials">
                <a href={m.socials.linkedin || "#"} title="LinkedIn" target="_blank" rel="noreferrer">
                  <img src={linkedinSvg} alt="LinkedIn" className="social-icon" />
                </a>
                <a href={m.socials.facebook || "#"} title="Facebook" target="_blank" rel="noreferrer">
                  <img src={facebookSvg} alt="Facebook" className="social-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact">
        <div className="contact-grid reveal">
          <div className="contact-info-col">
            <h2 className="contact-heading">LET'S CONNECT.</h2>
            <p className="contact-tagline">We're building the future of infrastructure. Reach out to discuss partnerships, support, or career opportunities.</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">✉</div>
                <div>
                  <h5>EMAIL US</h5>
                  <a href="mailto:roviotek.info@gmail.com" className="email-link">
                    roviotek.info@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h5>CALL US</h5>
                  <a
                    href="https://wa.me/94726252526"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    +94 72 625 2526
                </a>
                </div>
              </div>
              <div className="contact-item">
                {/* <div className="contact-icon">📍</div>
                <div>
                  <h5>VISIT US</h5>
                  <p>120/13, Nawalapitiya, Colombo 4.</p>
                </div> */}
              </div>
            </div>

            <div className="contact-socials-block">
              <h5>FOLLOW US</h5>
              <div className="contact-socials-icons">
                <a href="#" target="_blank" rel="noreferrer"><img src={linkedinSvg} alt="LinkedIn" /></a>
                <a href="#" target="_blank" rel="noreferrer"><img src={facebookSvg} alt="Facebook" /></a>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            <div className="contact-form-card">
              <form onSubmit={(e) => { e.preventDefault(); /* TODO: Implement NodeJS backend logic here */ }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Work Email</label>
                  <input type="email" placeholder="john@company.com" required />
                </div>
                <div className="form-group">
                  <label>How can we help?</label>
                  <textarea placeholder="Tell us about your project..." rows="4" required></textarea>
                </div>
                <button type="submit" className="form-submit-btn">Send Message <span>→</span></button>
              </form>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top reveal">
          <div className="footer-brand">
            <img src={logoImg} alt="RovioTek Logo" className="footer-logo-img" />
            <p>Building a smart future where software meets ingenuity.</p>
          </div>
          <div className="footer-links-group">
            <h4>Company</h4>
            <a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a>
          </div>
          <div className="footer-links-group">
            <h4>Support</h4>
            <a href="#">Contact</a><a href="#">Reviews</a><a href="#">FAQ</a>
          </div>
          <div className="footer-links-group">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom reveal">
          <p>© 2026 RovioTek. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" title="WhatsApp" target="_blank" rel="noreferrer">
              <img src={whatsappSvg} alt="WhatsApp" className="social-icon-footer" />
            </a>
            <a href="#" title="LinkedIn" target="_blank" rel="noreferrer">
              <img src={linkedinSvg} alt="LinkedIn" className="social-icon-footer" />
            </a>
            <a href="#" title="Facebook" target="_blank" rel="noreferrer">
              <img src={facebookSvg} alt="Facebook" className="social-icon-footer" />
            </a>
            <a href="#" title="Instagram" target="_blank" rel="noreferrer">
              <img src={instagramSvg} alt="Instagram" className="social-icon-footer" />
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="project-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="project-modal-content">
              <div className="project-modal-media-wrapper">
                {selectedProject.mediaType === "video" ? (
                  <video
                    src={selectedProject.mediaSrc}
                    className="project-modal-media-asset"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <img 
                    src={selectedProject.mediaSrc} 
                    alt={selectedProject.title} 
                    className="project-modal-media-asset" 
                  />
                )}
              </div>

              <div className="project-modal-details">
                <div className="project-modal-top">
                  <span className="project-tag">{selectedProject.tag}</span>
                  <h2 className="project-modal-title">{selectedProject.title}</h2>
                  <p className="project-modal-desc">{selectedProject.desc}</p>
                </div>

                <div className="project-modal-footer">
                  {selectedProject.tech.length > 0 && (
                    <div className="project-modal-tech-section">
                      <h4 className="project-modal-subtitle">Technologies</h4>
                      <div className="project-tech">
                        {selectedProject.tech.map((t, idx) => (
                          <span className="project-pill" key={idx}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-modal-actions-section">
                    <h4 className="project-modal-subtitle">Next Steps</h4>
                    <div className="project-actions">
                      {selectedProject.links.map((link, idx) => (
                        <a 
                          className={`project-link ${link.primary ? '' : 'ghost'}`} 
                          href={link.href}
                          key={idx}
                          onClick={() => setSelectedProject(null)}
                        >
                          {link.text} <span>→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
