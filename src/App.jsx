import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Hero from './components/layout/header-components/Hero';
import Features from './components/layout/Features/Features';
import CategoryCards from './components/home-page-components/CategoryCards/CategoryCards';
import TrendingProducts from './components/home-page-components/TrendingProducts/TrendingProducts';
import CategoryTabs from './components/home-page-components/CategoryTabs/CategoryTabs';
import CustomerReviews from './components/home-page-components/CustomerReviews/CustomerReviews';
import FeaturedCollection from './components/home-page-components/FeaturedCollections/FeaturedCollection';
import ProductDetails from './components/product/ProductDetails/ProductDetails';
import Footer from './components/layout/footer-components/Footer';
import Cart from "./pages/Cart/Cart"; 
import WishListPage from './pages/Wishlist/Wishlist';
import MyOrders from './pages/MyOrders/MyOrders';
import CheckoutPage from './pages/CheckOut/CheckOut';
import CategoriesPage from './components/product/CategoriesPage/CategoriesPage';
import CategeriesItems from './components/product/CategeriesItems/CategeriesItems';
import Login from './pages/LoginPage/Login';
import Signup from './pages/LoginPage/Signup';
import ForgotPassword from './pages/LoginPage/ForgotPassword';



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
        <Route path="/cart" element={<Cart />} /> {/* <-- Cart Route */}
        <Route path='/wishlist' element={<WishListPage/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/myorders' element={<MyOrders/>} />
        <Route path='/categoriespage' element={<CategoriesPage/>} />
        <Route path='/CategeriesItems' element={<CategeriesItems/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        
      </Routes>
    </Router>
  );
};

export default App;