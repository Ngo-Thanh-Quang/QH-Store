import type { Request, Response } from "express";
import { adminDb } from "../firebase";
import {
  makeAsciiWordRegex,
  makeUnicodeWordRegex,
  removeDiacritics,
} from "../utils/text";

type SeverityEntry = {
  label?: string;
  phrases?: string[];
  ascii_phrases?: string[];
};

export const listSeverityKeywords = async (_req: Request, res: Response) => {
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
};

export const checkSeverity = (req: Request, res: Response) => {
  const rawText =
    req.body?.text ||
    req.body?.message?.text ||
    req.body?.output ||
    req.body?.content?.parts?.map((part: { text?: string }) => part.text ?? "")
      ?.join(" ");

  const text = String(rawText || "").trim();
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const lower = text.toLowerCase().normalize("NFC");
  const ascii = removeDiacritics(lower);
  const entries: SeverityEntry[] = Array.isArray(req.body?.severity_kw)
    ? req.body.severity_kw
    : [];

  if (!entries.length) {
    entries.push(
      { label: "van de", phrases: ["van de"] },
      { label: "bi thung", phrases: ["bi thung"] },
      { label: "bi rach", phrases: ["bi rach", "rach"] },
      { label: "bi loi", phrases: ["bi loi", "loi"] }
    );
  }

  const unicodePatterns: Array<{ label: string; rx: RegExp }> = [];
  const asciiPatterns: Array<{ label: string; rx: RegExp }> = [];

  for (const entry of entries) {
    const label = entry.label || "";
    const unicodeList = (entry.phrases?.length
      ? entry.phrases
      : [label]
    ).filter(Boolean);
    const asciiList = (entry.ascii_phrases?.length
      ? entry.ascii_phrases
      : unicodeList.map(removeDiacritics)
    ).filter(Boolean);

    for (const phrase of unicodeList) {
      unicodePatterns.push({ label, rx: makeUnicodeWordRegex(phrase) });
    }
    for (const phrase of asciiList) {
      asciiPatterns.push({ label, rx: makeAsciiWordRegex(phrase) });
    }
  }

  let keyword = "";
  let matched = "";

  for (const { rx, label } of unicodePatterns) {
    const match = lower.match(rx);
    if (match) {
      keyword = label;
      matched = match[1] || match[0];
      break;
    }
  }

  if (!keyword) {
    for (const { rx, label } of asciiPatterns) {
      const match = ascii.match(rx);
      if (match) {
        keyword = label;
        matched = match[1] || match[0];
        break;
      }
    }
  }

  return res.json({
    _issue: {
      found: Boolean(keyword),
      keyword,
      matched,
      originalText: text,
    },
  });
};
