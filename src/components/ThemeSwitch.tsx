"use client";

import { useEffect, useState } from "react";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const onSwitch = () => {
    setTheme(!theme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      className={`flex items-center justify-center w-12 h-12 text-[#222] dark:text-white rounded-full bg-white dark:bg-[#131823] transition-all ${
        className ?? ""
      }`}
      onClick={onSwitch}
    >
      {theme ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 1 0 0 11Zm-5.657.157a.75.75 0 0 1 0 1.06l-1.768 1.768a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.767-1.768a.75.75 0 0 1 1.061 0ZM3.515 3.515a.75.75 0 0 1 1.06 0l1.768 1.768a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L3.515 4.575a.75.75 0 0 1 0-1.06ZM12 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 12 0ZM4 12a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 12Zm8 8a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 12 20Zm12-8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 24 12Zm-6.343 5.657a.75.75 0 0 1 1.06 0l1.768 1.768a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-1.768-1.767a.75.75 0 0 1 0-1.061Zm2.828-14.142a.75.75 0 0 1 0 1.06l-1.768 1.768a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l1.767-1.768a.75.75 0 0 1 1.061 0Z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.768 3.96v.001l-.002-.005a9.08 9.08 0 0 0-.218-.779c-.13-.394.21-.8.602-.67.29.096.575.205.855.328l.01.005A10.002 10.002 0 0 1 12 22a10.002 10.002 0 0 1-9.162-5.985l-.004-.01a9.722 9.722 0 0 1-.329-.855c-.13-.392.277-.732.67-.602.257.084.517.157.78.218l.004.002A9 9 0 0 0 14.999 6a9.09 9.09 0 0 0-.231-2.04ZM16.5 6c0 5.799-4.701 10.5-10.5 10.5-.426 0-.847-.026-1.26-.075A8.5 8.5 0 1 0 16.425 4.74c.05.413.075.833.075 1.259Z"></path>
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitch;
