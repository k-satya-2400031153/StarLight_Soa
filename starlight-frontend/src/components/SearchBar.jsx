import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, roomTypes } from '../api/mockData';

export default function SearchBar({ variant = 'hero', onSearch }) {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    type: '',
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    } else {
      const params = new URLSearchParams();
      Object.entries(searchData).forEach(([key, val]) => {
        if (val) params.set(key, val);
      });
      navigate(`/search?${params.toString()}`);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const inputClasses = variant === 'hero'
    ? 'w-full px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-gold-400 focus:bg-white/12 transition-all duration-300'
    : 'w-full px-4 py-3 rounded-xl bg-navy-950/50 border border-navy-700 text-white text-sm placeholder-white/40 focus:outline-none focus:border-gold-400 transition-all duration-300';

  const labelClasses = 'block text-[11px] uppercase tracking-wider mb-1.5 font-semibold ' +
    (variant === 'hero' ? 'text-gold-300' : 'text-gold-400');

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`rounded-2xl p-6 ${
          variant === 'hero'
            ? 'glass shadow-glass'
            : 'bg-navy-800/60 border border-navy-700/50'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div>
            <label className={labelClasses}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destination
              </span>
            </label>
            <select
              name="location"
              value={searchData.location}
              onChange={handleChange}
              className={inputClasses + ' cursor-pointer'}
            >
              <option value="" className="bg-navy-900 text-white">All Destinations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc} className="bg-navy-900 text-white">{loc}</option>
              ))}
            </select>
          </div>

          {/* Check-in */}
          <div>
            <label className={labelClasses}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Check-in
              </span>
            </label>
            <input
              type="date"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleChange}
              min={today}
              className={inputClasses}
            />
          </div>

          {/* Check-out */}
          <div>
            <label className={labelClasses}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Check-out
              </span>
            </label>
            <input
              type="date"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleChange}
              min={searchData.checkIn || today}
              className={inputClasses}
            />
          </div>

          {/* Room Type */}
          <div>
            <label className={labelClasses}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Room Type
              </span>
            </label>
            <select
              name="type"
              value={searchData.type}
              onChange={handleChange}
              className={inputClasses + ' cursor-pointer'}
            >
              <option value="" className="bg-navy-900 text-white">All Types</option>
              {roomTypes.map((t) => (
                <option key={t.value} value={t.value} className="bg-navy-900 text-white">{t.label}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="btn-gold w-full !py-3.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
