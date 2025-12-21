import "dotenv/config";
import express from "express";
import cors from "cors";
import faqRoutes from "./routes/faq";
import productsRoutes from "./routes/products";
import severityRoutes from "./routes/severity";

const app = express();
const port = Number(process.env.PORT) || 4000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

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

app.use("/api", requireApiKey, productsRoutes, faqRoutes, severityRoutes);

app.listen(port, () => {
  console.log(`QH Store backend listening on port ${port}`);
});
