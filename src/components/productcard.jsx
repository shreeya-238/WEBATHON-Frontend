import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { 
    id, 
    name, 
    price, 
    image_url, 
    brand,
    avg_overall_rating, 
    total_reviews,    
    risk_score,       
    made_in_india,    
    eco_friendly,
    FSSAI_certified,
  } = product;

  const safetyScore = Math.round(100 - (risk_score * 10));

  const tags = [];
  if (made_in_india) tags.push('Made in India');
  if (eco_friendly) tags.push('Eco-Friendly');
  if (FSSAI_certified) tags.push('FSSAI Certified');
  if (product.subcategory) tags.push(product.subcategory); 

  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };
  const getSafetyLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    return 'Fair';
  };

  const displayImage = image_url && image_url.startsWith('http')
    ? image_url
    : `https://picsum.photos/seed/${id}/400/300`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden group h-full flex flex-col">
    
      <div className="relative aspect-square overflow-hidden">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute bottom-2 left-2">
          <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${getSafetyColor(safetyScore)}`}>
            Safety: {safetyScore}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{brand}</p> 
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${ i < Math.floor(avg_overall_rating) ? 'text-yellow-400' : 'text-gray-300' }`} /* ... */ >
            </svg>
          ))}
          <span className="text-sm text-gray-600 ml-2">{avg_overall_rating.toFixed(1)} ({total_reviews})</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
      
        <div className="flex-grow" /> 
        
        <div className="text-lg font-bold text-gray-900 mt-2">
          ₹{price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;