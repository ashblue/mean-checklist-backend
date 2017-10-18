import { ModelBase } from './../base/model-base';

import mongoose = require('mongoose');

class ModelChecklistInternal extends ModelBase {
    protected get schemaDefinition (): mongoose.SchemaDefinition {
        return {
            createdAt: {
                type: Date,
                default: Date.now,
            },
            title: {
                type: String,
                default: 'Untitled',
            },
            tasks: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
            }],
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Owner is required'],
            },
        };
    }
}

export const ModelChecklist = mongoose.model('Checklist', new ModelChecklistInternal().schema);
