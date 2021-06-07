export const add = (taskContent, taskId) => ({
  type: "ADD_TASK",
  content: taskContent,
  id: taskId,
});

export const remove = (id) => ({
  type: "DELETE_TASK",
  payload: id,
});

export const toggleCheck = (id) => ({
  type: "TOGGLE_CHECK_TASK",
  payload: id,
});

export const filterChange = (type) => ({
  type: "CHANGE_FILTER",
  payload: type,
});

export const getData = (task) => ({
  type: "GET_DATA",
  payload: task,
});
