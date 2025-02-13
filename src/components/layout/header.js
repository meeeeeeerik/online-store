import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "@/ui/svg/logo.svg";
import { ReactComponent as SearchIcon } from "@/ui/svg/icon-search.svg";
import { ReactComponent as ProfileIcon } from "@/ui/svg/icon-profile.svg";
import { ReactComponent as CartIcon } from "@/ui/svg/icon-cart.svg";
import { ReactComponent as CloseIcon } from "@/ui/svg/icon-close.svg";
import { ReactComponent as BurgerMenuIcon } from "@/ui/svg/icon-burger-menu.svg";
import { Error } from "@/ui/error.js";
import { Input } from "@/ui/input";
import { ModalUser } from "../modal-user.js";
import { ModalAuth } from "../modal-auth.js";
import { MobileMenu } from "../mobile-menu.js";
import { AnimatePresence } from "framer-motion";

export function Header({ categoriesTitles, isLoading, error }) {
  const navigate = useNavigate();
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleToggleModalType = (type) => {
    setModalType(type);
  };

  const handleOpenModalAuth = (type) => {
    setModalType(type);
    setIsModalAuthOpen(true);
  };

  const handleCloseModal = () => {
    setModalType("");
    setIsModalAuthOpen(false);
  };

  const toggleModalUser = () => {
    setIsModalUserOpen((prevState) => !prevState);
  };

  const onCloseModalUserMouseLeave = () => {
    if (!isModalAuthOpen) {
      setIsModalUserOpen(false);
    }
  };

  const onSearchInputChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (value) {
        navigate(`/search?q=${value}`);
      } else {
        navigate("/");
      }
    }, 1000);

    setDebounceTimeout(timeoutId);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  const toggleNavbar = () => {
    setIsOpenNavbar(!isOpenNavbar);
  };

  const toggleSearch = () => {
    if (isOpenSearch) {
      setSearchValue("");
      setIsOpenSearch(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setIsOpenSearch(true);
    }
  };

  const closeNavbar = () => {
    setIsOpenNavbar(false);
  };

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading || !categoriesTitles) {
    return null;
  }

  return (
    <>
      <header
        onMouseLeave={onCloseModalUserMouseLeave}
        className="fixed top-0 right-0 left-0 bg-white z-10"
      >
        <div className="border-gray-300 border-b z-10">
          <div className="container mx-auto px-5 flex justify-between items-center h-14">
            <Link to="/" className="mr-2">
              <Logo className="logo" />
            </Link>

            <div className="header-buttons-container">
              <div
                className={`input-transition ${
                  isOpenSearch ? "input-transition-enter" : ""
                }`}
              >
                <Input value={searchValue} onChange={onSearchInputChange} />
              </div>
              <button
                onClick={toggleSearch}
                className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
              >
                {isOpenSearch ? (
                  <CloseIcon className="w-4 h-4" />
                ) : (
                  <SearchIcon />
                )}
              </button>
              <button
                onClick={toggleModalUser}
                className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200 active:bg-gray-300 max-lg:hidden"
              >
                <ProfileIcon />
              </button>
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
                {isOpenNavbar ? (
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

        <div className="bg-white border-b max-lg:hidden">
          <nav className="flex justify-center container mx-auto">
            <ul className="flex flex-wrap justify-center items-center gap-5">
              {categoriesTitles.map((categoryTitle) => (
                <li key={categoryTitle} className="p-4 max-[400px]:p-3">
                  <NavLink
                    to={`products/${categoryTitle}`}
                    className="p-2 text-xs rounded-md transition-all duration-300 hover:bg-gray-100 max-[350px]:text-base"
                  >
                    {categoryTitle[0].toUpperCase() + categoryTitle.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <MobileMenu
          isOpenNavbar={isOpenNavbar}
          categoriesTitles={categoriesTitles}
          closeNavbar={closeNavbar}
          handleOpenModalAuth={handleOpenModalAuth}
        />

        <AnimatePresence>
          {isModalAuthOpen ? (
            <ModalAuth
              onClose={handleCloseModal}
              type={modalType}
              onToggle={handleToggleModalType}
            />
          ) : null}
        </AnimatePresence>

        {isModalUserOpen ? (
          <div className="container relative mx-auto">
            <ModalUser handleOpenModalAuth={handleOpenModalAuth} />
          </div>
        ) : null}
      </header>
    </>
  );
}
