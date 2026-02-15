import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Pago from './components/Pago';
import SeleccionarCita from './components/SeleccionarCita';
import Confirmacion from './components/Confirmacion';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/seleccionar-cita" element={<SeleccionarCita />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
    </Routes>
  );
}

export default App;
