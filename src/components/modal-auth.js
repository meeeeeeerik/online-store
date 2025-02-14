import { useEffect, useState } from "react";
import signUpModalImage from "@/ui/img/signup-modal.jpg";
import { ReactComponent as Logo } from "@/ui/svg/logo.svg";
import { useAuth } from "./auth-context.js";
import { PasswordInput } from "@/ui/password-input.js";
import { ErrorAuth } from "@/ui/errorAuth.js";
import { motion } from "framer-motion";

export function ModalAuth({ onClose, onToggle, type }) {
  const { signup, login } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (hasAttemptedSubmit && type === "signup") {
      if (password !== repeatPassword) {
        setErrorPassword("Passwords do not match.");
      } else {
        setErrorPassword("");
      }
    }
  }, [password, repeatPassword, hasAttemptedSubmit, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorAuth("");

    setHasAttemptedSubmit(true);

    if (type === "signup" && password !== repeatPassword) {
      setErrorPassword("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      if (type === "signup") {
        await signup(username, password);
      } else {
        await login(username, password);
      }

      onClose();
    } catch (err) {
      setErrorAuth(err.message);
    } finally {
      setIsLoading(false);
      setHasAttemptedSubmit(false);
    }
  };

  const handleToggleForms = (newType) => {
    if (errorAuth) {
      setEmail("");
      setUsername("");
      setPassword("");
      setRepeatPassword("");
      setErrorAuth("");
      setErrorPassword("");
      setHasAttemptedSubmit(false);
    }
    onToggle(newType);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="z-20 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-30 overflow-y-auto max-md:items-end"
      >
        <div
          className="bg-white max-md:flex max-md:flex-col max-md:items-end max-md:w-full max-md:rounded-t-[20px]"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between h-[625px] w-[800px] max-md:h-[75vh] max-md:w-full"
          >
            <div className="bg-white relative p-8 w-[400px] overflow-y-auto flex flex-col max-md:w-full max-md:rounded-t-[20px] items-center justify-center">
              {type === "signup" ? (
                <Logo className="opacity-50 w-28 mb-5" />
              ) : null}
              <h2 className="text-[40px] text-zinc-600 text-center title-auth mb-4">
                {type === "login"
                  ? "Good to see you again."
                  : "Create a password"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-y-4 mb-3"
              >
                {type === "signup" ? (
                  <input
                    className="pr-10 pl-2 py-3 w-full bg-gray-100 outline-none text-sm font-thin border border-transparent"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                ) : null}

                <input
                  className="pr-10 pl-2 py-3 w-full bg-gray-100 outline-none text-sm font-thin border border-transparent"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <PasswordInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  icon={true}
                  hasError={!!errorPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {type === "signup" ? (
                  <PasswordInput
                    type="password"
                    placeholder="Repeat Password"
                    icon={true}
                    value={repeatPassword}
                    hasError={!!errorPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                ) : null}

                {errorPassword ? (
                  <p className="text-red-500 text-xs">{errorPassword}</p>
                ) : null}

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
                      onClick={() => handleToggleForms("signup")}
                      className="mx-2 underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => handleToggleForms("login")}
                      className="mx-2 underline"
                    >
                      Log In
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
          </motion.div>
        </div>
      </div>

      {errorAuth ? <ErrorAuth error={errorAuth} /> : null}
    </>
  );
}
