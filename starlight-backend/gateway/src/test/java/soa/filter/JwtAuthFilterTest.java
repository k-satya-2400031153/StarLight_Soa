package soa.filter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class JwtAuthFilterTest {

    @Spy
    private JwtUtil jwtUtil = new JwtUtil();

    @InjectMocks
    private JwtAuthFilter jwtAuthFilter;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    @BeforeEach
    void setUp() {
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
    }

    @Test
    @DisplayName("[Positive] OPTIONS preflight request bypasses JWT check")
    void testOptionsPreflight_Positive() throws Exception {
        request.setMethod("OPTIONS");

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertTrue(result);
        assertEquals(200, response.getStatus());
    }

    @Test
    @DisplayName("[Negative] Missing Authorization header returns 401 Unauthorized")
    void testMissingAuthorizationHeader_Negative() throws Exception {
        request.setMethod("GET");
        request.setRequestURI("/api/bookings");

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertFalse(result);
        assertEquals(401, response.getStatus());
        assertTrue(response.getContentAsString().contains("Missing Token"));
    }

    @Test
    @DisplayName("[Negative] Header without Bearer prefix returns 401 Unauthorized")
    void testMissingBearerPrefix_Negative() throws Exception {
        request.setMethod("GET");
        request.setRequestURI("/api/bookings");
        request.addHeader("Authorization", "Basic 123456");

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertFalse(result);
        assertEquals(401, response.getStatus());
        assertTrue(response.getContentAsString().contains("Missing Token"));
    }

    @Test
    @DisplayName("[Positive] Valid USER token allows request to user route")
    void testValidUserToken_Positive() throws Exception {
        String token = jwtUtil.generateToken("satya", "USER");
        request.setMethod("GET");
        request.setRequestURI("/api/bookings/user/satya");
        request.addHeader("Authorization", "Bearer " + token);

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertTrue(result);
        assertEquals("satya", request.getAttribute("username"));
        assertEquals("USER", request.getAttribute("role"));
    }

    @Test
    @DisplayName("[Negative] USER token accessing /api/admin route returns 403 Forbidden (RBAC)")
    void testUserRoleForbiddenOnAdminRoute_Negative() throws Exception {
        String token = jwtUtil.generateToken("satya", "USER");
        request.setMethod("GET");
        request.setRequestURI("/api/admin/users");
        request.addHeader("Authorization", "Bearer " + token);

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertFalse(result);
        assertEquals(403, response.getStatus());
        assertTrue(response.getContentAsString().contains("Access Denied: ADMIN role required"));
    }

    @Test
    @DisplayName("[Positive] ADMIN token accessing /api/admin route allows request (RBAC)")
    void testAdminRoleAllowedOnAdminRoute_Positive() throws Exception {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        request.setMethod("GET");
        request.setRequestURI("/api/admin/users");
        request.addHeader("Authorization", "Bearer " + token);

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertTrue(result);
        assertEquals("admin", request.getAttribute("username"));
        assertEquals("ADMIN", request.getAttribute("role"));
    }

    @Test
    @DisplayName("[Negative] Expired token returns 401 Token Expired")
    void testExpiredToken_Negative() throws Exception {
        String expiredToken = jwtUtil.generateToken("satya", "USER", -5000);
        request.setMethod("GET");
        request.setRequestURI("/api/bookings");
        request.addHeader("Authorization", "Bearer " + expiredToken);

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertFalse(result);
        assertEquals(401, response.getStatus());
        assertTrue(response.getContentAsString().contains("Token Expired"));
    }

    @Test
    @DisplayName("[Negative] Tampered token returns 401 Invalid Token")
    void testTamperedToken_Negative() throws Exception {
        String validToken = jwtUtil.generateToken("satya", "USER");
        String tamperedToken = validToken.substring(0, validToken.length() - 6) + "tamper";
        request.setMethod("GET");
        request.setRequestURI("/api/bookings");
        request.addHeader("Authorization", "Bearer " + tamperedToken);

        boolean result = jwtAuthFilter.preHandle(request, response, new Object());

        assertFalse(result);
        assertEquals(401, response.getStatus());
        assertTrue(response.getContentAsString().contains("Invalid Token"));
    }
}
