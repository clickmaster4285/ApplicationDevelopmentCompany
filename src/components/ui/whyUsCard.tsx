// components/ui/travel-route-card.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props for the component
interface TravelRouteCardProps {
  title: string;
  author: string;
  distance: string;
  initialLikes: number;
  imageUrl: string;
  className?: string;
}

// Helper for formatting large numbers
const formatLikes = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const TravelRouteCard: React.FC<TravelRouteCardProps> = ({
  title,
  author,
  distance,
  initialLikes,
  imageUrl,
  className,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={cn(
        'relative w-full max-w-md h-68 rounded-2xl overflow-hidden text-white shadow-lg flex items-end isolate',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <img src={imageUrl} alt="Route map" className="w-full h-full object-cover" />
      </div>
      
      {/* Half-card black blur background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/5 backdrop-blur-md" />
      
      {/* Main Content Grid */}
      <div className="relative z-10 w-full p-6">
        <div className="w-full grid grid-cols-3 gap-4 items-end">
          {/* Left Section: Info & Likes */}
          <div className="col-span-2 flex flex-col justify-end">
            <div className="space-y-2">
              <motion.h2 variants={itemVariants} className="text-xl font-bold leading-tight text-white">
                {title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm text-white/80">
                {author}
              </motion.p>
             
            </div>
          </div>
          
       
        </div>
      </div>
    </motion.div>
  );
};