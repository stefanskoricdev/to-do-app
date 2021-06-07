import styles from "./TaskFooter.module.scss";

const taskFooter = (props) => {
  return (
    <footer
      className={
        props.theme
          ? styles.TaskFooter
          : [styles.TaskFooter, styles["Light"]].join(" ")
      }
    >
      <div>
        <p>{props.activeTasks} items left</p>
        <button onClick={props.clearCompletedTasks}>Clear Completed</button>
      </div>
      <div>
        <button autoFocus onClick={props.changeTaskFilter} id="all">
          All({props.filterLength("all").length})
        </button>
        <button onClick={props.changeTaskFilter} id="active">
          Active({props.filterLength("active").length})
        </button>
        <button onClick={props.changeTaskFilter} id="completed">
          Completed({props.filterLength("completed").length})
        </button>
      </div>
    </footer>
  );
};
export default taskFooter;
