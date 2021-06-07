import styles from "./TaskBuilderHeader.module.scss";
import iconSun from "../../../assets/images/icon-sun.svg";
import iconMoon from "../../../assets/images/icon-moon.svg";

const taskBuilderHeader = (props) => {
  return (
    <header className={styles.TaskBuilderHeader}>
      <h1>TODO</h1>
      {props.theme ? (
        <img onClick={props.changeTheme} src={iconMoon} alt="icon-moon"></img>
      ) : (
        <img onClick={props.changeTheme} src={iconSun} alt="icon-sun"></img>
      )}
    </header>
  );
};
export default taskBuilderHeader;
