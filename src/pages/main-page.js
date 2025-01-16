import { ReactComponent as StarIcon } from "@/ui/svg/icon-star.svg";
import { Button } from "@/ui/button";
import { Loader } from "@/ui/loader";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { Error } from "@/ui/error";
import { useState } from "react";

export function MainPage() {
  const { products, isLoading, error } = useFetchProducts();
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !products) {
    return <Loader />;
  }

  const handleImageLoad = (id) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id) => {
    setImageLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="container mx-auto px-5 mt-40 mb-10 max-lg:mt-28">
      <h2 className="text-center text-3xl mb-10 max-lg:text-2xl">
        All products
      </h2>
      <div className="max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 grid grid-cols-5 gap-10 max-[500]:gap-5 items-start">
        {products.map((product) => {
          const isImageLoading = imageLoadingStates[product.id] !== false;

          return (
            <div key={product.id} className={"cards-wrapper"}>
              <div className="mb-4">
                {isImageLoading && (
                  <div className="w-full h-40 max-lg:h-20 bg-zinc-100 rounded-md"></div>
                )}
                <img
                  className={`w-full h-40 max-lg:h-32 justify-self-center object-contain ${
                    isImageLoading ? "hidden" : "block"
                  }`}
                  src={product.image}
                  alt={product.title}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageError(product.id)} // Обработка ошибок
                />
              </div>
              <div>
                <div className="line-clamp-2 mb-2 h-12 text-base max-[500px]:text-sm,h-10">
                  {product.title}
                </div>
                <div className="mb-2 font-bold max-[500px]:text-sm">
                  {product.price}$
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    <div className="text-blue-400">{product.rating.rate}</div>
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
