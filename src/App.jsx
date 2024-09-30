import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import LoadCenter from './pages/loadCenter';
import Dashboard from './pages/dashboard';
import Downloads from './pages/downloads';
import Users from './pages/users';
import NewUser from './pages/users/NewUser';

//Test
import SidebarMenuTest from './pages/test/SidebarMenuTest';
import MUIComponentsTest from './pages/test/MUIComponentsTest';

function App() {
  return (
    <Routes>
      {/* Routes without Navbar and Sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      

      {/* Routes with Navbar (and Sidebar in the future) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/load-center" element={<LoadCenter />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users-new" element={<NewUser />} />
        <Route path="/mui-components-test" element={<MUIComponentsTest />} />
      </Route>

      {/* Test Routes */}
      <Route path="/sidebar-menu-test" element={<SidebarMenuTest />} />
    </Routes>
  );
}

export default App;