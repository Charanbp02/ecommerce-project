export default function CategoryTabs() {
  const items = [
    { text: "Limited Offer Sales!", className: "glow-blue" },
    { text: "Hot Deal Products!", className: "glow-red" },
    { text: "Best Selling Items", className: "glow-green" },
    { text: "New Arrivals!", className: "glow-purple" },
    { text: "Flash Deals!", className: "glow-yellow" },
    { text: "Seasonal Picks!", className: "glow-pink" },
    { text: "Mega Discounts!", className: "glow-orange" },
    { text: "Exclusive Launches!", className: "glow-cyan" },
  ];

  return (
    <div className="bg-gray-100 py-6 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-20 text-2xl font-semibold">
        {items.map((item, index) => (
          <span
            key={index}
            className={`text-white ${item.className} transition-all duration-500`}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
