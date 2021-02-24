const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
},
{
  timestamps: true,
});

taskSchema.pre('save', function(next) {
  console.log('b4 saving task');
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
