package soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
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

    @Autowired(required = false)
    DiscoveryClient discoveryClient;

    public Booking createBooking(Booking booking) {
        if (booking.getBookingId() == null || booking.getBookingId().isEmpty()) {
            booking.setBookingId("BK-" + System.currentTimeMillis());
        }
        if (booking.getStatus() == null || booking.getStatus().isEmpty()) {
            booking.setStatus("CONFIRMED");
        }
        if (booking.getCreatedAt() == null) {
            booking.setCreatedAt(java.time.LocalDateTime.now());
        }

        // Inter-service verification with ROOM-SERVICE via Eureka Discovery
        if (discoveryClient != null && booking.getRoomId() != null) {
            try {
                List<ServiceInstance> instances = discoveryClient.getInstances("ROOM-SERVICE");
                if (instances != null && !instances.isEmpty()) {
                    String roomServiceUrl = instances.get(0).getUri().toString() + "/api/rooms/" + booking.getRoomId();
                    RestClient client = RestClient.create();
                    Map<?, ?> roomData = client.get().uri(roomServiceUrl).retrieve().body(Map.class);
                    if (roomData != null && roomData.get("name") != null) {
                        System.out.println("BookingService [Inter-Service Discovery]: Verified room with ROOM-SERVICE: " + roomData.get("name"));
                        if (booking.getRoomName() == null || booking.getRoomName().isEmpty()) {
                            booking.setRoomName((String) roomData.get("name"));
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("BookingService [Inter-Service Note]: ROOM-SERVICE check note: " + e.getMessage());
            }
        }

        return BR.save(booking);
    }

    public List<Booking> getAllBookings() {
        return BR.findAll();
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

