# API Module

This folder contains all API service functions for the frontend application.

## Structure

```
api/
├── config.ts       # API configuration (base URL, endpoints, API keys)
├── types.ts        # TypeScript type definitions for API requests/responses
├── forms.ts        # Form submission API functions
├── index.ts        # Central export point
└── README.md       # This file
```

## Usage

### Import API functions

```typescript
import { submitProductEnquiry, submitServiceEnquiry, submitContactEnquiry } from "@/api";
```

### Submit a product enquiry

```typescript
try {
  await submitProductEnquiry({
    clientName: "John Doe",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 1234567890",
    company: "Example Corp",
    message: "Interested in E-MARINE",
    sourcePage: "/enquire",
    productOrServiceName: "E-MARINE",
    vesselType: "Ferry",
    retrofitStatus: "retrofit existing",
    vesselLength: "18m",
    operatingArea: "Kochi backwaters",
    dailyOperatingHours: "8 hrs",
    timeLine: "3-6 months"
  });
  console.log("Success!");
} catch (error) {
  console.error("Failed:", error.message);
}
```

### Submit a service enquiry

```typescript
await submitServiceEnquiry({
  // Same payload structure as product enquiry
});
```

### Submit a general contact enquiry

```typescript
await submitContactEnquiry({
  clientName: "John Doe",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 1234567890",
  company: "Example Corp",
  message: "General inquiry about partnerships",
  sourcePage: "/enquire"
});
```

## Environment Variables

Make sure these are set in your `.env` file:

```
VITE_API_URL=http://localhost:5001/api/v1
VITE_FORMS_API_KEY=your_forms_api_key_here
```

## Adding New API Functions

1. Define types in `types.ts`
2. Add endpoint to `config.ts`
3. Create function in appropriate service file (or create new service file)
4. Export from `index.ts`
5. Use in components

## Error Handling

All API functions throw errors with the following structure:

```typescript
{
  message: string;
  status?: number;
}
```

Always wrap API calls in try-catch blocks and handle errors appropriately.
