package soa.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
    }

    @Test
    @DisplayName("[Positive] Generate and validate token extracts username and role")
    void testValidateToken_Positive() {
        String token = jwtUtil.generateToken("satya", "USER");

        Claims claims = jwtUtil.validateToken(token);

        assertNotNull(claims);
        assertEquals("satya", claims.get("username"));
        assertEquals("USER", claims.get("role"));
    }

    @Test
    @DisplayName("[Positive] Admin token contains ADMIN role")
    void testAdminTokenRole_Positive() {
        String token = jwtUtil.generateToken("admin", "ADMIN");

        Claims claims = jwtUtil.validateToken(token);

        assertEquals("admin", claims.get("username"));
        assertEquals("ADMIN", claims.get("role"));
    }

    @Test
    @DisplayName("[Negative] Expired token throws ExpiredJwtException")
    void testExpiredToken_Negative() {
        // Generate a token that expired 1 second ago
        String expiredToken = jwtUtil.generateToken("satya", "USER", -1000);

        assertThrows(ExpiredJwtException.class, () -> {
            jwtUtil.validateToken(expiredToken);
        });
    }

    @Test
    @DisplayName("[Negative] Tampered token signature throws Exception")
    void testTamperedToken_Negative() {
        String validToken = jwtUtil.generateToken("satya", "USER");
        String tamperedToken = validToken.substring(0, validToken.length() - 5) + "xyz12";

        assertThrows(Exception.class, () -> {
            jwtUtil.validateToken(tamperedToken);
        });
    }
}
