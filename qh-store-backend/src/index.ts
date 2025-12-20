import "dotenv/config";
import express from "express";
import cors from "cors";
import { adminDb } from "./firebase";

const app = express();
const port = Number(process.env.PORT) || 4000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.use("/api", (req, res, next) => {
  if (!apiKey) {
    return next();
  }

  const headerKey = req.header("x-api-key");
  if (headerKey && headerKey === apiKey) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", async (req, res) => {
  try {
    const limitParam = req.query.limit as string | undefined;
    const event = req.query.event as string | undefined;

    let ref: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      adminDb.collection("products");

    if (event) {
      ref = ref.where("event", "==", event);
    }

    if (limitParam) {
      const limit = Number(limitParam);
      if (!Number.isNaN(limit) && limit > 0) {
        ref = ref.limit(limit);
      }
    }

    const snapshot = await ref.get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/faq", async (_req, res) => {
  try {
    const snapshot = await adminDb.collection("faq").get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch faq" });
  }
});

app.get("/api/severity-keywords", async (_req, res) => {
  try {
    const snapshot = await adminDb.collection("severity_keywords").get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch severity keywords" });
  }
});

app.listen(port, () => {
  console.log(`QH Store backend listening on port ${port}`);
});
