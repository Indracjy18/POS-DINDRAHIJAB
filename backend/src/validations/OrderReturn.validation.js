import joi from "joi";

export const orderReturnValidation = (payload) => {
  //buat schema validasi joi
  const schema = joi.object({
    //`data` harus tanggal dan wajib ada
    date: joi.date().required(),
    // `note` harus string yang di trim dan wajib ada
    note: joi.string().trim().required(),
    //`userId` harus angka dan wajib ada
    userId: joi.number().required(),
    // `orderId` harus angka dan wajib ada
    orderId: joi.number().required(),
    //`detail` harus berupa array dan wajib ada
    detail: joi.array().required(),
  });
  //mengembalikan hasil validasi bedasarkan schema
  return schema.validate(payload);
};
