import { ReactComponent as EyeIcon } from "@/ui/svg/icon-eye.svg";
import { ReactComponent as EyeOffIcon } from "@/ui/svg/icon-eye-off.svg";
import { useState } from "react";

export function PasswordInput({ type, icon, hasError, ...props }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={isShowPassword ? "text" : type}
        className={`pr-10 pl-2 py-3 w-full bg-gray-100 outline-none text-sm font-thin ${
          hasError ? "border border-red-500" : "border border-transparent"
        }`}
        required
        minLength={type === "password" ? 5 : ""}
        {...props}
      />
      {icon ? (
        <button onClick={togglePasswordVisibility} type="button">
          {isShowPassword ? (
            <EyeOffIcon className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer" />
          ) : (
            <EyeIcon className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer" />
          )}
        </button>
      ) : null}
    </div>
  );
}
