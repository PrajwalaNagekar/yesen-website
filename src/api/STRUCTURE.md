# API Module Structure Overview

## Files Created

### 1. `config.ts` - API Configuration
- Exports `API_BASE_URL` from environment variables
- Exports `FORMS_API_KEY` from environment variables  
- Defines `API_ENDPOINTS` object with all form endpoints:
  - `/forms/product` - Product enquiries
  - `/forms/service` - Service/solution enquiries
  - `/forms/contact` - General contact enquiries

### 2. `types.ts` - Type Definitions
- `BaseEnquiryPayload` - Base fields for all enquiries
- `ProductServiceEnquiryPayload` - Extended fields for product/service enquiries
- `ApiResponse` - Standard API response structure
- `ApiError` - Error response structure

### 3. `forms.ts` - Form Submission Functions
- `apiFetch()` - Internal fetch wrapper with error handling
- `submitProductEnquiry()` - Submit product enquiry to `/forms/product`
- `submitServiceEnquiry()` - Submit service enquiry to `/forms/service`
- `submitContactEnquiry()` - Submit contact enquiry to `/forms/contact`

### 4. `index.ts` - Central Export
- Re-exports everything from config, types, and forms
- Single import point: `import { submitProductEnquiry } from "@/api"`

## Integration with enquire.tsx

### Before (inline fetch):
```typescript
const response = await fetch(`${apiUrl}/forms${endpoint}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-forms-key": formsKey,
  },
  body: JSON.stringify(payload),
});
```

### After (using API functions):
```typescript
import { submitProductEnquiry, submitServiceEnquiry, submitContactEnquiry } from "../api";

// Then in form submission:
if (interest === "product") {
  await submitProductEnquiry(payload);
} else if (interest === "solution") {
  await submitServiceEnquiry(payload);
} else {
  await submitContactEnquiry(payload);
}
```

## Benefits

1. **Separation of Concerns** - API logic separated from UI components
2. **Type Safety** - TypeScript interfaces ensure correct payload structure
3. **Reusability** - API functions can be used across multiple components
4. **Maintainability** - Changes to API calls only need to happen in one place
5. **Error Handling** - Centralized error handling logic
6. **Testing** - Easier to mock and test API functions independently

## API Flow Diagram

```
┌─────────────────┐
│  enquire.tsx    │
│  (Component)    │
└────────┬────────┘
         │
         │ import { submit*Enquiry }
         │
         ▼
┌─────────────────┐
│   api/index.ts  │
│  (Exports)      │
└────────┬────────┘
         │
         │ re-exports from
         │
         ▼
┌─────────────────┐
│   api/forms.ts  │
│  (Functions)    │
└────────┬────────┘
         │
         │ uses
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ api/config.ts│   │ api/types.ts │
│ (Settings)   │   │ (Types)      │
└──────────────┘   └──────────────┘
         │                 │
         └────────┬────────┘
                  │
                  ▼
          ┌──────────────┐
          │   Backend    │
          │  API Server  │
          └──────────────┘
```

## Next Steps

1. Add more API functions as needed (e.g., testimonials, projects)
2. Implement request/response interceptors for logging
3. Add retry logic for failed requests
4. Implement caching for GET requests
5. Add request cancellation support
