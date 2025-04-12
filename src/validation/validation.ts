import { Joi } from 'celebrate';
import mongoose from 'mongoose';
const validateUpdateUser  = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().optional()
      .pattern(/^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.ru)(\/[\/\w\-._~:/?#\[\]@!$&'()*+,;=]*)?$/),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(), // не уверен, можно ли менять пароль в этом запросе?
    about: Joi.string().min(2).max(200).optional(),
  })
};

export { validateUpdateUser  };


const validateUpdateUserAvatar  = {
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(/^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.ru)(\/[\/\w\-._~:/?#\[\]@!$&'()*+,;=]*)?$/)
})
}
export { validateUpdateUserAvatar  };


const validateCreateCard  = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    createdAt: Joi.date().optional(),
  })
}
export { validateCreateCard };


const validateLogin  = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}

export { validateLogin };

const validateSignUp  = {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).optional(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(200).optional(),
      avatar: Joi.string().optional()
        .pattern(/^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.ru)(\/[\/\w\-._~:/?#\[\]@!$&'()*+,;=]*)?$/),

  })
}
export { validateSignUp };

const validateReqId  = {

  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  })
}
export { validateReqId };