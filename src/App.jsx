import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import Features from './components/Features/Features'
import CategoryCards from './components/CategoryCards/CategoryCards'
import TrendingProducts from './components/TrendingProducts/TrendingProducts'
import CategoryTabs from './components/CategoryTabs/CategoryTabs'
import CustomerReviews from './components/CustomerReviews/CustomerReviews'
import FeaturedCollection from './components/FeaturedCollection/FeaturedCollection'

const App = () => {
  return <div>
    <Navbar/>
    <Hero/>
    <Features/>
    <CategoryCards/>
    <TrendingProducts/>
    <CategoryTabs/>
    <CustomerReviews/>
    <FeaturedCollection/>
    <Footer/>
    </div>
  
}

export default App;
