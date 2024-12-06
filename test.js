import React, { useState, useMemo } from 'react';
import { LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Comprehensive product data with images from Unsplash
const productData = [
  // Electronics Category
  { id: 'e1', name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 199.99, image: '/api/placeholder/400/300?text=Headphones' },
  { id: 'e2', name: 'Smart 4K Television', category: 'Electronics', price: 599.99, image: '/api/placeholder/400/300?text=TV' },
  { id: 'e3', name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 79.99, image: '/api/placeholder/400/300?text=Speaker' },
  { id: 'e4', name: 'Smartphone Pro Max', category: 'Electronics', price: 899.99, image: '/api/placeholder/400/300?text=Smartphone' },
  { id: 'e5', name: 'Wireless Charging Pad', category: 'Electronics', price: 49.99, image: '/api/placeholder/400/300?text=ChargerPad' },
  { id: 'e6', name: 'Gaming Laptop', category: 'Electronics', price: 1299.99, image: '/api/placeholder/400/300?text=GamingLaptop' },
  { id: 'e7', name: 'Smartwatch', category: 'Electronics', price: 249.99, image: '/api/placeholder/400/300?text=Smartwatch' },
  { id: 'e8', name: 'Noise-Canceling Earbuds', category: 'Electronics', price: 129.99, image: '/api/placeholder/400/300?text=Earbuds' },
  { id: 'e9', name: 'Portable Power Bank', category: 'Electronics', price: 59.99, image: '/api/placeholder/400/300?text=PowerBank' },
  { id: 'e10', name: 'Digital Camera', category: 'Electronics', price: 449.99, image: '/api/placeholder/400/300?text=Camera' },
  { id: 'e11', name: 'External SSD', category: 'Electronics', price: 129.99, image: '/api/placeholder/400/300?text=SSD' },
  { id: 'e12', name: 'Wireless Router', category: 'Electronics', price: 89.99, image: '/api/placeholder/400/300?text=Router' },
  { id: 'e13', name: 'Tablet', category: 'Electronics', price: 299.99, image: '/api/placeholder/400/300?text=Tablet' },
  { id: 'e14', name: 'Computer Monitor', category: 'Electronics', price: 249.99, image: '/api/placeholder/400/300?text=Monitor' },
  { id: 'e15', name: 'Drone', category: 'Electronics', price: 599.99, image: '/api/placeholder/400/300?text=Drone' },

  // Clothing Category
  { id: 'c1', name: 'Classic Leather Jacket', category: 'Clothing', price: 249.99, image: '/api/placeholder/400/300?text=LeatherJacket' },
  { id: 'c2', name: 'Athletic Running Shoes', category: 'Clothing', price: 129.99, image: '/api/placeholder/400/300?text=RunningShoes' },
  { id: 'c3', name: 'Casual Denim Jeans', category: 'Clothing', price: 79.99, image: '/api/placeholder/400/300?text=Jeans' },
  { id: 'c4', name: 'Designer Wool Coat', category: 'Clothing', price: 299.99, image: '/api/placeholder/400/300?text=WoolCoat' },
  { id: 'c5', name: 'Performance Athletic Shirt', category: 'Clothing', price: 49.99, image: '/api/placeholder/400/300?text=AthleticShirt' },
  { id: 'c6', name: 'Formal Business Suit', category: 'Clothing', price: 399.99, image: '/api/placeholder/400/300?text=Suit' },
  { id: 'c7', name: 'Comfortable Sneakers', category: 'Clothing', price: 89.99, image: '/api/placeholder/400/300?text=Sneakers' },
  { id: 'c8', name: 'Winter Parka', category: 'Clothing', price: 199.99, image: '/api/placeholder/400/300?text=Parka' },
  { id: 'c9', name: 'Yoga Pants', category: 'Clothing', price: 59.99, image: '/api/placeholder/400/300?text=YogaPants' },
  { id: 'c10', name: 'Leather Boots', category: 'Clothing', price: 179.99, image: '/api/placeholder/400/300?text=Boots' },
  { id: 'c11', name: 'Graphic T-Shirt', category: 'Clothing', price: 29.99, image: '/api/placeholder/400/300?text=GraphicTShirt' },
  { id: 'c12', name: 'Swim Shorts', category: 'Clothing', price: 44.99, image: '/api/placeholder/400/300?text=SwimShorts' },
  { id: 'c13', name: 'Lightweight Windbreaker', category: 'Clothing', price: 89.99, image: '/api/placeholder/400/300?text=Windbreaker' },
  { id: 'c14', name: 'Compression Sportswear', category: 'Clothing', price: 69.99, image: '/api/placeholder/400/300?text=Compression' },
  { id: 'c15', name: 'Designer Sunglasses', category: 'Clothing', price: 159.99, image: '/api/placeholder/400/300?text=Sunglasses' },

  // Home & Kitchen Category
  { id: 'h1', name: 'Coffee Maker', category: 'Home & Kitchen', price: 129.99, image: '/api/placeholder/400/300?text=CoffeeMaker' },
  { id: 'h2', name: 'Air Fryer', category: 'Home & Kitchen', price: 99.99, image: '/api/placeholder/400/300?text=AirFryer' },
  { id: 'h3', name: 'Blender', category: 'Home & Kitchen', price: 79.99, image: '/api/placeholder/400/300?text=Blender' },
  { id: 'h4', name: 'Stand Mixer', category: 'Home & Kitchen', price: 249.99, image: '/api/placeholder/400/300?text=StandMixer' },
  { id: 'h5', name: 'Microwave Oven', category: 'Home & Kitchen', price: 149.99, image: '/api/placeholder/400/300?text=Microwave' },
  { id: 'h6', name: 'Instant Pot', category: 'Home & Kitchen', price: 89.99, image: '/api/placeholder/400/300?text=InstantPot' },
  { id: 'h7', name: 'Toaster Oven', category: 'Home & Kitchen', price: 69.99, image: '/api/placeholder/400/300?text=ToasterOven' },
  { id: 'h8', name: 'Electric Kettle', category: 'Home & Kitchen', price: 49.99, image: '/api/placeholder/400/300?text=ElectricKettle' },
  { id: 'h9', name: 'Rice Cooker', category: 'Home & Kitchen', price: 59.99, image: '/api/placeholder/400/300?text=RiceCooker' },
  { id: 'h10', name: 'Food Processor', category: 'Home & Kitchen', price: 129.99, image: '/api/placeholder/400/300?text=FoodProcessor' },
  { id: 'h11', name: 'Coffee Grinder', category: 'Home & Kitchen', price: 79.99, image: '/api/placeholder/400/300?text=CoffeeGrinder' },
  { id: 'h12', name: 'Pressure Cooker', category: 'Home & Kitchen', price: 99.99, image: '/api/placeholder/400/300?text=PressureCooker' },
  { id: 'h13', name: 'Slow Cooker', category: 'Home & Kitchen', price: 69.99, image: '/api/placeholder/400/300?text=SlowCooker' },
  { id: 'h14', name: 'Electric Grill', category: 'Home & Kitchen', price: 119.99, image: '/api/placeholder/400/300?text=ElectricGrill' },
  { id: 'h15', name: 'Kitchen Scale', category: 'Home & Kitchen', price: 34.99, image: '/api/placeholder/400/300?text=KitchenScale' },
];

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = [...new Set(productData.map(product => product.category))];

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return productData.filter(product => 
      (selectedCategory ? product.category === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Category Horizontal Scroll */}
      <div className="bg-white shadow-sm py-3 overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-4 px-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found matching your search or category.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;