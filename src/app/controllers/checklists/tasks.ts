import { ModelChecklist, ModelTask } from '../../models/index';

// import async = require('async');
// import mongoose = require('mongoose');

// @TODO If a user isn't logged in reject their access (route middleware)
// @TODO Limit checklist access on all methods to items that belong to the requester
class CtrlChecklistTasks {
    public create (req, res, next) {
        req.sanitize('id').escape();
        req.sanitize('id').trim();

        ModelChecklist.findById(req.params.id)
            .populate('tasks')
            .exec((err, checklist) => {
                if (err) {
                    return next(err);
                }

                if (checklist == null) {
                    return res.status(400);
                }

                const task = new ModelTask(req.body);
                task.save((errTask, task) => {
                    if (errTask) {
                        return next(errTask);
                    }

                    checklist.update(
                        { _id: req.params.id },
                        { $push: { tasks: task } },
                        (errUpdate) => {
                            if (errUpdate) {
                                return next(errUpdate);
                            }

                            res.json(task);
                        },
                    );
                });
            });
    }

    public update (req, res, next) {
        req.sanitize('idTask').escape();
        req.sanitize('idTask').trim();

        ModelTask.findByIdAndUpdate(req.params.idTask, req.body, (err, task) => {
            if (err) {
                return next(err);
            }

            res.json(task);
        });
    }

    public destroy (req, res, next) {
        req.sanitize('idTask').escape();
        req.sanitize('idTask').trim();

        ModelTask.findByIdAndRemove(req.params.idTask, (err) => {
            if (err) {
                return next(err);
            }

            res.status(200);
        });
    }
}

export const ctrlChecklistTasks = new CtrlChecklistTasks();
