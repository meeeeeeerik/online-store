import { useEffect, useState } from "react";

export function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, isLoading };
}
