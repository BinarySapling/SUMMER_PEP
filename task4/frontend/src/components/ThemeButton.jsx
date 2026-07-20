import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current Theme: {theme}
    </button>
  );
};

export default ThemeButton;