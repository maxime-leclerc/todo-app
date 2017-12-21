import { TasksService } from '@/services/tasks';
import { SET_TASKS, STORE_TASK, SET_ERRORS, TOGGLE_LOADING } from '@/store/types';

const state = {
  errors: null,
  tasks: [],
  task: {},
  isLoading: null
};

const getters = {
  errors: state => state.errors,
  tasks: state => state.tasks,
  task: state => state.task,
  total: state => state.tasks.length,
  isLoading: state => state.isLoading
};

const actions = {
  fetchTasks (context) {
    context.commit(TOGGLE_LOADING, true);
    return TasksService.getTasks()
      .then(({ data }) => {
        context.commit(SET_TASKS, data);
        context.commit(TOGGLE_LOADING, false);
      })
  },
  storeTask (context, task) {
    context.commit(TOGGLE_LOADING, true);
    return TasksService.storeTask(task)
      .then(({ data }) => {
        context.commit(STORE_TASK, data);
        context.commit(TOGGLE_LOADING, false);
      })
  }
};

const mutations = {
  [SET_TASKS] (state, data) {
    state.tasks = data;
  },
  [STORE_TASK] (state, data) {
    state.task = data;
  },
  [TOGGLE_LOADING] (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
