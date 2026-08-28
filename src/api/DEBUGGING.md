# API Debugging Guide

## Problem: Form submission not showing in Network tab

### Step 1: Check Console Logs

With the updated code, you should see detailed console logs:

```
[API Config] Base URL: http://localhost:5001/api/v1
[API Config] Forms Key: Set
[API Config] Endpoints: {...}
🧪 API Test module loaded. Use window.testAPI in console to test.
```

When you submit the form, you should see:

```
[Form] Submit triggered
[Form] Basic data: {...}
[Form] Interest type: product
[Form] Submitting product enquiry
[submitProductEnquiry] Called with payload: {...}
[API] Making request to: http://localhost:5001/api/v1/forms/product
[API] Payload: {...}
[API] Response status: 200
[API] Success response: {...}
[Form] Submission successful!
```

### Step 2: Manual API Testing

Open the browser console and run:

```javascript
// Test contact API
await window.testAPI.testContact()

// Test product API
await window.testAPI.testProduct()

// Test service API
await window.testAPI.testService()

// Check config
window.testAPI.config
```

### Step 3: Common Issues & Solutions

#### Issue 1: No console logs appear
**Problem:** API module not imported correctly
**Solution:** Check that `enquire.tsx` has the import:
```typescript
import { submitProductEnquiry, submitServiceEnquiry, submitContactEnquiry } from "../api";
```

#### Issue 2: CORS errors in console
**Problem:** Backend not allowing requests from frontend origin
**Solution:** Check backend CORS configuration in `app.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true
}));
```

#### Issue 3: 401 Unauthorized
**Problem:** API key mismatch
**Solution:** 
- Frontend: Check `.env` file has `VITE_FORMS_API_KEY=your_key`
- Backend: Check `.env` has matching `FORMS_API_KEY=your_key`
- Restart dev servers after changing .env

#### Issue 4: Network request to wrong URL
**Problem:** Environment variable not loaded
**Solution:**
- Check `.env` file has `VITE_API_URL=http://localhost:5001/api/v1`
- Restart Vite dev server: `Ctrl+C` then `npm run dev`
- Note: Environment variables must start with `VITE_` in Vite projects

#### Issue 5: Request not appearing in Network tab
**Problem:** Form validation preventing submission
**Solution:** Check if required fields are filled:
- Name (required)
- Email OR Phone (at least one required)
- For product/solution: Product/solution selection required

#### Issue 6: TypeScript errors
**Problem:** Type mismatches
**Solution:** 
```bash
# Check for type errors
npm run type-check
# or
tsc --noEmit
```

### Step 4: Verify Backend is Running

1. Check if backend is running:
```bash
# In backend directory
npm start
# Should show: Server running on port 5001
```

2. Test backend directly with curl:
```bash
curl -X POST http://localhost:5001/api/v1/forms/contact \
  -H "Content-Type: application/json" \
  -H "x-forms-key: change_this_forms_key_min_8_chars" \
  -d '{
    "clientName": "Test User",
    "name": "Test User", 
    "email": "test@example.com",
    "message": "Test message",
    "sourcePage": "/enquire"
  }'
```

### Step 5: Check Network Tab Filters

In Chrome DevTools Network tab:
1. Make sure "All" filter is selected (not just "XHR" or "Fetch")
2. Check "Preserve log" is enabled
3. Clear the network log and try again
4. Look for requests to `localhost:5001`

### Step 6: Environment Variable Checklist

Frontend `.env` file should have:
```env
VITE_API_URL=http://localhost:5001/api/v1
VITE_FORMS_API_KEY=change_this_forms_key_min_8_chars
```

**Important:** 
- ✅ Variables MUST start with `VITE_`
- ✅ Restart dev server after changing .env
- ✅ No spaces around `=`
- ✅ No quotes around values (unless value contains spaces)

### Step 7: Check if Dev Server is Running

```bash
# In frontend directory
npm run dev
# or
yarn dev
# or
bun dev
```

Should output:
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Detailed Request Flow

```
User clicks Submit
       ↓
Form validation (HTML5)
       ↓
onSubmit handler called
       ↓
Form data collected
       ↓
submitXXXEnquiry() called
       ↓
apiFetch() called
       ↓
fetch() with URL + headers
       ↓
Network request sent
       ↓
Backend processes request
       ↓
Response received
       ↓
Success/Error handling
```

### Quick Debug Checklist

- [ ] Backend server running on port 5001?
- [ ] Frontend server running (usually port 3000)?
- [ ] `.env` file has correct variables?
- [ ] Environment variables start with `VITE_`?
- [ ] Dev server restarted after .env changes?
- [ ] Console shows [API Config] logs on page load?
- [ ] Console shows [Form] logs when submitting?
- [ ] Network tab filter set to "All"?
- [ ] Browser console has no errors?
- [ ] Form fields filled correctly?

### Getting More Help

If still not working:
1. Share console logs (all `[API]` and `[Form]` messages)
2. Share Network tab screenshot
3. Share any error messages
4. Confirm backend and frontend are both running
