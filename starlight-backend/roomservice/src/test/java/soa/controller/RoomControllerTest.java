package soa.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import soa.model.Room;
import soa.service.RoomService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoomControllerTest {

    @Mock
    private RoomService roomService;

    @InjectMocks
    private RoomController roomController;

    private Room sampleRoom;

    @BeforeEach
    void setUp() {
        sampleRoom = new Room(
                "Tropical Garden Villa", "VILLA", "Bali",
                "Private garden villa", 62000, 4, "Pool,Garden",
                "/images/room-villa.jpg", true, 8, 3, 4.9, 150
        );
        sampleRoom.setId(2L);
    }

    @Test
    @DisplayName("[Positive] Controller returns list of all rooms")
    void testGetAllRooms_Positive() {
        when(roomService.getAllRooms()).thenReturn(Arrays.asList(sampleRoom));

        List<Room> result = roomController.getAllRooms();

        assertEquals(1, result.size());
        assertEquals("Tropical Garden Villa", result.get(0).getName());
    }

    @Test
    @DisplayName("[Positive] Get room by ID returns 200 OK when found")
    void testGetRoomByIdFound_Positive() {
        when(roomService.getRoomById(2L)).thenReturn(Optional.of(sampleRoom));

        ResponseEntity<Room> response = roomController.getRoomById(2L);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("Bali", response.getBody().getLocation());
    }

    @Test
    @DisplayName("[Negative] Get room by ID returns 404 Not Found when absent")
    void testGetRoomByIdNotFound_Negative() {
        when(roomService.getRoomById(99L)).thenReturn(Optional.empty());

        ResponseEntity<Room> response = roomController.getRoomById(99L);

        assertEquals(404, response.getStatusCode().value());
    }

    @Test
    @DisplayName("[Positive] Search rooms delegates with query filters")
    void testSearchRooms_Positive() {
        when(roomService.searchRooms("Bali", "VILLA", null, null, null))
                .thenReturn(Arrays.asList(sampleRoom));

        List<Room> result = roomController.searchRooms("Bali", "VILLA", null, null, null);

        assertEquals(1, result.size());
        assertEquals("Bali", result.get(0).getLocation());
    }

    @Test
    @DisplayName("[Positive] Create room returns 201 Created")
    void testCreateRoom_Positive() {
        when(roomService.createRoom(any(Room.class))).thenReturn(sampleRoom);

        ResponseEntity<Room> response = roomController.createRoom(sampleRoom);

        assertEquals(201, response.getStatusCode().value());
        assertEquals("Tropical Garden Villa", response.getBody().getName());
    }

    @Test
    @DisplayName("[Positive] Delete existing room returns 200 OK")
    void testDeleteRoomSuccess_Positive() {
        when(roomService.deleteRoom(2L)).thenReturn(true);

        ResponseEntity<Map<String, Object>> response = roomController.deleteRoom(2L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("success", response.getBody().get("status"));
    }

    @Test
    @DisplayName("[Negative] Delete non-existing room returns 404 Not Found")
    void testDeleteRoomNotFound_Negative() {
        when(roomService.deleteRoom(99L)).thenReturn(false);

        ResponseEntity<Map<String, Object>> response = roomController.deleteRoom(99L);

        assertEquals(404, response.getStatusCode().value());
        assertEquals("error", response.getBody().get("status"));
    }
}
