import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomService } from '../api/services';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';

export default function Home({ onLoginClick }) {
  const { isAuthenticated } = useAuth();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingRoom, setBookingRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await roomService.getAll();
        setFeaturedRooms(rooms.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    if (!isAuthenticated) {
      onLoginClick('login');
      return;
    }
    setBookingRoom(room);
  };

  const stats = [
    { value: '50+', label: 'Luxury Properties' },
    { value: '12', label: 'Destinations' },
    { value: '98%', label: 'Guest Satisfaction' },
    { value: '24/7', label: 'Concierge Service' },
  ];

  return (
    <>
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero-resort.jpg"
            alt="Starlight Stays luxury resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-gold" />
            <span className="text-gold-300 text-sm font-medium tracking-wide">Luxury Redefined — Est. 2024</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.1s', opacity: 0 }}
          >
            Experience Luxury{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-gold">Beyond Imagination</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            From overwater villas in the Maldives to sky-high penthouses in Dubai — 
            discover handpicked stays that transform every moment into an unforgettable memory.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-5xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <SearchBar variant="hero" />
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURED PROPERTIES
          ========================================== */}
      <section style={{ padding: '6rem 0', background: 'var(--color-surface-warm)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Handpicked Collection
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Featured Properties
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto text-base text-center">
              Curated luxury stays across the world's most breathtaking destinations.
            </p>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
          </div>

          {/* Room Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {featuredRooms.map((room, index) => (
                <div
                  key={room.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <RoomCard room={room} onBookNow={handleBookNow} />
                </div>
              ))}
            </div>
          )}

          {/* View All CTA */}
          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <Link
              to="/search"
              className="btn-outline-dark inline-flex items-center gap-2"
            >
              Explore All Properties
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          WHY CHOOSE US
          ========================================== */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #080b1f 0%, #0c1029 50%, #121838 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              The Starlight Promise
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why Choose <span className="text-gradient-gold">Starlight</span>?
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-base text-center">
              Three guarantees that set us apart from the rest.
            </p>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Best Price Guarantee',
                description: 'Find a lower price elsewhere? We\'ll match it and give you an extra 10% off your stay.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Free Cancellation',
                description: 'Plans change. Cancel up to 48 hours before check-in for a full refund, no questions asked.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Curated Luxury',
                description: 'Every property is personally inspected and curated by our team of luxury travel experts.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-10 text-center hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 text-navy-950 group-hover:shadow-gold transition-shadow duration-500">
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-semibold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          WHY CHOOSE US — END
          ========================================== */}


      {/* ==========================================
          CTA SECTION
          ========================================== */}
      <section className="w-full flex flex-col items-center justify-center overflow-hidden" style={{ padding: '6rem 0', background: 'var(--color-surface-warm)' }}>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 mb-6 w-full"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready for Your Next{' '}
            <span className="text-gradient-gold">Extraordinary</span> Escape?
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto text-base leading-relaxed" style={{ marginBottom: '2.5rem' }}>
            Join thousands of discerning travelers who trust Starlight for their most memorable stays.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search" className="btn-gold !py-4 !px-10 text-base">
              Browse All Properties
            </Link>
            {!isAuthenticated && (
              <button onClick={() => onLoginClick('register')} className="btn-outline-dark !py-4 !px-10 text-base">
                Create Free Account
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!bookingRoom}
        onClose={() => setBookingRoom(null)}
        room={bookingRoom}
        onSuccess={() => setBookingRoom(null)}
      />
    </>
  );
}
