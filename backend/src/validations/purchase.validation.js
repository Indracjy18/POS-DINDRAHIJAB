import joi from "joi";

export const purchaseValidation = (payload) => {
  const schema = joi.object({
    //`data` harus tanggal dan wajib ada
    date: joi.date().required(),
    // `note` harus string yang di trim dan wajib ada
    note: joi.string().trim().required(),
    //`userId` harus angka dan wajib ada
    userId: joi.number().required(),
    //`total` harus angka dan wajib ada
    total: joi.number().required(),
    //`ppn` harus angka dan wajib ada
    ppn: joi.number().required(),
    //`detail` harus berupa array dan wajib ada
    detail: joi.array().required(),
  });
  return schema.validate(payload);
};
