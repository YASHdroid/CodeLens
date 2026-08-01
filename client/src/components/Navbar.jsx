import { Link, useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import Logo from "../assets/Logo.png";

function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#2F2F2F] bg-[#171717] px-8">

      {/* Logo */}
      <Link
        to="/home"
        className="flex items-center"
      >
        <img
          src={Logo}
          alt="CodeLens"
          className="h-20 w-auto object-contain select-none"
          draggable={false}
        />
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-3">

  {location.pathname === "/home" ? (
    <Link
      to="/prep"
      className="rounded-lg px-3 py-2 text-sm font-medium text-[#ECECEC] transition-all duration-200 hover:bg-[#2F2F2F] hover:text-white"
    >
      Interview Prep
    </Link>
  ) : (
    <Link
      to="/home"
      className="rounded-lg px-3 py-2 text-sm font-medium text-[#ECECEC] transition-all duration-200 hover:bg-[#2F2F2F] hover:text-white"
    >
      Home
    </Link>
  )}

  <button className="rounded-full p-1.5 transition-all duration-200 hover:bg-[#2F2F2F]">
    <CircleUserRound
      size={36}
      strokeWidth={1.8}
      className="text-[#ECECEC]"
    />
  </button>

</div>
    </header>
  );
}

export default Navbar;