import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MUIComponentsTest from './pages/MUIComponentsTest';
import MainLayout from './layout/MainLayout';
import LoadCenter from './pages/LoadCenter/LoadCenter';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      {/* Routes without Navbar and Sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      {/* Routes with Navbar (and Sidebar in the future) */}
      <Route element={<MainLayout />}>
        <Route path="/mui-components-test" element={<MUIComponentsTest />} />
        <Route path="/LoadCenter" element={<LoadCenter />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;