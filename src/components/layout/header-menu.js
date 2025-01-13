import { NavLink } from "react-router-dom";
import { useFetchCategoriesTitles } from "@/hooks/useFetchCategoriesTitles";

export function HeaderMenu({ onMenuItemClick }) {
  const { categoriesTitles, isLoading } = useFetchCategoriesTitles();

  if (isLoading || !categoriesTitles) {
    return null;
  }

  return categoriesTitles.map((categoryTitle) => (
    <li key={categoryTitle} className="p-5 max-[400px]:p-3">
      <NavLink
        onClick={onMenuItemClick}
        to={`products/${categoryTitle}`}
        className="p-2 text-lg rounded-md transition-all duration-300 hover:bg-gray-200 max-[350px]:text-base"
      >
        {categoryTitle[0].toUpperCase() + categoryTitle.slice(1)}
      </NavLink>
    </li>
  ));
}
