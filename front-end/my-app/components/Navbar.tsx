"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
        Dashboard
      </h2>
      <div className="flex gap-4 items-center">
        <Bell className="w-5 h-5 text-zinc-500 cursor-pointer" />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
