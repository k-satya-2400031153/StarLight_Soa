package soa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;        // DELUXE, SUITE, VILLA, PENTHOUSE
    private String location;

    @Column(length = 1000)
    private String description;

    private int pricePerNight;
    private int maxGuests;
    private String amenities;   // Comma-separated: "Ocean View,King Bed,WiFi"
    private String image;
    private boolean available;
    private int totalRooms;
    private int roomsLeft;
    private double rating;
    private int reviewCount;

    public Room() {}

    public Room(String name, String type, String location, String description,
                int pricePerNight, int maxGuests, String amenities, String image,
                boolean available, int totalRooms, int roomsLeft, double rating, int reviewCount) {
        this.name = name;
        this.type = type;
        this.location = location;
        this.description = description;
        this.pricePerNight = pricePerNight;
        this.maxGuests = maxGuests;
        this.amenities = amenities;
        this.image = image;
        this.available = available;
        this.totalRooms = totalRooms;
        this.roomsLeft = roomsLeft;
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(int pricePerNight) { this.pricePerNight = pricePerNight; }

    public int getMaxGuests() { return maxGuests; }
    public void setMaxGuests(int maxGuests) { this.maxGuests = maxGuests; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public int getTotalRooms() { return totalRooms; }
    public void setTotalRooms(int totalRooms) { this.totalRooms = totalRooms; }

    public int getRoomsLeft() { return roomsLeft; }
    public void setRoomsLeft(int roomsLeft) { this.roomsLeft = roomsLeft; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }
}
