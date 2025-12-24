import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import teleRoutes from "./routes/teleRoutes";
import reportRoutes from "./routes/reportRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/telegram", teleRoutes);
app.use("/report", reportRoutes);

export default app;
