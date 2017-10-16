import { ModelBase } from './../base/model-base';

import mongoose = require('mongoose');

class ModelTaskInternal extends ModelBase {
    protected get schemaDefinition (): mongoose.SchemaDefinition {
        return {
            createdAt: Date,
            title: String,
            complete: Boolean,
        };
    }
}

export const ModelTask = mongoose.model('Task', new ModelTaskInternal().schema);
