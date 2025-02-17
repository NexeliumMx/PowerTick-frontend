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
 * - 2025-02-17: Updated redirect URI for production environment.
 */
import { PublicClientApplication } from "@azure/msal-browser";

const isLocalhost = window.location.hostname === "localhost";

const msalConfig = {
  auth: {
    clientId: "9a8d0881-7579-403a-bdd6-1742c267b394", // Your Azure AD B2C App ID
    authority: isLocalhost
      ? "https://powertickb2c.b2clogin.com/powertickb2c.onmicrosoft.com/B2C_1_SignIn" // Local
      : "https://powertickb2c.b2clogin.com/powertickb2c.onmicrosoft.com/B2C_1_SignIn", // Production
    knownAuthorities: ["powertickb2c.b2clogin.com"],
    redirectUri: isLocalhost
      ? "http://localhost:5173/" // Local Redirect
      : "https://www.power-tick.nexelium.mx/", // Production Redirect
    postLogoutRedirectUri: isLocalhost
      ? "http://localhost:5173/"
      : "https://www.power-tick.nexelium.mx/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: !isLocalhost, // Cookies only in production
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);