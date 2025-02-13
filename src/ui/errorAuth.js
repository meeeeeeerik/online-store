import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ErrorAuth({ error }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!error) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: `105%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-72 bg-red-700 rounded-lg text-white py-3 pl-8 pr-10 fixed bottom-5 right-3 ml-auto z-30"
          data-error
        >
          <span className="line-clamp-5">{error}</span>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 w-6 h-6 cursor-pointer hover:opacity-70"
          >
            <svg height="100%" viewBox="0 0 24 24" width="100%">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="#fff"
              ></path>
            </svg>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
