package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soa.model.Booking;
import soa.service.BookingService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService BS;

    // POST /api/bookings — create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setId(null); // Force JPA to insert a new row even if Swagger sends id:0
        return BS.createBooking(booking);
    }

    // GET /api/bookings/user/{userId} — get all bookings for a user
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable String userId) {
        return BS.getBookingsByUser(userId);
    }

    // DELETE /api/bookings/{id} — cancel a booking
    @DeleteMapping("/{id}")
    public Map<String, Object> cancelBooking(@PathVariable Long id) {
        return BS.cancelBooking(id);
    }
}
