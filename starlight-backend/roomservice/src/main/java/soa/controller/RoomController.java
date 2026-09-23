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
}
