import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>PowerTIC</h1>
      <Button variant="contained">Hello world</Button>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Go to Dashboard
      </button>
    </div>
  );
}