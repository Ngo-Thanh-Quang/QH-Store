import type { Request, Response } from "express";
import { adminDb } from "../firebase";

export const listProducts = async (req: Request, res: Response) => {
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
};
