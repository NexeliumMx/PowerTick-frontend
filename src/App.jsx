/**
 * FileName: src/App.jsx
* Author(s): Arturo Vargas
 * Brief: Defines the main routing structure for the application.
 * Date: 2024-08-20
 *
 * Description:
 * This file is responsible for setting up the application's routing using `react-router-dom`. 
 * It defines both public and authenticated routes, incorporating different pages and layouts.
 * Routes without the navbar and sidebar are rendered independently, while other routes are wrapped 
 * inside the `MainLayout` component for a consistent UI experience.
 * 
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 *
 * Version History:
 * - 2024-09-11: Added NotFound page and updated routes.
 * - 2024-10-04: Added User Manual and Add Meter routes.
 * - 2025-02-16: Implemented ProtectedRoute for authenticated routes.
 */

import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;