// Checkout.js
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Initialize state with defaults
  const [checkoutData, setCheckoutData] = useState({
    cartItems: state?.cartItems || [],
    address: state?.address || { name: "", pincode: "", street: "" },
    finalAmount: state?.finalAmount || 0,
    discountTotal: state?.discountTotal || 0,
    couponDiscount: state?.couponDiscount || 0,
    packagingFee: state?.packagingFee || 0,
    deliveryCharges: state?.deliveryCharges || 0,
  });
  
  // New states for additional functionality
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [newAddress, setNewAddress] = useState(checkoutData.address);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Available coupons (mock data)
  const availableCoupons = [
    { code: "SAVE10", discount: 10, minAmount: 500 },
    { code: "SAVE20", discount: 20, minAmount: 1000 },
  ];

  // Calculate total items price
  const totalItemsPrice = checkoutData.cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  // Handle address update
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.pincode || !newAddress.street) {
      setError("All address fields are required");
      return;
    }
    setCheckoutData(prev => ({ ...prev, address: newAddress }));
    setIsEditingAddress(false);
    setError("");
  };

  // Handle coupon application
  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }

    if (totalItemsPrice < coupon.minAmount) {
      setError(`Minimum order amount for this coupon is ₹${coupon.minAmount}`);
      return;
    }

    const discount = (totalItemsPrice * coupon.discount) / 100;
    setCheckoutData(prev => ({
      ...prev,
      couponDiscount: discount,
      finalAmount: prev.finalAmount - discount + prev.couponDiscount,
    }));
    setCouponCode("");
    setError("");
  };

  // Handle order placement
  const placeOrder = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to your backend
      const orderData = {
        ...checkoutData,
        paymentMethod,
        orderDate: new Date().toISOString(),
        orderId: `ORD${Math.random().toString(36).substr(2, 9)}`,
      };

      // Store order in localStorage (or send to backend)
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Redirect to order confirmation
      navigate("/order-confirmation", { state: orderData });
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Delivery Address */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Delivery Address</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-blue-600 text-sm"
          >
            {isEditingAddress ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditingAddress ? (
          <form onSubmit={handleAddressUpdate} className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Address
            </button>
          </form>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{checkoutData.address.name}</span>, {checkoutData.address.pincode}
            </p>
            <p className="text-xs text-gray-500 mt-1">{checkoutData.address.street}</p>
          </>
        )}
      </div>

      {/* Coupon Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Apply Coupon</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Available coupons: {availableCoupons.map(c => c.code).join(", ")}
        </p>
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {checkoutData.cartItems.map((item) => (
          <div key={item.id} className="flex mb-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>
              <p className="text-lg font-bold text-gray-900">
                ₹{item.discountedPrice * item.quantity}
              </p>
              <p className="text-xs text-green-700 mt-1">
                Delivery by {item.delivery}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Price Details</h2>
        <div className="flex justify-between mb-2">
          <span>Price ({checkoutData.cartItems.length} items)</span>
          <span>₹{totalItemsPrice}</span>
        </div>
        <div className="flex justify-between text-green-700 mb-2">
          <span>Discount</span>
          <span>-₹{checkoutData.discountTotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Secured Packaging Fee</span>
          <span>₹{checkoutData.packagingFee}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Charges</span>
          <span>
            {checkoutData.deliveryCharges === 0 ? (
              <span className="text-green-700">FREE</span>
            ) : (
              <span>₹{checkoutData.deliveryCharges}</span>
            )}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Coupon Discount</span>
          <span className="text-green-700">-₹{checkoutData.couponDiscount}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{checkoutData.finalAmount}</span>
        </div>
        <p className="text-green-600 mt-2 font-medium">
          You saved ₹{checkoutData.discountTotal + checkoutData.couponDiscount} on this order
        </p>
      </div>

      {/* Place Order Button */}
      <button
        onClick={placeOrder}
        disabled={isLoading}
        className={`w-full py-3 rounded-xl text-white font-semibold
          ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
      >
        {isLoading ? "Processing..." : `Place Order (₹${checkoutData.finalAmount})`}
      </button>
    </div>
  );
};

export default Checkout;