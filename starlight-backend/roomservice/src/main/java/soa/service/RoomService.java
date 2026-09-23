package soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.model.Room;
import soa.repo.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    RoomRepository RR;

    public List<Room> getAllRooms() {
        return RR.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return RR.findById(id);
    }

    public List<Room> searchRooms(String location, String type, Integer minPrice, Integer maxPrice, Integer guests) {
        return RR.searchRooms(
                (location != null && !location.isEmpty()) ? location : null,
                (type != null && !type.isEmpty()) ? type : null,
                minPrice,
                maxPrice,
                guests
        );
    }
}
