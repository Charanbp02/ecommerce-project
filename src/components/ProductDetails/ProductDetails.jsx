import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();

  const product = state || {
    title: 'Default Product',
    subtitle: 'Default subtitle',
    image: 'https://via.placeholder.com/500',
    price: 0,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div>
        <img src={product.image} alt={product.title} className="w-full h-[500px] object-contain rounded-xl" />
      </div>

      <div className="space-y-6">
        <nav className="text-gray-500 text-sm">Home • {product.title}</nav>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold">Tk {product.price.toFixed(2)} BDT</p>
        <p className="text-gray-700">{product.subtitle}</p>

        <div className="mt-6">
          <p className="font-semibold mb-2">Quantity</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-full px-4 py-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="mx-3">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button className="border px-6 py-2 rounded-full hover:bg-gray-100">
              Add To Cart
            </button>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-full hover:opacity-90">
          Buy It Now
        </button>

        <div>
          <p className="text-sm text-gray-500 mt-2">Guaranteed safe checkout</p>
          <div className="flex gap-2 mt-2">
            {['visa', 'mastercard', 'amex', 'paypal', 'discover'].map((card) => (
              <img
                key={card}
                src={`https://img.icons8.com/color/48/${card}.png`}
                alt={card}
                className="w-10 h-7 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
