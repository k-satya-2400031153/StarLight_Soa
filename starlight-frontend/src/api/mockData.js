/* =====================================================
   MOCK DATA — Starlight Stays & Resorts
   =====================================================
   This data simulates Spring Boot REST API responses.
   Structure matches the expected JPA entity fields so
   swapping to real APIs requires zero frontend changes.
   ===================================================== */

// ===== ROOM DATA =====
// Matches expected Room entity: { id, name, type, location, description, pricePerNight, maxGuests, amenities, images, available, totalRooms }
export const mockRooms = [
  {
    id: 1,
    name: 'Ocean Breeze Deluxe',
    type: 'DELUXE',
    location: 'Maldives',
    description: 'Wake up to panoramic ocean views in our signature deluxe room. Featuring a king-size bed with premium Egyptian cotton linens, a private balcony, and a marble-clad en-suite bathroom with rainfall shower.',
    pricePerNight: 18500,
    maxGuests: 2,
    amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'Room Service', 'WiFi', 'Smart TV'],
    image: '/images/room-deluxe.jpg',
    available: true,
    totalRooms: 12,
    roomsLeft: 5,
    rating: 4.8,
    reviewCount: 234,
  },
  {
    id: 2,
    name: 'Presidential Suite',
    type: 'SUITE',
    location: 'Maldives',
    description: 'Indulge in the ultimate luxury with our Presidential Suite. Spanning 120 sqm, it features a separate living area with plush velvet furnishings, a private dining space, crystal chandelier, and a panoramic terrace with infinity views.',
    pricePerNight: 45000,
    maxGuests: 4,
    amenities: ['Panoramic View', 'Living Area', 'Private Dining', 'Butler Service', 'Jacuzzi', 'Premium Bar'],
    image: '/images/room-suite.jpg',
    available: true,
    totalRooms: 4,
    roomsLeft: 2,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'Tropical Garden Villa',
    type: 'VILLA',
    location: 'Bali',
    description: 'Experience barefoot luxury in our private garden villa. Featuring an open-air living concept, private infinity pool, lush tropical gardens, outdoor rain shower, and a dedicated spa treatment room.',
    pricePerNight: 62000,
    maxGuests: 6,
    amenities: ['Private Pool', 'Garden', 'Outdoor Shower', 'Spa Room', 'Kitchen', 'Golf Cart'],
    image: '/images/room-villa.jpg',
    available: true,
    totalRooms: 8,
    roomsLeft: 3,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 4,
    name: 'Skyline Penthouse',
    type: 'PENTHOUSE',
    location: 'Dubai',
    description: 'Our crown jewel — a sky-high penthouse with floor-to-ceiling windows framing the city skyline. Features a private jacuzzi, marble bathroom, curated art collection, and 24/7 personal concierge service.',
    pricePerNight: 95000,
    maxGuests: 4,
    amenities: ['City Skyline View', 'Private Jacuzzi', 'Art Collection', 'Concierge', 'Helipad Access', 'Wine Cellar'],
    image: '/images/room-penthouse.jpg',
    available: true,
    totalRooms: 2,
    roomsLeft: 1,
    rating: 5.0,
    reviewCount: 42,
  },
  {
    id: 5,
    name: 'Coral Reef Deluxe',
    type: 'DELUXE',
    location: 'Maldives',
    description: 'A serene overwater deluxe room with glass floor panels revealing the vibrant coral reef below. Features a sunken bathtub, outdoor deck with direct lagoon access, and a complimentary snorkeling kit.',
    pricePerNight: 22000,
    maxGuests: 2,
    amenities: ['Glass Floor', 'Lagoon Access', 'Snorkeling Kit', 'Sunset Deck', 'WiFi', 'Mini Bar'],
    image: '/images/room-deluxe.jpg',
    available: true,
    totalRooms: 10,
    roomsLeft: 0,
    rating: 4.7,
    reviewCount: 312,
  },
  {
    id: 6,
    name: 'Rainforest Retreat Villa',
    type: 'VILLA',
    location: 'Bali',
    description: 'Nestled deep within Bali\'s lush rainforest canopy, this villa offers complete privacy with a natural stone plunge pool, bamboo-framed outdoor living, and a yoga pavilion overlooking rice terraces.',
    pricePerNight: 55000,
    maxGuests: 4,
    amenities: ['Plunge Pool', 'Yoga Pavilion', 'Rice Terrace View', 'Organic Garden', 'Spa', 'Fireplace'],
    image: '/images/room-villa.jpg',
    available: true,
    totalRooms: 6,
    roomsLeft: 4,
    rating: 4.8,
    reviewCount: 198,
  },
];

// ===== BOOKING DATA =====
// Matches expected Booking entity: { id, roomId, roomName, userId, checkIn, checkOut, guests, totalPrice, status, createdAt }
export const mockBookings = [
  {
    id: 'BK-2026-001',
    roomId: 1,
    roomName: 'Ocean Breeze Deluxe',
    roomType: 'DELUXE',
    location: 'Maldives',
    userId: 'deepak',
    checkIn: '2026-10-15',
    checkOut: '2026-10-20',
    guests: 2,
    totalPrice: 92500,
    status: 'CONFIRMED',
    createdAt: '2026-09-10T14:30:00',
    image: '/images/room-deluxe.jpg',
  },
  {
    id: 'BK-2026-002',
    roomId: 3,
    roomName: 'Tropical Garden Villa',
    roomType: 'VILLA',
    location: 'Bali',
    userId: 'deepak',
    checkIn: '2026-11-01',
    checkOut: '2026-11-07',
    guests: 4,
    totalPrice: 372000,
    status: 'CONFIRMED',
    createdAt: '2026-09-12T09:15:00',
    image: '/images/room-villa.jpg',
  },
  {
    id: 'BK-2026-003',
    roomId: 2,
    roomName: 'Presidential Suite',
    roomType: 'SUITE',
    location: 'Maldives',
    userId: 'deepak',
    checkIn: '2026-08-01',
    checkOut: '2026-08-05',
    guests: 2,
    totalPrice: 180000,
    status: 'COMPLETED',
    createdAt: '2026-07-20T16:45:00',
    image: '/images/room-suite.jpg',
  },
  {
    id: 'BK-2026-004',
    roomId: 4,
    roomName: 'Skyline Penthouse',
    roomType: 'PENTHOUSE',
    location: 'Dubai',
    userId: 'deepak',
    checkIn: '2026-07-10',
    checkOut: '2026-07-12',
    guests: 2,
    totalPrice: 190000,
    status: 'CANCELLED',
    createdAt: '2026-06-28T11:20:00',
    image: '/images/room-penthouse.jpg',
  },
];

// ===== USER DATA =====
// Matches expected User entity: { id, username, email, role }
export const mockUser = {
  id: 1,
  username: 'deepak',
  email: 'deepak@klu.ac.in',
  role: 'USER',
};

// ===== LOCATIONS =====
export const locations = [
  'Maldives',
  'Bali',
  'Dubai',
  'Santorini',
  'Phuket',
  'Seychelles',
];

// ===== ROOM TYPES =====
export const roomTypes = [
  { value: 'DELUXE', label: 'Deluxe Room' },
  { value: 'SUITE', label: 'Presidential Suite' },
  { value: 'VILLA', label: 'Private Villa' },
  { value: 'PENTHOUSE', label: 'Penthouse' },
];
