import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import MainLayout from "../layout/MainLayout";
import LoadCenter from "../pages/loadCenter";
import Dashboard from "../pages/dashboard";
import UserManual from "../pages/user-manual";
import Downloads from "../pages/downloads";
import ProtectedRoute from "./ProtectedRoute";
import UpdateLog from "../pages/home/AdditionalPages/UpdateLog";
import CodigoDeRed from "../pages/home/AdditionalPages/CodigoDeRed";
import About from "../pages/home/AdditionalPages/About";
// Test
import SidebarMenuTest from "../pages/test/SidebarMenuTest";
import MUIComponentsTest from "../pages/test/MUIComponentsTest";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes (Accessible to Everyone) */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home-pages/update-log" element={<UpdateLog />} />
      <Route path="/home-pages/codigo-de-red" element={<CodigoDeRed />} />
      <Route path="/home-pages/about" element={<About />} />

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

export default AppRoutes;
