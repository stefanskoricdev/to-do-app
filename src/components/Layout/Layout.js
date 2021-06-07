import React from "react";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const layout = (props) => {
  return (
    <React.Fragment>
      <Header theme={props.theme} />
      <main
        className={
          props.theme
            ? [styles.Main, styles["Dark"]].join(" ")
            : [styles.Main, styles["Light"]].join(" ")
        }
      >
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default layout;
