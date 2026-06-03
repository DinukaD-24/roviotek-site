import { useState, useEffect, useRef } from "react";
import "./index.css";

// Redesign Component Imports
import TechGrid from './TechGrid';
import ScrollProgress from './ScrollProgress';
import Magnetic from './Magnetic';
import HeroCanvas from './components/HeroCanvas';
import HeroMeshBg from './components/HeroMeshBg';
import TechStackShowcase from './components/TechStackShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';

// Utility Imports
import CountUp from "react-countup";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Asset Imports
import logoImg from "./assets/roviotek_logo.webp";
import sandunImg from "./assets/Sandun_Sulakshana.webp";
import tharanaImg from "./assets/Tharana_Hasintha.webp";
import dinukaImg from "./assets/Dinuka_Daksitha.webp";
import nimuthuImg from "./assets/Nimuthu_Sipsara.webp";
import pasinduImg from "./assets/Pasindu_Tharaka.webp";
import kavinduImg from "./assets/Kavindu_Dilhara.webp";
import anuruddhaImg from "./assets/Anuruddha_Shanaka.webp";

// Tech stack imports removed

// Social imports
import whatsappSvg from "./assets/whatsapp.svg";
import linkedinSvg from "./assets/linkedin.svg";
import instagramSvg from "./assets/instagram.svg";
import facebookSvg from "./assets/facebook.svg";

// Project media imports
import libriooImg from "./assets/librioo.webp";
import hotelImg from "./assets/hotel_Management_System.webp";
import librarynetImg from "./assets/librarynet.webp";
import fittyVid from "./assets/fitty.mp4";

const services = [
  {
    title: "Website/Mobile app Development",
    desc: "We build performant and secure web & mobile applications.",
  },
  {
    title: "Desktop Application Development",
    desc: "Robust desktop applications customized to your requirements.",
  },
  {
    title: "Robotic Integration",
    desc: "Seamlessly integrate automated solutions to maximize your efficiency.",
  },
];

// techStack data moved to TechStackShowcase

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

// ── Hero animation variants ──────────────────────────────────────────────────
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
};

const heroLineVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

// Interactive 3D tilt card for Team
function TeamMemberCard({ m, i }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    setRotateX(-y / (height / 2) * 8);
    setRotateY(x / (width / 2) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="team-member-card"
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
    >
      <div className="team-avatar-frame">
        <img src={m.avatar} alt={m.name} className="team-avatar-img" />
      </div>
      
      <div className="team-info">
        <h4 className="team-name">{m.name}</h4>
        <p className="team-role">{m.role}</p>
      </div>

      <div className="team-socials-row">
        <Magnetic>
          <a href={m.socials.linkedin || "#"} title="LinkedIn" target="_blank" rel="noopener noreferrer" className="social-anchor">
            <img src={linkedinSvg} alt="LinkedIn" className="social-icon" />
          </a>
        </Magnetic>
        {m.socials.facebook && (
          <Magnetic>
            <a href={m.socials.facebook || "#"} title="Facebook" target="_blank" rel="noopener noreferrer" className="social-anchor">
              <img src={facebookSvg} alt="Facebook" className="social-icon" />
            </a>
          </Magnetic>
        )}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize Lenis scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
    }, 850);
  };

  // SVGs for Services
  const serviceIcons = [
    <svg key="srv-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "64px", height: "64px", margin: "auto", display: "block" }}>
      <rect x="15" y="20" width="70" height="46" rx="3" stroke="var(--accent-cyan)" />
      <line x1="10" y1="66" x2="90" y2="66" stroke="var(--accent-cyan)" strokeWidth="4" />
      <rect x="62" y="38" width="20" height="38" rx="3" fill="#09090b" stroke="var(--accent-purple)" strokeWidth="2" />
      <circle cx="72" cy="70" r="1.5" fill="var(--accent-purple)" />
      <motion.line x1="25" y1="30" x2="55" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" 
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.line x1="25" y1="40" x2="45" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
      />
    </svg>,
    <svg key="srv-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "64px", height: "64px", margin: "auto", display: "block" }}>
      <rect x="15" y="15" width="70" height="70" rx="6" stroke="var(--accent-purple)" />
      <line x1="15" y1="32" x2="85" y2="32" stroke="var(--accent-purple)" />
      <circle cx="23" cy="23" r="2" fill="var(--accent-purple)" />
      <circle cx="31" cy="23" r="2" fill="var(--accent-purple)" />
      <circle cx="39" cy="23" r="2" fill="var(--accent-purple)" />
      <motion.path 
        d="M 25 45 L 45 45 M 25 55 L 65 55 M 25 65 L 50 65" 
        stroke="var(--accent-cyan)" 
        strokeWidth="3" 
        strokeLinecap="round"
        animate={{ strokeDashoffset: [160, 0] }}
        strokeDasharray="80"
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </svg>,
    <svg key="srv-2" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "64px", height: "64px", margin: "auto", display: "block" }}>
      <rect x="20" y="80" width="60" height="8" rx="2" stroke="var(--accent-cyan)" fill="rgba(255,255,255,0.05)" />
      <motion.line 
        x1="50" y1="80" x2="40" y2="45" 
        stroke="var(--accent-cyan)" 
        strokeWidth="4" 
        animate={{ rotate: [-8, 12, -8] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 80px" }}
      />
      <circle cx="40" cy="45" r="4" fill="var(--accent-purple)" />
      <motion.line 
        x1="40" y1="45" x2="65" y2="30" 
        stroke="var(--accent-purple)" 
        strokeWidth="3"
        animate={{ rotate: [12, -15, 12] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transformOrigin: "40px 45px" }}
      />
      <circle cx="65" cy="30" r="3" fill="var(--accent-cyan)" />
    </svg>
  ];

  return (
    <>
      <ScrollProgress />
      <div className="noise" />
      <TechGrid />

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
        </div>
      </nav>

      {/* ── HERO SECTION v2 — Premium Showcase ── */}
      <section className="hero-v2" id="home">
        <HeroMeshBg />

        <div className="hero-v2-inner">

          {/* LEFT COLUMN — Text */}
          <div className="hero-v2-left">

            {/* Badge */}
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="hero-badge-dot" />
              Software · AI · Robotics
            </motion.div>

            {/* Headline — staggered word reveal */}
            <motion.h1
              className="hero-v2-h1"
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              aria-label="We build A Smart Future with you"
            >
              <span className="hero-line-wrap">
                <motion.span className="hero-line-inner" variants={heroLineVariants}>
                  We build
                </motion.span>
              </span>
              <span className="hero-line-wrap">
                <motion.span className="hero-line-inner gradient-word" variants={heroLineVariants}>
                  A Smart Future
                </motion.span>
              </span>
              <span className="hero-line-wrap">
                <motion.span className="hero-line-inner" variants={heroLineVariants}>
                  with you
                </motion.span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="hero-v2-desc"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            >
              Where Software Meets Ingenuity
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-v2-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.96, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic>
                <a href="#services" className="btn-primary-v2">
                  Get Started <ChevronRight size={16} style={{ marginLeft: 4 }} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn-secondary-v2">
                  Contact Us
                </a>
              </Magnetic>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
              href="#about"
              aria-label="Scroll Down"
              className="hero-scroll-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="scroll-indicator-mouse">
                <span className="scroll-indicator-wheel" />
              </div>
            </motion.a>

          </div>{/* end hero-v2-left */}

          {/* RIGHT COLUMN — Neural Orbit Canvas */}
          <motion.div
            className="hero-v2-right"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroCanvas />
          </motion.div>

        </div>{/* end hero-v2-inner */}

        {/* Bottom vignette — smooth bridge to next section */}
        <div className="hero-v2-fade-bottom" />
      </section>

      <div className="section-divider" />

      {/* About Us */}
      <section id="about" className="about-redefined">
        <div className="section-header reveal visible">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">We are a passionate software company building smart, scalable solutions that make a real difference.</p>
        </div>

        <div className="about-dashboard-grid">
          <div className="about-vision-card">
            <p className="about-description-text">
              RovioTek was founded with a simple mission to bridge the gap between complex technology and real-world business needs. From IoT integrations and AI-powered systems to slick web apps and desktop tools, we craft solutions that scale. Our team of highly skilled engineers and designers work collaboratively to deliver exceptional results on every project.
            </p>

            <div className="dashboard-stats-row">
              <div className="dashboard-stat-box">
                <span className="stat-num text-cyan-400">
                  <CountUp end={3} duration={2} suffix="+" enableScrollSpy />
                </span>
                <span className="stat-lbl">Projects Delivered</span>
              </div>
              <div className="dashboard-stat-box">
                <span className="stat-num text-purple-400">
                  <CountUp end={7} duration={2} enableScrollSpy />
                </span>
                <span className="stat-lbl">Team Members</span>
              </div>
              <div className="dashboard-stat-box">
                <span className="stat-num text-emerald-400">
                  <CountUp end={100} duration={2} suffix="%" enableScrollSpy />
                </span>
                <span className="stat-lbl">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Our Services */}
      <section id="services" className="services-redefined">
        <div className="section-header reveal visible">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Providing cutting edge software solutions tailored to your needs</p>
        </div>
        
        <div className="services-grid-redefined">
          {services.map((s, i) => (
            <div className="service-card-obsidian" key={i}>
              <div className="service-card-icon-frame">
                {serviceIcons[i]}
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.desc}</p>
              <Magnetic>
                <a href="#contact" className="service-card-link">Get Started <span>→</span></a>
              </Magnetic>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Our Projects */}
      <ProjectsShowcase projects={projects} setSelectedProject={setSelectedProject} />

      <div className="section-divider" />

      {/* Tech Stack */}
      <TechStackShowcase />

      <div className="section-divider" />

      {/* Our Team */}
      <section id="team" className="team-redefined">
        <div className="section-header reveal visible">
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Meet Our Team of Experts</h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
            Our talented team is dedicated to delivering cutting-edge software solutions with passion and expertise.
          </p>
        </div>

        <div className="team-cards-grid-redefined">
          {team.map((member, idx) => (
            <TeamMemberCard m={member} i={idx} key={idx} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact Us */}
      <section id="contact" className="contact-redefined">
        <div className="contact-control-panel-grid">
          <div className="contact-left-col">
            <h2 className="contact-heading-text">LET&apos;S CONNECT.</h2>
            <p className="contact-desc-text">
              We&apos;re building the future of infrastructure. Reach out to discuss partnerships, support, or career opportunities.
            </p>

            <div className="telemetry-contacts-list">
              <div className="telemetry-contact-item">
                <div className="contact-metric-num">EMAIL US</div>
                <div className="contact-metric-detail">
                  <a href="mailto:roviotek.info@gmail.com">roviotek.info@gmail.com</a>
                </div>
              </div>
              <div className="telemetry-contact-item">
                <div className="contact-metric-num">CALL US</div>
                <div className="contact-metric-detail">
                  <a href="https://wa.me/94726252526" target="_blank" rel="noopener noreferrer">+94 72 625 2526</a>
                </div>
              </div>
            </div>

            <div className="contact-left-footer">
              <div className="contact-socials-row">
                <Magnetic>
                  <a href="#contact" className="social-anchor">
                    <img src={linkedinSvg} alt="LinkedIn" className="social-icon" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#contact" className="social-anchor">
                    <img src={facebookSvg} alt="Facebook" className="social-icon" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          <div className="contact-right-col">
            <div className="obsidian-form-card">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="obsidian-form-element">
                    <div className="form-input-row">
                      <div className="form-input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                          id="firstName"
                          type="text" 
                          placeholder="John" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="form-input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                          id="lastName"
                          type="text" 
                          placeholder="Doe" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-input-group">
                      <label htmlFor="email">Work Email</label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="john@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="form-input-group">
                      <label htmlFor="message">How can we help?</label>
                      <textarea 
                        id="message"
                        placeholder="Tell us about your project..." 
                        rows="4" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required 
                      />
                    </div>

                    <button type="submit" className="form-submit-btn-obsidian">
                      Send Message <span>→</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="success-form"
                    className="form-success-wrapper-obsidian"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    <svg className="success-checkmark-svg" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="25" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                      <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                    </svg>
                    <h4>Message Sent Successfully</h4>
                    <p>Thank you, {firstName}. Our team will contact you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Footer */}
      <footer className="footer-obsidian">
        <div className="footer-top-row">
          <div className="footer-brand-info">
            <img src={logoImg} alt="RovioTek Logo" className="footer-logo-brand" />
            <p>Building a smart future where software meets ingenuity.</p>
          </div>
          <div className="footer-nav-block">
            <h5>Company</h5>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
          </div>
          <div className="footer-nav-block">
            <h5>Support</h5>
            <a href="#contact">Contact</a>
            <a href="#">Reviews</a>
            <a href="#">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>© 2026 RovioTek. All rights reserved.</p>
          <div className="footer-socials-row">
            <Magnetic>
              <a href="#" title="WhatsApp" className="social-anchor">
                <img src={whatsappSvg} alt="WhatsApp" className="social-icon" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" title="LinkedIn" className="social-anchor">
                <img src={linkedinSvg} alt="LinkedIn" className="social-icon" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" title="Facebook" className="social-anchor">
                <img src={facebookSvg} alt="Facebook" className="social-icon" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" title="Instagram" className="social-anchor">
                <img src={instagramSvg} alt="Instagram" className="social-icon" />
              </a>
            </Magnetic>
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
                        <Magnetic key={idx}>
                          <a 
                            className={`project-link ${link.primary ? '' : 'ghost'}`} 
                            href={link.href}
                            onClick={() => setSelectedProject(null)}
                          >
                            {link.text} <span>→</span>
                          </a>
                        </Magnetic>
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
