package soa.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthFilter implements HandlerInterceptor {

    @Autowired
    JwtUtil jwtUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // Allow CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // Extract Authorization header
        String authHeader = request.getHeader("Authorization");

        // Case 1: Missing Token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendError(response, 401, "Missing Token: Authorization header is required with Bearer token");
            return false;
        }

        // Extract the token (remove "Bearer " prefix)
        String token = authHeader.substring(7);

        try {
            // Case 2: Valid Token — validate and extract claims
            Claims claims = jwtUtil.validateToken(token);
            // Store username and role in request attributes for downstream use
            request.setAttribute("username", claims.get("username"));
            request.setAttribute("role", claims.get("role"));
            return true; // Allow request to proceed

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            // Case 3: Expired Token
            sendError(response, 401, "Token Expired: Your JWT token has expired. Please login again.");
            return false;

        } catch (Exception e) {
            // Case 4: Invalid Token (tampered, wrong signature, malformed)
            sendError(response, 401, "Invalid Token: The provided JWT token is invalid.");
            return false;
        }
    }

    private void sendError(HttpServletResponse response, int status, String message) throws Exception {
        response.setStatus(status);
        response.setContentType("application/json");
        Map<String, Object> error = new HashMap<>();
        error.put("status", status);
        error.put("error", "Unauthorized");
        error.put("message", message);
        response.getWriter().write(objectMapper.writeValueAsString(error));
    }
}
