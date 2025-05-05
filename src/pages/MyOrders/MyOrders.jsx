import { FaStar } from "react-icons/fa";

const orders = [
  {
    date: "Feb 13",
    title: "HIMALAYA Happy Baby Gift Pack",
    status: "Delivered",
    showRating: true,
  },
  {
    date: "Feb 14",
    title: "LAKSIMA Short For Baby Boys & Girls",
    status: "Delivered",
    showRating: true,
  },
  {
    date: "Feb 07",
    title: "₹197 Recharge Successful",
    status: "BSNL Recharge",
    user: "Charan2 • 9xxxxxx8281",
  },
  {
    date: "Jan 12",
    title: "Aarsh Tech usb 2.0 wireless 300Mbps",
    status: "Delivered",
    rating: 4,
  },
  {
    date: "Jan 07",
    title: "rionix CORE I5 2ND GAMING INT...",
    status: "Cancelled",
  },
];

export default function MyOrders() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>
      {orders.map((order, idx) => (
        <div key={idx} className="border-b py-4">
          <div className="text-gray-600">
            {order.status} on {order.date}
          </div>
          <div className="font-medium">{order.title}</div>

          {order.user && (
            <div className="text-sm text-gray-500">{order.user}</div>
          )}

          {order.showRating && (
            <div className="flex items-center gap-1 text-gray-400 mt-1">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
              <span className="ml-2 text-sm">Rate this product now</span>
            </div>
          )}

          {order.rating && (
            <div className="flex items-center gap-1 mt-1">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < order.rating ? "text-green-500" : "text-gray-300"}
                  />
                ))}
              <span className="ml-2 text-sm text-blue-500 cursor-pointer">
                Write a Review
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
