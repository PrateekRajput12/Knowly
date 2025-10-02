import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

app.options("*", cors()); // allow preflight for all routes

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
