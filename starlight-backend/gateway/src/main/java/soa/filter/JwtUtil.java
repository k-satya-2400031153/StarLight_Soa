package soa.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    final String SECKEY = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";
    final SecretKey key = Keys.hmacShaKeyFor(SECKEY.getBytes());

    public String generateToken(String username, String role) {
        return generateToken(username, role, 86400000); // 24 hours
    }

    public String generateToken(String username, String role, long validityMs) {
        java.util.Map<String, Object> payload = new java.util.HashMap<>();
        payload.put("username", username);
        payload.put("role", role);

        return Jwts.builder()
                .claims(payload)
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date(System.currentTimeMillis() + validityMs))
                .signWith(key)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    }
}
