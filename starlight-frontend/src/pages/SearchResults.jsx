import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { roomService } from '../api/services';
import { roomTypes } from '../api/mockData';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';

export default function SearchResults({ onLoginClick }) {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    minPrice: 0,
    maxPrice: 100000,
    guests: searchParams.get('guests') || '',
  });

  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (searchFilters) => {
    setLoading(true);
    try {
      const filtersToUse = searchFilters || filters;
      const results = await roomService.search(filtersToUse);
      setRooms(results);
    } catch (err) {
      console.error('Failed to search rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    const newFilters = {
      ...filters,
      location: searchData.location,
      type: searchData.type,
    };
    setFilters(newFilters);
    fetchRooms(newFilters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchRooms(newFilters);
  };

  const handlePriceChange = (e) => {
    const maxPrice = parseInt(e.target.value);
    setPriceRange([0, maxPrice]);
    handleFilterChange('maxPrice', maxPrice);
  };

  const clearFilters = () => {
    const cleared = { location: '', type: '', minPrice: 0, maxPrice: 100000, guests: '' };
    setFilters(cleared);
    setPriceRange([0, 100000]);
    fetchRooms(cleared);
  };

  const handleBookNow = (room) => {
    if (!isAuthenticated) {
      onLoginClick('login');
      return;
    }
    setBookingRoom(room);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const activeFilterCount = [
    filters.location,
    filters.type,
    filters.maxPrice < 100000,
    filters.guests,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-navy-950">
      {/* ==========================================
          PAGE HEADER — extra top padding for fixed navbar
          ========================================== */}
      <div style={{ paddingTop: '8rem', paddingBottom: '2.5rem' }} className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Text */}
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Discover Your Stay
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore Our <span className="text-gradient-gold">Collection</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar variant="page" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ==========================================
              SIDEBAR FILTERS
              ========================================== */}
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center justify-between w-full px-4 py-3 rounded-xl glass border-white/10 text-white"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-400 text-navy-950 text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <svg className={`w-5 h-5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <aside
            className={`lg:w-72 flex-shrink-0 transition-all duration-500 overflow-hidden ${
              filtersOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'
            }`}
          >
            <div className="glass-dark rounded-2xl p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gold-400 hover:text-gold-300 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Room Type Filter */}
              <div className="mb-6">
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">Room Type</h4>
                <div className="space-y-2">
                  {roomTypes.map((type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <input
                        type="radio"
                        name="roomType"
                        checked={filters.type === type.value}
                        onChange={() => handleFilterChange('type', filters.type === type.value ? '' : type.value)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold-400 focus:ring-gold-400 focus:ring-offset-0"
                      />
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">Price Range</h4>
                <div className="px-1">
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-gold-400) 0%, var(--color-gold-400) ${((priceRange[1] - 5000) / 95000) * 100}%, rgba(255,255,255,0.1) ${((priceRange[1] - 5000) / 95000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-white/40 text-xs">₹5,000</span>
                    <span className="text-gold-400 text-xs font-semibold">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Max Guests Filter */}
              <div>
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">Guests</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleFilterChange('guests', filters.guests === num ? '' : num)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.guests === num
                          ? 'bg-gradient-gold text-navy-950'
                          : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ==========================================
              RESULTS GRID
              ========================================== */}
          <main className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/50 text-sm">
                {loading ? 'Searching...' : `${rooms.length} properties found`}
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-navy-800/50 rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-56 bg-navy-700/50" />
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
              /* Empty State */
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  No Properties Found
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Try adjusting your filters or searching a different destination.
                </p>
                <button onClick={clearFilters} className="btn-gold">
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Room Cards */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
          </main>
        </div>
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
