import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderMenu } from "./header-menu";

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
            <svg
              width="128px"
              height="14px"
              className="styles_everlane-logo__wuaiF max-[400px]:w-24"
              viewBox="0 0 128 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M116.776 0V14H127.933V11.2198H119.6V8.38015H127.032V5.61985H119.6V2.78015H127.933V0H116.776ZM108.221 0V9.45982L101.311 0H98.5062V14H101.311V4.54018L108.222 14H111.066V0H108.222H108.221ZM86.0055 0L80.3766 14H83.3211L84.4828 11.1397H90.2922L91.4341 14H94.4191L88.7902 0H86.0055ZM87.3875 3.7201L89.2307 8.48018H85.5046L87.3875 3.7201ZM67.1754 0V14H77.3717V11.2198H69.9998V0H67.1754ZM52.4714 2.71982V5.70003H57.6201C58.4017 5.70003 59.0625 5.09986 59.0625 4.22024C59.0625 3.34063 58.4216 2.71982 57.6201 2.71982H52.4714ZM58.7619 14L55.396 8.38015H52.4714V14H49.647V0H57.6201C60.0238 0 61.867 1.74018 61.867 4.17976C61.867 6.35974 60.4651 7.9197 58.5019 8.28012L61.9672 14H58.7619ZM32.9201 0V14H44.0785V11.2198H35.7453V8.38015H43.1776V5.61985H35.7453V2.78015H44.0785V0H32.9201ZM26.1494 0L22.1227 10.1997L18.0753 0H15.0307L20.6596 14H23.484L29.1336 0H26.1486H26.1494ZM0.0865293 0L0.0666504 14H11.245V11.2198H2.91092V8.38015H10.3432V5.61985H2.91092V2.78015H11.2442V0H0.0865293Z"
                fill="black"
              ></path>
            </svg>
          </Link>

          <div className="flex justify-between items-center gap-3 max-[400px]:gap-1">
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="search_svg__feather search_svg__feather-search everlane-icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </Link>
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="user_svg__feather user_svg__feather-user everlane-icon"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <Link
              to="#"
              className="p-3 max-[340px]:p-2 flex justify-center items-center rounded-md transition-all duration-100 hover:bg-gray-200"
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cart_svg__feather cart_svg__feather-shopping-cart everlane-icon"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
              </svg>
            </Link>
            <button
              className="hidden hover:bg-gray-200 max-[1024px]:flex justify-center items-center rounded-md transition-all duration-100"
              onClick={toggleNavbar}
            >
              {isOpen ? (
                <span className="p-[9.5px]">
                  <svg
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="x_svg__feather x_svg__feather-x everlane-icon"
                  >
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </span>
              ) : (
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  className="hamburger"
                >
                  <path
                    d="M14 20.5H26"
                    stroke="#161912"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14 16.5H26"
                    stroke="#161912"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14 24.5H26"
                    stroke="#161912"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-100 border-b max-[1024px]:hidden">
        <nav className="flex justify-center container mx-auto">
          <ul className="flex flex-wrap justify-center items-center gap-5">
            <HeaderMenu />
          </ul>
        </nav>
      </div>

      {isOpen ? (
        <ul className="bg-zinc-100 -z-10 h-screen w-2/3 flex flex-col items-end gap-5 transition-all duration-500 absolute right-0 top-16 bottom-0 p-3">
          <HeaderMenu onMenuItemClick={closeNavbar} />
        </ul>
      ) : (
        <ul className="bg-zinc-100 -z-10 h-screen w-2/3 flex flex-col items-end gap-5 transition-all duration-500 absolute top-16 bottom-0 p-3 -right-full">
          <HeaderMenu onMenuItemClick={closeNavbar} />
        </ul>
      )}
    </header>
  );
}
