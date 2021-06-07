import { useEffect, useState } from "react";

const useThemeModeSwitch = () => {
  const [darkTheme, setTheme] = useState(getMode);
  function getMode() {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    return savedTheme || false;
  }
  const changeThemeHandler = () => {
    setTheme(!darkTheme);
  };
  useEffect(() => {
    localStorage.setItem("theme", darkTheme); //This executes if darkTheme value changes!
  }, [darkTheme]);
  return [darkTheme, changeThemeHandler];
};

export default useThemeModeSwitch;
