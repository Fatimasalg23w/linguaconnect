import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Pago from './components/Pago';
import SeleccionarCita from './components/SeleccionarCita';
import Confirmacion from './components/Confirmacion';
import Terminos from './Terminos';
import Privacidad from './Privacidad';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/seleccionar-cita" element={<SeleccionarCita />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/privacidad" element={<Privacidad />} />
    </Routes>
  );
}

export default App;