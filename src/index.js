import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.routes.js";
import { pool } from "./db.js";

const app = express();

// 🔥 PORT para Render
const PORT = process.env.PORT || 3000;

// __dirname fix (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// MIDDLEWARES
// =====================
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// =====================
// FRONTEND (opcional)
// =====================
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// =====================
// RUTAS API
// =====================
app.use("/api", usersRoutes);

// =====================
// TEST BASE DE DATOS
// =====================
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "✅ DB conectada correctamente",
      time: result.rows[0]
    });
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    res.status(500).json({
      message: "❌ Error conectando a la base de datos",
      error: error.message
    });
  }
});

// =====================
// ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    message: "Error en el servidor"
  });
});

// =====================
// START SERVER (RENDER FIX)
// =====================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
