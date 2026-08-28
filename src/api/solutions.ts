/**
 * Public solutions catalogue API (CRM solutions-csm read endpoints).
 */

import { API_BASE_URL } from "./config";
import { resolveMediaUrl } from "./products";
import type { ApiError } from "./types";

export interface SolutionBenefit {
  point: string;
  explanation: string;
}

export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionImage {
  url: string;
  originalName?: string;
  mimeType?: string;
  sizeBytes?: number;
  publicId?: string;
  provider?: string;
  resourceType?: string;
}

export interface Solution {
  _id: string;
  serialNo: number;
  name: string;
  tagline: string;
  description?: string;
  image: SolutionImage;
  benefits: SolutionBenefit[];
  features?: string[];
  stats: SolutionStat[];
  createdAt?: string;
  updatedAt?: string;
}

async function solutionsFetch<T>(endpoint: string): Promise<T> {
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

/** GET /solutions-csm — list all solutions */
export async function fetchSolutions(): Promise<Solution[]> {
  const data = await solutionsFetch<{ solutions: Solution[] }>("/solutions-csm");
  return data.solutions ?? [];
}

/** GET /solutions-csm/:id — single solution */
export async function fetchSolution(id: string): Promise<Solution> {
  const data = await solutionsFetch<{ solution: Solution }>(`/solutions-csm/${id}`);
  return data.solution;
}

export function solutionImageUrl(solution: Solution): string | null {
  return resolveMediaUrl(solution.image?.url);
}
