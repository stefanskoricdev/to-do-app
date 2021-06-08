export const add = (taskContent, taskId) => ({
  type: "ADD_TASK",
  content: taskContent,
  id: taskId,
});

export const remove = (taskId) => ({
  type: "DELETE_TASK",
  id: taskId,
});

export const toggleCheck = (taskId) => ({
  type: "TOGGLE_CHECK_TASK",
  id: taskId,
});

export const filterChange = (type) => ({
  type: "CHANGE_FILTER",
  taskType: type,
});

export const getData = (task) => ({
  type: "GET_DATA",
  payload: task,
});
