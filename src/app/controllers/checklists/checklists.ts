import { ModelChecklist } from '../../models/index';

// @TODO If a user isn't logged in reject their access (route middleware)
// @TODO Limit checklist access on all methods to items that belong to the requester
class CtrlChecklists {
    public index (req, res, next) {
        ModelChecklist.find()
            .sort(['createdAt', 'descending'])
            .exec((err, checklists) => {
                if (err) {
                    return next(err);
                }

                res.json(checklists);
            });
    }

    public create (req, res, next) {
        const checklist = new ModelChecklist(req.body);
        checklist.save((err) => {
            if (err) {
                next(err);
            }

            res.json(checklist);
        });
    }

    public get (req, res, next) {
        req.sanitize('id').escape();
        req.sanitize('id').trim();

        ModelChecklist.findById(req.params.id)
            .populate('tasks')
            .exec((err, checklist) => {
                if (err) {
                    return next(err);
                }

                res.json(checklist);
            });
    }

    public update (req, res, next) {
        req.sanitize('id').escape();
        req.sanitize('id').trim();

        ModelChecklist.findByIdAndUpdate(req.params.id, req.body, (err, checklist) => {
            if (err) {
                return next(err);
            }

            res.json(checklist);
        });
    }

    public destroy (req, res, next) {
        req.sanitize('id').escape();
        req.sanitize('id').trim();

        // @TODO Delete all associated tasks
        ModelChecklist.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return next(err);
            }

            res.status(200);
        });
    }
}

export const ctrlChecklists = new CtrlChecklists();
