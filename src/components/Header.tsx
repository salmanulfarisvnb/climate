import { useTheme } from "@/context/themeProvider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-7">
        <Link to={"/"}>
          <img
            src={`${isDark ? "/logo.png" : "/logo2.png"}`}
            className="h-14"
            alt="climate Logo"
          />
        </Link>
        <div>
          {/* SearchBar */}
          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center transition-transform duration-500 cursor-pointer ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="text-yellow-300 transition-all rotate-0" />
            ) : (
              <Moon className="text-blue-400 transition-all rotate-0" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
