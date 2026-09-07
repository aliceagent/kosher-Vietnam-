import type { SavedItem, Submission } from "@/lib/schema";

const SAVED = "orah-saved";
const SUBS = "orah-submissions";
const CHECK = "orah-check";
const BUNDLES = "orah-bundles";
const SYNC = "orah-sync";

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

export function reorderSaved(ids: string[]) {
  const current = listSaved();
  const map = new Map(current.map((item) => [item.id, item]));
  const next = ids.map((id, index) => {
    const row = map.get(id);
    return row ? { ...row, sortIndex: index, collection: "trip" as const } : null;
  }).filter(Boolean) as SavedItem[];
  const rest = current.filter((item) => !ids.includes(item.id));
  write(SAVED, [...next, ...rest]);
}

export function listChecks(): string[] {
  return read<string[]>(CHECK, []);
}

export function toggleCheck(id: string) {
  const current = listChecks();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  write(CHECK, next);
  return next;
}

export function listBundles(): { id: string; title: string; savedAt: string }[] {
  return read(BUNDLES, []);
}

export function markBundle(id: string, title: string) {
  const current = listBundles().filter((item) => item.id !== id);
  write(BUNDLES, [{ id, title, savedAt: new Date().toISOString() }, ...current]);
}

export function removeBundle(id: string) {
  write(
    BUNDLES,
    listBundles().filter((item) => item.id !== id),
  );
}

export function getLastSync() {
  return read<string | null>(SYNC, null);
}

export function setLastSync(iso: string) {
  write(SYNC, iso);
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
