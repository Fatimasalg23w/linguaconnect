import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeleccionarCita.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function PendienteEfectivo() {
  const navigate = useNavigate();
  const alumnoData = JSON.parse(sessionStorage.getItem('linguaconnect_alumno') || 'null');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [citaConfirmada, setCitaConfirmada] = useState(false);

  useEffect(() => {
    if (!alumnoData) navigate('/');
  }, []);

  useEffect(() => {
    if (selectedDate) fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  const fetchAvailableSlots = async (fecha) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/citas/disponibles?fecha=${fecha}`);
      const data = await response.json();
      if (response.ok) setAvailableSlots(data.horariosDisponibles);
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const confirmarCita = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Por favor selecciona una fecha y hora');
      return;
    }
    setLoading(true);
    try {
      const slot = availableSlots.find(s => s.hora === selectedTime);
      const response = await fetch(`${API_URL}/inscripcion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...alumnoData, citaExamen: slot.fechaHora, estadoPago: 'pendiente' })
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.removeItem('linguaconnect_alumno');
        setCitaConfirmada(true);
      } else {
        setError(data.mensaje || 'Error al confirmar');
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-MX', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })
        });
      }
    }
    return dates;
  };

  if (citaConfirmada) {
    return (
      <div className="cita-container">
        <div className="cita-wrapper">
          <div className="cita-header">
            <h1>⏳ Pago Pendiente</h1>
            <p>Tu cita quedó reservada mientras confirmas tu pago</p>
          </div>
          <div className="info-card" style={{margin: '2rem 0', padding: '2rem'}}>
            <h3>📋 Próximos Pasos</h3>
            <ol>
              <li>Completa tu pago en OXXO o por transferencia bancaria</li>
              <li>Envía tu comprobante a <strong>academylinguaconnect@gmail.com</strong></li>
              <li>Confirmaremos tu inscripción en menos de 24 horas</li>
              <li>Tu cita de examen quedará confirmada una vez verificado el pago</li>
            </ol>
          </div>
          <button className="btn-confirmar" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      </div>
    );
  }

  const availableDates = getAvailableDates();

  return (
    <div className="cita-container">
      <div className="cita-wrapper">
        <div className="cita-header">
          <h1>⏳ Pago en Proceso</h1>
          <p>Reserva tu cita mientras confirmas tu pago en efectivo o transferencia</p>
        </div>

        <div className="info-card" style={{margin: '1rem 0', padding: '1.5rem', background: '#fff3cd', borderRadius: '8px'}}>
          <p>⚠️ Tu inscripción se confirmará una vez que verifiquemos tu pago. Puedes reservar tu cita ahora.</p>
        </div>

        <div className="alumno-info">
          <h3>👤 Tus Datos</h3>
          <p><strong>Nombre:</strong> {alumnoData?.nombre}</p>
          <p><strong>Plan:</strong> {alumnoData?.plan}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="cita-form">
          <div className="form-section">
            <h3>📅 Selecciona una Fecha</h3>
            <select
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
              className="date-select"
            >
              <option value="">Elige un día para tu examen</option>
              {availableDates.map(date => (
                <option key={date.value} value={date.value}>{date.label}</option>
              ))}
            </select>
          </div>

          {selectedDate && (
            <div className="form-section">
              <h3>🕐 Selecciona un Horario</h3>
              {loading ? <div className="loading-spinner">Cargando...</div> : (
                <div className="time-slots">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.hora}
                      className={`time-slot ${selectedTime === slot.hora ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(slot.hora)}
                    >
                      {slot.hora}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="cita-actions">
            <button
              className="btn-confirmar"
              onClick={confirmarCita}
              disabled={!selectedDate || !selectedTime || loading}
            >
              {loading ? 'Procesando...' : 'Reservar Cita'}
            </button>
            <button className="btn-cancelar" onClick={() => navigate('/')}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendienteEfectivo;