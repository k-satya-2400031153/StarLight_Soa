package soa.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingId;   // Human-readable: "BK-2026-001"
    private Long roomId;
    private String roomName;
    private String roomType;
    private String location;
    private String userId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private int guests;
    private int totalPrice;
    private String status;      // CONFIRMED, COMPLETED, CANCELLED
    private LocalDateTime createdAt;
    private String image;

    public Booking() {}

    public Booking(Long roomId, String roomName, String roomType, String location,
                   String userId, LocalDate checkIn, LocalDate checkOut,
                   int guests, int totalPrice, String image) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomType = roomType;
        this.location = location;
        this.userId = userId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.guests = guests;
        this.totalPrice = totalPrice;
        this.image = image;
        this.status = "CONFIRMED";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = "CONFIRMED";
        if (this.bookingId == null) {
            this.bookingId = "BK-2026-" + String.format("%03d", (int)(Math.random() * 900) + 100);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public int getGuests() { return guests; }
    public void setGuests(int guests) { this.guests = guests; }

    public int getTotalPrice() { return totalPrice; }
    public void setTotalPrice(int totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
