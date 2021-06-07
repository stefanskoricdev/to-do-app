import React from "react";
import Layout from "./components/Layout/Layout";
import TaskBuilder from "./components/TaskBuilder/TaskBuilder";
import useThemeModeSwitch from "./customHooks/useThemeModeSwitch";

const App = () => {
  const [darkTheme, changeThemeHandler] = useThemeModeSwitch();

  return (
    <Layout theme={darkTheme}>
      <TaskBuilder theme={darkTheme} changeTheme={changeThemeHandler} />
    </Layout>
  );
};

export default App;
