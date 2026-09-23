/* =====================================================
   SERVICE LAYER — Starlight Stays & Resorts
   =====================================================
   Uses mock data with optional backend connection.
   When Spring Boot backend is running, it fetches from
   the real API. Otherwise falls back to mock data.
   ===================================================== */

import { API_BASE_URL, ENDPOINTS, getAuthHeaders, getPublicHeaders } from './config';
import { mockRooms, mockBookings, mockUser } from './mockData';

// Simulate network delay for mock data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: try backend first, fallback to mock
const tryFetchOrFallback = async (fetchFn, fallbackFn) => {
  try {
    return await fetchFn();
  } catch (err) {
    console.warn('Backend unavailable, using mock data:', err.message);
    return await fallbackFn();
  }
};

/* =====================================================
   AUTH SERVICE
   Matches: POST /api/auth/login, POST /api/auth/register
   ===================================================== */
export const authService = {
  login: async (username, password) => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH_LOGIN}`, {
          method: 'POST',
          headers: getPublicHeaders(),
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (!response.ok || data.status === 'error') {
          throw new Error(data.message || 'Invalid credentials');
        }
        return data;
      },
      async () => {
        await delay(800);
        if (username === 'deepak' && password === 'pass123') {
          return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-jwt-token-for-deepak',
            username: 'deepak',
            email: 'deepak@klu.ac.in',
            role: 'USER',
          };
        }
        throw new Error('Invalid username or password');
      }
    );
  },

  register: async (userData) => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.AUTH_REGISTER}`, {
          method: 'POST',
          headers: getPublicHeaders(),
          body: JSON.stringify({ ...userData, role: 'USER' }),
        });
        const data = await response.json();
        if (!response.ok || data.status === 'error') {
          throw new Error(data.message || 'Registration failed');
        }
        return data;
      },
      async () => {
        await delay(800);
        if (userData.username === 'deepak') {
          throw new Error('Username already exists');
        }
        return {
          code: 200,
          status: 'Registration Successful',
          username: userData.username,
        };
      }
    );
  },
};

/* =====================================================
   ROOM SERVICE
   Matches: GET /api/rooms, GET /api/rooms/search, GET /api/rooms/:id
   ===================================================== */
export const roomService = {
  getAll: async () => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.ROOMS_LIST}`, {
          headers: getPublicHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch rooms');
        return response.json();
      },
      async () => {
        await delay(600);
        return [...mockRooms];
      }
    );
  },

  search: async (filters) => {
    return tryFetchOrFallback(
      async () => {
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.type) params.append('type', filters.type);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice && filters.maxPrice < 100000) params.append('maxPrice', filters.maxPrice);
        if (filters.guests) params.append('guests', filters.guests);

        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.ROOMS_SEARCH}?${params.toString()}`, {
          headers: getPublicHeaders(),
        });
        if (!response.ok) throw new Error('Search failed');
        return response.json();
      },
      async () => {
        await delay(700);
        let results = [...mockRooms];
        if (filters.location) {
          results = results.filter(r =>
            r.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        if (filters.type) {
          results = results.filter(r => r.type === filters.type);
        }
        if (filters.minPrice) {
          results = results.filter(r => r.pricePerNight >= filters.minPrice);
        }
        if (filters.maxPrice && filters.maxPrice < 100000) {
          results = results.filter(r => r.pricePerNight <= filters.maxPrice);
        }
        if (filters.guests) {
          results = results.filter(r => r.maxGuests >= filters.guests);
        }
        return results;
      }
    );
  },

  getById: async (id) => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.ROOMS_BY_ID}/${id}`, {
          headers: getPublicHeaders(),
        });
        if (!response.ok) throw new Error('Room not found');
        return response.json();
      },
      async () => {
        await delay(400);
        const room = mockRooms.find(r => r.id === id);
        if (!room) throw new Error('Room not found');
        return { ...room };
      }
    );
  },
};

/* =====================================================
   BOOKING SERVICE
   Matches: POST /api/bookings, GET /api/bookings/user/:id, DELETE /api/bookings/:id
   ===================================================== */
export const bookingService = {
  create: async (bookingData) => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.BOOKINGS_CREATE}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(bookingData),
        });
        if (!response.ok) throw new Error('Booking failed');
        return response.json();
      },
      async () => {
        await delay(1200);
        const room = mockRooms.find(r => r.id === bookingData.roomId);
        return {
          id: `BK-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
          ...bookingData,
          roomName: room?.name || 'Unknown Room',
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
        };
      }
    );
  },

  getByUser: async () => {
    return tryFetchOrFallback(
      async () => {
        const user = JSON.parse(localStorage.getItem('starlight_user'));
        if (!user || !user.username) throw new Error('User not found');
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.BOOKINGS_USER}/${user.username}`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return response.json();
      },
      async () => {
        await delay(600);
        return [...mockBookings];
      }
    );
  },

  cancel: async (bookingId) => {
    return tryFetchOrFallback(
      async () => {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.BOOKINGS_CANCEL}/${bookingId}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (!response.ok || data.status === 'error') {
          throw new Error(data.message || 'Cancellation failed');
        }
        return data;
      },
      async () => {
        await delay(800);
        return {
          id: bookingId,
          status: 'CANCELLED',
          message: 'Booking cancelled successfully',
        };
      }
    );
  },
};
