import { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function ThemeButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        currentTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
      className={className}
    >
      {currentTheme === "dark" ? (
        <FontAwesomeIcon
          icon={faSun as IconProp}
          className="w-4 h-4 text-gray-400"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon as IconProp}
          className="w-4 h-4 text-blue-500"
        />
      )}
    </button>
  );
}
