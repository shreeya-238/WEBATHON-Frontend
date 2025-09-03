import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

// Get image path from public directory
const getImagePath = (category, index) => {
  const letters = ['a', 'b', 'c'];
  return `/images/category${category}-${letters[index]}.png`;
};

// Client success stories focusing on sustainability and trust achievements
const storiesData = [
  {
    id: 1,
    title: "EcoPack Solutions: 100% Biodegradable Packaging",
    description: "EcoPack revolutionized their packaging by transitioning to 100% biodegradable materials, eliminating 2.3 million pounds of plastic waste annually. Their commitment to sustainability earned them the 'Green Innovator of the Year' award and a 40% increase in eco-conscious customers.",
    images: [
      getImagePath(1, 0),
      getImagePath(1, 1),
      getImagePath(1, 2)
    ]
  },
  {
    id: 2,
    title: "GreenGrocer: Carbon-Neutral Grocery Chain",
    description: "By implementing a comprehensive sustainability program, GreenGrocer achieved carbon-neutral operations across all 150+ stores. Their initiatives include 100% renewable energy usage, zero-waste stores, and a farm-to-table supply chain, reducing their carbon footprint by 78% in just two years.",
    images: [
      getImagePath(2, 0),
      getImagePath(2, 1),
      getImagePath(2, 2)
    ]
  },
  {
    id: 3,
    title: "FreshHarvest: 40% Waste Reduction Through Innovation",
    description: "FreshHarvest's AI-powered inventory system reduced food waste by 40% in their first year, saving over 1.2 million pounds of food from landfills. Their innovative approach to supply chain management has been adopted by major retailers nationwide, creating a ripple effect in the industry.",
    images: [
      getImagePath(3, 0),
      getImagePath(3, 1),
      getImagePath(3, 2)
    ]
  },
  {
    id: 4,
    title: "SunnyMart: Solar-Powered Retail Revolution",
    description: "SunnyMart became the first major retailer to operate entirely on solar energy, installing over 50,000 solar panels across their locations. Their commitment to renewable energy has inspired a wave of green initiatives in the retail sector, proving that sustainability and profitability can go hand in hand.",
    images: [
      getImagePath(4, 0),
      getImagePath(4, 1),
      getImagePath(4, 2)
    ]
  },
  {
    id: 5,
    title: "PureHome: Most Trusted Eco-Conscious Brand 2023",
    description: "Recognized as the most trusted eco-conscious home goods brand, PureHome achieved 98% customer satisfaction through complete transparency in sourcing and manufacturing. Their chemical-free products and sustainable practices have set new benchmarks in the home care industry.",
    images: [
      getImagePath(5, 0),
      getImagePath(5, 1),
      getImagePath(5, 2)
    ]
  }
];

// Component to display images in a carousel
const ImageCarousel = ({ query, images }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filter out any empty or invalid image paths
    const validImages = images.filter(img => img);
    
    // Preload images
    const loadImages = async () => {
      setLoading(true);
      const imagePromises = validImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve({ src, status: 'loaded' });
          img.onerror = () => resolve({ src, status: 'error' });
        });
      });

      const results = await Promise.all(imagePromises);
      const successfullyLoaded = results
        .filter(result => result.status === 'loaded')
        .map(result => result.src);
      
      setLoadedImages(successfullyLoaded);
      setLoading(false);
    };

    loadImages();
  }, [images]);

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="animate-pulse text-gray-400">Loading images...</div>
        </div>
      </div>
    );
  }

  if (loadedImages.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-2xl font-semibold text-gray-700">{query}</div>
          <div className="text-gray-500">No images available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-50">
      <Splide
        options={{
          type: 'loop',
          gap: '1rem',
          autoplay: true,
          pauseOnHover: false,
          resetProgress: false,
          arrows: window.innerWidth > 768,
          pagination: true,
          rewind: true,
        }}
        className="h-full w-full"
      >
        {loadedImages.map((img, index) => (
          <SplideSlide key={index}>
            <div className="w-full h-full flex items-center justify-center bg-white">
              <div className="relative w-full h-full">
                <img 
                  src={img} 
                  alt={`${query} - Image ${index + 1}`}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const container = e.target.parentNode;
                    container.innerHTML = `
                      <div class="absolute inset-0 flex items-center justify-center p-4">
                        <div class="text-center bg-white/80 p-4 rounded-lg">
                          <div class="text-xl font-medium text-gray-600">Image not available</div>
                        </div>
                      </div>
                    `;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="text-white text-center">
                    <div className="text-lg font-semibold">{query}</div>
                    <div className="text-sm opacity-80">Image {index + 1} of {loadedImages.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

// Individual Story Component
const Story = ({ story, isReversed = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 md:mb-24 ${isReversed ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`flex flex-col md:flex-row gap-8 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{story.title}</h2>
              <p className="text-gray-600">{story.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Image Carousel */}
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageCarousel 
              query={story.imageQuery || story.title}
              images={story.images}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Stories Page
const Stories = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Success Stories</h1>
          <p className="text-xl text-gray-600">Discover how we're making a difference</p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {storiesData.map((story, index) => (
            <Story 
              key={story.id} 
              story={story} 
              isReversed={index % 2 !== 0} // Alternate layout for each story
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
