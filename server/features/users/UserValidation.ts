/*Created by anthonyg 01-05-2018*/
import * as Joi from 'joi';
import constants from '../../utils/Constants'

let PASSWORD_REGEX = /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/;

export default {
    PostUser:{
        body:{
            created_by: Joi.number(),
            email: Joi.string().lowercase().email().required(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            // password requirements
            // 8 characters
            // One Upper Case
            // One Lower Case
            // One Number
            // One Special character
            password: Joi.string()
                .regex(PASSWORD_REGEX).required(),
            user_type_id: Joi.number().required()
        }
    },

    GetUser:{
        params:{
            _id: Joi.number().required()
        }
    },

    Login:{
        body:{
            username: Joi.string().lowercase().email().required(),
            password: Joi.string().required()
        }
    }

};
