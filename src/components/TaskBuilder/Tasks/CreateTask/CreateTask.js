import styles from "./CreateTask.module.scss";

const createTask = (props) => {
  return (
    <form
      className={
        props.theme
          ? styles.CreateTask
          : [styles.CreateTask, styles["Light"]].join(" ")
      }
      onSubmit={props.addTask}
    >
      <input
        type="text"
        name="createTask"
        value={props.inputValue}
        placeholder="Create a new todo..."
        onKeyUp={props.keyPress}
        onChange={props.changeInputValue}
      />
      <button type="submit">ADD</button>
    </form>
  );
};
export default createTask;
