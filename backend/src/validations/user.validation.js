import joi from "joi";

// Validasi data user untuk pembuatan pengguna baru
export const userValidation = (payload) => {
  console.log(payload);
  const schema = joi.object({
    // Validasi nama (wajib diisi dan berupa string)
    name: joi.string().trim().required(),

    // Validasi username (minimal 6 karakter, maksimal 20, wajib diisi)
    userName: joi.string().min(6).max(20).trim().required(),

    // Validasi password (minimal 6 karakter, maksimal 20, wajib diisi)
    password: joi.string().min(6).max(20).required(),

    // Validasi confirmPassword (wajib diisi dan harus sama dengan password)
    confirmPassword: joi
      .string()
      .required() // Harus diisi
      .valid(joi.ref("password")) // Harus sesuai dengan password
      .label("Confirm Password") // Nama field untuk pesan error
      .messages({
        "any.only": "{{#label}} does not match password", // Pesan jika tidak cocok
        "any.required": "Please confirm your password", // Pesan jika kosong
      }),

    // Validasi role (wajib diisi dan berupa string)
    role: joi.string().trim().required(),
  });

  // Melakukan validasi dan menampilkan semua kesalahan (tidak berhenti di error pertama)
  return schema.validate(payload, { abortEarly: false });
};

// Validasi data user untuk pembaruan pengguna
export const userUpdateValidation = (payload) => {
  const schema = joi.object({
    // Validasi username (minimal 6 karakter, maksimal 20, wajib diisi)
    userName: joi.string().min(6).max(20).required(),

    // Validasi password (opsional, bisa kosong/null jika tidak ingin diubah)
    password: joi.string().allow(null).allow(""),

    // Validasi confirmPassword (opsional, tetapi jika diisi harus sama dengan password)
    confirmPassword: joi
      .string()
      .valid(joi.ref("password")) // Harus sesuai dengan password
      .label("Confirm Password") // Nama field untuk pesan error
      .messages({
        "any.only": "{{#label}} does not match password", // Pesan jika tidak cocok
        "any.required": "Please confirm your password", // Pesan jika kosong (opsional di sini)
      }),

    // Validasi nama (wajib diisi dan berupa string)
    name: joi.string().trim().required(),

    // Validasi role (wajib diisi dan berupa string)
    role: joi.string().trim().required(),
  });

  // Melakukan validasi payload
  return schema.validate(payload);
};
