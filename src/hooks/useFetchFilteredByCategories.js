import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function useFetchFilteredByCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      } catch (error) {
        setError(error?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [params.category]);

  return { categories, isLoading, error };
}
