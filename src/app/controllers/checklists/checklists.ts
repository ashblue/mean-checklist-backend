import * as express from 'express';
import { sanitize } from 'express-validator/filter';

import { ModelChecklist, ModelTask } from '../../models/index';

// @TODO If a user isn't logged in reject their access (route middleware)
// @TODO Limit checklist access on all methods to items that belong to the requester
class CtrlChecklists {
    public index (req: express.Request, res: express.Response) {
        ModelChecklist.find({owner: req['user']._id})
            .sort([['createdAt', 'descending']])
            .populate({path: 'tasks', options: {sort: {createdAt: -1}}})
            .exec((err, checklists) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }

                res.json(checklists);
            });
    }

    public create (req: express.Request, res: express.Response) {
        req.body.owner = req['user']._id;
        const checklist = new ModelChecklist(req.body);
        checklist.save((err) => {
            if (err) {
                res.status(400).json(err);
                return;
            }

            res.json(checklist);
        });
    }

    public get (req: express.Request, res: express.Response) {
        sanitize('id').escape().trim();

        ModelChecklist.findOne({
            _id: req.params.id,
            owner: req['user']._id,
        })
            .populate({path: 'tasks', options: {sort: {createdAt: -1}}})
            .exec((err, checklist) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                if (!checklist) {
                    res.status(404).json({message: 'Checklist not found'});
                    return;
                }

                res.json(checklist);
            });
    }

    public update (req: express.Request, res: express.Response) {
        sanitize('id').escape().trim();

        // These props should never be written to the database, delete them if present
        delete req.body.id;
        delete req.body.createdAt;
        delete req.body.owner;

        ModelChecklist.findOneAndUpdate({
            _id: req.params.id,
            owner: req['user']._id,
        }, req.body, {new: true}, (err, checklist) => {
            if (err) {
                res.status(404).json(err);
                return;
            }

            res.json(checklist);
        });
    }

    public destroy (req: express.Request, res: express.Response) {
        sanitize('id').escape().trim();

        ModelChecklist.findOneAndRemove({
            _id: req.params.id,
            owner: req['user']._id,
        }, (err, checklist) => {
            if (err) {
                res.status(404).json(err);
                return;
            }

            if (checklist === null) {
                res.status(404).json({message: 'Checklist not found'});
                return;
            }

            const taskIds = checklist.get('tasks');

            ModelTask.remove({_id: {$in: taskIds}}, (err) => {
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                checklist.remove((err) => {
                    if (err) {
                        res.status(404).json(err);
                        return;
                    }

                    res.status(200).json({});
                });
            });
        });
    }
}

export const ctrlChecklists = new CtrlChecklists();
