import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.routes.js";

const app = express();

// 🔥 IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "../public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.use(usersRoutes);


app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    message: "Error en el servidor"
  });
});

// 🚀 iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});