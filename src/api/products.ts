/**
 * Public products catalogue API (CRM products-csm read endpoints).
 */

import { API_BASE_URL } from "./config";
import type { ApiError } from "./types";

export interface ProductBenefit {
  heading?: string;
  title?: string;
}

export interface ProductImage {
  url: string;
  originalName?: string;
  mimeType?: string;
  sizeBytes?: number;
  publicId?: string;
  provider?: string;
  resourceType?: string;
}

export interface Product {
  _id: string;
  serialNo: number;
  name: string;
  label: string;
  description1?: string;
  description2?: string;
  image: ProductImage;
  benefits: ProductBenefit[];
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

/** Resolve Cloudinary absolute URLs or backend-relative /uploads paths. */
export function resolveMediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const origin = API_BASE_URL.replace(/\/api\/v\d+\/?$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

async function productsFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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

/** GET /products-csm — list all products */
export async function fetchProducts(): Promise<Product[]> {
  const data = await productsFetch<{ products: Product[] }>("/products-csm");
  return data.products ?? [];
}

/** GET /products-csm/:id — single product */
export async function fetchProduct(id: string): Promise<Product> {
  const data = await productsFetch<{ product: Product }>(`/products-csm/${id}`);
  return data.product;
}
