import useTheme from "../../Hooks/useTheme";

export default function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
    </button>
  );
}