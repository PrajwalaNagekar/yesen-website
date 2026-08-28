/**
 * API Test/Debug Module
 * Use this to manually test API functions in the browser console
 */

import { submitProductEnquiry, submitServiceEnquiry, submitContactEnquiry } from "./forms";
import { API_BASE_URL, FORMS_API_KEY } from "./config";

// Expose to window for manual testing
if (typeof window !== "undefined") {
  (window as any).testAPI = {
    config: {
      baseUrl: API_BASE_URL,
      hasApiKey: !!FORMS_API_KEY,
    },
    
    // Test contact form
    testContact: async () => {
      console.log("Testing contact API...");
      try {
        const result = await submitContactEnquiry({
          clientName: "Test User",
          name: "Test User",
          email: "test@example.com",
          phone: "+91 1234567890",
          message: "This is a test message from the API test module",
          sourcePage: "/enquire",
        });
        console.log("✅ Contact API test successful:", result);
        return result;
      } catch (error) {
        console.error("❌ Contact API test failed:", error);
        throw error;
      }
    },

    // Test product form
    testProduct: async () => {
      console.log("Testing product API...");
      try {
        const result = await submitProductEnquiry({
          clientName: "Test User",
          name: "Test User",
          email: "test@example.com",
          phone: "+91 1234567890",
          message: "Test product enquiry",
          sourcePage: "/enquire",
          productOrServiceName: "E-MARINE",
          vesselType: "Ferry",
          retrofitStatus: "retrofit existing",
          vesselLength: "18m",
          operatingArea: "Kochi backwaters",
          dailyOperatingHours: "8 hrs",
          timeLine: "3-6 months",
        });
        console.log("✅ Product API test successful:", result);
        return result;
      } catch (error) {
        console.error("❌ Product API test failed:", error);
        throw error;
      }
    },

    // Test service form
    testService: async () => {
      console.log("Testing service API...");
      try {
        const result = await submitServiceEnquiry({
          clientName: "Test User",
          name: "Test User",
          email: "test@example.com",
          phone: "+91 1234567890",
          message: "Test service enquiry",
          sourcePage: "/enquire",
          productOrServiceName: "Marine Electrification",
          vesselType: "Ferry",
          retrofitStatus: "new build",
          vesselLength: "20m",
          operatingArea: "Mumbai harbor",
          dailyOperatingHours: "10 hrs",
          timeLine: "6-12 months",
        });
        console.log("✅ Service API test successful:", result);
        return result;
      } catch (error) {
        console.error("❌ Service API test failed:", error);
        throw error;
      }
    },
  };

  console.log("🧪 API Test module loaded. Use window.testAPI in console to test.");
  console.log("Available commands:");
  console.log("  - window.testAPI.testContact()");
  console.log("  - window.testAPI.testProduct()");
  console.log("  - window.testAPI.testService()");
  console.log("  - window.testAPI.config");
}
