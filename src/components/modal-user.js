import { useState } from "react";
import { ModalAuth } from "./modal-auth.js";
import { useAuth } from "./authContext.js";
import { ErrorAuth } from "@/ui/errorAuth.js";

export function ModalUser({ isOpen, setIsModalAuthOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const { userName, isAuthenticated, logout, error } = useAuth();

  const handleToggleModalType = (type) => {
    setModalType(type);
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setIsModalAuthOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setIsModalAuthOpen(false);
  };

  if (error) {
    return <ErrorAuth error={error} />;
  }

  if (!isOpen) return null;

  return (
    <div className="absolute -top-14 right-[75px] bg-white p-4 z-10 rounded shadow-md max-lg:hidden">
      <h2 className="text-[10px] uppercase tracking-widest w-[200px] mb-3">
        Welcome {isAuthenticated && userName ? userName : "Guest"}
      </h2>
      <div className="flex flex-col gap-3 items-start">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={() => handleOpenModal("login")}
              className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
            >
              Log In
            </button>
            <button
              onClick={() => handleOpenModal("signup")}
              className="text-zinc-400 font-thin text-sm tracking-widest hover:text-black"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <ModalAuth
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type={modalType}
          onToggle={handleToggleModalType}
        />
      )}
    </div>
  );
}
