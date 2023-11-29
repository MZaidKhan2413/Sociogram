const Joi = require("joi");

module.exports.postSchema = Joi.object({
    post: Joi.object({
        image: Joi.string().allow("", null),
        caption: Joi.string(),
        likes: Joi.number().min(0),
    }).required(),
});