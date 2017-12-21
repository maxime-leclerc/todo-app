import express from 'express';
import taskService from '../services/tasks.service';

const router = express.Router();

const listTasks = (req, res) => {
  taskService.list()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(400).send(err));
};

const storeTask = (req, res) => {
  taskService.store(req.body)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

const updateTask = (req, res) => {
  taskService.update(req.params._id, req.body)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

const deleteTask = (req, res) => {
  taskService.remove(req.params._id)
    .then(msg => res.status(200).send(msg))
    .catch(err => res.status(400).send(err));
};

router.get('/', listTasks);
router.post('/store', storeTask);
router.put('/:_id', updateTask);
router.delete('/:_id', deleteTask);

module.exports = router;
