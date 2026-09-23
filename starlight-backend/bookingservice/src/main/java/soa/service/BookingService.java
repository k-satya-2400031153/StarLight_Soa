package soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.model.Booking;
import soa.repo.BookingRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepository BR;

    public Booking createBooking(Booking booking) {
        return BR.save(booking);
    }

    public List<Booking> getBookingsByUser(String userId) {
        return BR.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Map<String, Object> cancelBooking(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Booking> booking = BR.findById(id);

        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setStatus("CANCELLED");
            BR.save(b);
            response.put("status", "success");
            response.put("message", "Booking cancelled successfully");
            response.put("bookingId", b.getBookingId());
        } else {
            response.put("status", "error");
            response.put("message", "Booking not found");
        }
        return response;
    }
}
