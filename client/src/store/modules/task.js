import { TasksService } from '@/services/tasks';
import _ from 'lodash';

import {
  SET_TASKS,
  STORE_TASK,
  SEARCH_TASK,
  DELETE_TASK,
  RESET_TASK,
  NOTIFY_TASK,
  TOGGLE_LOADING
} from '@/store/types';

const state = {
  errors: null,
  search: '',
  notify: {
    show: false,
    status: '',
    message: ''
  },
  tasks: [],
  task: {},
  isLoading: null
};

const getters = {
  notify: state => state.notify,
  search : state => state.search,
  tasks: state => {
    return _.filter(state.tasks, (task) => {
      let nameRegexp = new RegExp(state.search, 'i');
      let isName = nameRegexp.test(task.name);
      return isName;
    });
  },
  doneTasks: state => {
    return _.filter(state.tasks, (task) => {
      return task.done;
    });
  },
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
      .catch((error) => {
        context.commit(NOTIFY_TASK, [error.response.data, 'error']);
        context.commit(TOGGLE_LOADING, false);
      });
  },
  storeTask (context, task) {
    return TasksService.storeTask(task)
      .then(({ data }) => {
        let message = 'La tâche a bien été créée.';
        context.commit(NOTIFY_TASK, [message, 'success']);
        context.commit(STORE_TASK, data);
        context.commit(RESET_TASK);
      })
      .catch((error) => {
        context.commit(NOTIFY_TASK, [error.response.data, 'error']);
      });
  },
  updateTask (context, task) {
    let id = task._id;
    return TasksService.updateTask(id, task)
      .then(() => {
        let message = 'La tâche a bien été mise à jour.';
        context.commit(NOTIFY_TASK, [message, 'success']);
      })
      .catch((error) => {
        context.commit(NOTIFY_TASK, [error.response, 'error']);
      });
  },
  deleteTask (context, [index, id]) {
    return TasksService.deleteTask(id)
      .then(({ data }) => {
        let message = 'La tâche a bien été supprimée.';
        context.commit(NOTIFY_TASK, [message, 'success']);
        context.commit(DELETE_TASK, index);
      })
      .catch((error) => {
        context.commit(NOTIFY_TASK, [error.response.data, 'error']);
      });
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
  [RESET_TASK] (state) {
    state.task = {};
  },
  [SEARCH_TASK] (state, search) {
    state.search = search;
  },
  [NOTIFY_TASK] (state, [message, status]) {
    state.notify = {
      message,
      status,
      show: true
    };
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
