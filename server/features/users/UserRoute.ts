/*Created by anthonyg 01-05-2018*/
import * as express from 'express';
const router = express.Router();
import {passport} from '../../middleware/Auth';
import {validate} from '../../middleware/JoiValidator'
import constants from'../../utils/Constants';
import UserValidation from './UserValidation'
import logger from '../../utils/Logger';
import { authenticationMiddleware } from "../../middleware/Auth";
import UserController from "./UserController"
import {config} from "../../config";

const AUTH_PARAMS = config.auth;

//===============================================================================================//
//  ROUTES                                                                                       //
//===============================================================================================//

/**
 * This route will add a user.  IMPORTANT to create your first user remove the
 * authenticationMiddleware temporarily
 */
router.post('/', authenticationMiddleware, validate(UserValidation.PostUser),
    (req, res, next)=> {
        logger.info('POST User');
        UserController.Add(req.body)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                return next(err);
            })
    });

/**
 * This route will fetch a user by id
 */
router.get('/:_id', authenticationMiddleware, validate(UserValidation.GetUser), (req, res, next) => {
    logger.info('GET User');

    UserController.GetById(req.params._id)
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            return next(err);
        })
});

/**
 * This route will attempt to login the user with the given credentials
 */
router.post('/login',
    validate(UserValidation.Login),
    passport.authenticate('local'),
    (req, res) => {
        logger.info('Login');
        let response = constants.AUTH.PASSWORD_SUCCESS;

        //Note that 3600000 converts our cookieLife param from hours to milliseconds
        let cookieOptions = {maxAge: AUTH_PARAMS.cookieLife * 3600000};
        res.cookie('sessionId', req.session.passport.user.uuid, cookieOptions);
        return res.status(200).json(response);
    });

module.exports = router;
