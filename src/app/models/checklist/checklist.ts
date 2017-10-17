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
        };
    }
}

export const ModelChecklist = mongoose.model('Checklist', new ModelChecklistInternal().schema);
