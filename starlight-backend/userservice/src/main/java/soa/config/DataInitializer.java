package soa.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import soa.model.Users;
import soa.repo.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Ensure default ADMIN user exists for RBAC demonstration
        if (userRepository.findByUsername("admin") == null) {
            Users admin = new Users("admin", "admin123", "admin@starlightstays.com", "ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Seeded default ADMIN user: admin / admin123 (Role: ADMIN)");
        }

        // Ensure default USER exists for standard user demonstration
        if (userRepository.findByUsername("satya") == null) {
            Users user = new Users("satya", "pass123", "satya@klu.ac.in", "USER");
            userRepository.save(user);
            System.out.println("✅ Seeded default USER user: satya / pass123 (Role: USER)");
        }
    }
}
