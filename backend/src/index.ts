import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет с бэкенда!" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Бэк запущен на адресе http://localhost:${PORT}`);
});
