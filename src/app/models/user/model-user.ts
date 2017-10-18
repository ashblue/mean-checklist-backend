import { ModelBase } from './../base/model-base';

import mongoose = require('mongoose');

class ModelUserInternal extends ModelBase {
    get schemaOptions (): mongoose.SchemaOptions {
        return {
            toJSON: {
                transform: (doc, ret) => {
                    // Hide all sensitive data from the API end point
                    delete ret.createdAt;
                    delete ret._id;
                    delete ret.__v;
                    delete ret.password;

                    return ret;
                },
            },
        };
    }

    protected get schemaDefinition (): mongoose.SchemaDefinition {
        return {
            createdAt: {
                type: Date,
                default: Date.now,
            },
            name: {
                type: String,
                required: [true, 'Name is required'],
            },
            email: {
                type: String,
                required: [true, 'Email is required'],
                validate: [
                    {
                        message: 'Please provide a valid email',
                        validator: (email) => {
                            return new Promise((resolve, reject) => {
                                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                resolve(regex.test(email));
                            });
                        },
                    },
                ],
            },
            password: {
                type: String,
                required: [true, 'Password is required'],
                minlength: [8, 'Password must be at least 8 characters'],
            },
        };
    }
}

export const ModelUser = mongoose.model('User', new ModelUserInternal().schema);
