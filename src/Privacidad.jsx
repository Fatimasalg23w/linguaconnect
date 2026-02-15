import { useNavigate } from 'react-router-dom';
import './App.css';

function Privacidad() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="btn-back" onClick={() => navigate('/')}>← Volver al inicio</button>
        <h1>Política de Privacidad</h1>
        <p className="legal-date">Última actualización: Febrero 2026</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. Introducción</h2>
          <p>
            En LinguaConnectAcademy, respetamos y protegemos la privacidad de nuestros estudiantes. 
            Esta política describe qué información recopilamos, cómo la utilizamos y cómo la protegemos.
          </p>
        </section>

        <section className="legal-section highlight-section">
          <h2>2. Información que Recopilamos</h2>
          
          <h3>2.1 Información Personal</h3>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Fecha de nacimiento</li>
            <li>País de residencia</li>
          </ul>

          <h3>2.2 Información Académica</h3>
          <ul>
            <li>Nivel de inglés inicial y progreso</li>
            <li>Calificaciones y evaluaciones</li>
            <li>Asistencia a clases</li>
            <li>Trabajos y tareas entregadas</li>
            <li>Certificaciones obtenidas</li>
          </ul>

          <h3>2.3 Información de Pago</h3>
          <ul>
            <li>Método de pago utilizado</li>
            <li>Historial de pagos</li>
            <li><strong>Importante:</strong> No almacenamos información completa de tarjetas de crédito</li>
            <li>Los datos de pago son procesados de forma segura por Conekta</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Uso de la Información</h2>
          
          <div className="requirement-box">
            <h3>3.1 Procesamiento de Pagos</h3>
            <p>Utilizamos tu información para:</p>
            <ul>
              <li>✓ Procesar tus pagos mensuales</li>
              <li>✓ Emitir facturas y recibos</li>
              <li>✓ Gestionar reembolsos cuando aplique</li>
              <li>✓ Verificar descuentos estudiantiles</li>
            </ul>
          </div>

          <div className="requirement-box">
            <h3>3.2 Entrega de Diplomas y Certificaciones</h3>
            <p>Utilizamos tu información para:</p>
            <ul>
              <li>✓ Generar certificados oficiales con tu nombre</li>
              <li>✓ Enviar diplomas digitales y físicos</li>
              <li>✓ Mantener registro de certificaciones otorgadas</li>
              <li>✓ Verificar autenticidad de certificados si es requerido</li>
            </ul>
          </div>

          <div className="requirement-box">
            <h3>3.3 Conexión con Empresas (Solo si el alumno lo solicita)</h3>
            <p>
              <strong>IMPORTANTE:</strong> Solo compartimos tu información con empresas empleadoras 
              si tú lo autorizas explícitamente.
            </p>
            <p>Cuando solicitas ayuda para conseguir empleo, utilizamos tu información para:</p>
            <ul>
              <li>✓ Conectarte con empresas que buscan profesionales bilingües</li>
              <li>✓ Compartir tu CV y nivel de inglés con empleadores potenciales</li>
              <li>✓ Recomendar vacantes acordes a tu perfil</li>
              <li>✓ Coordinar entrevistas con empresas asociadas</li>
            </ul>
            <p className="important-notice">
              ⚠️ Si NO solicitas ayuda laboral, tu información NO será compartida con ninguna empresa.
            </p>
          </div>

          <h3>3.4 Mejora del Servicio Educativo</h3>
          <ul>
            <li>Personalizar tu experiencia de aprendizaje</li>
            <li>Mejorar nuestros métodos de enseñanza</li>
            <li>Analizar el progreso general de los estudiantes</li>
            <li>Desarrollar nuevo material didáctico</li>
          </ul>

          <h3>3.5 Comunicación</h3>
          <ul>
            <li>Enviar recordatorios de clases</li>
            <li>Notificar sobre cambios de horario</li>
            <li>Compartir material de estudio</li>
            <li>Enviar información sobre nuevos cursos (puedes darte de baja en cualquier momento)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Protección de tu Información</h2>
          
          <h3>4.1 Medidas de Seguridad</h3>
          <ul>
            <li>🔒 Encriptación SSL/TLS para todas las transmisiones de datos</li>
            <li>🔒 Servidores seguros con acceso restringido</li>
            <li>🔒 Respaldos periódicos de información</li>
            <li>🔒 Autenticación de dos factores para acceso administrativo</li>
          </ul>

          <h3>4.2 Acceso a la Información</h3>
          <p><strong>¿Quién tiene acceso a tu información?</strong></p>
          <ul>
            <li>✓ Personal autorizado de LinguaConnectAcademy</li>
            <li>✓ Profesores asignados a tus clases (solo información académica)</li>
            <li>✓ Procesadores de pago (Conekta) para transacciones</li>
            <li>✓ Empresas empleadoras (solo si TÚ lo autorizas)</li>
          </ul>

          <h3>4.3 Lo que NO hacemos con tu información</h3>
          <div className="warning-box">
            <p><strong>❌ NUNCA:</strong></p>
            <ul>
              <li>❌ Vendemos tu información personal a terceros</li>
              <li>❌ Compartimos tu información con fines publicitarios</li>
              <li>❌ Enviamos tu información a empresas sin tu consentimiento</li>
              <li>❌ Publicamos tus calificaciones o información académica</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>5. Tus Derechos</h2>
          
          <h3>5.1 Acceso a tu Información</h3>
          <ul>
            <li>Puedes solicitar una copia de toda la información que tenemos sobre ti</li>
            <li>Respondemos a solicitudes en un máximo de 15 días hábiles</li>
          </ul>

          <h3>5.2 Corrección de Datos</h3>
          <ul>
            <li>Puedes solicitar corrección de información incorrecta</li>
            <li>Puedes actualizar tus datos de contacto en cualquier momento</li>
          </ul>

          <h3>5.3 Eliminación de Datos</h3>
          <ul>
            <li>Puedes solicitar la eliminación de tu información personal</li>
            <li>Algunas informaciones (historial académico, pagos) deben conservarse por obligaciones legales</li>
            <li>La eliminación puede tardar hasta 30 días en completarse</li>
          </ul>

          <h3>5.4 Portabilidad</h3>
          <ul>
            <li>Puedes solicitar tus datos en formato electrónico portable</li>
            <li>Puedes transferir tus datos a otro servicio educativo</li>
          </ul>

          <h3>5.5 Oposición al Uso de Datos</h3>
          <ul>
            <li>Puedes oponerte al uso de tus datos para fines de marketing</li>
            <li>Puedes retirar tu consentimiento para compartir información con empresas</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Cookies y Tecnologías Similares</h2>
          <ul>
            <li>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web</li>
            <li>Las cookies nos ayudan a recordar tus preferencias</li>
            <li>Puedes desactivar las cookies en tu navegador</li>
            <li>Algunas funcionalidades pueden no estar disponibles sin cookies</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Compartir Información con Terceros</h2>
          
          <h3>7.1 Procesadores de Servicios</h3>
          <p>Compartimos información limitada con:</p>
          <ul>
            <li><strong>Conekta:</strong> Para procesar pagos de forma segura</li>
            <li><strong>Proveedores de email:</strong> Para enviar comunicaciones</li>
            <li><strong>Servicios de videoconferencia:</strong> Para impartir clases virtuales</li>
          </ul>
          <p>Todos estos proveedores están obligados contractualmente a proteger tu información.</p>

          <h3>7.2 Empresas Empleadoras</h3>
          <ul>
            <li>Solo compartimos información si TÚ lo solicitas para búsqueda de empleo</li>
            <li>Compartimos solo información relevante (nivel de inglés, certificaciones, CV)</li>
            <li>Las empresas deben cumplir con políticas de privacidad</li>
            <li>Puedes revocar tu autorización en cualquier momento</li>
          </ul>

          <h3>7.3 Requerimientos Legales</h3>
          <ul>
            <li>Podemos compartir información si es requerido por ley</li>
            <li>Cooperamos con autoridades cuando es legalmente necesario</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Retención de Datos</h2>
          <ul>
            <li><strong>Información personal:</strong> Mientras seas estudiante activo + 5 años</li>
            <li><strong>Información académica:</strong> 10 años para verificación de certificados</li>
            <li><strong>Información de pagos:</strong> 10 años por obligaciones fiscales</li>
            <li>Puedes solicitar eliminación anticipada excepto donde sea legalmente requerido</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Transferencias Internacionales</h2>
          <ul>
            <li>Tu información se almacena principalmente en servidores en México</li>
            <li>Algunos servicios pueden usar servidores en Estados Unidos</li>
            <li>Todos los servidores cumplen con estándares internacionales de seguridad</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. Menores de Edad</h2>
          <ul>
            <li>Aceptamos estudiantes mayores de 16 años</li>
            <li>Menores de 18 requieren consentimiento de padre o tutor</li>
            <li>Los padres tienen derecho de acceder a la información de sus hijos menores</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cambios 
            significativos por correo electrónico. La fecha de última actualización siempre estará visible 
            al inicio de este documento.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos:
          </p>
          <ul>
            <li>📧 Email: privacidad@linguaconnectacademy.com</li>
            <li>💬 WhatsApp: +52 55 1234 5678</li>
            <li>📍 Ubicación: Ciudad de México, México</li>
          </ul>
          <p>
            <strong>Oficial de Protección de Datos:</strong> Responderemos a tu solicitud en un máximo de 15 días hábiles.
          </p>
        </section>
      </div>

      <div className="legal-footer">
        <button className="btn-primary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Privacidad;
