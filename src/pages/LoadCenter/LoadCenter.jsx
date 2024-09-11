import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import GaugeContainer from '../LoadCenter/Components/GaugeContainer.jsx'; // Importa el componente GaugeContainer
import './LoadCenter.scss'; // Asegúrate de tener un archivo SCSS para los estilos generales

export default function LoadCenter() {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="page-content">
        <Navbar title="Ubicaciones" />
        {/* Aquí insertamos un contenedor que agrupa las tarjetas */}
        <div className="gauge-section">
          <GaugeContainer title="Centro de carga 1">
            <p>Gráfica del consumo y factor de potencia irá aquí</p>
          </GaugeContainer>
          <GaugeContainer title="Centro de carga 2">
            <p>Gráfica del consumo y factor de potencia irá aquí</p>
          </GaugeContainer>
          <GaugeContainer title="Centro de carga 3">
            <p>Gráfica del consumo y factor de potencia irá aquí</p>
          </GaugeContainer>
          <GaugeContainer title="Centro de carga 4">
            <p>Gráfica del consumo y factor de potencia irá aquí</p>
          </GaugeContainer>
        </div>
      </div>
    </div>
  );
}
