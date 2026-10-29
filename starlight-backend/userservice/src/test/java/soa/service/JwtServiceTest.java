package soa.service;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
    }

    @Test
    @DisplayName("[Positive] Generate token with valid username and role")
    void testGenerateToken_Positive() {
        Object tokenObj = jwtService.generateToken("satya", "USER");

        assertNotNull(tokenObj);
        String token = tokenObj.toString();
        assertTrue(token.split("\\.").length == 3, "JWT should have 3 dot-separated parts");
    }

    @Test
    @DisplayName("[Positive] Validate token and extract correct claims")
    void testValidateToken_Positive() {
        String token = jwtService.generateToken("satya", "ADMIN").toString();

        Claims claims = jwtService.validateToken(token);

        assertNotNull(claims);
        assertEquals("satya", claims.get("username"));
        assertEquals("ADMIN", claims.get("role"));
        assertNotNull(claims.getIssuedAt());
        assertNotNull(claims.getExpiration());
        assertTrue(claims.getExpiration().after(claims.getIssuedAt()));
    }

    @Test
    @DisplayName("[Negative] Validate tampered token throws security exception")
    void testTamperedToken_Negative() {
        String validToken = jwtService.generateToken("satya", "USER").toString();
        // Tamper with payload part
        String tamperedToken = validToken.substring(0, validToken.length() - 5) + "abcde";

        assertThrows(Exception.class, () -> {
            jwtService.validateToken(tamperedToken);
        });
    }

    @Test
    @DisplayName("[Negative] Validate completely invalid string throws exception")
    void testInvalidToken_Negative() {
        assertThrows(Exception.class, () -> {
            jwtService.validateToken("not-a-real-jwt-token");
        });
    }
}
