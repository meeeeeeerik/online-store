import { useSearchParams } from "react-router-dom";
import { useSearchFetchProducts } from "@/hooks/useSearchFetchProducts";
import { ProductList } from "@/components/product-list";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const { products, isLoading, error } = useSearchFetchProducts(
    searchParams.get("q")
  );

  const title =
    products && products.length > 0 ? "Search Results" : "Nothing Founded";

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
      title={title}
    />
  );
}
