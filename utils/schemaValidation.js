const Joi = require("joi");

module.exports.postSchema = Joi.object({
    post: Joi.object({
        image: Joi.string().allow("", null),
        caption: Joi.string().allow("", null),
        likes: Joi.number().min(0),
    }).required(),
});