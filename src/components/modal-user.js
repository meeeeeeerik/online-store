import { useAuth } from "./auth-context.js";

export function ModalUser({ handleOpenModalAuth }) {
  const { userName, logout } = useAuth();

  return (
    <div className="absolute -top-14 right-[75px] bg-white p-4 z-10 rounded shadow-md max-lg:hidden">
      <h2 className="text-[10px] uppercase tracking-widest w-[200px] mb-3">
        Welcome {userName ? userName : "Guest"}
      </h2>
      <div className="flex flex-col gap-3 items-start">
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
              onClick={() => handleOpenModalAuth("login")}
              className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
            >
              Log In
            </button>
            <button
              onClick={() => handleOpenModalAuth("signup")}
              className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
