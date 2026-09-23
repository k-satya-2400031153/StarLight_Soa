package soa.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import soa.model.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(String userId);
    List<Booking> findByStatus(String status);
    List<Booking> findByUserIdOrderByCreatedAtDesc(String userId);
}
