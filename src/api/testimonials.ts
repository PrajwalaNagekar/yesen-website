/**
 * Public testimonials API
 */

import { API_BASE_URL } from "./config";
import type { ApiError } from "./types";

export interface CreateTestimonialPayload {
  name: string;
  designation?: string;
  company?: string;
  location?: string;
  quote?: string;
  testimonial?: string;
}

export interface ApiTestimonial {
  _id: string;
  id?: string;
  name: string;
  testimonial?: string;
  quote?: string;
  designation?: string;
  location?: string;
  company?: string;
  status?: string;
  showOnWebsite?: boolean;
  addedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createTestimonial(
  payload: CreateTestimonialPayload
): Promise<{ testimonial: ApiTestimonial }> {
  const response = await fetch(`${API_BASE_URL}/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      designation: payload.designation || undefined,
      company: payload.company || undefined,
      location: payload.location || payload.company || undefined,
      testimonial: payload.testimonial || payload.quote || undefined,
      quote: payload.quote || payload.testimonial || undefined,
    }),
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

export async function fetchTestimonials(options?: {
  page?: number;
  limit?: number;
}): Promise<{ testimonials: ApiTestimonial[]; pagination?: unknown }> {
  const params = new URLSearchParams();
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 100));

  const response = await fetch(`${API_BASE_URL}/testimonials?${params.toString()}`, {
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
