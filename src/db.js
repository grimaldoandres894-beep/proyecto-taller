import pg from "pg";

const { Pool } = pg;

// 🔥 Conexión a PostgreSQL en Render
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 🧪 TEST rápido de conexión (opcional pero útil)
pool.connect()
  .then(() => console.log("✅ PostgreSQL conectado correctamente"))
  .catch(err => console.error("❌ Error conectando DB:", err.message));
