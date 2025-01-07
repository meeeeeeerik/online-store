import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "./pages/category-page";
import { MainPage } from "./pages/main-page";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
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
