import { useState, useEffect } from 'react';
import { roomService } from '../api/services';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';

export default function Offers({ onLoginClick }) {
  const { isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingRoom, setBookingRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await roomService.getAll();
        // Show rooms with availability (simulating "offers")
        setRooms(allRooms.filter((r) => r.available && r.roomsLeft > 0));
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

  return (
    <div className="min-h-screen bg-navy-950">
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <div style={{ paddingTop: '8rem', paddingBottom: '2rem' }} className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Limited Time Deals
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Exclusive <span className="text-gradient-gold">Offers</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed text-center">
            Handpicked deals on our finest properties. Book now and save up to 30% on luxury stays across the globe.
          </p>
          <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* ==========================================
          OFFERS BANNER
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginBottom: '2.5rem' }}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,168,83,0.15) 0%, rgba(184,145,46,0.08) 100%)',
            border: '1px solid rgba(212,168,83,0.2)',
            padding: '2rem 2.5rem',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-navy-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                Early Bird Special — Save Up to 30%
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Book 60+ days in advance and enjoy exclusive discounts on all properties. Valid for stays until March 2027.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          ROOM CARDS
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingBottom: '5rem' }}>
        {/* Results Count */}
        <p className="text-white/50 text-sm" style={{ marginBottom: '1.5rem' }}>
          {loading ? 'Loading offers...' : `${rooms.length} special offers available`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-navy-800/50 rounded-2xl overflow-hidden animate-pulse">
                <div style={{ height: '220px' }} className="bg-navy-700/50" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-navy-700/50 rounded w-1/4" />
                  <div className="h-5 bg-navy-700/50 rounded w-3/4" />
                  <div className="h-3 bg-navy-700/50 rounded w-1/2" />
                  <div className="h-10 bg-navy-700/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center" style={{ padding: '5rem 0' }}>
            <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              No Offers Available Right Now
            </h3>
            <p className="text-white/40 text-sm">
              Check back soon for exclusive deals on our luxury properties.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
              >
                <RoomCard room={room} onBookNow={handleBookNow} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!bookingRoom}
        onClose={() => setBookingRoom(null)}
        room={bookingRoom}
        onSuccess={() => setBookingRoom(null)}
      />
    </div>
  );
}
