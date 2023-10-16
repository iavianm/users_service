const { celebrate, Joi } = require('celebrate');

exports.validateAddHistory = celebrate({
    body: Joi.object().keys({
        userId: Joi.number().required(),
        action: Joi.string().required(),
        details: Joi.object().required(),
        timestamp: Joi.date().required()
    })
});
