import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/header-components/Hero';
import Features from './components/Features/Features';
import CategoryCards from './components/home-page-components/CategoryCards';
import TrendingProducts from './components/home-page-components/TrendingProducts';
import CategoryTabs from './components/home-page-components/CategoryTabs';
import CustomerReviews from './components/home-page-components/CustomerReviews';
import FeaturedCollection from './components/home-page-components/FeaturedCollection';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Footer from './components/footer-components/Footer';

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
    <Footer/>
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
