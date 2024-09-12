import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MUIComponentsTest from './pages/MUIComponentsTest';
import LoadCenter from '../src/pages/LoadCenter/LoadCenter';



function App() {
  return (
    <Routes>
      {/* Routes without Navbar and Sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/mui-components-test" element={<MUIComponentsTest />} />

    {/* Routes with Navbar and Sidebar */}
    <Route path="/LoadCenter" element={<LoadCenter/>} />

    </Routes>    
  );
}

export default App;