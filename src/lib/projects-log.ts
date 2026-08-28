import type { UiProjectStatus } from "@/api/projects";

export type ProjectStatus = UiProjectStatus;

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  complete: "bg-brand-leaf/12 text-brand-forest",
  progress: "bg-brand-blue/12 text-brand-navy",
  live: "bg-amber-500/12 text-amber-700",
};

export const STATUS_DOT: Record<ProjectStatus, string> = {
  complete: "bg-brand-forest",
  progress: "bg-brand-blue",
  live: "bg-amber-600",
};

export function projectNeighbours<T extends { id: string }>(
  id: string,
  list: T[]
): { prev: T | undefined; next: T | undefined } {
  const i = list.findIndex((p) => p.id === id);
  if (i < 0 || list.length === 0) return { prev: undefined, next: undefined };
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  return { prev, next };
}
