const reviews = [
  {
    title: "Product Quality!",
    stars: 5,
    text: "I absolutely love shopping here! The selection is fantastic, the prices are competitive, Highly recommend.",
    name: "Wade Warren",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    title: "Delivery Services!",
    stars: 5,
    text: "I had a great experience shopping on this website. The interface is user-friendly, making it easy to find",
    name: "Kristin Watson",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    title: "Product Price!",
    stars: 5,
    text: "I’m so impressed with the level of customer service I received. I had an issue with my order, and the support",
    name: "Esther Howard",
    role: "Designer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-gray-50 py-10 px-4 md:px-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Customers Review</h2>
        <p className="text-gray-600 mt-2">Share information about your brand with your customers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h3 className="font-semibold text-lg">{review.title}</h3>
            <div className="flex justify-center text-yellow-400 my-2">
              {"★".repeat(review.stars)}
            </div>
            <p className="text-gray-700 text-sm mb-6">“{review.text}”</p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
