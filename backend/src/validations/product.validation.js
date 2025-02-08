import joi from "joi";

export const productValidation = (payload) => {
  // Membuat skema validasi menggunakan Joi
  const schema = joi.object({
    // `barcode` adalah string, bisa kosong atau null (tidak wajib diisi)
    barcode: joi.string().trim().allow(null).allow(""),
    // `productName` adalah string yang wajib diisi dan akan di-trim (hapus spasi tambahan)
    productName: joi.string().trim().required(),
    // `image` adalah string, bisa kosong atau null (tidak wajib diisi)
    image: joi.string().trim().allow(null).allow(""),
    // `url` adalah string, bisa kosong atau null (tidak wajib diisi)
    url: joi.string().trim().allow(null).allow(""),
    // `qty` adalah angka yang wajib diisi
    qty: joi.number().required(),
    // `kategoryId` adalah angka yang wajib diisi
    kategoryId: joi.number().required(),
    // `suppleirId` adalah angka yang wajib diisi
    suppleirId: joi.number().required(),
    // `file` bisa berisi apapun, bisa kosong atau null (tidak wajib diisi)
    file: joi.any().allow(null).allow(""),
  });

  // Mengembalikan hasil validasi payload berdasarkan skema yang telah ditentukan
  return schema.validate(payload);
};
