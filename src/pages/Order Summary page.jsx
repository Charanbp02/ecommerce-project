import { useState } from "react";

const OrderSummary = ({ cartItems, address }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const discountTotal = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.discountedPrice) * item.quantity,
    0
  );
  const finalAmount = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  ) - 40; // Assuming a ₹40 coupon discount as per the image

  const handleContinue = () => {
    if (!address.name || !address.pincode || !address.street) {
      showNotification("Please complete address details");
      return;
    }
    showNotification("Proceeding to payment...");
    // Add navigation logic to payment page here (e.g., using React Router)
  };

  const handleDonation = (amount) => {
    setDonationAmount(amount);
    showNotification(`Donation of ₹${amount} added!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-full mr-2">
            ✔
          </span>
          <span>Address</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2">
          <div className="h-0.5 bg-blue-600 w-1/2"></div>
        </div>
        <div className="flex items-center">
          <span className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-full mr-2">
            2
          </span>
          <span className="font-semibold">Order Summary</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2">
          <div className="h-0.5 bg-gray-300 w-1/2"></div>
        </div>
        <div className="flex items-center">
          <span className="w-5 h-5 bg-gray-300 text-gray-600 flex items-center justify-center rounded-full">
            3
          </span>
          <span>Payment</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">Deliver to:</h2>
            <p className="text-gray-800">
              <span className="font-medium">{address.name}</span>{" "}
              <span className="text-green-600">HOME</span>
            </p>
            <p className="text-gray-600 text-sm">
              {address.street}, {address.pincode}
            </p>
            <p className="text-gray-600 text-sm">7259575032</p>
          </div>
          <button
            onClick={() => showNotification("Address change not implemented yet")}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Change
          </button>
        </div>
      </div>

      {cartItems.map((item) => (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-start mb-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <p className="text-green-600 text-sm mb-1">Hot Deal</p>
              <h3 className="text-gray-900 font-medium">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span>★★★★☆ {item.rating}</span>
                <span className="ml-2">({item.reviews})</span>
                <span className="ml-2 text-blue-600">Assured</span>
              </div>
              <div className="flex items-center text-gray-900">
                <span className="text-green-600 mr-2">↓{item.discount}%</span>
                <span className="text-lg font-bold">₹{item.discountedPrice}</span>
                <span className="line-through text-gray-500 ml-2 text-sm">
                  ₹{item.originalPrice}
                </span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Qty: {item.quantity} <span className="text-blue-600">▼</span>{" "}
                1 coupon applied · 1 offer available
              </p>
              <p className="text-sm text-green-600 mt-1">
                🛡️ EXPRESS Delivery in 2 days, Thu · ₹40 FREE
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Donate to Flipkart Foundation</h3>
        <p className="text-gray-600 text-sm mb-2">
          Support transformative social work in India
        </p>
        <div className="flex space-x-2 mb-2">
          {[10, 20, 50, 100].map((amount) => (
            <button
              key={amount}
              onClick={() => handleDonation(amount)}
              className={`px-4 py-2 rounded-full border ${
                donationAmount === amount
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              } hover:bg-blue-100`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-xs">
          Note: GST and No cost EMI will not be applicable
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold">₹{finalAmount}</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <a href="#" className="text-blue-600 hover:underline">
            View price details
          </a>
        </div>
        <button
          onClick={handleContinue}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;