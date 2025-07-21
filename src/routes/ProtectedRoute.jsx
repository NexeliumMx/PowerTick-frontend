/**
 * FileName: src/components/auth/ProtectedRoute.jsx
 * Author(s): Arturo Vargas
 * Brief: Protects authenticated routes by restricting access to logged-in users.
 * Date: 2025-02-15
 *
 * Description:
 * This component ensures that only authenticated users can access specific routes. 
 * It utilizes `@azure/msal-react` to verify authentication status.
 * 
 * Functionality:
 * - If the user is authenticated, it renders the requested route (`<Outlet />`).
 * - If the user is not authenticated, it redirects them to the Home page (`/`).
 * - Works as a wrapper around protected routes in `App.jsx` to enforce authentication.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 *
 * Version History:
 * - 2025-02-15: Initial file creation.
 * - 2025-02-15: Implemented redirect logic for unauthenticated users.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

/**
 * ProtectedRoute Component
 * Ensures only authenticated users can access protected pages.
 * Redirects unauthenticated users to the Home page.
 */
const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;