import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductList } from "@/components/layout/product-list";

export function MainPage() {
  const { products, isLoading, error } = useFetchProducts();

  return (
    <ProductList
      products={products}
      isLoading={isLoading}
      error={error}
      title="All products"
    />
  );
}
