import type { SavedItem, Submission } from "@/lib/schema";

const SAVED = "orah-saved";
const SUBS = "orah-submissions";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("orah-storage"));
}

export function listSaved(): SavedItem[] {
  return read<SavedItem[]>(SAVED, []);
}

export function isSaved(id: string) {
  return listSaved().some((item) => item.id === id);
}

export function toggleSaved(item: SavedItem) {
  const current = listSaved();
  const next = current.some((row) => row.id === item.id)
    ? current.filter((row) => row.id !== item.id)
    : [item, ...current];
  write(SAVED, next);
  return next;
}

export function listSubmissions(): Submission[] {
  return read<Submission[]>(SUBS, []);
}

export function addSubmission(input: Omit<Submission, "id" | "createdAt" | "status">) {
  const row: Submission = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  write(SUBS, [row, ...listSubmissions()]);
  return row;
}

export function setSubmissionStatus(id: string, status: Submission["status"]) {
  write(
    SUBS,
    listSubmissions().map((row) => (row.id === id ? { ...row, status } : row)),
  );
}
