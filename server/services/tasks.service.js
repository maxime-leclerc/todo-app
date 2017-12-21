import Q from 'q';
import { tasks as Tasks } from '../models/db-connection';

const service = {};

// List of tasks
const list = () => {
  const deferred = Q.defer();

  Tasks.find({}, (err, tasks) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve(tasks);
  });
  return deferred.promise;
};

// Store a task
const store = (params) => {
  const deferred = Q.defer();

  const newTask = new Tasks({
    name: params.name,
    done: params.done,
    created_at: new Date(),
    updated_at: new Date()
  });

  newTask.save((err, task) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve(task);
  });
  return deferred.promise;
};

// Update a task
const update = (_id, params) => {
  const deferred = Q.defer();

  params.updated_at = new Date();

  Tasks.findByIdAndUpdate(_id, params, (err, task) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve(task);
  });

  return deferred.promise;
};

// Remove a task
const remove = (_id) => {
  const deferred = Q.defer();

  Tasks.findByIdAndRemove(_id, (err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('La tâche a été supprimée.');
  });

  return deferred.promise;
};

// Export service
service.list = list;
service.store = store;
service.update = update;
service.remove = remove;

export default service;
