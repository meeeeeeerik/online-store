import { ReactComponent as EyeIcon } from "@/ui/svg/icon-eye.svg";
import { ReactComponent as EyeOffIcon } from "@/ui/svg/icon-eye-off.svg";
import { useState } from "react";

export function FormInput({
  type,
  placeholder,
  icon,
  value,
  onChange,
  hasError,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={isShowPassword ? "text" : type}
        placeholder={placeholder}
        className={`pr-10 pl-2 py-3 w-full bg-gray-100 outline-none text-sm font-thin ${
          hasError ? "border border-red-500" : "border border-transparent"
        }`}
        required
        value={value}
        onChange={onChange}
        minLength={type === "password" ? 7 : ""}
      />
      {icon && (
        <button onClick={togglePasswordVisibility} type="button">
          {isShowPassword ? (
            <EyeOffIcon className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer" />
          ) : (
            <EyeIcon className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
}
