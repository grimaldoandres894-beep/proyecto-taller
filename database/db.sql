import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",           // 👈 cambia si usas otro usuario
  host: "localhost3000",
  password: "1234",    // 👈 pon tu contraseña real
  database: "nodepg",         // 👈 tu base nueva
  port: 5432
});

// 🔥 prueba de conexión (puedes borrarla luego)
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error conectando a PostgreSQL:", err);
  } else {
    console.log("✅ PostgreSQL conectado");
  }
});