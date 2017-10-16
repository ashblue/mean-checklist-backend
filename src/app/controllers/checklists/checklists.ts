import { ModelChecklist } from '../../models/index';

export class ChecklistsCtrl {
    // @TODO Only return the index of checklists from the current user
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

    // @TODO Assign the current user to the checklist
    public create (req, res, next) {
        const checklist = new ModelChecklist(req.body);
        checklist.save((err) => {
            if (err) {
                next(err);
            }

            res.render(checklist);
        });
    }

    // @TODO Block this request if the checklist doesn't belong to the user
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

    // @TODO Block this request if the checklist doesn't belong to the user
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

    // @TODO Block this request if the checklist doesn't belong to the user
    public destroy (req, res, next) {
        req.sanitize('id').escape();
        req.sanitize('id').trim();

        // @TODO Delete all associated tasks
        ModelChecklist.findByIdAndRemove(req.params.id, req.body, (err, checklist) => {
            if (err) {
                return next(err);
            }

            res.json(checklist);
        });
    }
}

export const checklistsCtrl = new ChecklistsCtrl();
