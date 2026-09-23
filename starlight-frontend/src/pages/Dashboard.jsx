import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchBookings();
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getByUser();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    setCancelling(true);
    try {
      await bookingService.cancel(bookingId);
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b)
      );
      setCancelModal(null);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    } finally {
      setCancelling(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      COMPLETED: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    return styles[status] || styles.PENDING;
  };

  const activeBookings = bookings.filter(b => ['CONFIRMED', 'PENDING'].includes(b.status));
  const pastBookings = bookings.filter(b => ['COMPLETED', 'CANCELLED'].includes(b.status));

  const displayBookings = activeTab === 'active' ? activeBookings : pastBookings;

  return (
    <div className="min-h-screen bg-navy-950" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="text-navy-950 font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Welcome back, <span className="text-gradient-gold">{user?.username}</span>
              </h1>
              <p className="text-white/40 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '📋' },
            { label: 'Active', value: activeBookings.length, icon: '✅' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'COMPLETED').length, icon: '🏆' },
            { label: 'Cancelled', value: bookings.filter(b => b.status === 'CANCELLED').length, icon: '❌' },
          ].map((stat) => (
            <div key={stat.label} className="glass-dark rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'active'
                ? 'bg-gradient-gold text-navy-950 shadow-gold'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            Active Reservations
            {activeBookings.length > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'active'
                  ? 'bg-navy-950/20 text-navy-950'
                  : 'bg-gold-400/20 text-gold-400'
              }`}>
                {activeBookings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'past'
                ? 'bg-gradient-gold text-navy-950 shadow-gold'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            Past Reservations
            {pastBookings.length > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'past'
                  ? 'bg-navy-950/20 text-navy-950'
                  : 'bg-white/20 text-white/60'
              }`}>
                {pastBookings.length}
              </span>
            )}
          </button>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-dark rounded-2xl p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-28 h-20 rounded-lg bg-navy-700/50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-navy-700/50 rounded w-1/4" />
                    <div className="h-5 bg-navy-700/50 rounded w-1/2" />
                    <div className="h-3 bg-navy-700/50 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayBookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeTab === 'active' ? 'No Active Reservations' : 'No Past Reservations'}
            </h3>
            <p className="text-white/40 text-sm mb-6">
              {activeTab === 'active'
                ? 'Start exploring our luxury properties and book your dream stay!'
                : 'Your past reservations will appear here.'}
            </p>
            {activeTab === 'active' && (
              <button onClick={() => navigate('/search')} className="btn-gold">
                Explore Properties
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking, index) => (
              <div
                key={booking.id}
                className="glass-dark rounded-2xl overflow-hidden hover:bg-white/[0.03] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Room Image */}
                  <div className="sm:w-44 h-40 sm:h-auto relative overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.roomName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/50 hidden sm:block" />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Room Type & Name */}
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                            {booking.roomType}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-semibold text-white mb-2"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {booking.roomName}
                        </h3>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-white/30 text-xs mb-0.5">Booking ID</p>
                            <p className="text-white/70 font-medium font-mono text-xs">{booking.id}</p>
                          </div>
                          <div>
                            <p className="text-white/30 text-xs mb-0.5">Check-in</p>
                            <p className="text-white/70 font-medium">{formatDate(booking.checkIn)}</p>
                          </div>
                          <div>
                            <p className="text-white/30 text-xs mb-0.5">Check-out</p>
                            <p className="text-white/70 font-medium">{formatDate(booking.checkOut)}</p>
                          </div>
                          <div>
                            <p className="text-white/30 text-xs mb-0.5">Guests</p>
                            <p className="text-white/70 font-medium">{booking.guests}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 sm:ml-4">
                        <div>
                          <p className="text-white/30 text-xs mb-0.5">Total</p>
                          <p className="text-gold-400 font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                            {formatPrice(booking.totalPrice)}
                          </p>
                        </div>
                        {booking.status === 'CONFIRMED' && (
                          <button
                            onClick={() => setCancelModal(booking)}
                            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 border border-red-500/20 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => !cancelling && setCancelModal(null)}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-fade-in" />
          <div
            className="relative w-full max-w-md glass-dark rounded-3xl shadow-modal overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-600" />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Cancel Reservation?
              </h3>
              <p className="text-white/50 text-sm mb-2">
                Are you sure you want to cancel your reservation at
              </p>
              <p className="text-white font-medium mb-6">{cancelModal.roomName}?</p>
              <p className="text-white/30 text-xs mb-6">
                Booking ID: <span className="font-mono">{cancelModal.id}</span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setCancelModal(null)}
                  disabled={cancelling}
                  className="flex-1 py-3 rounded-xl glass text-white text-sm font-medium hover:bg-white/10 transition-all"
                >
                  Keep Reservation
                </button>
                <button
                  onClick={() => handleCancel(cancelModal.id)}
                  disabled={cancelling}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  {cancelling ? (
                    <>
                      <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Cancelling...
                    </>
                  ) : (
                    'Yes, Cancel'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
