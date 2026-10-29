package soa.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import soa.model.Users;
import soa.repo.UserRepository;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private Users testUser;

    @BeforeEach
    void setUp() {
        testUser = new Users("testuser", "password123", "test@klu.ac.in", "USER");
    }

    @Test
    @DisplayName("[Positive] Register user successfully with valid details")
    void testRegisterSuccess_Positive() {
        when(userRepository.save(any(Users.class))).thenReturn(testUser);

        Map<String, Object> result = authService.register(testUser);

        assertNotNull(result);
        assertEquals("success", result.get("status"));
        assertEquals("User registered successfully", result.get("message"));
        assertEquals("testuser", result.get("username"));
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    @DisplayName("[Positive] Register user without explicit role defaults to USER")
    void testRegisterDefaultRole_Positive() {
        Users userNoRole = new Users("noroleuser", "password123", "norole@klu.ac.in", null);
        when(userRepository.save(any(Users.class))).thenReturn(userNoRole);

        Map<String, Object> result = authService.register(userNoRole);

        assertEquals("success", result.get("status"));
        assertEquals("USER", userNoRole.getRole());
    }

    @Test
    @DisplayName("[Negative] Register fails when repository throws exception")
    void testRegisterFailure_Negative() {
        when(userRepository.save(any(Users.class))).thenThrow(new RuntimeException("Database error"));

        Map<String, Object> result = authService.register(testUser);

        assertEquals("error", result.get("status"));
        assertTrue(result.get("message").toString().contains("Database error"));
    }

    @Test
    @DisplayName("[Positive] Login successful with valid username and password")
    void testLoginSuccess_Positive() {
        when(userRepository.findByUsernameAndPassword("testuser", "password123")).thenReturn(testUser);
        when(jwtService.generateToken("testuser", "USER")).thenReturn("mock-jwt-token-xyz");

        Map<String, Object> result = authService.login("testuser", "password123");

        assertEquals("success", result.get("status"));
        assertEquals("Login successful", result.get("message"));
        assertEquals("mock-jwt-token-xyz", result.get("token"));
        assertEquals("testuser", result.get("username"));
        assertEquals("USER", result.get("role"));
    }

    @Test
    @DisplayName("[Negative] Login fails with incorrect password")
    void testLoginInvalidPassword_Negative() {
        when(userRepository.findByUsernameAndPassword("testuser", "wrongpassword")).thenReturn(null);

        Map<String, Object> result = authService.login("testuser", "wrongpassword");

        assertEquals("error", result.get("status"));
        assertTrue(result.get("message").toString().contains("Invalid username or password"));
    }

    @Test
    @DisplayName("[Negative] Login fails with non-existent username")
    void testLoginUserNotFound_Negative() {
        when(userRepository.findByUsernameAndPassword("unknown", "anypass")).thenReturn(null);

        Map<String, Object> result = authService.login("unknown", "anypass");

        assertEquals("error", result.get("status"));
        assertTrue(result.get("message").toString().contains("Invalid username or password"));
    }
}
