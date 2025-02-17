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
 * - 2024-08-20: Initial file creation.
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
import Downloads from "./pages/downloads";
import Users from "./pages/users";
import UserForm from "./pages/users/components/UserForm";
import Locations from "./pages/locations";
import Calendar from "./pages/calendar";
import Substations from "./pages/substations";
import FAQ from "./pages/faq";
import UserManual from "./pages/user-manual";
import AddMeter from "./pages/add-meter";
import Footer from "./components/ui/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute

// Test
import SidebarMenuTest from "./pages/test/SidebarMenuTest";
import MUIComponentsTest from "./pages/test/MUIComponentsTest";

function App() {
  return (
    <Routes>
      {/* Public Routes (Accessible to Everyone) */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/load-center" element={<LoadCenter />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users-new" element={<UserForm />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/substations" element={<Substations />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/user-manual" element={<UserManual />} />
          <Route path="/add-meter" element={<AddMeter />} />
          <Route path="/mui-components-test" element={<MUIComponentsTest />} />
        </Route>
      </Route>

      {/* Test Routes */}
      <Route path="/sidebar-menu-test" element={<SidebarMenuTest />} />
      <Route path="/footer" element={<Footer />} />
    </Routes>
  );
}

export default App;