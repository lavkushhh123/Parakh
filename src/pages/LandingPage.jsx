import { useState } from 'react'
import {
  Target,
  BarChart2,
  Share2,
  User,
  ArrowRight,
  Brain,
  Zap,
  ShieldCheck,
  Smartphone,
  Sun,
  Moon,
  LogIn,
} from 'lucide-react'
import heroImage from '../assets/hero-illustration.jpg'
import './LandingPage.css'

function LandingPage({ openAuthModal, theme, toggleTheme }) {
  const [activeNav, setActiveNav] = useState('Home')

  const handleNavClick = (navName, targetId) => {
    setActiveNav(navName)
    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="parakh-landing">
      {/* =========================================================
          01. NAVIGATION HEADER
      ========================================================= */}
      <header className="parakh-navbar">
        <div className="parakh-nav-inner">
          {/* Logo */}
          <div className="parakh-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-bars-icon">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </div>
            <span className="logo-text">PARAKH</span>
          </div>

          {/* Navigation Links */}
          <nav className="parakh-nav-links">
            <button
              type="button"
              className={`nav-item ${activeNav === 'Home' ? 'active' : ''}`}
              onClick={() => handleNavClick('Home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`nav-item ${activeNav === 'About' ? 'active' : ''}`}
              onClick={() => handleNavClick('About', 'why-choose-us')}
            >
              About
            </button>
            <button
              type="button"
              className={`nav-item ${activeNav === 'Features' ? 'active' : ''}`}
              onClick={() => handleNavClick('Features', 'feature-cards')}
            >
              Features
            </button>
            <button
              type="button"
              className={`nav-item ${activeNav === 'How It Works' ? 'active' : ''}`}
              onClick={() => handleNavClick('How It Works', 'why-choose-us')}
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="parakh-nav-actions">
            <button
              type="button"
              className="theme-switch-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              type="button"
              className="btn-signin-text"
              onClick={() => openAuthModal('login')}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              className="btn-get-started"
              onClick={() => openAuthModal('signup')}
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          02. HERO SECTION
      ========================================================= */}
      <section className="parakh-hero-section">
        <div className="hero-inner-container">
          {/* Hero Left Content */}
          <div className="hero-left-content">
            <div className="hero-pill-badge">
              <span>AI Powered Career & Skill Intelligence</span>
            </div>

            <h1 className="hero-main-title">
              Discover Your<br />
              <span className="text-blue">Career Path</span> with AI
            </h1>

            <p className="hero-subtext">
              Analyze your current skills, explore career options,<br className="desktop-break" />
              find skill gaps and build a better future — all in one place.
            </p>

            <div className="hero-btn-row">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => openAuthModal('signup')}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={() => {
                  const el = document.getElementById('why-choose-us')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Right Illustration */}
          <div className="hero-right-visual">
            <div className="illustration-wrapper">
              <img
                src={heroImage}
                alt="Student looking at career path signposts"
                className="hero-vector-image"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03. 4 FEATURE CARDS ROW
      ========================================================= */}
      <section id="feature-cards" className="parakh-cards-section">
        <div className="cards-inner-container">
          {/* Card 1 */}
          <div className="feature-box-card" onClick={() => openAuthModal('signup')}>
            <div className="card-icon-bubble bubble-blue">
              <Target size={22} />
            </div>
            <h3 className="card-heading">Career Prediction</h3>
            <p className="card-paragraph">
              Get personalized career suggestions based on your skills, interests and profile.
            </p>
            <div className="card-arrow-link">
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-box-card" onClick={() => openAuthModal('signup')}>
            <div className="card-icon-bubble bubble-green">
              <BarChart2 size={22} />
            </div>
            <h3 className="card-heading">Skill Gap Analysis</h3>
            <p className="card-paragraph">
              Find out what skills you need to bridge the gap and grow further in your career.
            </p>
            <div className="card-arrow-link">
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-box-card" onClick={() => openAuthModal('signup')}>
            <div className="card-icon-bubble bubble-purple">
              <Share2 size={22} />
            </div>
            <h3 className="card-heading">Clustering</h3>
            <p className="card-paragraph">
              Discover similar career paths and skill groups based on your profile and preferences.
            </p>
            <div className="card-arrow-link">
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-box-card" onClick={() => openAuthModal('signup')}>
            <div className="card-icon-bubble bubble-amber">
              <User size={22} />
            </div>
            <h3 className="card-heading">Personalized Dashboard</h3>
            <p className="card-paragraph">
              Track your progress, explore insights and get recommendations — all in one place.
            </p>
            <div className="card-arrow-link">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04. WHY CHOOSE US SECTION
      ========================================================= */}
      <section id="why-choose-us" className="parakh-why-section">
        <div className="why-inner-container">
          {/* Left Column: Heading & Summary */}
          <div className="why-left-column">
            <span className="why-pretitle">WHY CHOOSE US</span>
            <h2 className="why-heading">
              Smarter Insights for<br />
              a Brighter Future
            </h2>
            <p className="why-body-text">
              Our platform uses the power of AI to help you understand your strengths, identify
              gaps and make informed decisions about your career and skills.
            </p>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="why-right-grid">
            {/* Item 1 */}
            <div className="why-feature-item">
              <div className="item-icon-circle circle-blue">
                <Brain size={20} />
              </div>
              <div className="item-text-wrap">
                <h4 className="item-title">AI-Powered Analysis</h4>
                <p className="item-desc">
                  Get accurate insights based on your profile and goals.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="why-feature-item">
              <div className="item-icon-circle circle-purple">
                <Zap size={20} />
              </div>
              <div className="item-text-wrap">
                <h4 className="item-title">Personalized Recommendations</h4>
                <p className="item-desc">
                  Receive career and skill suggestions that match your interests.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="why-feature-item">
              <div className="item-icon-circle circle-green">
                <ShieldCheck size={20} />
              </div>
              <div className="item-text-wrap">
                <h4 className="item-title">Data-Driven Approach</h4>
                <p className="item-desc">
                  Built on real-world data and industry trends.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="why-feature-item">
              <div className="item-icon-circle circle-sky">
                <Smartphone size={20} />
              </div>
              <div className="item-text-wrap">
                <h4 className="item-title">Easy to Use</h4>
                <p className="item-desc">
                  Simple, clean and student-friendly interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          05. BOTTOM DARK NAVY CURVED WAVE
      ========================================================= */}
      <div className="bottom-wave-container">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="bottom-wave-svg"
        >
          <path
            d="M0,45 C320,110 780,10 1440,85 L1440,120 L0,120 Z"
            fill="#1e3a8a"
          />
        </svg>
      </div>
    </div>
  )
}

export default LandingPage
