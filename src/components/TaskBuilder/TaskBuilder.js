import React, { useEffect, useReducer, useState } from "react";
import styles from "./TaskBuilder.module.scss";
import TaskBuilderHeader from "./TaskBuilderHeader/TaskBuilderHeader";
import Tasks from "./Tasks/Tasks";
import Task from "./Tasks/Task/Task";
import TaskFooter from "./Tasks/TaskFooter/TaskFooter";
import {
  add,
  remove,
  toggleCheck,
  getData,
  filterChange,
} from "../../actions/actions";
import db from "../../services/firebase";
import firebase from "firebase/app";
const initialState = {
  tasks: [],
  filter: "all",
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: action.id, content: action.content, isCompleted: false },
        ],
      };
    case "TOGGLE_CHECK_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return {
              id: task.id,
              content: task.content,
              isCompleted: !task.isCompleted,
            };
          }
          return task;
        }),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "CLEAR_COMPLETED_TASKS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.isCompleted),
      };
    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

const TaskBuilder = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [state, dispatchTasks] = useReducer(tasksReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { tasks, filter } = state;

  useEffect(() => {
    const inputHandler = setTimeout(() => {
      setInputValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(inputHandler);
    };
  }, [inputValue]);
  //DEBOUNCING USER INPUT TO 500ms,
  //SO THAT WE DONT CALL ON SETINPUT VALUE STATE CHANGE ON EVERY KEYPRESS!!!
  useEffect(() => {
    console.log("GET_DATA_USE_EFFETCT!!");

    const getTasks = async () => {
      setIsLoading(true);
      const todosRef = db.collection("todos");
      const allTasks = await todosRef.get();
      let tasks = [];
      allTasks.docs.forEach((doc) => {
        const task = {
          id: doc.id,
          content: doc.data().content,
          isCompleted: doc.data().isCompleted,
        };
        tasks.push(task);
      });
      dispatchTasks(getData(tasks));
      setIsLoading(false);
    };
    try {
      getTasks();
    } catch (error) {
      alert("Ooops there is an error getting tasks", error);
    }
  }, []);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const submitTaskHandler = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter task");
      return;
    }
    try {
      setIsLoading(true);
      const docRef = await db.collection("todos").add({
        content: inputValue,
        isCompleted: false,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dispatchTasks(add(inputValue, docRef.id));
      setIsLoading(false);
    } catch (error) {
      alert("Oooops there was an error", error);
    }
    setInputValue("");
  };

  const deleteTaskHandler = async (e) => {
    const targetedTaskId = e.target.id;
    dispatchTasks(remove(targetedTaskId));
    await db.collection("todos").doc(targetedTaskId).delete();
  };

  const clearCompletedTasksHandler = () => {
    const checkedTasks = tasks.filter((task) => task.isCompleted === true);
    const checkedTasksIds = checkedTasks.map((task) => task.id);
    dispatchTasks({
      type: "CLEAR_COMPLETED_TASKS",
    });
    checkedTasksIds.forEach((id) => {
      const todosRef = db.collection("todos").doc(id);
      todosRef.delete();
    });
  };

  const checkTaskHandler = async (e) => {
    const targetedTaskId = e.target.id;
    const todosRef = db.collection("todos");
    const targetedTask = todosRef.doc(targetedTaskId);
    dispatchTasks(toggleCheck(targetedTaskId));
    try {
      const updateTask = await targetedTask.get();
      if (updateTask.exists) {
        updateTask.ref.update({ isCompleted: !updateTask.data().isCompleted });
      }
    } catch (error) {
      alert("Oooops there was an error", error);
    }
  };

  const filterChangeHandler = (e) => {
    dispatchTasks(filterChange(e.target.id));
  };

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const filterView = (filter) => {
    let tasksList = null;
    if (filter === "active") {
      tasksList = tasks.filter((task) => !task.isCompleted);
    } else if (filter === "completed") {
      tasksList = tasks.filter((task) => task.isCompleted);
    } else {
      tasksList = tasks;
    }
    return tasksList;
  };

  const allTasksList = filterView(filter).map((task, i) => {
    return (
      <Task
        id={task.id}
        key={`task${Date.now() + i}`}
        newTask={task.content}
        checkTask={checkTaskHandler}
        checked={task.isCompleted}
        deleteTask={deleteTaskHandler}
      />
    );
  });

  return (
    <div className={styles.TaskBuilder}>
      <TaskBuilderHeader changeTheme={props.changeTheme} theme={props.theme} />
      <Tasks
        tasksAmmount={tasks.length}
        addTask={submitTaskHandler}
        theme={props.theme}
        changeInputValue={changeInputValue}
        inputValue={inputValue}
      >
        {tasks.length < 1 && !isLoading && (
          <div>
            <h2>NO TASKS</h2>
          </div>
        )}
        {isLoading && (
          <div>
            <h2>LOADING...</h2>
          </div>
        )}
        {!isLoading && allTasksList}
      </Tasks>
      <TaskFooter
        activeTasks={allTasksList.length}
        changeTaskFilter={filterChangeHandler}
        filterLength={(value) => filterView(value)}
        clearCompletedTasks={clearCompletedTasksHandler}
        theme={props.theme}
      />
    </div>
  );
};

export default TaskBuilder;
