import { Button } from "@/ui/button";
import { Loader } from "@/ui/loader";
import { Error } from "@/ui/error";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useParams } from "react-router-dom";
import { ReactComponent as StarIcon } from "@/ui/svg/icon-star.svg";
import { useState } from "react";

export function CategoryPage() {
  const params = useParams();
  const { categories, isLoading, error } = useFetchCategories();
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !categories) {
    return <Loader />;
  }

  const handleImageLoad = (id) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="container mx-auto px-5 mt-40 max-lg:mt-28 mb-10">
      <h2 className="text-center text-3xl mb-10 max-lg:text-2xl">
        {params.category[0].toUpperCase() + params.category.slice(1)}
      </h2>
      <div className="max-[500px]:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 grid grid-cols-5 gap-10 items-start">
        {categories.map((category) => {
          const isImageLoading = imageLoadingStates[category.id] !== false;

          return (
            <div
              key={category.id}
              className="w-[200px] p-2 border-2 justify-self-center"
            >
              <div className="mb-4">
                {isImageLoading && (
                  <div className="w-full h-40 bg-zinc-100 rounded-md"></div>
                )}
                <img
                  className={`w-full h-40 justify-self-center object-contain ${
                    isImageLoading ? "hidden" : "block"
                  }`}
                  src={category.image}
                  alt={category.title}
                  onLoad={() => handleImageLoad(category.id)}
                  onError={() => handleImageError(category.id)} // Обработка ошибок
                />
              </div>
              <div>
                <div className="line-clamp-2 mb-2 h-12 text-base">
                  {category.title}
                </div>
                <div className="mb-2 font-bold">{category.price}$</div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    <div className="text-blue-400">{category.rating.rate}</div>
                  </div>
                </div>
                <Button />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
