import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Legendaries from './components/Legendaries';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Contact from './components/Contact';
import { CartProvider } from './context/CartContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'legendaries' | 'checkout' | 'profile' | 'contact'>('home');

  const navigate = (page: 'home' | 'legendaries' | 'checkout' | 'profile' | 'contact') => {
    if (!document.startViewTransition) {
      setCurrentPage(page);
      return;
    }
    
    document.startViewTransition(() => {
      flushSync(() => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    });
  };

  return (
    <CartProvider>
      <Box>
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} navigate={navigate} />
        
        {currentPage === 'home' && (
          <Box className="page-transition">
            <Hero navigate={navigate} />
            <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <ProductList searchQuery={searchQuery} selectedCategory={selectedCategory} />
          </Box>
        )}
        
        {currentPage === 'legendaries' && (
          <Box className="page-transition">
            <Legendaries navigate={navigate} />
          </Box>
        )}

        {currentPage === 'checkout' && (
          <Box className="page-transition">
            <Checkout navigate={navigate} />
          </Box>
        )}

        {currentPage === 'profile' && (
          <Box className="page-transition">
            <Profile navigate={navigate} />
          </Box>
        )}

        {currentPage === 'contact' && (
          <Box className="page-transition">
            <Contact navigate={navigate} />
          </Box>
        )}
        
        <Footer navigate={navigate} />
      </Box>
    </CartProvider>
  );
}

export default App;
