import { NavLink } from "react-router-dom";
import { useAuth } from "./auth-context.js";

export function MobileMenu({
  isOpenNavbar,
  categoriesTitles,
  closeNavbar,
  handleOpenModalAuth,
}) {
  const { userName, logout } = useAuth();
  return (
    <div
      className={`
    bg-zinc-50 -z-10 min-h-screen overflow-y-auto w-3/4 flex flex-col items-end 
    transition-all duration-500 absolute top-14 bottom-0 p-3 pb-16 lg:hidden
    ${isOpenNavbar ? "right-0" : "-right-full"}
  `}
    >
      {categoriesTitles.map((categoryTitle) => (
        <li key={categoryTitle} className="p-5 max-[400px]:p-3 list-none">
          <NavLink
            onClick={closeNavbar}
            to={`products/${categoryTitle}`}
            className="menu-list"
          >
            {categoryTitle[0].toUpperCase() + categoryTitle.slice(1)}
          </NavLink>
        </li>
      ))}
      <hr className="border-zinc-300 border-y-[1px] w-full mb-5" />
      <div className="flex flex-col items-end">
        <h2 className="text-[10px] uppercase tracking-widest w-[200px] mb-3 text-right">
          Welcome {userName ? userName : "Guest"}
        </h2>
        {userName ? (
          <button
            onClick={logout}
            className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                handleOpenModalAuth("login");
                closeNavbar();
              }}
              className="text-zinc-800 font-thin text-sm tracking-widest mb-4 hover:text-black"
            >
              Log In
            </button>

            <button
              onClick={() => {
                handleOpenModalAuth("signup");
                closeNavbar();
              }}
              className="text-zinc-800 font-thin text-sm tracking-widest hover:text-black"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
