package soa.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    final String SECKEY = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";
    final SecretKey key = Keys.hmacShaKeyFor(SECKEY.getBytes());

    public Object generateToken(String username, String role) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("role", role);

        return Jwts.builder()
                    .claims(payload)
                    .issuedAt(new Date())
                    .expiration(new Date(new Date().getTime() + 86400000)) // 24 hours
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
