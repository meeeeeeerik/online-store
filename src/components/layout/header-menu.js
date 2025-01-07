import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";

export function HeaderMenu({ onMenuItemClick }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading || !categories) {
    return null;
  }

  return categories.map((category) => (
    <li key={category} className="p-5 max-[400px]:p-3">
      <NavLink
        onClick={onMenuItemClick}
        to={`products/${category}`}
        className="p-2 text-lg rounded-md transition-all duration-300 hover:bg-gray-200 max-[350px]:text-base"
      >
        {category[0].toUpperCase() + category.slice(1)}
      </NavLink>
    </li>
  ));
}
