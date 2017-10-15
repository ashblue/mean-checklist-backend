import mongoose = require('mongoose');

const taskSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: Date,
    title: String,
    complete: Boolean,
});

export const ModelTask = mongoose.model('Task', taskSchema);
