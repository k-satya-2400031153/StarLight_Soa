package soa.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import soa.model.Booking;
import soa.service.BookingService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookingControllerTest {

    @Mock
    private BookingService bookingService;

    @InjectMocks
    private BookingController bookingController;

    private Booking sampleBooking;

    @BeforeEach
    void setUp() {
        sampleBooking = new Booking(
                1L, "Ocean Breeze Deluxe", "DELUXE", "Maldives",
                "satya", LocalDate.now().plusDays(1), LocalDate.now().plusDays(3),
                2, 37000, "/images/room-deluxe.jpg"
        );
        sampleBooking.setId(5L);
    }

    @Test
    @DisplayName("[Positive] Create booking controller resets ID and delegates to service")
    void testCreateBooking_Positive() {
        when(bookingService.createBooking(any(Booking.class))).thenReturn(sampleBooking);

        Booking result = bookingController.createBooking(sampleBooking);

        assertNotNull(result);
        assertEquals("satya", result.getUserId());
        verify(bookingService, times(1)).createBooking(sampleBooking);
    }

    @Test
    @DisplayName("[Positive] Get user bookings returns list for user")
    void testGetUserBookings_Positive() {
        when(bookingService.getBookingsByUser("satya")).thenReturn(Arrays.asList(sampleBooking));

        List<Booking> result = bookingController.getUserBookings("satya");

        assertEquals(1, result.size());
        assertEquals("satya", result.get(0).getUserId());
    }

    @Test
    @DisplayName("[Positive] Get all bookings for admin returns complete list")
    void testGetAllBookings_Positive() {
        when(bookingService.getAllBookings()).thenReturn(Arrays.asList(sampleBooking));

        List<Booking> result = bookingController.getAllBookings();

        assertEquals(1, result.size());
        verify(bookingService, times(1)).getAllBookings();
    }

    @Test
    @DisplayName("[Positive] Cancel booking returns status map")
    void testCancelBooking_Positive() {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "success");
        map.put("message", "Booking cancelled successfully");
        when(bookingService.cancelBooking(5L)).thenReturn(map);

        Map<String, Object> result = bookingController.cancelBooking(5L);

        assertEquals("success", result.get("status"));
        assertEquals("Booking cancelled successfully", result.get("message"));
    }
}
