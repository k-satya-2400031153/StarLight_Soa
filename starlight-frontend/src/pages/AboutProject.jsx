import { useState } from 'react';
import { Link } from 'react-router-dom';

/* =====================================================
   ABOUT PROJECT PAGE — Starlight Stays & Resorts
   =====================================================
   Showcases DTI Concepts: Empathy Map, Persona,
   Customer Journey Map, Problem Analysis, Survey Results,
   and Innovation Ideas for Project Review-1.
   ===================================================== */

export default function AboutProject() {
  const [activeJourneyStep, setActiveJourneyStep] = useState(null);


  /* ===== EMPATHY MAP ===== */
  const empathyMap = {
    says: [
      '"I never know if the price shown is final"',
      '"Booking sites crash during peak season"',
      '"I want to see real photos, not stock images"',
      '"Customer support takes forever to respond"',
    ],
    thinks: [
      'Is this the best deal available?',
      'Will my booking be confirmed instantly?',
      'Can I trust online reviews?',
      'What if I need to cancel last minute?',
    ],
    does: [
      'Compares prices across 3-4 platforms',
      'Reads 20+ reviews before booking',
      'Screenshots booking confirmations',
      'Calls hotel directly to verify amenities',
    ],
    feels: [
      'Anxious about hidden charges',
      'Frustrated with slow, cluttered interfaces',
      'Overwhelmed by too many options',
      'Relieved when booking process is smooth',
    ],
  };

  /* ===== PERSONA ===== */
  const persona = {
    name: 'Priya Sharma',
    age: 28,
    occupation: 'Software Engineer, Hyderabad',
    bio: 'Priya is a tech-savvy professional who loves weekend getaways with friends. She values transparency, speed, and a seamless digital experience. She books 4-5 stays per year and prefers luxury resorts with clear pricing.',
    goals: [
      'Find the best luxury stays quickly',
      'See real-time availability and transparent pricing',
      'Book and manage reservations from one place',
      'Get instant confirmation without hidden fees',
    ],
    frustrations: [
      'Hidden charges added at checkout',
      'Outdated availability information',
      'Slow and cluttered booking websites',
      'No easy way to cancel or modify bookings',
    ],
    techProfile: 'Heavy smartphone user, prefers web apps, values fast load times',
    quote: '"I just want to find a beautiful place, see the real price, and book it in under 2 minutes."',
  };

  /* ===== CUSTOMER JOURNEY MAP ===== */
  const journeySteps = [
    {
      phase: 'Awareness',
      emoji: '🔍',
      action: 'Discovers Starlight Stays',
      touchpoint: 'Google search, social media, word of mouth',
      feeling: 'Curious',
      feelingColor: '#06b6d4',
      opportunity: 'SEO optimization, engaging landing page with stunning visuals',
    },
    {
      phase: 'Exploration',
      emoji: '🏨',
      action: 'Browses rooms & destinations',
      touchpoint: 'Homepage, Search page with filters',
      feeling: 'Excited',
      feelingColor: '#8b5cf6',
      opportunity: 'Rich room cards, high-quality images, transparent pricing',
    },
    {
      phase: 'Comparison',
      emoji: '⚖️',
      action: 'Compares room types & prices',
      touchpoint: 'Search filters, room details, reviews',
      feeling: 'Analytical',
      feelingColor: '#f59e0b',
      opportunity: 'Clear amenity tags, ratings, price-per-night display',
    },
    {
      phase: 'Booking',
      emoji: '📝',
      action: 'Selects room & completes booking',
      touchpoint: 'Booking modal, payment, JWT authentication',
      feeling: 'Hopeful',
      feelingColor: '#10b981',
      opportunity: 'Smooth 3-step booking flow, instant confirmation',
    },
    {
      phase: 'Confirmation',
      emoji: '✅',
      action: 'Receives booking confirmation',
      touchpoint: 'Dashboard, booking ID, email notification',
      feeling: 'Relieved',
      feelingColor: '#06b6d4',
      opportunity: 'Clear booking details, downloadable receipt',
    },
    {
      phase: 'Stay & Review',
      emoji: '⭐',
      action: 'Enjoys stay & shares feedback',
      touchpoint: 'Hotel experience, review system',
      feeling: 'Delighted',
      feelingColor: '#d4a017',
      opportunity: 'Post-stay review prompt, loyalty rewards',
    },
  ];

  /* ===== PROBLEM ANALYSIS ===== */
  const problems = [
    {
      icon: '💰',
      title: 'Hidden Pricing',
      desc: 'Users encounter unexpected charges during checkout — taxes, service fees, and resort charges are added at the last step.',
      solution: 'Transparent pricing displayed upfront on room cards with all-inclusive per-night rates.',
    },
    {
      icon: '🔄',
      title: 'Outdated Availability',
      desc: 'Legacy systems show rooms as available even after they are booked, leading to overbooking and customer frustration.',
      solution: 'Real-time availability powered by Room Service microservice with live database sync.',
    },
    {
      icon: '🐌',
      title: 'Monolithic Architecture',
      desc: 'Traditional hotel booking systems are monolithic — a single failure brings down the entire platform.',
      solution: 'Microservices architecture with independent User, Room, and Booking services for fault isolation.',
    },
    {
      icon: '🔐',
      title: 'Security Concerns',
      desc: 'Weak authentication systems expose user data and booking information to unauthorized access.',
      solution: 'JWT-based authentication with API Gateway interceptor ensuring secure, token-based access control.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      {/* ==========================================
          HERO / HEADER
          ========================================== */}
      <div style={{ paddingTop: '8rem', paddingBottom: '3rem' }} className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Project Review — 1
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            About <span className="text-gradient-gold">Starlight Stays</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed text-center">
            Problem analysis, survey insights, DTI concepts, and the architecture behind our luxury hotel booking microservices platform.
          </p>
          <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* ==========================================
          PROBLEM ANALYSIS & REQUIREMENTS
          ========================================== */}
      <section style={{ padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Understanding the Problem
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Problem Analysis & <span className="text-gradient-gold">Requirements</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base text-center">
              Key challenges identified in the current hotel booking ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {problems.map((p) => (
              <div
                key={p.title}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3
                  className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {p.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 text-sm font-semibold mt-0.5">✓</span>
                  <p className="text-emerald-400/80 text-sm leading-relaxed">{p.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==========================================
          EMPATHY MAP
          ========================================== */}
      <section style={{ padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              DTI Concept — 1
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Empathy <span className="text-gradient-gold">Map</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base text-center">
              Understanding our target users through 4 dimensions — based on survey results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { key: 'says', title: '💬 Says', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' },
              { key: 'thinks', title: '💭 Thinks', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)' },
              { key: 'does', title: '🎯 Does', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' },
              { key: 'feels', title: '❤️ Feels', color: '#f43f5e', bgColor: 'rgba(244, 63, 94, 0.08)', borderColor: 'rgba(244, 63, 94, 0.2)' },
            ].map((quadrant) => (
              <div
                key={quadrant.key}
                className="rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: quadrant.bgColor,
                  border: `1px solid ${quadrant.borderColor}`,
                }}
              >
                <h3
                  className="text-lg font-semibold mb-5"
                  style={{ color: quadrant.color, fontFamily: 'var(--font-heading)' }}
                >
                  {quadrant.title}
                </h3>
                <ul className="space-y-3">
                  {empathyMap[quadrant.key].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: quadrant.color }}
                      />
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          PERSONA
          ========================================== */}
      <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              DTI Concept — 2
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              User <span className="text-gradient-gold">Persona</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base text-center">
              Created from a single person's survey response — representing our primary target user.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl overflow-hidden">
              {/* Persona Header */}
              <div
                className="p-8 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.15) 0%, rgba(212, 160, 23, 0.05) 100%)' }}
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-500))',
                    boxShadow: '0 8px 32px rgba(212, 160, 23, 0.3)',
                  }}
                >
                  👩‍💻
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {persona.name}
                </h3>
                <p className="text-gold-400 text-sm font-medium">{persona.age} yrs • {persona.occupation}</p>
                <p className="text-white/40 text-xs mt-1">{persona.techProfile}</p>
              </div>

              {/* Persona Body */}
              <div className="p-8">
                {/* Quote */}
                <div className="text-center mb-8">
                  <p className="text-white/60 text-base italic leading-relaxed">
                    {persona.quote}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-white/50 text-sm leading-relaxed mb-8 text-center max-w-2xl mx-auto">
                  {persona.bio}
                </p>

                {/* Goals & Frustrations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span>🎯</span> Goals
                    </h4>
                    <ul className="space-y-3">
                      {persona.goals.map((g, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-emerald-400 text-sm mt-0.5">✓</span>
                          <span className="text-white/60 text-sm">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-rose-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span>😤</span> Frustrations
                    </h4>
                    <ul className="space-y-3">
                      {persona.frustrations.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-rose-400 text-sm mt-0.5">✕</span>
                          <span className="text-white/60 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CUSTOMER JOURNEY MAP
          ========================================== */}
      <section style={{ padding: '4rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              DTI Concept — 3
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Customer <span className="text-gradient-gold">Journey Map</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base text-center">
              The complete user experience flow through our Starlight Stays platform.
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="max-w-5xl mx-auto">
            {/* Progress Line */}
            <div className="relative">
              {/* Connecting Line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
                style={{ background: 'linear-gradient(to bottom, var(--color-gold-400), rgba(212,160,23,0.1))' }}
              />

              <div className="space-y-6">
                {journeySteps.map((step, i) => (
                  <div
                    key={step.phase}
                    className="relative flex items-start gap-6 group cursor-pointer"
                    onClick={() => setActiveJourneyStep(activeJourneyStep === i ? null : i)}
                  >
                    {/* Step Number Circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0 z-10 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: activeJourneyStep === i
                          ? `linear-gradient(135deg, ${step.feelingColor}, ${step.feelingColor}cc)`
                          : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${step.feelingColor}40`,
                        boxShadow: activeJourneyStep === i ? `0 4px 20px ${step.feelingColor}30` : 'none',
                      }}
                    >
                      {step.emoji}
                    </div>

                    {/* Step Content */}
                    <div
                      className="flex-1 rounded-xl p-6 transition-all duration-300"
                      style={{
                        background: activeJourneyStep === i ? `${step.feelingColor}10` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${activeJourneyStep === i ? `${step.feelingColor}30` : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ background: `${step.feelingColor}20`, color: step.feelingColor }}
                        >
                          Phase {i + 1}
                        </span>
                        <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                          {step.phase}
                        </h3>
                      </div>

                      <p className="text-white/70 text-sm mb-3">{step.action}</p>

                      {/* Expanded Details */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          maxHeight: activeJourneyStep === i ? '200px' : '0',
                          opacity: activeJourneyStep === i ? 1 : 0,
                        }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Touchpoint</p>
                            <p className="text-white/60 text-sm">{step.touchpoint}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">User Feeling</p>
                            <p className="text-sm font-medium" style={{ color: step.feelingColor }}>{step.feeling}</p>
                          </div>
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Opportunity</p>
                            <p className="text-white/60 text-sm">{step.opportunity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          INNOVATION IDEAS
          ========================================== */}
      <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              What Makes Us Different
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Innovative <span className="text-gradient-gold">Ideas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '🏗️',
                title: 'Microservices Architecture',
                desc: 'Independent User, Room, and Booking services with Eureka service discovery and API Gateway — ensuring fault isolation and horizontal scalability.',
              },
              {
                icon: '🔒',
                title: 'JWT Security Layer',
                desc: 'Stateless token-based authentication with Gateway-level interceptor — no session overhead, secure API access across all services.',
              },
              {
                icon: '🔍',
                title: 'Smart Room Search',
                desc: 'Multi-parameter JPQL search supporting location, room type, price range, and guest capacity filters — real-time results from PostgreSQL.',
              },
              {
                icon: '📊',
                title: 'Real-time Dashboard',
                desc: 'Personalized user dashboard showing booking history, upcoming stays, and quick-action buttons for cancellation and rebooking.',
              },
              {
                icon: '🌐',
                title: 'Service Discovery',
                desc: 'Netflix Eureka-based dynamic service registry — services auto-register and discover each other without hardcoded URLs.',
              },
              {
                icon: '🎨',
                title: 'Premium UI/UX',
                desc: 'React-based SPA with glassmorphism design, micro-animations, responsive layouts, and dark mode — luxury feel matching the brand.',
              },
            ].map((idea) => (
              <div
                key={idea.title}
                className="glass rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{idea.icon}</div>
                <h3
                  className="text-base font-semibold text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {idea.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA — VIEW ARCHITECTURE
          ========================================== */}
      <section style={{ padding: '4rem 0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Want to see the <span className="text-gradient-gold">Technical Architecture</span>?
          </h2>
          <p className="text-white/50 text-base mb-8 text-center">
            Explore the full microservices architecture with animated flow diagrams, service details, and tech stack breakdown.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/architecture" className="btn-gold !py-4 !px-10 text-base">
              View Architecture →
            </Link>
            <Link to="/search" className="btn-outline-gold !py-4 !px-10 text-base">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
