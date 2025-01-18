import { useFetchFilteredByCategories } from "@/hooks/useFetchFilteredByCategories";
import { useParams } from "react-router-dom";
import { ProductList } from "@/components/layout/product-list";

export function FilteredByCategoryPage() {
  const params = useParams();
  const { categories, isLoading, error } = useFetchFilteredByCategories();

  return (
    <ProductList
      products={categories}
      isLoading={isLoading}
      error={error}
      title={params.category[0].toUpperCase() + params.category.slice(1)}
    />
  );
}
