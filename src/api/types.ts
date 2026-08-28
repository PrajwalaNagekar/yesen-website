/**
 * API Type Definitions
 */

export interface BaseEnquiryPayload {
  clientName: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message: string;
  sourcePage: string;
  subject?: string; // Subject/topic of inquiry
  location?: string; // Client's location/region
}

export interface ProductEnquiryPayload extends BaseEnquiryPayload {
  product?: string;
  productId?: string;
  productName?: string;
  productOrServiceName?: string;
  vesselType?: string;
  retrofitStatus?: string;
  vesselLength?: string;
  operatingArea?: string;
  dailyOperatingHours?: string;
  timeLine?: string;
}

export interface ServiceEnquiryPayload extends BaseEnquiryPayload {
  solution?: string;
  solutionId?: string;
  solutionName?: string;
  productOrServiceName?: string;
  vesselType?: string;
  retrofitStatus?: string;
  vesselLength?: string;
  operatingArea?: string;
  dailyOperatingHours?: string;
  timeLine?: string;
}

export interface ProductServiceEnquiryPayload extends BaseEnquiryPayload {
  product?: string;
  solution?: string;
  productOrServiceName?: string;
  vesselType?: string;
  retrofitStatus?: string;
  vesselLength?: string;
  operatingArea?: string;
  dailyOperatingHours?: string;
  timeLine?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ApiError {
  message: string;
  status?: number;
}
