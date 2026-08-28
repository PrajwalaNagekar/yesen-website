/**
 * Public projects catalogue API
 */

import { API_BASE_URL } from "./config";
import { resolveMediaUrl } from "./products";
import type { ApiError } from "./types";

export type ApiProjectStatus = "live" | "ongoing" | "completed";

export interface ProjectImage {
  url?: string;
  originalName?: string;
  storedFilename?: string;
  mimeType?: string;
  sizeBytes?: number;
  publicId?: string;
  provider?: string;
  resourceType?: string;
}

export interface ApiProject {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  type?: string;
  deployed?: string;
  technology?: string;
  status: ApiProjectStatus;
  image?: ProjectImage | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type UiProjectStatus = "complete" | "progress" | "live";

/** Shape used by the marketing site project cards / detail page */
export interface ProjectRecord {
  id: string;
  status: UiProjectStatus;
  statusLabel: string;
  title: string;
  loc: string;
  country: string;
  timeline: string;
  technology: string;
  type: string;
  summary: string;
  body: string;
  specs: Array<[string, string]>;
  cover: string;
  gallery: string[];
}

const STATUS_MAP: Record<
  ApiProjectStatus,
  { ui: UiProjectStatus; label: string }
> = {
  completed: { ui: "complete", label: "Complete" },
  ongoing: { ui: "progress", label: "In progress" },
  live: { ui: "live", label: "Live" },
};

async function projectsFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errData.error || errData.message || `Server responded with ${response.status}`,
      status: response.status,
    };
    throw error;
  }

  return response.json();
}

export function mapProject(doc: ApiProject): ProjectRecord {
  const mapped = STATUS_MAP[doc.status] ?? STATUS_MAP.ongoing;
  const cover =
    resolveMediaUrl(doc.imageUrl || doc.image?.url) ||
    resolveMediaUrl(
      doc.image?.storedFilename ? `/uploads/projects/${doc.image.storedFilename}` : null
    ) ||
    "";

  const location = doc.location?.trim() || "—";
  const timeline = doc.deployed?.trim() || "—";
  const technology = doc.technology?.trim() || "—";
  const type = doc.type?.trim() || "";
  const description = doc.description?.trim() || "";

  const specs: Array<[string, string]> = [];
  if (type) specs.push(["Type", type]);
  if (doc.deployed?.trim()) specs.push(["Deployed", doc.deployed.trim()]);
  if (doc.location?.trim()) specs.push(["Location", doc.location.trim()]);
  if (doc.technology?.trim()) specs.push(["Technology", doc.technology.trim()]);
  specs.push(["Status", mapped.label]);

  return {
    id: String(doc._id),
    status: mapped.ui,
    statusLabel: mapped.label,
    title: doc.name?.trim() || "Untitled project",
    loc: location,
    country: location,
    timeline,
    technology,
    type,
    summary: description || `${doc.name} — ${location}`,
    body: description,
    specs,
    cover,
    gallery: cover ? [cover] : [],
  };
}

/** GET /projects — list projects */
export async function fetchProjects(options?: {
  page?: number;
  limit?: number;
  status?: ApiProjectStatus;
}): Promise<{ projects: ProjectRecord[]; pagination?: unknown }> {
  const params = new URLSearchParams();
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 100));
  if (options?.status) params.set("status", options.status);

  const data = await projectsFetch<{
    projects: ApiProject[];
    pagination?: unknown;
  }>(`/projects?${params.toString()}`);

  return {
    projects: (data.projects ?? []).map(mapProject),
    pagination: data.pagination,
  };
}

/** GET /projects/:id — single project */
export async function fetchProject(id: string): Promise<ProjectRecord> {
  const data = await projectsFetch<{ project: ApiProject }>(`/projects/${id}`);
  return mapProject(data.project);
}
