// tasks/selectors.js
export const selectTasks = state => state.tasks.tasks;
export const selectStatuses = state => state.tasks.statuses;
export const selectLoading = state => state.tasks.loading;
export const selectError = state => state.tasks.error;
export const selectTaskById = (state, taskId) => state.tasks.tasks.find(task => task.id === taskId);
