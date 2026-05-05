import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "1234", // 🔴 CAMBIA ESTO por tu contraseña real
  database: "nodepg",
  port: 5432
});

// 🔥 prueba de conexión
pool.query("SELECT NOW()")
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));