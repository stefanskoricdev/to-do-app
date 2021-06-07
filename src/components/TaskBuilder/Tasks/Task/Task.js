import styles from "./Task.module.scss";
import iconCross from "../../../../assets/images/icon-cross.svg";

const task = (props) => {
  return (
    <li
      className={
        !props.checked
          ? styles.Task
          : [styles.Task, styles["Checked"]].join(" ")
      }
    >
      <button id={props.id} onClick={props.checkTask}></button>
      <p>{props.newTask}</p>
      <img
        id={props.id}
        onClick={props.deleteTask}
        src={iconCross}
        alt="icon-cross"
      ></img>
    </li>
  );
};
export default task;
