import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Features from './components/Features/Features';
import CategoryCards from './components/CategoryCards/CategoryCards';
import TrendingProducts from './components/TrendingProducts/TrendingProducts';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import CustomerReviews from './components/CustomerReviews/CustomerReviews';
import FeaturedCollection from './components/FeaturedCollection/FeaturedCollection';
import ProductDetails from './components/ProductDetails/ProductDetails';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <CategoryCards />
    <TrendingProducts />
    <CategoryTabs />
    <CustomerReviews />
    <FeaturedCollection />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
