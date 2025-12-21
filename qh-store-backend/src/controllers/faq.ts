import type { Request, Response } from "express";
import { adminDb } from "../firebase";

type FaqEntry = {
  q?: string;
  a?: string;
  keywords?: string[];
};

const scoreFaqEntry = (entry: FaqEntry, question: string) => {
  const tokens = (entry.keywords?.length ? entry.keywords.join(" ") : entry.q || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (!tokens.length) {
    return 0;
  }

  const hits = tokens.reduce(
    (sum, token) => sum + (question.includes(token) ? 1 : 0),
    0
  );

  return hits / tokens.length;
};

export const listFaq = async (_req: Request, res: Response) => {
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
};

export const matchFaq = (req: Request, res: Response) => {
  const rawText =
    req.body?.text ||
    req.body?.message?.text ||
    req.body?.output ||
    req.body?.content?.parts?.map((part: { text?: string }) => part.text ?? "")
      ?.join(" ");
  const question = String(rawText || "").toLowerCase().trim();
  const faq: FaqEntry[] = Array.isArray(req.body?.faq) ? req.body.faq : [];
  const name = req.body?.name ?? req.body?.user?.name ?? "";
  const channel = req.body?.channel ?? "";
  const message = req.body?.message ?? { text: rawText };

  if (!question) {
    return res.status(400).json({ error: "Missing text" });
  }

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faq) {
    const score = scoreFaqEntry(entry, question);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const context =
    best && bestScore >= 0.5 && best.q && best.a
      ? `Tài liệu nội bộ:\nQ: ${best.q}\nA: ${best.a}`
      : "";

  return res.json({
    name,
    channel,
    message,
    userQuestion: question,
    best,
    bestScore,
    context,
  });
};
