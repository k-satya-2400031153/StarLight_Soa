package soa.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import soa.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsernameAndPassword(String username, String password);
    Users findByUsername(String username);
}
