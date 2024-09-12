import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MUIComponentsTest from './pages/MUIComponentsTest';
<<<<<<< HEAD
import LayoutWithSidebarAndNavbar from './components/LayoutWithSidebarAndNavbar';
import LoadCenter from './pages/LoadCenter/LoadCenter';
=======
import MainLayout from './layout/MainLayout';
>>>>>>> 43def01a7dbc250efede61e52dee904a8d42c451

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
      </Route>
    </Routes>
  );
}

export default App;