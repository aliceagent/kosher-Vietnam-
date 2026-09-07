"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getLastSync, listBundles, listChecks, listSaved, listSubmissions } from "@/lib/storage";

const listeners = new Set<() => void>();

export function notifyStorage() {
  for (const fn of listeners) fn();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const on = () => fn();
  window.addEventListener("orah-storage", on);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("orah-storage", on);
  };
}

export function useSaved() {
  const json = useSyncExternalStore(subscribe, () => JSON.stringify(listSaved()), () => "[]");
  return JSON.parse(json) as ReturnType<typeof listSaved>;
}

export function useSubmissions() {
  const json = useSyncExternalStore(subscribe, () => JSON.stringify(listSubmissions()), () => "[]");
  return JSON.parse(json) as ReturnType<typeof listSubmissions>;
}

export function useIsSaved(id: string) {
  const get = useCallback(() => listSaved().some((item) => item.id === id), [id]);
  return useSyncExternalStore(subscribe, get, () => false);
}

export function useChecks() {
  const json = useSyncExternalStore(subscribe, () => JSON.stringify(listChecks()), () => "[]");
  return JSON.parse(json) as string[];
}

export function useBundles() {
  const json = useSyncExternalStore(subscribe, () => JSON.stringify(listBundles()), () => "[]");
  return JSON.parse(json) as ReturnType<typeof listBundles>;
}

export function useLastSync() {
  return useSyncExternalStore(subscribe, () => getLastSync(), () => null);
}
