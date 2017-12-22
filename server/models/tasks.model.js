import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean },
  created_at: { type: Date },
  updated_at: { type: Date }
});

module.exports =  mongoose.model('Task', taskSchema, 'tasks');
