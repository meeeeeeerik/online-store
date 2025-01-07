import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderMenu } from "./header-menu";
import { ReactComponent as Logo } from "../../ui/svg/logo.svg";
import { ReactComponent as SearchIcon } from "../../ui/svg/icon-search.svg";
import { ReactComponent as ProfileIcon } from "../../ui/svg/icon-profile.svg";
import { ReactComponent as CartIcon } from "../../ui/svg/icon-cart.svg";
import { ReactComponent as CloseIcon } from "../../ui/svg/icon-close.svg";
import { ReactComponent as BurgerMenuIcon } from "../../ui/svg/icon-burger-menu.svg";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-zinc-100">
      <div className="border-gray-300 border-b z-10">
        <div className="container mx-auto px-5 flex justify-between items-center h-16">
          <Link to="/" className="">
            <Logo className="max-[400px]:w-24" />
          </Link>

          <div className="flex justify-between items-center gap-3 max-[400px]:gap-1">
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <SearchIcon />
            </Link>
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <ProfileIcon />
            </Link>
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <CartIcon />
            </Link>
            <button
              className="hidden hover:bg-gray-200 max-lg:flex justify-center items-center rounded-md transition-all duration-100"
              onClick={toggleNavbar}
            >
              {isOpen ? (
                <span className="p-[9.5px]">
                  <CloseIcon />
                </span>
              ) : (
                <BurgerMenuIcon />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-100 border-b max-lg:hidden">
        <nav className="flex justify-center container mx-auto">
          <ul className="flex flex-wrap justify-center items-center gap-5">
            <HeaderMenu />
          </ul>
        </nav>
      </div>

      <ul
        className={`
    bg-zinc-100 -z-10 h-screen w-2/3 flex flex-col items-end gap-5 
    transition-all duration-500 absolute top-16 bottom-0 p-3 
    ${isOpen ? "right-0" : "-right-full"}
  `}
      >
        <HeaderMenu onMenuItemClick={closeNavbar} />
      </ul>
    </header>
  );
}
