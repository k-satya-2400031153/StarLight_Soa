package soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.model.Users;
import soa.repo.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    UserRepository UR;

    @Autowired
    JwtService JWT;

    public Map<String, Object> register(Users user) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Set default role if not provided
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER");
            }
            UR.save(user);
            response.put("status", "success");
            response.put("message", "User registered successfully");
            response.put("username", user.getUsername());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        try {
            Users user = UR.findByUsernameAndPassword(username, password);
            if (user == null)
                throw new Exception("Invalid username or password!");

            Object token = JWT.generateToken(user.getUsername(), user.getRole());

            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }
}
