/**
 * FileName: src/services/msalConfig.js
 * Author(s): Arturo Vargas
 * Brief: MSAL configuration for Azure AD B2C authentication.
 * Date: 2025-02-08
 *
 * Description:
 * This file sets up the authentication configuration for Microsoft Authentication Library (MSAL)
 * to enable user sign-in using Azure AD B2C. It defines the client ID, authority, and redirect URI
 * required for authentication. This configuration is used throughout the PowerTick frontend application.
 *
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 * 
 * Version History:
 * - 2025-02-08: Added MSAL configuration for Azure AD B2C.
 * - 2025-02-16: Updated redirect URI for production environment.
 */
import { PublicClientApplication } from "@azure/msal-browser";

// Detect if running in Vite Dev Mode or in Azure Production
const isLocalhost = window.location.hostname === "localhost";
const isDevelopment = import.meta.env.MODE === "development"; // Vite environment check
const isAzureProd = !isLocalhost && !isDevelopment; // Running in Azure Static Web Apps

const msalConfig = {
  auth: {
    clientId: "9a8d0881-7579-403a-bdd6-1742c267b394", // Azure AD B2C App ID
    authority: "https://powertickb2c.b2clogin.com/powertickb2c.onmicrosoft.com/B2C_1_SignIn",
    knownAuthorities: ["powertickb2c.b2clogin.com"],
    redirectUri: isLocalhost
      ? "http://localhost:5173/"  // Local Dev
      : "https://www.power-tick.nexelium.mx/", // Azure Production
    postLogoutRedirectUri: isLocalhost
      ? "http://localhost:5173/"
      : "https://www.power-tick.nexelium.mx/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isAzureProd, // Use cookies only in production
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);