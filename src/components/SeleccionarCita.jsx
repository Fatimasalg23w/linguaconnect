import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeleccionarCita.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function SeleccionarCita() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alumnoData } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!alumnoData) {
      navigate('/');
    }
  }, [alumnoData, navigate]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (fecha) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/citas/disponibles?fecha=${fecha}`);
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.horariosDisponibles);
      } else {
        setError('Error al cargar horarios disponibles');
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
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
    setError('');

    try {
      const slot = availableSlots.find(s => s.hora === selectedTime);
      
      const response = await fetch(`${API_URL}/inscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...alumnoData,
          citaExamen: slot.fechaHora
        })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/confirmacion', {
          state: {
            alumno: data.alumno,
            cita: data.cita
          }
        });
      } else {
        setError(data.mensaje || 'Error al confirmar la inscripción');
      }
    } catch (err) {
      console.error('Error al confirmar cita:', err);
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  // Calcular fechas disponibles (próximos 14 días, excluyendo domingos)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir domingos (0)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-MX', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <div className="cita-container">
      <div className="cita-wrapper">
        <div className="cita-header">
          <h1>¡Pago Exitoso! 🎉</h1>
          <p>Ahora programa tu examen de nivelación</p>
        </div>

        <div className="cita-info">
          <div className="info-card">
            <h3>📋 Información del Proceso</h3>
            <ol>
              <li>Selecciona una fecha para tu examen de nivelación</li>
              <li>Elige un horario disponible</li>
              <li>Confirmaremos tu nivel de inglés en la videollamada</li>
              <li>Te asignaremos al grupo correcto según tu resultado</li>
              <li>Recibirás un correo con el link de la videollamada</li>
            </ol>
          </div>

          <div className="alumno-info">
            <h3>👤 Tus Datos</h3>
            <p><strong>Nombre:</strong> {alumnoData?.nombre}</p>
            <p><strong>Plan:</strong> {alumnoData?.plan}</p>
            <p><strong>Nivel Estimado:</strong> {alumnoData?.nivelEstimado}</p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="cita-form">
          <div className="form-section">
            <h3>📅 Selecciona una Fecha</h3>
            <select 
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
              className="date-select"
            >
              <option value="">Elige un día para tu examen</option>
              {availableDates.map(date => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          {selectedDate && (
            <div className="form-section">
              <h3>🕐 Selecciona un Horario</h3>
              {loading ? (
                <div className="loading-spinner">Cargando horarios...</div>
              ) : (
                <div className="time-slots">
                  {availableSlots.length === 0 ? (
                    <p className="no-slots">No hay horarios disponibles para esta fecha</p>
                  ) : (
                    availableSlots.map(slot => (
                      <button
                        key={slot.hora}
                        className={`time-slot ${selectedTime === slot.hora ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(slot.hora)}
                        disabled={!slot.disponible}
                      >
                        {slot.hora}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="cita-resumen">
              <h3>✓ Resumen de tu Cita</h3>
              <p className="cita-detalle">
                <strong>Fecha:</strong> {availableDates.find(d => d.value === selectedDate)?.label}
              </p>
              <p className="cita-detalle">
                <strong>Hora:</strong> {selectedTime} (Hora de México)
              </p>
              <p className="cita-nota">
                ℹ️ Duración aproximada: 60 minutos
              </p>
            </div>
          )}

          <div className="cita-actions">
            <button 
              className="btn-confirmar"
              onClick={confirmarCita}
              disabled={!selectedDate || !selectedTime || loading}
            >
              {loading ? 'Procesando...' : 'Confirmar Cita'}
            </button>
            <button 
              className="btn-cancelar"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeleccionarCita;
