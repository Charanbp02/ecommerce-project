import { motion } from "framer-motion";

const features = [
  {
    title: "Worldwide Shipping",
    subtitle: "World Wide Free Shipping.",
    icon: "🌍",
  },
  {
    title: "Secured Payment",
    subtitle: "Safe & Secured Payments",
    icon: "💳",
  },
  {
    title: "30-Days Free Returns",
    subtitle: "Within 30 Days for an Exchange",
    icon: "🔄",
  },
  {
    title: "Surprise Gift",
    subtitle: "Free gift cards & vouchers",
    icon: "🎁",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.9,
      ease: "easeOut",
    },
  }),
};

export default function Features() {
  return (
    <div className="bg-white py-10 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-gray-200">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center space-y-3"
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariant}
        >
          <motion.div className="text-4xl">{feature.icon}</motion.div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-gray-500 text-sm">{feature.subtitle}</p>
        </motion.div>
      ))}
    </div>
  );
}
