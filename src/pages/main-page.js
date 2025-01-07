import starIcon from "./star-icon.svg";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { useFetchProducts } from "../hooks/useFetchProducts";

export function MainPage() {
  const { products, isLoading } = useFetchProducts();

  if (isLoading || !products) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-5 mt-40 mb-10 max-lg:mt-28">
      <h2 className="text-center text-3xl mb-10 max-lg:text-2xl">
        All products
      </h2>
      <div className="max-[500px]:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 grid grid-cols-5 gap-10 items-start">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="w-[200px] p-2 border-2 justify-self-center"
            >
              <div className="mb-4">
                <img
                  className="w-full h-40 justify-self-center object-contain"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div>
                <div className="line-clamp-2 mb-2 h-12 text-base">
                  {product.title}
                </div>
                <div className="mb-2 font-bold">{product.price}$</div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-2">
                    <img src={starIcon} />
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
