import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.routes.js";

const app = express();

// 🔥 PORT para Render
const PORT = process.env.PORT || 3000;

// 🔥 __dirname fix en ES Modules
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
// ARCHIVOS ESTÁTICOS
// =====================
app.use(express.static(path.join(__dirname, "../public")));

// =====================
// RUTA PRINCIPAL
// =====================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// =====================
// RUTAS API
// =====================
app.use("/api", usersRoutes);

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
// SERVIDOR (RENDER FIX)
// =====================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
