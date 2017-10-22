import * as express from 'express';
import { sanitize } from 'express-validator/filter';

import { ModelChecklist, ModelTask } from '../../models/index';

// import async = require('async');
// import mongoose = require('mongoose');

// @TODO If a user isn't logged in reject their access (route middleware)
// @TODO Limit checklist access on all methods to items that belong to the requester
class CtrlChecklistTasks {
    public create (req: express.Request, res: express.Response) {
        sanitize('id').escape().trim();
        req.body.owner = req['user']._id;

        ModelChecklist.findOne({
            _id: req.params.id,
            owner: req['user']._id,
        })
            .exec((err, checklist) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                if (checklist == null) {
                    res.status(400).json({
                        message: `No checklist found with id ${req.params.id}. Response was ${checklist}`,
                    });
                    return;
                }

                const task = new ModelTask(req.body);
                task.save((errTask, task) => {
                    if (errTask) {
                        res.status(500).json(errTask);
                        return;
                    }

                    checklist.get('tasks').push(task.id);
                    checklist.save(
                        (errUpdate, checklistUpdate, numAffected) => {
                            if (errUpdate) {
                                res.status(500).json(errUpdate);
                                return;
                            }

                            res.json(task);
                        },
                    );
                });
            });
    }

    public update (req: express.Request, res: express.Response) {
        sanitize('idTask').escape().trim();

        // These props should never be written to the database, delete them if present
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.owner;

        ModelTask.findOneAndUpdate({
            _id: req.params.idTask,
            owner: req['user']._id,
        }, req.body, {new: true}, (err, task) => {
            if (err) {
                res.status(404).json(err);
                return;
            }

            res.json(task);
        });
    }

    public destroy (req: express.Request, res: express.Response) {
        sanitize('id').escape().trim();
        sanitize('idTask').escape().trim();

        ModelChecklist.findOne({
            _id: req.params.id,
            owner: req['user']._id,
        }).exec((err, checklist) => {
            if (err) {
                res.status(404).json(err);
                return;
            }

            if (checklist == null) {
                res.status(400).json({
                    message: `No checklist found with id ${req.params.id}. Response was ${checklist}`,
                });
                return;
            }

            ModelTask.findOneAndRemove({
                _id: req.params.idTask,
                owner: req['user']._id,
            }, (err) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                res.status(200).json({});
            });

            // @TODO This should be fired after remove is complete (consider a library like async to symplify the nesting syntax)
            // .exec() is required to trigger $pull from Mongoose update
            ModelChecklist.findOneAndUpdate({
                _id: req.params.id,
                owner: req['user']._id,
            }, {
                $pull: {
                    tasks: req.params.idTask,
                },
            }).exec();
        });
    }

    public get (req: express.Request, res: express.Response) {
        sanitize('idTask').escape().trim();

        ModelTask.findOne({
            _id: req.params.idTask,
            owner: req['user']._id,
        })
            .exec((err, task) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                if (task === null) {
                    res.status(404).json({message: `Task ID ${req.params.idTask} not found`});
                    return;
                }

                res.json(task);
            });
    }
}

export const ctrlChecklistTasks = new CtrlChecklistTasks();
