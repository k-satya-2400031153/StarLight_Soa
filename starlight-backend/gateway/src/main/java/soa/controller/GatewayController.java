package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.service.GatewayService;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@RestController
public class GatewayController {

    @Autowired
    GatewayService GS;

    // Redirect root to Swagger UI
    @GetMapping("/")
    public RedirectView redirectToSwagger() {
        return new RedirectView("/swagger-ui/index.html");
    }

    // ==================== AUTH ROUTES (PUBLIC — no JWT required) ====================

    // POST /api/auth/register → USER-SERVICE /api/auth/register
    @PostMapping("/api/auth/register")
    public ResponseEntity<String> register(@RequestBody Map<String, Object> data) {
        return GS.invokePost("USER-SERVICE", "api/auth/register", data);
    }

    // POST /api/auth/login → USER-SERVICE /api/auth/login
    @PostMapping("/api/auth/login")
    public ResponseEntity<String> login(@RequestBody Map<String, Object> data) {
        return GS.invokePost("USER-SERVICE", "api/auth/login", data);
    }

    // ==================== USER ROUTES (PROTECTED — JWT required) ====================

    // GET /api/users/profile → USER-SERVICE /api/users/profile
    @GetMapping("/api/users/profile")
    public ResponseEntity<String> getUserProfile(jakarta.servlet.http.HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return GS.invokeGet("USER-SERVICE", "api/users/profile?username=" + username);
    }

    // ==================== ROOM ROUTES (PROTECTED) ====================

    // GET /api/rooms → ROOM-SERVICE /api/rooms
    @GetMapping("/api/rooms")
    public ResponseEntity<String> getAllRooms() {
        return GS.invokeGet("ROOM-SERVICE", "api/rooms");
    }

    // GET /api/rooms/search → ROOM-SERVICE /api/rooms/search
    @GetMapping("/api/rooms/search")
    public ResponseEntity<String> searchRooms(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer guests) {
        StringBuilder params = new StringBuilder("api/rooms/search?");
        if (location != null) params.append("location=").append(location).append("&");
        if (type != null) params.append("type=").append(type).append("&");
        if (minPrice != null) params.append("minPrice=").append(minPrice).append("&");
        if (maxPrice != null) params.append("maxPrice=").append(maxPrice).append("&");
        if (guests != null) params.append("guests=").append(guests).append("&");
        return GS.invokeGet("ROOM-SERVICE", params.toString());
    }

    // GET /api/rooms/{id} → ROOM-SERVICE /api/rooms/{id}
    @GetMapping("/api/rooms/{id}")
    public ResponseEntity<String> getRoomById(@PathVariable Long id) {
        return GS.invokeGet("ROOM-SERVICE", "api/rooms/" + id);
    }

    // ==================== BOOKING ROUTES (PROTECTED) ====================

    // POST /api/bookings → BOOKING-SERVICE /api/bookings
    @PostMapping("/api/bookings")
    public ResponseEntity<String> createBooking(@RequestBody Map<String, Object> data) {
        return GS.invokePost("BOOKING-SERVICE", "api/bookings", data);
    }

    // GET /api/bookings/user/{userId} → BOOKING-SERVICE /api/bookings/user/{userId}
    @GetMapping("/api/bookings/user/{userId}")
    public ResponseEntity<String> getUserBookings(@PathVariable String userId) {
        return GS.invokeGet("BOOKING-SERVICE", "api/bookings/user/" + userId);
    }

    // DELETE /api/bookings/{id} → BOOKING-SERVICE /api/bookings/{id}
    @DeleteMapping("/api/bookings/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        return GS.invokeDelete("BOOKING-SERVICE", "api/bookings/" + id);
    }

    // ==================== ADMIN ROUTES (PROTECTED — JWT + ADMIN ROLE REQUIRED) ====================

    // GET /api/admin/users → USER-SERVICE /api/users (Admin only)
    @GetMapping("/api/admin/users")
    public ResponseEntity<String> getAllUsers() {
        return GS.invokeGet("USER-SERVICE", "api/users");
    }

    // GET /api/admin/bookings → BOOKING-SERVICE /api/bookings/admin/all (Admin only)
    @GetMapping("/api/admin/bookings")
    public ResponseEntity<String> getAllBookings() {
        return GS.invokeGet("BOOKING-SERVICE", "api/bookings/admin/all");
    }

    // POST /api/admin/rooms → ROOM-SERVICE /api/rooms (Admin only)
    @PostMapping("/api/admin/rooms")
    public ResponseEntity<String> createRoom(@RequestBody Map<String, Object> data) {
        return GS.invokePost("ROOM-SERVICE", "api/rooms", data);
    }

    // DELETE /api/admin/rooms/{id} → ROOM-SERVICE /api/rooms/{id} (Admin only)
    @DeleteMapping("/api/admin/rooms/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        return GS.invokeDelete("ROOM-SERVICE", "api/rooms/" + id);
    }

    // GET /api/admin/system-status → Eureka discovery summary (Admin only)
    @GetMapping("/api/admin/system-status")
    public ResponseEntity<Map<String, Object>> getSystemStatus() {
        return ResponseEntity.ok(GS.getAggregatedStatus());
    }
}

