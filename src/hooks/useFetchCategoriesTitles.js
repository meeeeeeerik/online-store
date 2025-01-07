import { useEffect, useState } from "react";

export function useFetchCategoriesTitles() {
  const [categoriesTitles, setCategoriesTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategoriesTitles = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategoriesTitles(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesTitles();
  }, []);

  return { categoriesTitles, isLoading };
}
