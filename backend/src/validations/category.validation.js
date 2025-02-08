import joi from "joi";

export const categoryValidation = (payload) => {
  const schema = joi.object({
    kategoriName: joi.string().trim().required(),
  });
  return schema.validateAsync(payload);
};
