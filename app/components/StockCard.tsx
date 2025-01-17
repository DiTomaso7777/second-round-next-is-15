import { TagIcon, CubeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import AppleLogo from './Apple';
import { useShoppingCart } from '../context/ShoppingCartContext';

interface StockCardProps {
  code: string;
  name: string;
  salesprice: string;
  quantity: number;
}

export default function StockCard({ code, name, salesprice, quantity }: StockCardProps) {
  const { addToCart } = useShoppingCart();

  const handleAddToCart = () => {
    addToCart({
      code,
      name,
      quantity: 1,
      salesprice
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Image Placeholder */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center">
        <AppleLogo />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">{name}</h3>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <TagIcon className="h-5 w-5" />
          <span className="text-sm font-medium">{code}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <CubeIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Stock: {quantity}</span>
        </div>

        {/* Price and Cart Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Price</span>
            <span className="block text-2xl font-bold text-blue-600">£{salesprice}</span>
          </div>
          <button 
            className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}