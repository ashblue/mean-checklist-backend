import * as express from 'express';
import {sanitize} from 'express-validator/filter';
import {ModelUser} from './../../models/index';
import {authConfig} from './auth-config';

import jwt = require('jwt-simple');
import passport = require('passport');
import passportJWT = require('passport-jwt');

export class CtrlAuth {
    public passport = passport;

    constructor () {
        const strategy = new passportJWT.Strategy({
            secretOrKey: authConfig.jwtSecret,
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, (payload, done) => {
            ModelUser.findById(payload.sub, (err, user) => {
                if (err) {
                    return done(err, false);
                }

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });

        passport.use(strategy);
    }

    public register (req: express.Request, res: express.Response) {
        sanitize('email').escape().trim();
        sanitize('password').escape().trim();
        sanitize('name').escape().trim();

        ModelUser.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                res.status(500).json(err);
                return;
            }

            if (user) {
                res.status(500).json({
                    message: `Email "${req.body.email}" already exists. Please use another email`,
                });
                return;
            }

            user = new ModelUser(req.body);
            user.save((err, user) => {
                if (err) {
                    res.status(500).json(err);
                }

                if (user == null) {
                    res.status(500).json({message: 'Could not generate user'});
                }

                res.json(user);
            });
        });
    }

    public login (req: express.Request, res: express.Response) {
        sanitize('email').escape().trim();
        sanitize('password').escape().trim();

        const email = req.body.email;
        const password = req.body.password;

        ModelUser.findOne({email, password}, (err, user) => {
            if (err) {
                res.status(401).json(err);
                return;
            }

            if (!user) {
                res.status(401).json({message: 'User not found'});
                return;
            }

            const token = jwt.encode({id: user.id}, authConfig.jwtSecret);
            res.json({token});
        });
    }

    public authenticate () {
        return passport.authenticate('jwt', authConfig.jwtSession);
    }
}

export const ctrlAuth = new CtrlAuth();
