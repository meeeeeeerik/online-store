import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page.js";
import { Footer } from "./components/layout/footer.js";
import { Header } from "./components/layout/header.js";
import { useFetchCategoriesTitles } from "./hooks/useFetchCategoriesTitles.js";
import { SearchPage } from "./pages/search-page.js";
import { FilteredByCategoryPage } from "./pages/filtered-by-category-page.js";

export function App() {
  const { categoriesTitles, isLoading, error } = useFetchCategoriesTitles();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-custom">
        <Header
          categoriesTitles={categoriesTitles}
          isLoading={isLoading}
          error={error}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/products/:category"
            element={<FilteredByCategoryPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
