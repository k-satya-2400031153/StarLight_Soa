package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soa.model.Users;
import soa.repo.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository UR;

    @GetMapping
    public List<Users> getAllUsers() {
        return UR.findAll();
    }

    @GetMapping("/profile")
    public Users getUserProfile(@RequestParam(required = false) String username) {
        if (username != null) {
            return UR.findByUsername(username);
        }
        return null;
    }
}
