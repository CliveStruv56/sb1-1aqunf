import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Coffee, Menu as MenuIcon } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { MobileMenu } from './components/MobileMenu';
import { TimeSlotPicker } from './components/TimeSlotPicker';
import type { Product, CartItem, TimeSlot } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich and bold single shot espresso',
    price: 2.50,
    category: 'coffee',
    allowsMilkOptions: false,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800'
  },
  {
    id: '2',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 3.50,
    category: 'coffee',
    allowsMilkOptions: true,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800'
  },
  {
    id: '3',
    name: 'Earl Grey',
    description: 'Classic black tea with bergamot',
    price: 2.75,
    category: 'tea',
    allowsMilkOptions: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800'
  },
  {
    id: '4',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting',
    price: 4.50,
    category: 'cake',
    allowsMilkOptions: false,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800'
  }
];

function Menu() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [showCart, setShowCart] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showTimeSlotPicker, setShowTimeSlotPicker] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, milkOption?: string) => {
    setCart(current => {
      const existingItem = current.find(
        item => item.product.id === product.id && item.milkOption === milkOption
      );

      if (existingItem) {
        return current.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { product, quantity: 1, milkOption }];
    });
  };

  const handleTimeSlotSelection = (timeSlot: TimeSlot) => {
    // Here you would typically handle the order submission
    console.log('Order placed for:', timeSlot);
    console.log('Cart items:', cart);
    
    // Clear cart and close modals
    setCart([]);
    setShowTimeSlotPicker(false);
    setShowCart(false);

    // Show confirmation
    alert(`Order confirmed for ${timeSlot.time} on ${timeSlot.date.toLocaleDateString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <Link to="/" className="flex items-center gap-2 ml-2 md:ml-0">
                <Coffee className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold">Brew Buddy</span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-gray-700 hover:text-blue-600 ${
                  selectedCategory === 'all' ? 'text-blue-600' : ''
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('coffee')}
                className={`text-gray-700 hover:text-blue-600 ${
                  selectedCategory === 'coffee' ? 'text-blue-600' : ''
                }`}
              >
                Coffee
              </button>
              <button
                onClick={() => setSelectedCategory('tea')}
                className={`text-gray-700 hover:text-blue-600 ${
                  selectedCategory === 'tea' ? 'text-blue-600' : ''
                }`}
              >
                Tea
              </button>
              <button
                onClick={() => setSelectedCategory('cake')}
                className={`text-gray-700 hover:text-blue-600 ${
                  selectedCategory === 'cake' ? 'text-blue-600' : ''
                }`}
              >
                Cakes
              </button>
            </nav>

            <button
              onClick={() => setShowCart(true)}
              className="p-2 text-gray-700 hover:text-blue-600 relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white 
                               text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setShowMobileMenu(false);
        }}
        selectedCategory={selectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowTimeSlotPicker(true);
            setShowCart(false);
          }}
          onUpdateQuantity={(productId, milkOption, newQuantity) => {
            setCart(current =>
              current.map(item =>
                item.product.id === productId && item.milkOption === milkOption
                  ? { ...item, quantity: newQuantity }
                  : item
              ).filter(item => item.quantity > 0)
            );
          }}
        />
      )}

      <TimeSlotPicker
        isOpen={showTimeSlotPicker}
        onClose={() => setShowTimeSlotPicker(false)}
        onSelectTimeSlot={handleTimeSlotSelection}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;