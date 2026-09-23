import { useNavigate } from 'react-router-dom';

export default function RoomCard({ room, onBookNow }) {
  const navigate = useNavigate();

  const getAvailabilityBadge = () => {
    if (room.roomsLeft === 0) {
      return { text: 'Sold Out', classes: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    if (room.roomsLeft <= 2) {
      return { text: `Only ${room.roomsLeft} left`, classes: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    return { text: 'Available', classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
  };

  const badge = getAvailabilityBadge();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const typeLabel = {
    DELUXE: 'Deluxe Room',
    SUITE: 'Presidential Suite',
    VILLA: 'Private Villa',
    PENTHOUSE: 'Penthouse',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* ========== IMAGE SECTION ========== */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Availability Badge — top right with safe inset */}
        <div
          className={`absolute px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${badge.classes}`}
          style={{ top: '12px', right: '12px' }}
        >
          {badge.text}
        </div>

        {/* Location Pin — top left with safe inset */}
        <div
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-white text-xs font-medium"
          style={{ top: '12px', left: '12px' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {room.location}
        </div>

        {/* Price Tag — bottom left, inset to avoid border-radius clipping */}
        <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
          <p className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {formatPrice(room.pricePerNight)}
          </p>
          <p className="text-white/60 text-xs">per night</p>
        </div>
      </div>

      {/* ========== CARD BODY ========== */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: '1.25rem 1.25rem 1.25rem 1.25rem' }}
      >
        {/* Room Type */}
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-wider" style={{ marginBottom: '4px' }}>
          {typeLabel[room.type] || room.type}
        </p>

        {/* Room Name */}
        <h3
          className="font-semibold text-navy-950 group-hover:text-gold-500 transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            lineHeight: '1.4',
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {room.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(room.rating) ? 'text-gold-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-navy-900">{room.rating}</span>
          <span className="text-xs text-gray-400">({room.reviewCount})</span>
        </div>

        {/* Amenities — flex wrap with controlled overflow */}
        <div
          className="flex flex-wrap items-start content-start"
          style={{ gap: '6px', marginBottom: '10px', minHeight: '52px' }}
        >
          {(typeof room.amenities === 'string' ? room.amenities.split(',') : room.amenities || []).slice(0, 3).map((amenity) => (
            <span
              key={amenity.trim()}
              className="rounded-full bg-navy-950/5 text-navy-700 font-medium"
              style={{ padding: '4px 10px', fontSize: '11px', lineHeight: '1.3' }}
            >
              {amenity.trim()}
            </span>
          ))}
          {(typeof room.amenities === 'string' ? room.amenities.split(',') : room.amenities || []).length > 3 && (
            <span
              className="rounded-full bg-gold-100 text-gold-600 font-medium"
              style={{ padding: '4px 10px', fontSize: '11px', lineHeight: '1.3' }}
            >
              +{(typeof room.amenities === 'string' ? room.amenities.split(',') : room.amenities || []).length - 3} more
            </span>
          )}
        </div>

        {/* Spacer — pushes footer to bottom */}
        <div className="flex-1" />

        {/* Card Footer — guest count + button */}
        <div>
          {/* Max Guests */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400" style={{ marginBottom: '10px' }}>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Up to {room.maxGuests} guests
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => room.roomsLeft > 0 && onBookNow && onBookNow(room)}
            disabled={room.roomsLeft === 0}
            className={`w-full rounded-xl text-sm font-bold transition-all duration-300 ${
              room.roomsLeft === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'btn-gold !rounded-xl'
            }`}
            style={{ padding: '12px 0' }}
          >
            {room.roomsLeft === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
