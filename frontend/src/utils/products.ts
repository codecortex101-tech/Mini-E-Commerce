export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
};

// Default products
const defaultProducts: Product[] = [
  { 
    id: 1, 
    name: "Wireless Bluetooth Headphones", 
    price: 20, 
    description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.", 
    category: "Electronics", 
    stock: 15, 
    rating: 4.5, 
    reviewCount: 24,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { 
    id: 2, 
    name: "Smart Watch Pro", 
    price: 30, 
    description: "Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant design for active lifestyles.", 
    category: "Electronics", 
    stock: 8, 
    rating: 4.8, 
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { 
    id: 3, 
    name: "Classic Denim Jacket", 
    price: 40, 
    description: "Timeless denim jacket made from premium cotton. Perfect fit with modern styling. Ideal for casual wear and all seasons.", 
    category: "Clothing", 
    stock: 20, 
    rating: 4.2, 
    reviewCount: 18,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { 
    id: 4, 
    name: "Designer Leather Jacket", 
    price: 50, 
    description: "Luxury genuine leather jacket with premium craftsmanship. Stylish design that never goes out of fashion. Limited edition piece.", 
    category: "Clothing", 
    stock: 0, 
    rating: 4.9, 
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { 
    id: 5, 
    name: "Premium Leather Wallet", 
    price: 60, 
    description: "Handcrafted genuine leather wallet with multiple card slots and cash compartment. Slim design fits perfectly in your pocket.", 
    category: "Accessories", 
    stock: 12, 
    rating: 4.6, 
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1584917865442-de89df7479c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { 
    id: 6, 
    name: "Sunglasses Aviator", 
    price: 70, 
    description: "Classic aviator sunglasses with UV protection and polarized lenses. Stylish design with durable frame. Perfect for outdoor activities.", 
    category: "Accessories", 
    stock: 5, 
    rating: 4.7, 
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1572635196232-ad762de95777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80"
  },
  { id: 7, name: "iPhone 15 Pro", price: 999, description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. 256GB storage with ProMotion display.", category: "Electronics", stock: 25, rating: 4.9, reviewCount: 342, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 8, name: "Samsung Galaxy S24", price: 899, description: "Premium Android smartphone with Snapdragon 8 Gen 3, 120Hz AMOLED display, and 200MP camera. 256GB storage.", category: "Electronics", stock: 18, rating: 4.8, reviewCount: 289, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 9, name: "MacBook Pro 16", price: 2499, description: "Powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD, and Liquid Retina XDR display. Perfect for professionals.", category: "Electronics", stock: 12, rating: 4.9, reviewCount: 156, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 10, name: "Dell XPS 15", price: 1899, description: "High-performance laptop with Intel i7, 16GB RAM, 1TB SSD, and 4K OLED display. Ideal for creative work.", category: "Electronics", stock: 15, rating: 4.7, reviewCount: 203, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 11, name: "iPad Air", price: 599, description: "Versatile tablet with M2 chip, 10.9-inch Liquid Retina display, and Apple Pencil support. 256GB storage.", category: "Electronics", stock: 30, rating: 4.8, reviewCount: 445, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 12, name: "Sony WH-1000XM5", price: 399, description: "Premium noise-cancelling headphones with 30-hour battery, LDAC support, and exceptional sound quality.", category: "Electronics", stock: 22, rating: 4.9, reviewCount: 567, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 13, name: "Canon EOS R6", price: 2499, description: "Professional mirrorless camera with 20MP sensor, 4K video, and advanced autofocus system. Perfect for photography.", category: "Electronics", stock: 8, rating: 4.8, reviewCount: 234, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 14, name: "Nintendo Switch OLED", price: 349, description: "Gaming console with 7-inch OLED screen, improved audio, and 64GB storage. Includes Joy-Con controllers.", category: "Electronics", stock: 20, rating: 4.7, reviewCount: 678, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 15, name: "PlayStation 5", price: 499, description: "Next-gen gaming console with ray tracing, 4K gaming, and ultra-fast SSD. Includes DualSense controller.", category: "Electronics", stock: 5, rating: 4.9, reviewCount: 892, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 16, name: "AirPods Pro", price: 249, description: "Wireless earbuds with active noise cancellation, spatial audio, and MagSafe charging case. 6-hour battery.", category: "Electronics", stock: 35, rating: 4.8, reviewCount: 1234, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 17, name: "Nike Air Max 270", price: 150, description: "Comfortable running shoes with Air Max cushioning, breathable mesh upper, and durable rubber outsole.", category: "Clothing", stock: 45, rating: 4.6, reviewCount: 456, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 18, name: "Adidas Ultraboost 22", price: 180, description: "Premium running shoes with Boost midsole, Primeknit upper, and Continental rubber outsole for superior grip.", category: "Clothing", stock: 32, rating: 4.7, reviewCount: 389, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 19, name: "Levi's 501 Jeans", price: 89, description: "Classic straight-fit jeans made from 100% cotton denim. Timeless style with button fly closure.", category: "Clothing", stock: 60, rating: 4.5, reviewCount: 567, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 20, name: "Cotton T-Shirt Pack", price: 29, description: "Pack of 3 basic cotton t-shirts in assorted colors. Soft, breathable fabric perfect for everyday wear.", category: "Clothing", stock: 100, rating: 4.4, reviewCount: 234, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 21, name: "Wool Winter Coat", price: 199, description: "Warm winter coat made from premium wool blend. Features quilted lining and detachable hood for extra warmth.", category: "Clothing", stock: 25, rating: 4.6, reviewCount: 178, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 22, name: "Formal Dress Shirt", price: 59, description: "Classic white dress shirt with button-down collar. Perfect for business meetings and formal occasions.", category: "Clothing", stock: 40, rating: 4.5, reviewCount: 267, image: "https://images.unsplash.com/photo-1594938291221-94f18cbb7080?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 23, name: "Running Shorts", price: 35, description: "Lightweight running shorts with moisture-wicking fabric and built-in compression liner. Perfect for workouts.", category: "Clothing", stock: 55, rating: 4.4, reviewCount: 189, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 24, name: "Hooded Sweatshirt", price: 49, description: "Comfortable hooded sweatshirt made from soft cotton blend. Features kangaroo pocket and drawstring hood.", category: "Clothing", stock: 38, rating: 4.6, reviewCount: 312, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 25, name: "Leather Dress Shoes", price: 129, description: "Classic black leather dress shoes with polished finish. Comfortable insoles and durable construction.", category: "Clothing", stock: 28, rating: 4.7, reviewCount: 445, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 26, name: "Casual Sneakers", price: 79, description: "Versatile casual sneakers with canvas upper and rubber sole. Perfect for everyday wear and light activities.", category: "Clothing", stock: 50, rating: 4.5, reviewCount: 523, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 27, name: "Designer Handbag", price: 299, description: "Luxury handbag made from genuine leather with gold-tone hardware. Spacious interior with multiple compartments.", category: "Accessories", stock: 15, rating: 4.8, reviewCount: 234, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 28, name: "Leather Belt", price: 45, description: "Genuine leather belt with classic buckle. Available in black and brown. Adjustable sizing for perfect fit.", category: "Accessories", stock: 42, rating: 4.6, reviewCount: 189, image: "https://images.unsplash.com/photo-1624222247344-550fb60583fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 29, name: "Silver Watch", price: 199, description: "Elegant silver watch with leather strap and minimalist design. Water-resistant up to 50 meters.", category: "Accessories", stock: 20, rating: 4.7, reviewCount: 356, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 30, name: "Backpack", price: 89, description: "Durable backpack with laptop compartment, multiple pockets, and padded shoulder straps. Perfect for work or travel.", category: "Accessories", stock: 35, rating: 4.6, reviewCount: 478, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 31, name: "Baseball Cap", price: 25, description: "Classic baseball cap with adjustable strap and embroidered logo. Available in multiple colors.", category: "Accessories", stock: 70, rating: 4.4, reviewCount: 267, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 32, name: "Scarf Set", price: 35, description: "Set of 3 soft scarves in different colors and patterns. Made from premium materials for warmth and style.", category: "Accessories", stock: 48, rating: 4.5, reviewCount: 189, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 33, name: "Gold Necklace", price: 249, description: "Elegant gold-plated necklace with pendant. Hypoallergenic and tarnish-resistant. Perfect for special occasions.", category: "Accessories", stock: 18, rating: 4.7, reviewCount: 145, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 34, name: "Travel Luggage Set", price: 299, description: "3-piece luggage set with spinner wheels and TSA locks. Durable construction for frequent travelers.", category: "Accessories", stock: 12, rating: 4.8, reviewCount: 234, image: "https://images.unsplash.com/photo-1565026057447-bd90a52d4b3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 35, name: "Coffee Maker", price: 129, description: "Programmable coffee maker with 12-cup capacity, auto-shutoff, and reusable filter. Perfect for home or office.", category: "Other", stock: 28, rating: 4.6, reviewCount: 567, image: "https://images.unsplash.com/photo-1517668808823-b4c994d44b9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 36, name: "Stand Mixer", price: 399, description: "Professional stand mixer with multiple attachments. Powerful motor and durable construction for baking enthusiasts.", category: "Other", stock: 15, rating: 4.8, reviewCount: 289, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 37, name: "Air Fryer", price: 149, description: "Digital air fryer with 5.5-quart capacity and multiple cooking presets. Healthier cooking with less oil.", category: "Other", stock: 32, rating: 4.7, reviewCount: 678, image: "https://images.unsplash.com/photo-1608039829573-80364e8a43a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 38, name: "Blender", price: 79, description: "High-speed blender with 1500W motor and glass jar. Perfect for smoothies, soups, and sauces.", category: "Other", stock: 40, rating: 4.5, reviewCount: 445, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 39, name: "Yoga Mat", price: 35, description: "Premium yoga mat with non-slip surface and extra cushioning. Lightweight and easy to carry.", category: "Other", stock: 55, rating: 4.6, reviewCount: 523, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 40, name: "Dumbbell Set", price: 149, description: "Adjustable dumbbell set with weights from 5-50 lbs. Perfect for home workouts and strength training.", category: "Other", stock: 22, rating: 4.7, reviewCount: 334, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 41, name: "Bicycle", price: 499, description: "Mountain bike with 21-speed gears, front suspension, and disc brakes. Perfect for trails and city riding.", category: "Other", stock: 10, rating: 4.8, reviewCount: 189, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 42, name: "Tent", price: 199, description: "4-person camping tent with waterproof coating and easy setup. Includes rainfly and carrying bag.", category: "Other", stock: 18, rating: 4.6, reviewCount: 267, image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 43, name: "Sleeping Bag", price: 89, description: "Warm sleeping bag rated for temperatures down to 20°F. Lightweight and compressible for easy packing.", category: "Other", stock: 30, rating: 4.5, reviewCount: 234, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 44, name: "Guitar", price: 299, description: "Acoustic guitar with spruce top and mahogany back. Perfect for beginners and intermediate players.", category: "Other", stock: 15, rating: 4.7, reviewCount: 456, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 45, name: "Piano Keyboard", price: 399, description: "88-key digital piano with weighted keys and multiple voices. Includes stand and sustain pedal.", category: "Other", stock: 12, rating: 4.8, reviewCount: 289, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 46, name: "Board Game Collection", price: 59, description: "Set of 5 popular board games including chess, checkers, and more. Perfect for family game nights.", category: "Other", stock: 35, rating: 4.6, reviewCount: 178, image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 47, name: "LEGO Set", price: 79, description: "Large LEGO building set with 1000+ pieces. Encourages creativity and problem-solving skills.", category: "Other", stock: 25, rating: 4.9, reviewCount: 567, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 48, name: "Action Camera", price: 199, description: "4K action camera with waterproof housing and image stabilization. Perfect for sports and adventures.", category: "Electronics", stock: 20, rating: 4.7, reviewCount: 445, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 49, name: "Drone", price: 599, description: "4K drone with GPS, obstacle avoidance, and 30-minute flight time. Includes controller and carrying case.", category: "Electronics", stock: 8, rating: 4.8, reviewCount: 234, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 50, name: "VR Headset", price: 399, description: "Virtual reality headset with high-resolution displays and motion tracking. Compatible with PC and console.", category: "Electronics", stock: 12, rating: 4.6, reviewCount: 189, image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 51, name: "Monitor 27", price: 299, description: "27-inch 4K monitor with IPS panel and HDR support. Perfect for gaming and professional work.", category: "Electronics", stock: 18, rating: 4.7, reviewCount: 356, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 52, name: "Mechanical Keyboard", price: 129, description: "RGB mechanical keyboard with Cherry MX switches and aluminum frame. Perfect for gaming and typing.", category: "Electronics", stock: 30, rating: 4.8, reviewCount: 523, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 53, name: "Gaming Mouse", price: 79, description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Ergonomic design.", category: "Electronics", stock: 45, rating: 4.7, reviewCount: 678, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 54, name: "Webcam HD", price: 89, description: "1080p HD webcam with autofocus and built-in microphone. Perfect for video calls and streaming.", category: "Electronics", stock: 38, rating: 4.6, reviewCount: 445, image: "https://images.unsplash.com/photo-1587825147138-0bc0c30414d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 55, name: "USB-C Hub", price: 49, description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Perfect for laptops with limited ports.", category: "Electronics", stock: 60, rating: 4.5, reviewCount: 567, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
  { id: 56, name: "Power Bank", price: 39, description: "20000mAh power bank with fast charging and multiple ports. Can charge multiple devices simultaneously.", category: "Electronics", stock: 75, rating: 4.6, reviewCount: 1234, image: "https://images.unsplash.com/photo-1609091839311-d5365f5bf956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80" },
];

// Check if products need to be updated (version check)
const PRODUCTS_VERSION = "2.0"; // Increment when adding new default products

// Load products from localStorage or use default products
const loadProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem("products");
    const storedVersion = localStorage.getItem("productsVersion");
    
    // If version doesn't match or products are fewer, update with defaults
    if (!stored || storedVersion !== PRODUCTS_VERSION) {
      saveProducts(defaultProducts);
      localStorage.setItem("productsVersion", PRODUCTS_VERSION);
      return defaultProducts;
    }
    
    const parsedProducts = JSON.parse(stored);
    
    // Double check: if stored products are fewer than default, update
    if (parsedProducts.length < defaultProducts.length) {
      saveProducts(defaultProducts);
      localStorage.setItem("productsVersion", PRODUCTS_VERSION);
      return defaultProducts;
    }
    
    return parsedProducts;
  } catch (error) {
    console.error("Error loading products from localStorage:", error);
    // On error, reset to defaults
    saveProducts(defaultProducts);
    localStorage.setItem("productsVersion", PRODUCTS_VERSION);
    return defaultProducts;
  }
};

// Save products to localStorage
const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
};

// Get all products
export const getProducts = (): Product[] => {
  return loadProducts();
};

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  const products = getProducts();
  return products.find((p) => p.id === id);
};

// Add a new product
export const addProduct = (productData: Omit<Product, "id">): void => {
  const products = getProducts();
  // Generate new ID (highest existing ID + 1)
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct: Product = {
    ...productData,
    id: newId,
  };
  products.push(newProduct);
  saveProducts(products);
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("productsUpdated"));
};

// Update an existing product
export const updateProduct = (id: number, productData: Partial<Product>): void => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...productData };
    saveProducts(products);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("productsUpdated"));
  }
};

// Delete a product
export const deleteProduct = (id: number): void => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveProducts(filtered);
};

// Export products array (for backward compatibility)
export const products = loadProducts();
