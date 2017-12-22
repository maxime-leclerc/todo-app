import { TasksService } from '@/services/tasks';
import {
  SET_TASKS,
  STORE_TASK,
  DELETE_TASK,
  SET_ERRORS,
  TOGGLE_LOADING
} from '@/store/types';

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
    return TasksService.storeTask(task)
      .then(({ data }) => {
        context.commit(STORE_TASK, data);
      })
  },
  deleteTask (context, [index, id]) {
    return TasksService.deleteTask(id)
      .then(({ data }) => {
        context.commit(DELETE_TASK, index);
      })
  }
};

const mutations = {
  [SET_TASKS] (state, data) {
    state.tasks = data;
  },
  [STORE_TASK] (state, data) {
    state.tasks.push(data);
  },
  [DELETE_TASK] (state, index) {
    state.tasks.splice(index, 1);
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
