/* =====================================================
   BACKEND INTEGRATION POINTS
   =====================================================
   Update these values when your Spring Boot microservices
   (API Gateway + Eureka + Room Service + Booking Service)
   are ready.

   Current setup matches the gateway patterns from:
   - skill_exp-3 (Auth: Signup + Login with JWT)
   - skill_exp-7 (RBAC: Register + Login with JWT + roles)

   Gateway port: Update API_BASE_URL to your gateway port.
   ===================================================== */

// ===== CHANGE THIS WHEN BACKEND IS READY =====
export const API_BASE_URL = 'http://localhost:8765';

// ===== API ENDPOINTS =====
// These match the Spring Boot controller mappings
export const ENDPOINTS = {
  // Auth Service (matches skill_exp-7 pattern: /api/auth/*)
  AUTH_LOGIN:      '/api/auth/login',       // POST { username, password } → returns { token, role }
  AUTH_REGISTER:   '/api/auth/register',    // POST { username, password, email, role }

  // Room Service (new microservice your teammate is building)
  ROOMS_LIST:      '/api/rooms',            // GET → returns Room[]
  ROOMS_SEARCH:    '/api/rooms/search',     // GET ?location=&type=&checkIn=&checkOut=&guests=
  ROOMS_BY_ID:     '/api/rooms',            // GET /:id → returns Room

  // Booking Service (new microservice your teammate is building)
  BOOKINGS_CREATE: '/api/bookings',         // POST { roomId, checkIn, checkOut, guests, totalPrice }
  BOOKINGS_USER:   '/api/bookings/user',    // GET /:userId → returns Booking[]
  BOOKINGS_CANCEL: '/api/bookings',         // DELETE /:bookingId
};

// ===== JWT TOKEN HELPERS =====
// Use these when making authenticated API calls

/**
 * Get the JWT token from localStorage
 * Matches the token format returned by your Spring Boot auth service
 */
export const getAuthToken = () => localStorage.getItem('starlight_token');

/**
 * Create authorization headers for authenticated requests
 * Usage: fetch(url, { headers: getAuthHeaders() })
 */
export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`,
});

/**
 * Create headers for public (non-authenticated) requests
 */
export const getPublicHeaders = () => ({
  'Content-Type': 'application/json',
});
