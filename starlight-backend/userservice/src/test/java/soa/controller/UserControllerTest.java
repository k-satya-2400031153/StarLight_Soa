package soa.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import soa.model.Users;
import soa.repo.UserRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Test
    @DisplayName("[Positive] Get all users returns list of registered users")
    void testGetAllUsers_Positive() {
        Users u1 = new Users("user1", "pass1", "u1@klu.ac.in", "USER");
        Users u2 = new Users("admin", "pass2", "admin@klu.ac.in", "ADMIN");
        when(userRepository.findAll()).thenReturn(Arrays.asList(u1, u2));

        List<Users> result = userController.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("user1", result.get(0).getUsername());
        assertEquals("admin", result.get(1).getUsername());
    }

    @Test
    @DisplayName("[Positive] Get user profile by valid username")
    void testGetUserProfile_Positive() {
        Users u = new Users("satya", "pass123", "satya@klu.ac.in", "USER");
        when(userRepository.findByUsername("satya")).thenReturn(u);

        Users result = userController.getUserProfile("satya");

        assertNotNull(result);
        assertEquals("satya", result.getUsername());
        assertEquals("satya@klu.ac.in", result.getEmail());
    }

    @Test
    @DisplayName("[Negative] Get user profile with null username returns null")
    void testGetUserProfileNull_Negative() {
        Users result = userController.getUserProfile(null);
        assertNull(result);
    }
}
