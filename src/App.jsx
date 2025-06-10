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

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import LoadCenter from "./pages/loadCenter";
import Dashboard from "./pages/dashboard";
import UserManual from "./pages/user-manual";
import Downloads from "./pages/downloads";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UpdateLog from "./pages/home/AdditionalPages/UpdateLog";
import CodigoDeRed from "./pages/home/AdditionalPages/CodigoDeRed";
import AcercaDe from "./pages/home/AdditionalPages/AcercaDe";
// Test
import SidebarMenuTest from "./pages/test/SidebarMenuTest";
import MUIComponentsTest from "./pages/test/MUIComponentsTest";

function App() {
  return (
    <Routes>
      {/* Public Routes (Accessible to Everyone) */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home-pages/update-log" element={<UpdateLog />} />
      <Route path="/home-pages/codigo-de-red" element={<CodigoDeRed />} />
      <Route path="/home-pages/acerca-de" element={<AcercaDe />} />

      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/load-center" element={<LoadCenter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-manual" element={<UserManual />} />
          <Route path="/downloads" element={<Downloads />} />
        </Route>
      </Route>

      {/* Test Routes */}
      <Route path="/mui-components-test" element={<MUIComponentsTest />} />
      <Route path="/sidebar-menu-test" element={<SidebarMenuTest />} />
    </Routes>
  );
}

export default App;