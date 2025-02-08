import bcrypt from "bcrypt"; // Import library bcrypt untuk hashing password
const saltRounds = 10; // Jumlah putaran salt untuk hashing

// Fungsi untuk mengenkripsi password
export const ecryptPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds); // Hash password menggunakan bcrypt dengan saltRounds
};

// Fungsi untuk membandingkan password dengan hash yang sudah disimpan
export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash); // Bandingkan password yang diinput dengan hash yang ada
};
