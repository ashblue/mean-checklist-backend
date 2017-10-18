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
        };
    }
}

export const ModelTask = mongoose.model('Task', new ModelTaskInternal().schema);
