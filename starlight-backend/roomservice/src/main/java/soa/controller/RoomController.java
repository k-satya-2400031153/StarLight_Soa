package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.model.Room;
import soa.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    RoomService RS;

    // GET /api/rooms — list all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return RS.getAllRooms();
    }

    // GET /api/rooms/search?location=&type=&minPrice=&maxPrice=&guests=
    @GetMapping("/search")
    public List<Room> searchRooms(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer guests) {
        return RS.searchRooms(location, type, minPrice, maxPrice, guests);
    }

    // GET /api/rooms/{id} — get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return RS.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/rooms — create a new room (admin)
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room created = RS.createRoom(room);
        return ResponseEntity.status(201).body(created);
    }

    // DELETE /api/rooms/{id} — delete a room (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<java.util.Map<String, Object>> deleteRoom(@PathVariable Long id) {
        boolean deleted = RS.deleteRoom(id);
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        if (deleted) {
            response.put("status", "success");
            response.put("message", "Room " + id + " deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "Room not found with ID " + id);
            return ResponseEntity.status(404).body(response);
        }
    }
}

