import Joi from 'joi';

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
          .min(1)
          .max(255)
          .email({ tlds: { allow: false } })
          .required(),
    password: Joi.string()
          .min(1)
          .max(42)
          .regex(/^[^</>]*$/)
          .required()
          .messages({
               "string.min": "le champ mot doit contenir au minimum 5 caractères",
               "string.max": "le champ mot de passe ne peut contenir au maximum que 42 caractères",
               "string.pattern.base": "le champ mot de passe ne peut pas contenir de caractères spéciaux: < > /",
          })
});

  return schema.validate(data);
};

export const changePasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
          .min(1)
          .max(255)
          .email({ tlds: { allow: false } })
          .required(),
    oldPassword: Joi.string()
          .min(1)
          .max(42)
          .regex(/^[^</>]*$/)
          .required()
          .messages({
               "string.min": "le champ ancien mot de passe doit contenir au minimum 5 caractères",
               "string.max": "le champ ancien mot de passe ne peut contenir au maximum que 42 caractères",
               "string.pattern.base": "le champ ancien mot de passe ne peut pas contenir de caractères spéciaux: < > /",
          }),
    newPassword: Joi.string()
          .min(1)
          .max(42)
          .regex(/^[^</>]*$/)
          .required()
          .messages({
               "string.min": "le champ nouveau mot de passe doit contenir au minimum 5 caractères",
               "string.max": "le champ nouveau mot de passe ne peut contenir au maximum que 42 caractères",
               "string.pattern.base": "le champ nouveau mot de passe ne peut pas contenir de caractères spéciaux: < > /",
          })
});

  return schema.validate(data);
};
