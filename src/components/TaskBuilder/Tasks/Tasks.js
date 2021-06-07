import styles from "./Tasks.module.scss";
import CreateTask from "./CreateTask/CreateTask";

const tasks = (props) => {
  return (
    <div
      className={
        props.theme ? styles.Tasks : [styles.Tasks, styles["Light"]].join(" ")
      }
    >
      <CreateTask
        theme={props.theme}
        addTask={props.addTask}
        changeInputValue={props.changeInputValue}
        inputValue={props.inputValue}
      />
      <ul>{props.children}</ul>
    </div>
  );
};

export default tasks;
