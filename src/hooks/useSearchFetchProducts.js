import { useEffect, useState } from "react";

export function useSearchFetchProducts(query) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;

      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(`https://fakestoreapi.com/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();

        const filteredProducts = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (error) {
        setError(error?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, isLoading, error };
}
