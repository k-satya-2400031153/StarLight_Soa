import { useState } from 'react';
import { bookingService } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function BookingModal({ isOpen, onClose, room, onSuccess }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [dates, setDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
    setError('');
  };

  const calculateNights = () => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const diff = new Date(dates.checkOut) - new Date(dates.checkIn);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const subtotal = nights * (room?.pricePerNight || 0);
  const taxes = Math.round(subtotal * 0.18); // 18% GST
  const totalPrice = subtotal + taxes;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleConfirm = async () => {
    if (!dates.checkIn || !dates.checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }
    if (nights < 1) {
      setError('Check-out must be after check-in');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const booking = await bookingService.create({
        roomId: room.id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests: dates.guests,
        totalPrice,
      });

      setSuccess(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(booking);
          setSuccess(false);
          setDates({ checkIn: '', checkOut: '', guests: 1 });
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !room) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-dark rounded-3xl shadow-modal overflow-hidden">
          {/* Header Decoration */}
          <div className="h-2 bg-gradient-gold" />

          {/* Success State */}
          {success ? (
            <div className="p-12 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Reservation Confirmed!
              </h3>
              <p className="text-white/50 text-sm">
                Your booking for {room.name} has been confirmed. Check your dashboard for details.
              </p>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Complete Your Reservation
              </h2>

              {/* Room Summary */}
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-24 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                    {room.type}
                  </p>
                  <h4 className="text-white font-medium truncate">{room.name}</h4>
                  <p className="text-white/40 text-sm flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {room.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {formatPrice(room.pricePerNight)}
                  </p>
                  <p className="text-white/40 text-xs">per night</p>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] text-gold-300 uppercase tracking-wider mb-1.5 font-semibold">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={dates.checkIn}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gold-300 uppercase tracking-wider mb-1.5 font-semibold">Check-out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={dates.checkOut}
                    onChange={handleChange}
                    min={dates.checkIn || today}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-all"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="block text-[11px] text-gold-300 uppercase tracking-wider mb-1.5 font-semibold">Guests</label>
                <select
                  name="guests"
                  value={dates.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-all cursor-pointer"
                >
                  {[...Array(room.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-navy-900">
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="p-4 rounded-xl bg-white/3 border border-white/5 mb-6 space-y-2 animate-fade-in">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{formatPrice(room.pricePerNight)} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span className="text-white/70">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Taxes & Fees (18% GST)</span>
                    <span className="text-white/70">{formatPrice(taxes)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 mt-2 flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-gold-400 font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-slide-down">
                  {error}
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={loading || !nights}
                className="btn-gold w-full !py-4 !text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Reservation...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Confirm Reservation
                  </>
                )}
              </button>

              <p className="text-center text-white/25 text-xs mt-3">
                Free cancellation up to 48 hours before check-in
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
