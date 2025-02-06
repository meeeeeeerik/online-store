import { useState } from "react";
import { FormInput } from "@/ui/form-input.js";
import signUpModalImage from "@/ui/img/signup-modal.jpg";
import { ReactComponent as Logo } from "@/ui/svg/logo.svg";
import { useAuth } from "./authContext.js";

export function ModalAuth({ isOpen, onClose, onToggle, type }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.includes("@")) newErrors.email = "Invalid email format";
    if (password.length < 7)
      newErrors.password = "Password must be at least 7 characters";
    if (type === "signup" && password !== repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      if (type === "signup") {
        const response = await register(username, password);
        if (!response) throw new Error("Registration failed");
      } else if (type === "login") {
        const response = await login(username, password);
        if (!response) throw new Error("Login failed");
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-30 overflow-y-auto max-md:items-end">
      <div className="bg-white max-md:flex max-md:flex-col max-md:items-end max-md:w-full max-md:bg-transparent ">
        <div className="flex justify-between h-[625px] w-[800px] max-md:h-[95vh] max-md:w-full">
          <div className="bg-white relative p-8 w-[400px] overflow-y-auto flex flex-col max-md:w-full max-md:rounded-t-[20px] items-center justify-center">
            {type === "signup" && <Logo className="opacity-50 w-28 mb-5" />}
            <h2 className="text-[40px] text-zinc-600 text-center title-auth mb-4">
              {type === "login"
                ? "Good to see you again."
                : "Create a password"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-y-4 mb-3"
            >
              <FormInput
                type="email"
                placeholder="Email"
                icon=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hasError={!!errors.email}
              />
              <FormInput
                type="text"
                placeholder="Username"
                icon=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="Password"
                value={password}
                icon="eye"
                onChange={(e) => setPassword(e.target.value)}
                hasError={!!errors.password}
              />
              {type === "signup" && (
                <FormInput
                  type="password"
                  placeholder="Repeat Password"
                  icon="eye"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  hasError={!!errors.repeatPassword}
                />
              )}
              <button
                className={`text-sm p-3 uppercase ${
                  isLoading ? "bg-gray-400" : "bg-zinc-800"
                } text-white`}
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : type === "login"
                  ? "Log In"
                  : "Sign Up"}
              </button>
            </form>
            <div className="text-center text-xs">
              {type === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => onToggle("signup")}
                    className="mx-2 underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => onToggle("login")}
                    className="mx-2 underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
            <button
              className="absolute top-4 right-3 text-3xl font-thin text-white max-md:text-black max-md:right-6"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="w-[400px] relative max-md:hidden">
            <img
              className="w-full h-full"
              src={signUpModalImage}
              alt="sign-up-image"
            />
            <button
              className="absolute top-4 right-3 text-3xl font-thin text-white"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
