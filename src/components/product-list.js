import { Loader } from "@/ui/loader";
import { Error } from "@/ui/error";
import LazyLoad from "react-lazy-load";
import { ProductCard } from "@/components/product-card";
import { Footer } from "./layout/footer.js";

export function ProductList({ products, isLoading, error, title }) {
  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !products) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-5 mt-40 mb-10 max-lg:mt-28">
        <h2 className="title">{title}</h2>
        <div className="grid grid-cols-5 gap-10 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 max-[500]:gap-5 items-start">
          {products.map((product) => {
            return (
              <LazyLoad
                key={product.id}
                height={325}
                offset={100}
                placeholder={<Loader />}
              >
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating?.rate}
                />
              </LazyLoad>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
