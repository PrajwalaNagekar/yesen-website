/**
 * Public projects catalogue API
 */

import { API_BASE_URL } from "./config";
import { resolveMediaUrl } from "./products";
import type { ApiError } from "./types";

export type ApiProjectStatus = "live" | "inprogress" | "ongoing" | "completed";

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
  sitePhotography?: string[];
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
  string,
  { ui: UiProjectStatus; label: string }
> = {
  completed: { ui: "complete", label: "Complete" },
  ongoing: { ui: "progress", label: "In progress" },
  inprogress: { ui: "progress", label: "In progress" },
  live: { ui: "live", label: "Live" },
};

const MONGO_ID_RE = /^[a-f\d]{24}$/i;

export function isValidProjectId(id: string | undefined | null): id is string {
  return Boolean(id && MONGO_ID_RE.test(id));
}

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
  if (!doc?._id) {
    const error: ApiError = { message: "Project not found", status: 404 };
    throw error;
  }

  const mapped = STATUS_MAP[doc.status] ?? STATUS_MAP.inprogress;
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

  const gallery = (doc.sitePhotography ?? [])
    .map((url) => resolveMediaUrl(url))
    .filter((url): url is string => Boolean(url));

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
    gallery: gallery.length ? gallery : cover ? [cover] : [],
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
