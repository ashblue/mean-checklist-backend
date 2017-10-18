import { ModelBase } from './../base/model-base';

import mongoose = require('mongoose');

class ModelTaskInternal extends ModelBase {
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
            complete: {
                type: Boolean,
                default: false,
            },
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Owner is required'],
            },
        };
    }
}

export const ModelTask = mongoose.model('Task', new ModelTaskInternal().schema);
