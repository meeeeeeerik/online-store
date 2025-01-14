import { Link } from "react-router-dom";
import { ReactComponent as Facebook } from "@/ui/svg/icon-facebook.svg";
import { ReactComponent as Instagram } from "@/ui/svg/icon-instagram.svg";
import { ReactComponent as Github } from "@/ui/svg/icon-github.svg";
import { ReactComponent as Tg } from "@/ui/svg/icon-telegram.svg";

export function Footer() {
  return (
    <footer className="bg-zinc-100 mt-auto pt-10 pb-5">
      <div className="container mx-auto px-5">
        <h3 className="mb-5 text-center text-2xl">Follow us on</h3>
        <ul className="flex items-center justify-center gap-4 mb-5">
          <li className="hover:scale-125 transition-all duration-300">
            <Link
              to="https://www.facebook.com/profile.php?id=100053358588555"
              target="_blank"
            >
              <Facebook className="w-10 h-10 max-md:w-8 max-md:h-8" />
            </Link>
          </li>
          <li className="hover:scale-125 transition-all duration-300">
            <Link to="https://t.me/meeeeeeerik" target="_blank">
              <Tg className="w-10 h-10 max-md:w-8 max-md:h-8" />
            </Link>
          </li>
          <li className="hover:scale-125 transition-all duration-300">
            <Link to="https://github.com/meeeeeeerik" target="_blank">
              <Github className="w-10 h-10 max-md:w-8 max-md:h-8" />
            </Link>
          </li>
          <li className="hover:scale-125 transition-all duration-300">
            <Link to="https://www.instagram.com/meeeeeeerik/" target="_blank">
              <Instagram className="w-10 h-10 max-md:w-8 max-md:h-8" />
            </Link>
          </li>
        </ul>
        <div className="text-center text-[12px] text-gray-500">
          © 2025 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
