import { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import { PiShippingContainerBold } from "react-icons/pi";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/top-rated" },
  { id: 3, name: "Kids Wear", link: "/kids-wear" },
  { id: 4, name: "Mens Wear", link: "/mens-wear" },
  { id: 5, name: "Electronics", link: "/electronics" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/trending-products" },
  { id: 2, name: "Best Selling", link: "/best-selling" },
  { id: 3, name: "Top Rated", link: "/top-rated" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCartClick = () => {
    setCartCount(prev => prev + 1);
  };

  const handleOrderClick = () => {
    navigate("/orders");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
      setSearchValue('');
    }
  };

  return (
    <>
      <div className="shadow-md bg-white duration-200 relative z-40 min-w-[24rem] w-full">
        {/* Upper Navbar */}
        <div className="bg-primary/40 py-3">
          <div className="container flex justify-between items-center px-4">
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
              <img
                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzNjc5MDkyLCJleHAiOjE3NzUyMTUwOTJ9.5iu3wayd4jpK-_qc58Cj5JQLe5peP8a5MnYX6VAWJMU"
                alt="Logo"
                className="w-10"
              />
              <span>Trend Zone</span>
            </Link>

            {/* Desktop Search and Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="w-[200px] group-hover:w-[250px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-primary"
                />
                <IoMdSearch 
                  className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  onClick={handleSearchSubmit}
                />
              </form>

              <button 
                onClick={handleOrderClick}
                className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-2"
              >
                <PiShippingContainerBold className="text-xl" />
                <span>My Orders</span>
              </button>

              <button 
                onClick={handleCartClick}
                className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-2 relative"
              >
                <FaCartShopping className="text-xl" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartCount}</span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button onClick={toggleMenu} className="text-2xl">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 py-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
              className="w-full transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-primary"
            />
            <IoMdSearch 
              className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
              onClick={handleSearchSubmit}
            />
          </form>
        </div>

        {/* Navigation Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="md:flex md:items-center justify-center flex-col md:flex-row bg-white w-full">
            {Menu.map((item) => (
              <li key={item.id} className="md:inline-block">
                <Link
                  to={item.link}
                  className="block px-4 py-2 hover:text-primary duration-200"
                  onClick={() => {
                    setIsOpen(false);
                    setIsDropdownOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown */}
            <li className="relative group md:inline-block">
              <div
                className="flex items-center gap-[2px] px-4 py-2 hover:text-primary duration-200 cursor-pointer"
                onClick={toggleDropdown}
              >
                Trending Products
                <FaCaretDown
                  className={`transition-all duration-200 ${isDropdownOpen ? 'rotate-180' : ''} md:group-hover:rotate-180`}
                />
              </div>
              <div
                className={`absolute md:absolute w-full md:w-[200px] bg-white p-2 rounded-md shadow-md ${
                  isDropdownOpen ? 'block' : 'hidden'
                } md:hidden md:group-hover:block`}
              >
                <ul>
                  {DropdownLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        to={link.link}
                        className="block px-4 py-2 rounded-md hover:bg-primary/20"
                        onClick={() => {
                          setIsOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Mobile Cart and Orders */}
            <li className="flex md:hidden flex-col px-4 py-2 gap-2">
              <button
                onClick={handleCartClick}
                className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 relative"
              >
                <FaCartShopping className="text-xl" />
                <span>Cart ({cartCount})</span>
              </button>
              <button
                onClick={handleOrderClick}
                className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full flex items-center justify-center gap-2"
              >
                <PiShippingContainerBold className="text-xl" />
                <span>My Orders</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Header;
