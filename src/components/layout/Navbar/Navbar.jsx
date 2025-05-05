import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaHeart, FaUser, FaCaretDown, FaBars, FaTimes, FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { PiShippingContainerBold } from "react-icons/pi";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const mockSuggestions = ['T-shirts', 'Jeans', 'Sneakers', 'Laptops', 'Headphones'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || 'https://via.placeholder.com/32',
        };
        setUser(userData);
        console.log('Authenticated user:', userData.id);

        const cartRef = doc(db, 'users', firebaseUser.uid, 'cart', 'items');
        const wishlistRef = doc(db, 'users', firebaseUser.uid, 'wishlist', 'items');
        const ordersRef = doc(db, 'users', firebaseUser.uid, 'orders', 'summary');

        onSnapshot(cartRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const items = data?.items || [];
            setCartItems(items);
            setCartCount(items.length);
            localStorage.setItem('cart', JSON.stringify(items));
          } else {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(savedCart);
            setCartCount(savedCart.length);
          }
        }, (error) => {
          console.error('Cart snapshot error:', error);
          showToast('Failed to load cart: ' + error.message);
          const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCartItems(savedCart);
          setCartCount(savedCart.length);
        });

        onSnapshot(wishlistRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const items = data?.items || [];
            setWishlistItems(items);
            setWishlistCount(items.length);
            localStorage.setItem('wishlist', JSON.stringify(items));
          } else {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistItems(savedWishlist);
            setWishlistCount(savedWishlist.length);
          }
        }, (error) => {
          console.error('Wishlist snapshot error:', error);
          showToast('Failed to load wishlist: ' + error.message);
          const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
          setWishlistItems(savedWishlist);
          setWishlistCount(savedWishlist.length);
        });

        onSnapshot(ordersRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setOrderCount(data?.pendingOrders || 0);
          } else {
            setOrderCount(0);
          }
        }, (error) => {
          console.error('Orders snapshot error:', error);
          showToast('Failed to load orders: ' + error.message);
          setOrderCount(0);
        });
      } else {
        setUser(null);
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setCartItems(savedCart);
        setCartCount(savedCart.length);
        setWishlistItems(savedWishlist);
        setWishlistCount(savedWishlist.length);
        setOrderCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartCount(cartItems.length);
    if (user && auth.currentUser) {
      const cartRef = doc(db, 'users', user.id, 'cart', 'items');
      setDoc(cartRef, { items: cartItems }, { merge: true })
        .then(() => {
          console.log('Cart synced to Firestore');
        })
        .catch((error) => {
          console.error('Cart sync error:', error);
          showToast('Cart sync failed, using local storage: ' + error.message);
        });
    }
  }, [cartItems, user]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    setWishlistCount(wishlistItems.length);
    if (user && auth.currentUser) {
      const wishlistRef = doc(db, 'users', user.id, 'wishlist', 'items');
      setDoc(wishlistRef, { items: wishlistItems }, { merge: true })
        .then(() => {
          console.log('Wishlist synced to Firestore');
        })
        .catch((error) => {
          console.error('Wishlist sync error:', error);
          showToast('Wishlist sync failed, using local storage: ' + error.message);
        });
    }
  }, [wishlistItems, user]);

  useEffect(() => {
    let timeoutId;
    const handleClickOutside = (event) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileOpen(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearchSuggestions([]);
        }
      }, 100);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setSearchSuggestions([]);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCartClick = () => {
    navigate("/cart");
    setIsOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
    setIsOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
  };

  const handleOrderClick = () => {
    navigate("/myorders");
    setIsOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
  };

  const handleProfileClick = () => {
    console.log('Navigating to profile');
    setIsOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
    setTimeout(() => {
      navigate("/profile");
    }, 0);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCartItems([]);
      setWishlistItems([]);
      setOrderCount(0);
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      navigate("/login");
    } catch (error) {
      showToast('Logout failed: ' + error.message);
    }
    setIsOpen(false);
    setIsProfileOpen(false);
    setSearchSuggestions([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) {
      const filtered = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
      setSearchSuggestions([]);
      setIsOpen(false);
      setIsProfileOpen(false);
    }
  };

  const handleSearchSuggestionClick = (suggestion) => {
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setSearchValue('');
    setSearchSuggestions([]);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogin = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      photoURL: userData.photoURL || 'https://via.placeholder.com/32',
    });
  };

  return (
    <>
      <header className="bg-gray-900 text-white shadow-lg relative z-50 min-w-[20rem] w-full">
        <div className="py-3">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link 
              to="/" 
              className="text-xl font-extrabold flex gap-2 items-center tracking-tight" 
              aria-label="TrendZone Home"
            >
              <img
                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzNjc5MDkyLCJleHAiOjE3NzUyMTUwOTJ9.5iu3wayd4jpK-_qc58Cj5JQLe5peP8a5MnYX6VAWJMU"
                alt="TrendZone Logo"
                className="w-6 rounded-full"
              />
              <span>TrendZone</span>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-40 lg:w-56 bg-gray-800 text-white rounded-full border border-gray-700 px-4 py-1.5 focus:outline-none focus:border-blue-500 transition-all duration-300"
                    aria-label="Search products"
                  />
                  <IoMdSearch 
                    className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:text-blue-500"
                    onClick={handleSearchSubmit}
                    aria-label="Submit search"
                  />
                </form>
                {searchSuggestions.length > 0 && (
                  <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                    {searchSuggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                          onClick={() => handleSearchSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button 
                onClick={handleOrderClick}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full flex items-center gap-1 relative transition-colors duration-200"
                aria-label="View orders"
              >
                <PiShippingContainerBold className="text-base" />
                <span className="text-sm">Orders</span>
                {orderCount > 0 && (
                  <span className="absolute top-[-4px] right-[-4px] bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">{orderCount}</span>
                )}
              </button>

              <button 
                onClick={handleWishlistClick}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full flex items-center gap-1 relative transition-colors duration-200"
                aria-label="View wishlist"
              >
                <FaHeart className="text-base" />
                {wishlistCount > 0 && (
                  <span className="absolute top-[-4px] right-[-4px] bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">{wishlistCount}</span>
                )}
              </button>

              <button 
                onClick={handleCartClick}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full flex items-center gap-1 relative transition-colors duration-200"
                aria-label="View cart"
              >
                <FaCartShopping className="text-base" />
                {cartCount > 0 && (
                  <span className="absolute top-[-4px] right-[-4px] bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">{cartCount}</span>
                )}
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  onTouchStart={toggleProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-full flex items-center gap-1 transition-colors duration-200"
                  aria-label="Profile menu"
                >
                  {user && user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/32"
                      alt="Profile"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm">{user ? user.name : 'Profile'}</span>
                  <FaCaretDown
                    className={`text-xs transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl py-2 transition-all duration-200 ease-in-out z-50 ${
                    isProfileOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  } origin-top`}
                >
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          handleProfileClick();
                          setIsProfileOpen(false);
                        }}
                        className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                      onClick={() => {
                        setIsOpen(false);
                        setIsProfileOpen(false);
                      }}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="flex md:hidden items-center">
              <button 
                onClick={toggleMenu} 
                className="text-xl p-2" 
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <Link 
              to="/" 
              className="text-xl font-extrabold flex gap-2 items-center tracking-tight" 
              onClick={toggleMenu}
              aria-label="TrendZone Home"
            >
              <img
                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzNjc5MDkyLCJleHAiOjE3NzUyMTUwOTJ9.5iu3wayd4jpK-_qc58Cj5JQLe5peP8a5MnYX6VAWJMU"
                alt="TrendZone Logo"
                className="w-6 rounded-full"
              />
              <span>TrendZone</span>
            </Link>
            <button 
              onClick={toggleMenu} 
              className="text-xl p-2" 
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          <div className="px-4 py-3">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full bg-gray-800 text-white rounded-full border border-gray-700 px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-300"
                  aria-label="Search products"
                />
                <IoMdSearch 
                  className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:text-blue-500"
                  onClick={handleSearchSubmit}
                  aria-label="Submit search"
                />
              </form>
              {searchSuggestions.length > 0 && (
                <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                        onClick={() => handleSearchSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="flex flex-col gap-2">
              {Menu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      setIsOpen(false);
                      setIsDropdownOpen(false);
                      setIsProfileOpen(false);
                    }}
                    aria-label={item.name}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="relative">
                <div
                  className="flex items-center gap-1 px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={toggleDropdown}
                  aria-label="Toggle trending menu"
                >
                  Trending
                  <FaCaretDown
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
                <div
                  className={`pl-4 ${isDropdownOpen ? 'block' : 'hidden'} transition-all duration-200`}
                >
                  <ul className="flex flex-col gap-1">
                    {DropdownLinks.map((link) => (
                      <li key={link.id}>
                        <Link
                          to={link.link}
                          className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            setIsOpen(false);
                            setIsDropdownOpen(false);
                            setIsProfileOpen(false);
                          }}
                          aria-label={link.name}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleOrderClick();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  aria-label="View orders"
                >
                  <PiShippingContainerBold className="text-lg" />
                  <span>My Orders</span>
                  {orderCount > 0 && (
                    <span className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">{orderCount}</span>
                  )}
                </button>
              </li>
              {!user && (
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      setIsOpen(false);
                      setIsProfileOpen(false);
                    }}
                    aria-label="Login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
          <div className="flex justify-around items-center py-2">
            <Link 
              to="/" 
              className="flex flex-col items-center text-gray-200 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
              aria-label="Home"
            >
              <FaHome className="text-lg" />
              <span className="text-xs">Home</span>
            </Link>
            <button 
              onClick={handleWishlistClick}
              className="flex flex-col items-center text-gray-200 hover:text-blue-500 relative"
              aria-label="View wishlist"
            >
              <FaHeart className="text-lg" />
              {wishlistCount > 0 && (
                <span className="absolute top-[-4px] right-[-8px] bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">{wishlistCount}</span>
              )}
              <span className="text-xs">Wishlist</span>
            </button>
            <button 
              onClick={handleCartClick}
              className="flex flex-col items-center text-gray-200 hover:text-blue-500 relative"
              aria-label="View cart"
            >
              <FaCartShopping className="text-lg" />
              {cartCount > 0 && (
                <span className="absolute top-[-4px] right-[-8px] bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">{cartCount}</span>
              )}
              <span className="text-xs">Cart</span>
            </button>
            <div className="relative" ref={profileRef}>
              <button
                onClick={handleProfileClick}
                onTouchStart={handleProfileClick}
                className="flex flex-col items-center text-gray-200 hover:text-blue-500"
                aria-label="Profile page"
              >
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/32"
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-xs">{user ? 'Profile' : 'Login'}</span>
              </button>
              <div
                className={`absolute bottom-12 right-0 w-40 bg-gray-800 rounded-lg shadow-xl py-2 transition-all duration-200 ease-in-out z-50 ${
                  isProfileOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                } origin-bottom`}
              >
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setIsProfileOpen(false);
                      }}
                      className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                    onClick={() => {
                      setIsOpen(false);
                      setIsProfileOpen(false);
                    }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {toast.show && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up">
            {toast.message}
          </div>
        )}
      </header>

      <Outlet context={{ addToCart, removeFromCart, addToWishlist, removeFromWishlist, cartItems, wishlistItems, user, handleLogin }} />
    </>
  );
};

export default Navbar; 