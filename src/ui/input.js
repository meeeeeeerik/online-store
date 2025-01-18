export function Input(props) {
  return (
    <input
      type="text"
      placeholder="Search"
      className={`w-full transition-all duration-500 outline-none bg-transparent border-b h-10 px-2 border-black max-sm:text-sm`}
      {...props}
    />
  );
}
