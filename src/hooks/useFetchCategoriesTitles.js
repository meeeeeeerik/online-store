import { useEffect, useState } from "react";

export function useFetchCategoriesTitles() {
  const [categoriesTitles, setCategoriesTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoriesTitles = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories titles");
        }
        const data = await res.json();
        setCategoriesTitles(data);
      } catch (error) {
        setError(error?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesTitles();
  }, []);

  return { categoriesTitles, isLoading, error };
}
