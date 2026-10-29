package soa.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import soa.model.Booking;
import soa.repo.BookingRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    private Booking sampleBooking;

    @BeforeEach
    void setUp() {
        sampleBooking = new Booking(
                1L, "Ocean Breeze Deluxe", "DELUXE", "Maldives",
                "satya", LocalDate.now().plusDays(2), LocalDate.now().plusDays(5),
                2, 55500, "/images/room-deluxe.jpg"
        );
        sampleBooking.setId(10L);
    }

    @Test
    @DisplayName("[Positive] Create booking automatically assigns defaults and saves")
    void testCreateBooking_Positive() {
        when(bookingRepository.save(any(Booking.class))).thenReturn(sampleBooking);

        Booking created = bookingService.createBooking(sampleBooking);

        assertNotNull(created);
        assertEquals("satya", created.getUserId());
        assertNotNull(created.getBookingId());
        assertEquals("CONFIRMED", created.getStatus());
        verify(bookingRepository, times(1)).save(sampleBooking);
    }

    @Test
    @DisplayName("[Positive] Get user bookings returns list for specific user ordered by date")
    void testGetBookingsByUser_Positive() {
        when(bookingRepository.findByUserIdOrderByCreatedAtDesc("satya"))
                .thenReturn(Arrays.asList(sampleBooking));

        List<Booking> result = bookingService.getBookingsByUser("satya");

        assertEquals(1, result.size());
        assertEquals("satya", result.get(0).getUserId());
    }

    @Test
    @DisplayName("[Positive] Get all bookings returns complete list (for Admin)")
    void testGetAllBookings_Positive() {
        when(bookingRepository.findAll()).thenReturn(Arrays.asList(sampleBooking));

        List<Booking> result = bookingService.getAllBookings();

        assertEquals(1, result.size());
        verify(bookingRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("[Positive] Cancel existing booking sets status to CANCELLED")
    void testCancelBookingSuccess_Positive() {
        when(bookingRepository.findById(10L)).thenReturn(Optional.of(sampleBooking));
        when(bookingRepository.save(any(Booking.class))).thenReturn(sampleBooking);

        Map<String, Object> response = bookingService.cancelBooking(10L);

        assertEquals("success", response.get("status"));
        assertEquals("CANCELLED", sampleBooking.getStatus());
        verify(bookingRepository, times(1)).save(sampleBooking);
    }

    @Test
    @DisplayName("[Negative] Cancel non-existent booking returns error status")
    void testCancelBookingNotFound_Negative() {
        when(bookingRepository.findById(999L)).thenReturn(Optional.empty());

        Map<String, Object> response = bookingService.cancelBooking(999L);

        assertEquals("error", response.get("status"));
        assertEquals("Booking not found", response.get("message"));
        verify(bookingRepository, never()).save(any(Booking.class));
    }
}
