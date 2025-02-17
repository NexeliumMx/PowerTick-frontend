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
 * - 2025-02-08: Initial file creation.
 */

import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "9a8d0881-7579-403a-bdd6-1742c267b394",
    authority: "https://powertickb2c.b2clogin.com/powertickb2c.onmicrosoft.com/B2C_1_SignIn",
    knownAuthorities: ["powertickb2c.b2clogin.com"],
    redirectUri: "http://localhost:5173/",  
    postLogoutRedirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);