import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Confirmacion.css';

function Confirmacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alumno, cita } = location.state || {};

  useEffect(() => {
    if (!alumno || !cita) {
      navigate('/');
    }
  }, [alumno, cita, navigate]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="confirmacion-container">
      <div className="confirmacion-wrapper">
        <div className="success-icon">✓</div>
        
        <h1>¡Inscripción Exitosa!</h1>
        <p className="subtitle">Bienvenido a LinguaConnect Academy</p>

        <div className="confirmacion-content">
          <div className="info-section">
            <h2>📧 Confirmación Enviada</h2>
            <p>
              Hemos enviado un correo electrónico a <strong>{alumno?.correo}</strong> con 
              toda la información de tu inscripción y el link para tu examen de nivelación.
            </p>
          </div>

          <div className="cita-info-box">
            <h2>📅 Tu Cita para Examen de Nivelación</h2>
            <div className="cita-detalles">
              <div className="detalle-item">
                <span className="icon">📆</span>
                <div>
                  <p className="label">Fecha y Hora</p>
                  <p className="value">{formatearFecha(cita?.fechaHora)}</p>
                </div>
              </div>

              <div className="detalle-item">
                <span className="icon">🎥</span>
                <div>
                  <p className="label">Link de Videollamada</p>
                  <a href={cita?.linkVideoLlamada} className="link-video" target="_blank" rel="noreferrer">
                    {cita?.linkVideoLlamada}
                  </a>
                </div>
              </div>

              <div className="detalle-item">
                <span className="icon">⏱️</span>
                <div>
                  <p className="label">Duración</p>
                  <p className="value">60 minutos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="plan-info-box">
            <h2>📚 Tu Plan</h2>
            <p><strong>Plan:</strong> {alumno?.plan}</p>
            <p><strong>Nivel Estimado:</strong> {location.state?.nivelEstimado}</p>
            <p className="nota">
              * Tu nivel será confirmado después del examen. Si resulta diferente al estimado, 
              te asignaremos automáticamente al grupo correcto.
            </p>
          </div>

          <div className="next-steps">
            <h2>📋 Próximos Pasos</h2>
            <ol>
              <li>
                <strong>Revisa tu correo</strong> - Encontrarás toda la información y el link de videollamada
              </li>
              <li>
                <strong>Prepárate para tu examen</strong> - Asegúrate de tener buena conexión a internet
              </li>
              <li>
                <strong>Únete a la videollamada</strong> - 5 minutos antes de la hora programada
              </li>
              <li>
                <strong>Realiza el examen</strong> - Evaluaremos tu nivel actual de inglés
              </li>
              <li>
                <strong>Recibe tu asignación</strong> - Te diremos en qué nivel comenzarás
              </li>
              <li>
                <strong>¡Comienza tus clases!</strong> - El próximo 16 del mes
              </li>
            </ol>
          </div>

          <div className="contact-info">
            <h3>¿Tienes Preguntas?</h3>
            <p>Contáctanos en cualquier momento:</p>
            <div className="contact-methods">
              <a href="mailto:info@linguaconnectacademy.com" className="contact-btn">
                📧 Enviar Email
              </a>
              <a href="https://wa.me/525512345678" className="contact-btn" target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </div>
          </div>

          <button 
            className="btn-volver"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmacion;
