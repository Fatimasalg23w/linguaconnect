import { useNavigate } from 'react-router-dom';
import './App.css';

function Terminos() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-header">
        <button className="btn-back" onClick={() => navigate('/')}>← Volver al inicio</button>
        <h1>Términos y Condiciones</h1>
        <p className="legal-date">Última actualización: Febrero 2026</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>1. Aceptación de Términos</h2>
          <p>
            Al inscribirte en LinguaConnectAcademy, aceptas cumplir con estos términos y condiciones. 
            Estos términos rigen tu relación con nuestra academia y el uso de nuestros servicios educativos.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Características del Servicio</h2>
          <h3>2.1 Grupos Pequeños</h3>
          <ul>
            <li>Nuestros grupos tienen un máximo de 25 personas para garantizar atención personalizada</li>
            <li>Cada estudiante recibe seguimiento individual de su progreso</li>
            <li>Los grupos son organizados por nivel según el marco CEFR</li>
          </ul>

          <h3>2.2 Modalidad Virtual</h3>
          <ul>
            <li>Todas las clases son 100% virtuales en línea</li>
            <li>Se requiere conexión a internet estable</li>
            <li>Plataformas de videoconferencia proporcionadas por la academia</li>
          </ul>
        </section>

        <section className="legal-section highlight-section">
          <h2>3. Garantía de Empleo (Plan Premium)</h2>
          <p className="important-notice">
            ⚠️ La garantía de empleo solo aplica para el Plan Premium y está sujeta al cumplimiento 
            de TODOS los siguientes requisitos:
          </p>

          <h3>3.1 Requisitos de Asistencia - Horario de Lunes a Viernes</h3>
          <div className="requirement-box">
            <h4>✓ Asistencia Mínima: 90%</h4>
            <ul>
              <li>Debes asistir al menos al 90% de todas las clases programadas</li>
              <li><strong>Máximo 3 inasistencias por mes</strong></li>
              <li>Más de 3 inasistencias en un mes <strong>anulan la garantía de empleo</strong></li>
            </ul>

            <h4>✓ Inasistencias Justificadas</h4>
            <ul>
              <li>Las inasistencias pueden ser justificadas con documentación real y verificable</li>
              <li>Justificantes válidos:
                <ul>
                  <li>Incapacidad médica (con documento oficial)</li>
                  <li>Emergencia familiar (con comprobante)</li>
                  <li>Caso fortuito o fuerza mayor (documentado)</li>
                </ul>
              </li>
              <li>Los justificantes deben presentarse dentro de las 48 horas posteriores a la inasistencia</li>
              <li><strong>Importante:</strong> Aún justificadas, las inasistencias cuentan para el límite de 3 por mes</li>
            </ul>
          </div>

          <h3>3.2 Requisitos de Asistencia - Horario Sabatino</h3>
          <div className="requirement-box">
            <h4>✓ Asistencia Mínima: 90%</h4>
            <ul>
              <li>Debes asistir al menos al 90% de todas las clases de sábado</li>
              <li><strong>Máximo 1 inasistencia por mes</strong></li>
              <li>Más de 1 inasistencia en un mes <strong>anula la garantía de empleo</strong></li>
            </ul>

            <h4>✓ Reposición de Clases</h4>
            <ul>
              <li>Los estudiantes sabatinos pueden reponer clases en horario semanal</li>
              <li>Sujeto a disponibilidad de cupo en los grupos de L-V</li>
              <li>Debe solicitarse con al menos 24 horas de anticipación</li>
              <li>La reposición no elimina la inasistencia del registro</li>
            </ul>

            <h4>✓ Mismos Requisitos</h4>
            <ul>
              <li>Todos los demás requisitos (evaluaciones, trabajos, calificaciones) aplican igual</li>
            </ul>
          </div>

          <h3>3.3 Requisitos Académicos</h3>
          <div className="requirement-box">
            <h4>✓ Entrega de Trabajos y Tareas: 80% mínimo</h4>
            <ul>
              <li>Debes entregar al menos el 80% de todos los trabajos y tareas asignadas</li>
              <li>Las entregas deben cumplir con los criterios de calidad establecidos</li>
              <li>Entregas fuera de tiempo pueden no contar para el porcentaje</li>
            </ul>

            <h4>✓ Presentación de Exámenes: 80% mínimo</h4>
            <ul>
              <li>Debes presentar al menos el 80% de todos los exámenes programados</li>
              <li>Los exámenes no presentados cuentan como no aprobados</li>
            </ul>

            <h4>✓ Aprobación de Exámenes: 70% mínimo</h4>
            <ul>
              <li>Debes aprobar al menos el 70% de todos los exámenes presentados</li>
              <li>La calificación de cada examen debe ser mínimo 6.0 para considerarse aprobado</li>
            </ul>

            <h4>✓ Calificación Final del Curso: 8.0 mínimo</h4>
            <ul>
              <li>Tu calificación promedio final del curso debe ser mínimo 8.0</li>
              <li>Esta calificación incluye exámenes, trabajos, tareas y participación</li>
            </ul>
          </div>

          <h3>3.4 Alcance de la Garantía</h3>
          <div className="requirement-box">
            <p><strong>Al cumplir TODOS los requisitos anteriores, LinguaConnectAcademy garantiza:</strong></p>
            <ul>
              <li>✓ Acceso a nuestra red de más de 150 empresas asociadas</li>
              <li>✓ Preparación personalizada para entrevistas laborales</li>
              <li>✓ Optimización de CV y perfil profesional</li>
              <li>✓ Conexión directa con empleadores que buscan profesionales bilingües</li>
              <li>✓ Seguimiento durante tus primeros 3 meses de empleo</li>
            </ul>

            <p className="important-notice">
              <strong>Nota importante:</strong> La garantía de empleo no garantiza un puesto específico, 
              salario específico, ni empresa específica. LinguaConnectAcademy se compromete a conectarte 
              con oportunidades laborales reales y apoyarte en tu proceso de búsqueda de empleo.
            </p>
          </div>

          <h3>3.5 Pérdida de la Garantía</h3>
          <div className="warning-box">
            <p><strong>⚠️ La garantía de empleo se pierde automáticamente si:</strong></p>
            <ul>
              <li>❌ Tienes más de 3 inasistencias en un mes (horario L-V)</li>
              <li>❌ Tienes más de 1 inasistencia en un mes (horario sabatino)</li>
              <li>❌ Tu asistencia total es menor al 90%</li>
              <li>❌ Entregas menos del 80% de trabajos y tareas</li>
              <li>❌ Presentas menos del 80% de exámenes</li>
              <li>❌ Apruebas menos del 70% de los exámenes presentados</li>
              <li>❌ Tu calificación final es menor a 8.0</li>
              <li>❌ Abandonas el curso antes de finalizarlo</li>
              <li>❌ Incumples con las políticas de conducta de la academia</li>
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>4. Pagos y Facturación</h2>
          <h3>4.1 Métodos de Pago</h3>
          <ul>
            <li>Tarjeta de crédito/débito (pago inmediato)</li>
            <li>OXXO (pago en efectivo, válido 3 días)</li>
            <li>Transferencia SPEI (válida 24 horas)</li>
          </ul>

          <h3>4.2 Pagos Mensuales</h3>
          <ul>
            <li>Los pagos son mensuales y deben realizarse antes del día 5 de cada mes</li>
            <li>El retraso en pagos puede resultar en suspensión temporal del servicio</li>
            <li>No se realizan devoluciones por clases no tomadas por decisión del estudiante</li>
          </ul>

          <h3>4.3 Descuentos Estudiantes UNAM y Poli</h3>
          <ul>
            <li>15% de reembolso en el primer pago al presentar credencial vigente</li>
            <li>La credencial debe ser verificable y estar vigente</li>
            <li>Aplica solo para estudiantes activos</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Políticas de Clase</h2>
          <h3>5.1 Puntualidad</h3>
          <ul>
            <li>Las clases inician puntualmente según el horario establecido</li>
            <li>Se recomienda conectarse 5 minutos antes del inicio</li>
            <li>Retrasos mayores a 15 minutos pueden contar como inasistencia</li>
          </ul>

          <h3>5.2 Conducta en Clase</h3>
          <ul>
            <li>Se espera respeto hacia profesores y compañeros</li>
            <li>Mantener cámara encendida durante las clases (salvo situación justificada)</li>
            <li>Participación activa en las actividades</li>
            <li>Conductas inapropiadas pueden resultar en expulsión del programa</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Propiedad Intelectual</h2>
          <ul>
            <li>Todo el material didáctico es propiedad de LinguaConnectAcademy</li>
            <li>Prohibida la reproducción, distribución o venta del material</li>
            <li>El material es para uso personal y educativo únicamente</li>
            <li>Las grabaciones de clase no pueden ser compartidas públicamente</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Certificación</h2>
          <ul>
            <li>Se otorga certificado de finalización al completar el curso exitosamente</li>
            <li>El certificado incluye el nivel CEFR alcanzado</li>
            <li>Plan Premium incluye certificación oficial sin costo adicional</li>
            <li>Plan Estándar puede adquirir certificación oficial por separado</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Cancelación y Reembolsos</h2>
          <h3>8.1 Cancelación por el Estudiante</h3>
          <ul>
            <li>Puedes cancelar tu inscripción antes del inicio del curso con reembolso del 100%</li>
            <li>Después del inicio del curso, no hay reembolsos</li>
            <li>Puedes pausar tu curso por razones médicas documentadas (una vez por año)</li>
          </ul>

          <h3>8.2 Cancelación por la Academia</h3>
          <ul>
            <li>LinguaConnectAcademy se reserva el derecho de cancelar grupos con inscripción insuficiente</li>
            <li>En caso de cancelación por la academia, se ofrece reembolso del 100% o cambio de horario</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Limitación de Responsabilidad</h2>
          <ul>
            <li>LinguaConnectAcademy no es responsable por problemas técnicos del estudiante</li>
            <li>No garantizamos resultados específicos en exámenes externos</li>
            <li>La garantía de empleo está sujeta a los términos especificados en la sección 3</li>
            <li>No nos hacemos responsables por el desempeño laboral posterior a la contratación</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>10. Modificaciones a los Términos</h2>
          <p>
            LinguaConnectAcademy se reserva el derecho de modificar estos términos y condiciones. 
            Los cambios serán notificados por correo electrónico con al menos 15 días de anticipación. 
            El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contacto</h2>
          <p>
            Para cualquier duda o aclaración sobre estos términos y condiciones, puedes contactarnos:
          </p>
          <ul>
            <li>📧 Email: info@linguaconnectacademy.com</li>
            <li>💬 WhatsApp: +52 5616726659</li>
            <li>📍 Ubicación: Ciudad de México, México</li>
          </ul>
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

export default Terminos;