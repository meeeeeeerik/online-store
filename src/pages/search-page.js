import { useSearchParams } from "react-router-dom";
import { useSearchFetchProducts } from "@/hooks/useSearchFetchProducts";
import { ProductList } from "@/components/layout/product-list";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const { products, isLoading, error } = useSearchFetchProducts(
    searchParams.get("q")
  );

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
      title={"Search Results"}
    />
  );
}
