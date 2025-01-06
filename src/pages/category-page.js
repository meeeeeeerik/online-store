import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starIcon from "./star-icon.svg";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";

export function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${params.category}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [params.category]);

  if (isLoading || !categories) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-5 mt-40 max-[1024px]:mt-28 mb-10">
      <h2 className="text-center text-3xl mb-10 max-[1024px]:text-2xl">
        {params.category[0].toUpperCase() + params.category.slice(1)}
      </h2>
      <div className="max-[500px]:grid-cols-1 max-[786px]:grid-cols-2 max-[1024px]:grid-cols-3 max-[1280px]:grid-cols-4 grid grid-cols-5 gap-10 items-start">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="w-[200px] p-2 border-2 justify-self-center"
            >
              <div className="mb-4">
                <img
                  className="w-full h-40 justify-self-center object-contain"
                  src={category.image}
                  alt={category.title}
                />
              </div>
              <div>
                <div className="line-clamp-2 mb-2 h-12 text-base">
                  {category.title}
                </div>
                <div className="mb-2 font-bold">{category.price}$</div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-2">
                    <img src={starIcon} />
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
