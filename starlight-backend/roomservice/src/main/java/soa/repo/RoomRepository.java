package soa.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import soa.model.Room;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByLocation(String location);
    List<Room> findByType(String type);
    List<Room> findByAvailable(boolean available);

    @Query("SELECT r FROM Room r WHERE " +
           "(:location IS NULL OR LOWER(r.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:type IS NULL OR LOWER(r.type) LIKE LOWER(CONCAT('%', :type, '%'))) AND " +
           "(:minPrice IS NULL OR r.pricePerNight >= :minPrice) AND " +
           "(:maxPrice IS NULL OR r.pricePerNight <= :maxPrice) AND " +
           "(:guests IS NULL OR r.maxGuests >= :guests)")
    List<Room> searchRooms(
            @Param("location") String location,
            @Param("type") String type,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("guests") Integer guests);
}
