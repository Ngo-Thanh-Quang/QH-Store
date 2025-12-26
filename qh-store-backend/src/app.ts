import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import teleRoutes from "./routes/teleRoutes";
import reportRoutes from "./routes/reportRoutes";
import faqRoutes from "./routes/faq";
import productsRoutes from "./routes/products";
import severityRoutes from "./routes/severity";

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY;

const requireApiKey = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!apiKey) {
    return next();
  }

  const headerKey = req.header("x-api-key");
  if (headerKey && headerKey === apiKey) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ message: "API is running..." });
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/telegram", teleRoutes);
app.use("/report", reportRoutes);
app.use("/api", requireApiKey, productsRoutes, faqRoutes, severityRoutes);

export default app;
