import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
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

  return { categories, isLoading };
}
