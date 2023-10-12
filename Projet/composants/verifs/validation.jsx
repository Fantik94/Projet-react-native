import Joi from 'joi';

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .pattern(new RegExp('^[a-zA-Z0-9@.]+$'))
      .message('Caractères spéciaux non autorisés dans l\'email'),
    password: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .message('Caractères spéciaux non autorisés dans le mot de passe'),
  });

  return schema.validate(data);
};

export const changePasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .pattern(new RegExp('^[a-zA-Z0-9@.]+$'))
      .message('Caractères spéciaux non autorisés dans l\'email'),
    oldPassword: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .message('Caractères spéciaux non autorisés dans l\'ancien mot de passe'),
    newPassword: Joi.string()
      .required()
      .min(6)
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .message('Caractères spéciaux non autorisés dans le nouveau mot de passe'),
  });

  return schema.validate(data);
};
