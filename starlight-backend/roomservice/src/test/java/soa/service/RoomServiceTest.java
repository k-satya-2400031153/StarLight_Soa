package soa.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import soa.model.Room;
import soa.repo.RoomRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    private Room sampleRoom;

    @BeforeEach
    void setUp() {
        sampleRoom = new Room(
                "Ocean Breeze Deluxe", "DELUXE", "Maldives",
                "Luxury ocean front room", 18500, 2, "WiFi,Balcony",
                "/images/room-deluxe.jpg", true, 10, 5, 4.8, 120
        );
        sampleRoom.setId(1L);
    }

    @Test
    @DisplayName("[Positive] Get all rooms returns complete room inventory")
    void testGetAllRooms_Positive() {
        when(roomRepository.findAll()).thenReturn(Arrays.asList(sampleRoom));

        List<Room> result = roomService.getAllRooms();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Ocean Breeze Deluxe", result.get(0).getName());
        verify(roomRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("[Positive] Get room by valid ID returns room details")
    void testGetRoomById_Positive() {
        when(roomRepository.findById(1L)).thenReturn(Optional.of(sampleRoom));

        Optional<Room> result = roomService.getRoomById(1L);

        assertTrue(result.isPresent());
        assertEquals("Maldives", result.get().getLocation());
        assertEquals(18500, result.get().getPricePerNight());
    }

    @Test
    @DisplayName("[Negative] Get room by non-existent ID returns empty Optional")
    void testGetRoomByIdNotFound_Negative() {
        when(roomRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Room> result = roomService.getRoomById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("[Positive] Search rooms filters by location, type, price, guests")
    void testSearchRooms_Positive() {
        when(roomRepository.searchRooms("Maldives", "DELUXE", 10000, 30000, 2))
                .thenReturn(Arrays.asList(sampleRoom));

        List<Room> result = roomService.searchRooms("Maldives", "DELUXE", 10000, 30000, 2);

        assertEquals(1, result.size());
        assertEquals("DELUXE", result.get(0).getType());
    }

    @Test
    @DisplayName("[Positive] Create room saves and returns new room entity")
    void testCreateRoom_Positive() {
        Room newRoom = new Room("Sky Villa", "VILLA", "Bali", "Pool villa", 45000, 4, "Pool", "img.jpg", true, 5, 2, 4.9, 50);
        when(roomRepository.save(any(Room.class))).thenReturn(newRoom);

        Room created = roomService.createRoom(newRoom);

        assertNotNull(created);
        assertEquals("Sky Villa", created.getName());
        verify(roomRepository, times(1)).save(newRoom);
    }

    @Test
    @DisplayName("[Positive] Delete room by existing ID returns true")
    void testDeleteRoomExisting_Positive() {
        when(roomRepository.existsById(1L)).thenReturn(true);
        doNothing().when(roomRepository).deleteById(1L);

        boolean deleted = roomService.deleteRoom(1L);

        assertTrue(deleted);
        verify(roomRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("[Negative] Delete room by non-existent ID returns false")
    void testDeleteRoomNotFound_Negative() {
        when(roomRepository.existsById(999L)).thenReturn(false);

        boolean deleted = roomService.deleteRoom(999L);

        assertFalse(deleted);
        verify(roomRepository, never()).deleteById(999L);
    }
}
