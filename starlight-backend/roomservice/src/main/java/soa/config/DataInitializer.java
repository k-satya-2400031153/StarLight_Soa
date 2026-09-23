package soa.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import soa.model.Room;
import soa.repo.RoomRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoomRepository roomRepo;

    public DataInitializer(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public void run(String... args) {
        // Only seed if database is empty
        if (roomRepo.count() > 0) {
            System.out.println("Rooms already seeded (" + roomRepo.count() + " rooms found). Skipping.");
            return;
        }

        System.out.println("Seeding luxury room data...");

        roomRepo.save(new Room(
                "Ocean Breeze Deluxe", "DELUXE", "Maldives",
                "Wake up to panoramic ocean views in our signature deluxe room. Featuring a king-size bed with premium Egyptian cotton linens, a private balcony, and a marble-clad en-suite bathroom with rainfall shower.",
                18500, 2, "Ocean View,King Bed,Mini Bar,Room Service,WiFi,Smart TV",
                "/images/room-deluxe.jpg", true, 12, 5, 4.8, 234));

        roomRepo.save(new Room(
                "Presidential Suite", "SUITE", "Maldives",
                "Indulge in the ultimate luxury with our Presidential Suite. Spanning 120 sqm, it features a separate living area with plush velvet furnishings, a private dining space, crystal chandelier, and a panoramic terrace with infinity views.",
                45000, 4, "Panoramic View,Living Area,Private Dining,Butler Service,Jacuzzi,Premium Bar",
                "/images/room-suite.jpg", true, 4, 2, 4.9, 89));

        roomRepo.save(new Room(
                "Tropical Garden Villa", "VILLA", "Bali",
                "Experience barefoot luxury in our private garden villa. Featuring an open-air living concept, private infinity pool, lush tropical gardens, outdoor rain shower, and a dedicated spa treatment room.",
                62000, 6, "Private Pool,Garden,Outdoor Shower,Spa Room,Kitchen,Golf Cart",
                "/images/room-villa.jpg", true, 8, 3, 4.9, 156));

        roomRepo.save(new Room(
                "Skyline Penthouse", "PENTHOUSE", "Dubai",
                "Our crown jewel — a sky-high penthouse with floor-to-ceiling windows framing the city skyline. Features a private jacuzzi, marble bathroom, curated art collection, and 24/7 personal concierge service.",
                95000, 4, "City Skyline View,Private Jacuzzi,Art Collection,Concierge,Helipad Access,Wine Cellar",
                "/images/room-penthouse.jpg", true, 2, 1, 5.0, 42));

        roomRepo.save(new Room(
                "Coral Reef Deluxe", "DELUXE", "Maldives",
                "A serene overwater deluxe room with glass floor panels revealing the vibrant coral reef below. Features a sunken bathtub, outdoor deck with direct lagoon access, and a complimentary snorkeling kit.",
                22000, 2, "Glass Floor,Lagoon Access,Snorkeling Kit,Sunset Deck,WiFi,Mini Bar",
                "/images/room-deluxe.jpg", true, 10, 0, 4.7, 312));

        roomRepo.save(new Room(
                "Rainforest Retreat Villa", "VILLA", "Bali",
                "Nestled deep within Bali's lush rainforest canopy, this villa offers complete privacy with a natural stone plunge pool, bamboo-framed outdoor living, and a yoga pavilion overlooking rice terraces.",
                55000, 4, "Plunge Pool,Yoga Pavilion,Rice Terrace View,Organic Garden,Spa,Fireplace",
                "/images/room-villa.jpg", true, 6, 4, 4.8, 198));

        System.out.println("✅ Seeded 6 luxury rooms successfully!");
    }
}
