import mongoose = require('mongoose');

const checklistSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: Date,
    title: String,
    tasks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Task',
    },
});

export const ModelChecklist = mongoose.model('Checklist', checklistSchema);
