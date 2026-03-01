import { useState, useEffect, useRef } from "react";
import "./index.css";
import webAppIcon from "./assets/website_webapp_development_image.png";
import desktopIcon from "./assets/desktop_application_development_image.png";
import roboticIcon from "./assets/robotic_integrations_image.png";
import logoImg from "./assets/roviotek_logo.png";

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

const services = [
  {
    img: webAppIcon,
    title: "Web/App Development",
    desc: "We build performant and secure web & mobile applications.",
  },
  {
    img: desktopIcon,
    title: "Desktop Application",
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
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Tharana Hasintha",
    role: "Project Manager, Full Stack Developer",
    avatar: tharanaImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Dinuka Daksitha",
    role: "Frontend Developer",
    avatar: dinukaImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Nimuthu Sipsara",
    role: "IOT Developer, AI Integration Developer",
    avatar: nimuthuImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Pasindu Tharaka",
    role: "Frontend Developer",
    avatar: pasinduImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Kavindu Dilhara",
    role: "Backend Developer",
    avatar: kavinduImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  },
  {
    name: "Anuruddha Shanaka",
    role: "UI Designer",
    avatar: anuruddhaImg,
    socials: { linkedin: "https://linkedin.com", facebook: "https://facebook.com", instagram: "https://instagram.com" }
  }
];

const reviews = [
  {
    text: `"A terrific piece of product!"`,
    author: "Jane Doe",
    role: "CEO, TechCorp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
  },
  {
    text: `"A fantastic bit of feedback"`,
    author: "John Smith",
    role: "Founder, Innovate",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
  },
  {
    text: `"A genuinely glowing review"`,
    author: "Sarah Connor",
    role: "Director, FutureSystems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  }
];

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); // We still need cursor pos to calculate ring target
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);

    let frame;
    const lerp = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.12;
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      frame = requestAnimationFrame(lerp);
    };
    frame = requestAnimationFrame(lerp);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    // Hover detection
    const onEnter = (e) => { if (e.target.closest('a,button,.service-card,.team-member,.tech-card')) setIsHover(true); };
    const onLeave = () => setIsHover(false);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cursorPos.x, cursorPos.y]);

  return (
    <>
      <div className="noise" />

      {/* Custom cursor ring */}
      <div className={`cursor-ring ${isHover ? "hover" : ""}`} style={{ left: ring.x, top: ring.y }} />

      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">
          <img src={logoImg} alt="RovioTek Logo" className="nav-logo-img" />
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Our Services</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#team">Our Team</a>
          <a href="#contact">Contact</a>
          <a href="#reviews">Reviews</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-grid-bg" />
        <div className="hero-particles" />
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
              RovioTek was founded with a simple mission — to bridge the gap between complex technology and real-world business needs. From IoT integrations and AI-powered systems to slick web apps and desktop tools, we craft solutions that scale. Our team of highly skilled engineers and designers work collaboratively to deliver exceptional results on every project.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="about-stat">
                <span className="stat-number">7</span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="about-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="about-projects-col">
            <h3 className="about-projects-title">Featured Projects</h3>
            <div className="about-projects-list">
              <div className="about-project-card">
                <div className="project-tag">IoT + AI</div>
                <h4>SmartFarm Monitor</h4>
                <p>A real-time IoT monitoring dashboard for agricultural environments with AI-powered anomaly detection.</p>
              </div>
              <div className="about-project-card">
                <div className="project-tag">Web App</div>
                <h4>BizFlow ERP</h4>
                <p>A full-featured enterprise resource planning system built with Spring Boot and React for a mid-size logistics company.</p>
              </div>
              <div className="about-project-card">
                <div className="project-tag">Desktop App</div>
                <h4>MediDesk</h4>
                <p>A cross-platform clinic management desktop application with offline-first capabilities.</p>
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
                  <p>RovioTekTeam@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h5>CALL US</h5>
                  <p>+94 71 536 7890</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h5>VISIT US</h5>
                  <p>120/13, Nawalapitiya, Colombo 4.</p>
                </div>
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

        <div className="contact-map-col reveal">
          <div className="contact-map-card">
            <iframe
              title="RovioTek Headquarters - Nawalapitiya"
              src="https://maps.google.com/maps?q=Nawalapitiya,Sri+Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews">
        <div className="section-header reveal">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '32px' }}>Reviews</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className="review-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="review-author-avatar"><img src={r.avatar} alt={r.author} /></div>
                <div className="review-author-info">
                  <div className="review-author-name">{r.author}</div>
                  <div className="review-author-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Submission Form */}
        <div className="review-form-wrapper reveal">
          <h3 className="review-form-title">Leave a Review</h3>
          <p className="review-form-subtitle">Share your experience working with RovioTek.</p>
          <form
            className="review-form"
            onSubmit={(e) => {
              e.preventDefault();
              /* TODO: Implement NodeJS backend logic here
                 - POST to /api/reviews with { name, role, text }
                 - On success: show confirmation message
                 - On error: show error toast
              */
            }}
          >
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label>Your Role / Company</label>
                <input type="text" placeholder="CEO, Acme Corp" required />
              </div>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea placeholder="Share your experience with RovioTek..." rows="4" required></textarea>
            </div>
            <button type="submit" className="review-submit-btn">Submit Review <span>→</span></button>
          </form>
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
    </>
  );
}
