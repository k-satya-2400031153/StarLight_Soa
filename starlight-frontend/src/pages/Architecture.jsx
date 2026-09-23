import { useState } from 'react';
import { Link } from 'react-router-dom';

/* =====================================================
   SVG Icons — inline for zero-dependency rendering
   ===================================================== */

const ServerIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const ShieldIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const KeyIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const DatabaseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* =====================================================
   MICROSERVICE DEFINITIONS
   ===================================================== */
const microservices = [
  {
    id: 'user-service',
    name: 'User / Auth Service',
    shortName: 'Auth',
    description: 'Handles user registration, authentication, and JWT token management. Supports role-based access control (RBAC) with admin and user roles.',
    port: '8081',
    color: 'cyan',
    icon: UserIcon,
    status: 'active',
    techStack: ['Spring Boot', 'Spring Security', 'JWT', 'JPA', 'MySQL'],
    endpoints: [
      { method: 'POST', path: '/api/auth/register', desc: 'Register new user' },
      { method: 'POST', path: '/api/auth/login', desc: 'Login → JWT token' },
      { method: 'GET', path: '/api/users/profile', desc: 'Get user profile' },
    ],
  },
  {
    id: 'room-service',
    name: 'Room Service',
    shortName: 'Rooms',
    description: 'Manages room inventory, availability, pricing, and search functionality. Supports filters by location, type, price range, and guest capacity.',
    port: '8082',
    color: 'violet',
    icon: HomeIcon,
    status: 'active',
    techStack: ['Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
    endpoints: [
      { method: 'GET', path: '/api/rooms', desc: 'List all rooms' },
      { method: 'GET', path: '/api/rooms/search', desc: 'Search with filters' },
      { method: 'GET', path: '/api/rooms/:id', desc: 'Room details by ID' },
    ],
  },
  {
    id: 'booking-service',
    name: 'Booking Service',
    shortName: 'Bookings',
    description: 'Processes reservations, manages booking lifecycle (create → confirm → complete/cancel), calculates pricing with taxes, and tracks user booking history.',
    port: '8083',
    color: 'emerald',
    icon: CalendarIcon,
    status: 'active',
    techStack: ['Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'],
    endpoints: [
      { method: 'POST', path: '/api/bookings', desc: 'Create booking' },
      { method: 'GET', path: '/api/bookings/user/:id', desc: 'User bookings' },
      { method: 'DELETE', path: '/api/bookings/:id', desc: 'Cancel booking' },
    ],
  },
];

const infrastructureServices = [
  {
    name: 'API Gateway',
    shortName: 'Gateway',
    description: 'Spring Cloud Gateway — Single entry point for all client requests. Routes traffic to microservices, handles cross-cutting concerns like CORS and rate limiting.',
    port: '8765',
    icon: GlobeIcon,
    color: 'gold',
  },
  {
    name: 'Eureka Discovery',
    shortName: 'Eureka',
    description: 'Netflix Eureka Server — Service registry and discovery. Microservices self-register and discover each other dynamically for load balancing.',
    port: '8761',
    icon: ServerIcon,
    color: 'sky',
  },
];

const techStackItems = [
  { name: 'Spring Boot', category: 'Backend', color: '#6DB33F' },
  { name: 'Spring Cloud', category: 'Infrastructure', color: '#6DB33F' },
  { name: 'React 19', category: 'Frontend', color: '#61DAFB' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#38BDF8' },
  { name: 'MySQL', category: 'Database', color: '#4479A1' },
  { name: 'JWT', category: 'Security', color: '#D63AFF' },
  { name: 'Eureka', category: 'Discovery', color: '#E50914' },
  { name: 'Vite', category: 'Build Tool', color: '#646CFF' },
];

/* =====================================================
   COLOR HELPERS
   ===================================================== */
const colorMap = {
  cyan: {
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.25)',
    text: '#22d3ee',
    glow: 'rgba(6, 182, 212, 0.15)',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
    methodBg: 'rgba(6, 182, 212, 0.12)',
    pulse: 'animate-pulse-cyan',
  },
  violet: {
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.25)',
    text: '#a78bfa',
    glow: 'rgba(139, 92, 246, 0.15)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    methodBg: 'rgba(139, 92, 246, 0.12)',
    pulse: 'animate-pulse-violet',
  },
  emerald: {
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
    text: '#34d399',
    glow: 'rgba(16, 185, 129, 0.15)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    methodBg: 'rgba(16, 185, 129, 0.12)',
    pulse: 'animate-pulse-emerald',
  },
  gold: {
    bg: 'rgba(212, 168, 83, 0.1)',
    border: 'rgba(212, 168, 83, 0.25)',
    text: '#d4a853',
    glow: 'rgba(212, 168, 83, 0.15)',
    gradient: 'linear-gradient(135deg, #b8912e 0%, #d4a853 100%)',
    methodBg: 'rgba(212, 168, 83, 0.12)',
    pulse: 'animate-pulse-gold',
  },
  sky: {
    bg: 'rgba(14, 165, 233, 0.1)',
    border: 'rgba(14, 165, 233, 0.25)',
    text: '#38bdf8',
    glow: 'rgba(14, 165, 233, 0.15)',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    methodBg: 'rgba(14, 165, 233, 0.12)',
    pulse: 'animate-pulse-cyan',
  },
};

const methodColors = {
  GET: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
  POST: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
  PUT: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' },
  DELETE: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171' },
};

/* =====================================================
   COMPONENT: ServiceCard
   ===================================================== */
function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[service.color];
  const Icon = service.icon;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
      }}
    >
      {/* Top color accent */}
      <div style={{ height: '3px', background: colors.gradient }} />

      <div style={{ padding: '1.75rem' }}>
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: '1rem' }}>
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.pulse}`}
              style={{ background: colors.gradient }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {service.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: colors.methodBg, color: colors.text }}
                >
                  :{service.port}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#34d399', boxShadow: '0 0 6px rgba(52, 211, 153, 0.6)' }}
                  />
                  <span className="text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
                    Active
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed" style={{ marginBottom: '1rem' }}>
          {service.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '1rem' }}>
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Endpoints Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300"
          style={{
            background: expanded ? colors.bg : 'rgba(255, 255, 255, 0.03)',
            color: colors.text,
            border: `1px solid ${expanded ? colors.border : 'rgba(255, 255, 255, 0.06)'}`,
          }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            API Endpoints ({service.endpoints.length})
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Endpoints List */}
        <div
          className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-80 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
        >
          <div className="space-y-2">
            {service.endpoints.map((ep, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    background: methodColors[ep.method].bg,
                    color: methodColors[ep.method].text,
                    minWidth: '48px',
                    textAlign: 'center',
                  }}
                >
                  {ep.method}
                </span>
                <code className="text-white/60 text-xs font-mono flex-1 truncate">{ep.path}</code>
                <span className="text-white/30 text-[11px] hidden sm:inline">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COMPONENT: InfrastructureCard
   ===================================================== */
function InfrastructureCard({ service, index }) {
  const colors = colorMap[service.color];
  const Icon = service.icon;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-fade-in-up group"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        animationDelay: `${(index + 3) * 0.15}s`,
        opacity: 0,
      }}
    >
      <div style={{ height: '3px', background: colors.gradient }} />
      <div style={{ padding: '1.5rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.pulse}`}
            style={{ background: colors.gradient }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {service.name}
            </h3>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: colors.methodBg, color: colors.text }}
            >
              :{service.port}
            </span>
          </div>
        </div>
        <p className="text-white/45 text-sm leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
}

/* =====================================================
   MAIN PAGE COMPONENT
   ===================================================== */
export default function Architecture() {
  return (
    <div className="min-h-screen bg-navy-950">
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '9rem',
          paddingBottom: '4rem',
          background: 'linear-gradient(180deg, #080b1f 0%, #0c1029 40%, #121838 100%)',
        }}
      >
        {/* Decorative grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 168, 83, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 168, 83, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating glow effects */}
        <div
          className="absolute rounded-full blur-3xl opacity-20 animate-float"
          style={{
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            top: '10%', right: '10%',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: '250px', height: '250px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            bottom: '5%', left: '5%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#22d3ee', boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
            />
            <span className="text-cyan-400 text-sm font-medium tracking-wide">
              Microservices Architecture
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.1s', opacity: 0 }}
          >
            How <span className="text-gradient-gold">Starlight</span> Works
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            A distributed system powered by Spring Boot microservices — each service independently
            deployable, scalable, and connected through service discovery and an API gateway.
          </p>

          {/* Quick stats */}
          <div
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {[
              { value: '3', label: 'Microservices', color: '#a78bfa' },
              { value: '5', label: 'Services Total', color: '#22d3ee' },
              { value: '9', label: 'API Endpoints', color: '#34d399' },
              { value: 'JWT', label: 'Auth Protocol', color: '#d4a853' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          ARCHITECTURE FLOW DIAGRAM
          ========================================== */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #121838 0%, #0c1029 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              System Overview
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Request Flow <span className="text-gradient-gold">Architecture</span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base">
              How a client request travels through the system.
            </p>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
          </div>

          {/* Architecture Diagram */}
          <div
            className="glass rounded-3xl overflow-hidden animate-fade-in-up"
            style={{ padding: '2.5rem', animationDelay: '0.2s', opacity: 0 }}
          >
            {/* Row 1: Client → Gateway */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6" style={{ marginBottom: '2rem' }}>
              {/* Client */}
              <div
                className="rounded-2xl px-6 py-4 text-center flex-shrink-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  minWidth: '160px',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-semibold">React Frontend</p>
                <p className="text-white/30 text-[10px] font-mono mt-0.5">:5173</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1">
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, rgba(212, 168, 83, 0.1) 0%, rgba(212, 168, 83, 0.6) 50%, rgba(212, 168, 83, 0.1) 100%)' }} className="hidden lg:block animate-connection-pulse" />
                <svg className="w-5 h-5 text-gold-400 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <svg className="w-5 h-5 text-gold-400 lg:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* API Gateway */}
              <div
                className="rounded-2xl px-8 py-5 text-center flex-shrink-0"
                style={{
                  background: colorMap.gold.bg,
                  border: `2px solid ${colorMap.gold.border}`,
                  minWidth: '200px',
                  boxShadow: `0 0 30px ${colorMap.gold.glow}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 animate-pulse-gold"
                  style={{ background: colorMap.gold.gradient }}
                >
                  <GlobeIcon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gold-300 text-sm font-bold">API Gateway</p>
                <p className="text-gold-400/50 text-[10px] font-mono mt-0.5">Spring Cloud Gateway :8765</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1">
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.6) 50%, rgba(14, 165, 233, 0.1) 100%)' }} className="hidden lg:block animate-connection-pulse" />
                <svg className="w-5 h-5 text-sky-400 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <svg className="w-5 h-5 text-sky-400 lg:hidden rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Eureka */}
              <div
                className="rounded-2xl px-6 py-4 text-center flex-shrink-0"
                style={{
                  background: colorMap.sky.bg,
                  border: `1px solid ${colorMap.sky.border}`,
                  minWidth: '160px',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: colorMap.sky.gradient }}
                >
                  <ServerIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sky-300 text-sm font-semibold">Eureka Discovery</p>
                <p className="text-sky-400/50 text-[10px] font-mono mt-0.5">Netflix Eureka :8761</p>
              </div>
            </div>

            {/* Connection Lines Down */}
            <div className="flex justify-center" style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-8 lg:gap-16">
                {['cyan', 'violet', 'emerald'].map((color) => (
                  <div key={color} className="flex flex-col items-center">
                    <div
                      className="animate-connection-pulse"
                      style={{
                        width: '2px',
                        height: '40px',
                        background: `linear-gradient(180deg, ${colorMap.gold.text} 0%, ${colorMap[color].text} 100%)`,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: colorMap[color].gradient,
                        boxShadow: `0 0 8px ${colorMap[color].glow}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Microservices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {microservices.map((svc) => {
                const colors = colorMap[svc.color];
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.id}
                    className="rounded-2xl px-5 py-4 text-center transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${colors.pulse}`}
                      style={{ background: colors.gradient }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: colors.text }}>{svc.shortName} Service</p>
                    <p className="text-white/30 text-[10px] font-mono mt-0.5">:{svc.port}</p>
                  </div>
                );
              })}
            </div>

            {/* Database Layer */}
            <div className="flex justify-center" style={{ marginTop: '2rem' }}>
              <div className="flex items-center gap-4">
                <div
                  className="animate-connection-pulse"
                  style={{
                    width: '2px',
                    height: '30px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center" style={{ marginTop: '0.5rem' }}>
              <div
                className="rounded-2xl px-8 py-4 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px dashed rgba(255, 255, 255, 0.12)',
                  minWidth: '200px',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 bg-white/10">
                  <DatabaseIcon className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-white/50 text-sm font-semibold">MySQL Database</p>
                <p className="text-white/25 text-[10px] font-mono mt-0.5">Persistent Storage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MICROSERVICE DETAIL CARDS
          ========================================== */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #0c1029 0%, #080b1f 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Core Services
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our <span className="text-gradient-gold">Microservices</span>
            </h2>
            <p className="text-white/45 max-w-lg mx-auto text-base">
              Each service is independently built, deployed, and scaled using Spring Boot.
            </p>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
            {microservices.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </div>

          {/* Infrastructure Cards */}
          <div className="text-center" style={{ marginBottom: '2rem', marginTop: '3rem' }}>
            <p className="text-white/40 text-sm font-semibold uppercase tracking-[0.2em]">
              Infrastructure Layer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {infrastructureServices.map((svc, i) => (
              <InfrastructureCard key={svc.name} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          TECH STACK
          ========================================== */}
      <section style={{ padding: '5rem 0', background: 'var(--color-surface-warm)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Technology
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy-950 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Tech Stack <span className="text-gradient-gold">We Use</span>
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto text-base">
              Enterprise-grade technologies powering the Starlight platform.
            </p>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {techStackItems.map((tech, i) => (
              <div
                key={tech.name}
                className="bg-white rounded-2xl p-5 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${tech.color}18` }}
                >
                  <span className="text-lg font-bold" style={{ color: tech.color }}>
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <p className="text-navy-950 text-sm font-semibold">{tech.name}</p>
                <p className="text-text-secondary text-[10px] uppercase tracking-wider mt-0.5">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA SECTION
          ========================================== */}
      <section
        className="w-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          padding: '5rem 0',
          background: 'linear-gradient(180deg, var(--color-surface-warm) 0%, #080b1f 100%)',
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-6 w-full"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            See It in <span className="text-gradient-gold">Action</span>
          </h2>
          <p
            className="text-white/50 max-w-lg mx-auto text-base leading-relaxed"
            style={{ marginBottom: '2.5rem' }}
          >
            Explore the live frontend powered by these microservices — search rooms, make bookings, and
            experience the seamless integration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search" className="btn-gold !py-4 !px-10 text-base inline-flex items-center gap-2">
              Explore Properties
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link to="/" className="btn-outline !py-4 !px-10 text-base">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
