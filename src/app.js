import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "./pages/category-page.js";
import { MainPage } from "./pages/main-page.js";
import { Footer } from "./components/layout/footer.js";
import { Header } from "./components/layout/header.js";
import { useEffect, useState } from "react";

export function App() {
  const [categoriesTitles, setCategoriesTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchCategoriesTitles = async () => {
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

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header
          categoriesTitles={categoriesTitles}
          isLoading={isLoading}
          error={error}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
