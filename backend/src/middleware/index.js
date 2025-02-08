import express from "express";
const appMiddleware = express();
import cors from "cors";
import router from "../routes/index.js";
import "../utils/winston.js";
import fileUpload from "express-fileupload";

// Mengaktifkan middleware CORS dengan konfigurasi tertentu
appMiddleware.use(
  cors({
    origin: true, // Mengizinkan semua origin (sumber permintaan)
    credentials: true, // Mengizinkan pengiriman cookie atau header kredensial lainnya
    preflightContinue: false, // Tidak melanjutkan permintaan preflight ke middleware berikutnya
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Metode HTTP yang diizinkan
  })
);

// Menangani preflight request secara default untuk semua endpoint
appMiddleware.options("*", cors());

// Middleware untuk parsing body JSON pada permintaan
appMiddleware.use(express.json());

// Middleware untuk menangani unggahan file
appMiddleware.use(fileUpload());

// Middleware untuk menyajikan file statis dari folder "public"
appMiddleware.use(express.static("public"));

// Menggunakan router untuk menangani semua rute aplikasi
appMiddleware.use(router);

export default appMiddleware;
