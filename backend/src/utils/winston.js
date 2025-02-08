//*supaya bisa munculkan log dan buat file baru
import winston from "winston"; // Import library winston untuk logging
import "winston-daily-rotate-file";

//*Konfigurasi transport untuk menyimpan log ke file harian yang berputar
const transport = new winston.transports.DailyRotateFile({
  filename: "log-%DATE%.log", //*Nama file log dengan format tanggal
  datePattern: "YYY-MM-DD", //*Pola tanggal untuk nama file
  zippedArchive: true, //*Mengarsipkan file log lama ke format ZIP
  maxSize: "10m", //*Ukuran maksimum file log adalah 10 MB
  maxFiles: "14d", //*Menyimpan file log maksimal selama 14 hari
  level: "error", //*Hanya mencatat log dengan level "error" atau lebih tinggi
  handleExceptions: true, //*Menangani pengecualian (exceptions) yang tidak terduga
});

//*Membuat logger dengan konfigurasi khusus
export const logger = winston.createLogger({
  level: "silly", //*Level logging terendah (mencatat semua level log)
  format: winston.format.combine(
    //*Menggabungkan beberapa format log
    winston.format.json({ space: 2 }), //*Format log sebagai JSON dengan indentasi
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SS A", //*Format timestamp (tanggal & waktu)
    }),
    winston.format.label({ label: "LOG" }), //*Memberikan label "LOG" pada setiap log
    winston.format.printf(
      (info) =>
        `${info.label} ${info.timestamp} ${info.level} : ${info.message}` //*Format tampilan log
    )
  ),
  transports: [
    // Menentukan tempat log akan dicatat
    new winston.transports.Console({
      level: "silly", //*Mencatat semua level log ke konsol
      handleExceptions: true, //*Menangani exceptions di konsol
      format: winston.format.combine(
        winston.format.colorize({ all: true }) //*Memberikan warna pada level log di konsol
      ),
    }),
    transport, //*Transport untuk menyimpan log ke file harian
  ],
});
