package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soa.model.Users;
import soa.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService AS;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Users user) {
        return AS.register(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        return AS.login(credentials.get("username"), credentials.get("password"));
    }
}
