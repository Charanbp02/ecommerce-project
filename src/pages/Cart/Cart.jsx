// Cart.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "JAINX Blue Silicone Band Analog...",
      rating: 4.2,
      reviews: 7490,
      originalPrice: 1799,
      discountedPrice: 231,
      discount: 87,
      delivery: "2 days, Wed",
      quantity: 1,
      imageUrl:
        "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/pexels-photo-1620826.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvcGV4ZWxzLXBob3RvLTE2MjA4MjYud2VicCIsImlhdCI6MTc0NTMwOTEwMSwiZXhwIjoxNzc2ODQ1MTAxfQ.4l44LzLq-vZAcUjgGKkP-V0gNwISeeMjd01RUEjRlP4",
    },
    {
      id: 2,
      title: "VeBNoR Men Solid Formal Maroon...",
      rating: 4.1,
      reviews: 114996,
      originalPrice: 999,
      discountedPrice: 270,
      discount: 72,
      delivery: "2 days, Wed",
      quantity: 1,
      imageUrl:
        "https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/kidsfashions/Men%20shirts.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MDU3MDllLWJlYjUtNDNhNy04YWQ4LTZkNWU5NDU4MmI5NiJ9.eyJ1cmwiOiJraWRzZmFzaGlvbnMvTWVuIHNoaXJ0cy53ZWJwIiwiaWF0IjoxNzQ1MzA5Mzg1LCJleHAiOjE3NzY4NDUzODV9.PV_wl-Tf7A_JamvGbtBxbNEJH7pIjeOnACLUCczwZtY",
    },
  ]);

  const [savedItems, setSavedItems] = useState([]);
  const [address, setAddress] = useState({
    name: "Charan BP",
    pincode: "570018",
    street: "Jana seva kendra opposite road, #732...",
  });
  const [editingAddress, setEditingAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(43);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    showNotification("Item removed from cart");
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleSaveForLater = (id) => {
    const itemToSave = cartItems.find((item) => item.id === id);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      setCartItems(cartItems.filter((item) => item.id !== id));
      showNotification("Item saved for later");
    }
  };

  const handleMoveToCart = (id) => {
    const itemToMove = savedItems.find((item) => item.id === id);
    if (itemToMove) {
      setCartItems([...cartItems, itemToMove]);
      setSavedItems(savedItems.filter((item) => item.id !== id));
      showNotification("Item moved to cart");
    }
  };

  const handleBuyNow = (id) => {
    const item = cartItems.find((item) => item.id === id);
    showNotification(`Proceeding to checkout for ${item.title}`);
    // Navigate to checkout with single item
    navigate("/checkout", {
      state: {
        cartItems: [item],
        address,
        finalAmount: item.discountedPrice * item.quantity + packagingFee - couponDiscount,
        discountTotal: (item.originalPrice - item.discountedPrice) * item.quantity,
        couponDiscount,
        packagingFee,
        deliveryCharges: 0,
      },
    });
  };

  const handlePlaceOrder = () => {
    if (!address.name || !address.pincode || !address.street) {
      showNotification("Please complete address details");
      return;
    }
    // Navigate to checkout page instead of clearing cart
    navigate("/checkout", {
      state: {
        cartItems,
        address,
        finalAmount,
        discountTotal,
        couponDiscount,
        packagingFee,
        deliveryCharges,
      },
    });
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setCouponDiscount(100);
      showNotification("Coupon applied successfully!");
    } else {
      setCouponDiscount(43);
      showNotification("Invalid coupon code");
    }
  };

  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const discountTotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.originalPrice - item.discountedPrice) * item.quantity,
    0
  );
  const packagingFee = 29;
  const deliveryCharges = cartItems.length > 0 ? 0 : 120;
  const finalAmount =
    cartItems.reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    ) -
    couponDiscount +
    packagingFee +
    deliveryCharges;

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>

        {/* Delivery Address */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          {editingAddress ? (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
                placeholder="Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                placeholder="Pincode"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                placeholder="Street Address"
                className="border p-2 rounded"
              />
              <button
                onClick={() => {
                  setEditingAddress(false);
                  showNotification("Address updated successfully");
                }}
                className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Deliver to:{" "}
                <span className="font-semibold text-black">
                  {address.name}, {address.pincode}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{address.street}</p>
              <button
                onClick={() => setEditingAddress(true)}
                className="mt-2 text-blue-600 text-sm font-medium hover:underline"
              >
                Change
              </button>
            </>
          )}
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 border rounded-l text-lg font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 border rounded-r text-lg font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="ml-4 flex-1">
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <span className="font-bold">{item.rating}</span>
                    <span className="text-gray-500 ml-2">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.discountedPrice}
                    </span>
                    <span className="line-through text-gray-400 ml-2 text-sm">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-green-600 ml-2 text-sm">
                      {item.discount}% off
                    </span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Delivery by {item.delivery}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-blue-600 mt-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleSaveForLater(item.id)}
                  className="hover:underline"
                >
                  Save for later
                </button>
                <button
                  onClick={() => handleBuyNow(item.id)}
                  className="hover:underline"
                >
                  Buy this now
                </button>
              </div>
            </div>
          ))
        )}

        {/* Saved for Later */}
        {savedItems.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Saved for Later</h2>
            {savedItems.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg mb-4 shadow-sm">
                <div className="flex">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.discountedPrice}
                      </span>
                      <span className="line-through text-gray-400 ml-2 text-sm">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-green-600 ml-2 text-sm">
                        {item.discount}% off
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Delivery by {item.delivery}
                    </p>
                    <button
                      onClick={() => handleMoveToCart(item.id)}
                      className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Price Details */}
      {cartItems.length > 0 && (
        <div className="border-t pt-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
            <div className="flex justify-between mb-2">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{originalTotal}</span>
            </div>
            <div className="flex justify-between text-green-700 mb-2">
              <span>Discount</span>
              <span>-₹{discountTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Secured Packaging Fee</span>
              <span>₹{packagingFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span>
                {deliveryCharges === 0 ? (
                  <span className="text-green-700">FREE</span>
                ) : (
                  <span>₹{deliveryCharges}</span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border p-2 rounded text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
              <span className="text-green-700">-₹{couponDiscount}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>
            <p className="text-green-600 mt-2 font-medium">
              You will save ₹{discountTotal + couponDiscount} on this order
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl"
          >
            Continue (₹{finalAmount})
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;