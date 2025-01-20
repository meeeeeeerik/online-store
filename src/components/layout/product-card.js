import { Button } from "@/ui/button";
import { ReactComponent as StarIcon } from "@/ui/svg/icon-star.svg";
import { useState } from "react";

export function ProductCard({ image, title, price, rating }) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="card">
      <div className="mb-4">
        {isImageLoading && (
          <div className="w-full h-40 max-lg:h-20 bg-zinc-100 rounded-md"></div>
        )}
        <img
          className={`w-full h-40 max-lg:h-32 object-contain ${
            isImageLoading ? "hidden" : "block"
          }`}
          src={image}
          alt={title || "Product image"}
          onLoad={() => handleImageLoad}
          onError={() => handleImageError}
        />
      </div>
      <div>
        <div className="line-clamp-2 mb-2 h-8 text-xs">{title}</div>
        <div className="mb-2 font-bold text-xs">{price}$</div>
        <div className="flex items-center gap-5 mb-5">
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5" />
            <div className="text-blue-400 text-xs">{rating}</div>
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
}
