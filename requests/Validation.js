//import Joi from '@hapi/joi';
const Joi = require('@hapi/joi');

const OPTIONS = {
    language: {
        key: '{{label}} '
    }
};

// sign up validation
const SIGNUP = (signUpData) => {
    const signUpSchema = Joi.object().keys({
        firstName: Joi.string().min(2).max(20).required().label("First name"),
        lastName: Joi.string().min(2).max(20).required().label("Last name"),
        email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(15).required().label("Password"),
        totalIncome: Joi.number(),
        totalExpense: Joi.number(),
    });

    //return Joi.validate(signUpData, signUpSchema, OPTIONS);
    
    return Joi.validate( signUpData , signUpSchema, OPTIONS);
}

// sign in validaiton
const SIGNIN = (signInData) => {
    const signInSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(15).required().label("Password"),
    });

    return Joi.validate(signInData, signInSchema, OPTIONS);
}


module.exports = {
    SIGNUP, SIGNIN
}