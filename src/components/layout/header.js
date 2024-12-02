import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 right-0 bottom-0 left-0">
      <div className="border-gray-300 border-b">
        <div className="container mx-auto px-5 flex justify-between items-center h-16">
          <Link to="#">
            <svg
              width="128"
              height="14px"
              className="styles_everlane-logo__wuaiF"
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

          <div className="flex justify-between items-center gap-3 max-[340px]:gap-1">
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
          </div>
        </div>
      </div>

      <div className="border-gray-300 border-b">
        <nav className="py-5 flex justify-center container mx-auto px-5">
          <ul className="flex flex-wrap justify-center items-center gap-5">
            <li>
              <Link
                to="#"
                className="text-lg p-2 rounded-md transition-all duration-300 hover:bg-gray-200"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-lg p-2 rounded-md transition-all duration-300 hover:bg-gray-200"
              >
                Jewelry
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-lg p-2 rounded-md transition-all duration-300 hover:bg-gray-200"
              >
                Men&apos;s clothing
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-lg p-2 rounded-md transition-all duration-300 hover:bg-gray-200"
              >
                Women&apos;s clothing
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
