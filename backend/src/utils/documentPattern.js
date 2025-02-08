// Fungsi untuk membuat kode unik dengan prefix tertentu
export const setCode = (key) => {
  //digunakan untuk membuat kode unik produk dan transaksi
  const code = Math.floor(Math.random() * Date.now()); //
  return `${key}${code}`; // Menggabungkan key (prefix) dengan angka unik
};

// Fungsi untuk membuat kode unik khusus untuk order (pesanan)
export const setOrderCode = (key) => {
  const code = Math.floor(Date.now()); // Sama seperti di atas, menghasilkan angka unik
  return `${key}${code}`; // Menggabungkan key (prefix) dengan angka unik
};
