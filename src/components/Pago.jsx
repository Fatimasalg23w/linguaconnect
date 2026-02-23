import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Pago.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Pago() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, precio } = location.state || {};

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    horario: '',
    nivelEstimado: '',
    cupon: ''
  });

  const [cuponInfo, setCuponInfo] = useState({
    aplicado: false,
    descuento: 0,
    tipo: 'porcentaje',
    mensaje: ''
  });

  const [precioFinal, setPrecioFinal] = useState(precio || 2435);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!plan || !precio) {
      navigate('/');
    }
  }, [plan, precio, navigate]);

  const calcularPrecioFinal = () => {
    if (!cuponInfo.aplicado) return precio;
    if (cuponInfo.tipo === 'porcentaje') {
      return precio - (precio * (cuponInfo.descuento / 100));
    } else {
      return precio - cuponInfo.descuento;
    }
  };

  useEffect(() => {
    setPrecioFinal(calcularPrecioFinal());
  }, [cuponInfo, precio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const verificarCupon = async () => {
    if (!formData.cupon.trim()) return;
    setLoading(true);
    setError('');
    try {
      const planType = plan.toLowerCase().includes('premium') ? 'premium' : 'estandar';
      const response = await fetch(`${API_URL}/cupones/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: formData.cupon, plan: planType })
      });
      const data = await response.json();
      if (data.valido) {
        setCuponInfo({
          aplicado: true,
          descuento: data.descuento,
          tipo: data.tipo,
          mensaje: data.mensaje
        });
      } else {
        setError(data.mensaje);
        setCuponInfo({ aplicado: false, descuento: 0, tipo: 'porcentaje', mensaje: '' });
      }
    } catch (err) {
      setError('Error al verificar el cupón. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const eliminarCupon = () => {
    setCuponInfo({ aplicado: false, descuento: 0, tipo: 'porcentaje', mensaje: '' });
    setFormData(prev => ({ ...prev, cupon: '' }));
  };

  // Validar campos antes de ir a Conekta
  const validarFormulario = () => {
    if (!formData.nombre.trim()) return 'El nombre es requerido';
    if (!formData.correo.trim() || !formData.correo.includes('@')) return 'Correo electrónico inválido';
    if (!formData.telefono.trim() || formData.telefono.length < 10) return 'Teléfono inválido (mínimo 10 dígitos)';
    if (!formData.horario) return 'Selecciona un horario';
    if (!formData.nivelEstimado) return 'Selecciona tu nivel de inglés';
    return null;
  };

  const procesarPago = async (e) => {
    e.preventDefault();
    setError('');

    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setLoading(true);

    try {
      // Guardamos los datos del alumno en localStorage para recuperarlos
      // después de que Conekta regrese con el pago exitoso
      localStorage.setItem('linguaconnect_alumno', JSON.stringify({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        horario: formData.horario,
        nivelEstimado: formData.nivelEstimado,
        plan: plan,
        montoPagado: precioFinal,
        cuponCodigo: cuponInfo.aplicado ? formData.cupon : null,
        descuentoAplicado: cuponInfo.aplicado ? cuponInfo.descuento : 0
      }));

      // Llamar al backend para crear la orden en Conekta
      const response = await fetch(`${API_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          telefono: formData.telefono,
          plan: plan,
          montoPagado: precioFinal,
          cuponCodigo: cuponInfo.aplicado ? formData.cupon : null,
          nivelEstimado: formData.nivelEstimado,
          horario: formData.horario
        })
      });

      const data = await response.json();

      if (data.success && data.checkout_url) {
        // Redirigir al checkout seguro de Conekta
        // El usuario pagará ahí y Conekta lo regresará a /seleccionar-cita
        window.location.href = data.checkout_url;
      } else {
        setError(data.mensaje || 'Error al crear la orden de pago');
      }
    } catch (err) {
      console.error('Error al procesar pago:', err);
      setError('Error de conexión con el servidor. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pago-container">
      <div className="pago-wrapper">
        <div className="pago-header">
          <h1>Proceso de Pago</h1>
          <p>Plan seleccionado: <strong>{plan}</strong></p>
        </div>

        <div className="pago-content">
          {/* Resumen de compra */}
          <div className="resumen-compra">
            <h2>Resumen de Compra</h2>
            <div className="resumen-item">
              <span>Plan {plan}</span>
              <span>${precio?.toLocaleString('es-MX')} MXN</span>
            </div>

            {cuponInfo.aplicado && (
              <div className="resumen-item descuento">
                <span>Descuento ({formData.cupon})</span>
                <span className="descuento-monto">
                  -{cuponInfo.tipo === 'porcentaje'
                    ? `${cuponInfo.descuento}%`
                    : `$${cuponInfo.descuento}`}
                </span>
              </div>
            )}

            <div className="resumen-divider"></div>

            <div className="resumen-total">
              <span>Total a Pagar</span>
              <span className="total-monto">
                ${precioFinal?.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
              </span>
            </div>

            <div className="resumen-beneficios">
              <h3>✓ Incluye:</h3>
              <ul>
                <li>Acceso inmediato a la plataforma</li>
                <li>Material didáctico completo</li>
                <li>Clases en vivo</li>
                <li>Certificación al terminar</li>
                {plan?.toLowerCase().includes('premium') && (
                  <>
                    <li>Garantía de empleo</li>
                    <li>Asesoría laboral</li>
                  </>
                )}
              </ul>
            </div>

            {/* Métodos de pago aceptados */}
            <div className="metodos-pago-info">
              <h3>Métodos de pago aceptados:</h3>
              <p>💳 Tarjeta de crédito / débito</p>
              <p>🏪 Pago en 7eleven,Farmacias del ahorro,Extra,Farmacias Benavides y más.</p>
              <p>🏦 Transferencia bancaria</p>
              <p className="conekta-nota">🔒 Pagos procesados de forma segura</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="pago-form-container">
            <form className="pago-form" onSubmit={procesarPago}>
              {error && (
                <div className="error-message">{error}</div>
              )}

              <div className="form-section">
                <h3>📋 Información Personal</h3>

                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Juan Pérez García"
                  />
                </div>

                <div className="form-group">
                  <label>Correo Electrónico *</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    placeholder="juan.perez@ejemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    placeholder="5512345678"
                  />
                </div>

                <div className="form-group">
                  <label>Horario Preferido *</label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un horario</option>
                    <option value="lunes-viernes-noche">Lunes a Viernes — 8:00 PM a 9:00 PM</option>
                    <option value="sabado-matutino">Sábados — 9:00 AM a 2:00 PM</option>
                    <option value="sabado-vespertino">Sábados — 4:00 PM a 8:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nivel de Inglés Estimado *</label>
                  <select
                    name="nivelEstimado"
                    value={formData.nivelEstimado}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona tu nivel</option>
                    <option value="A1">A1 — Principiante</option>
                    <option value="A2">A2 — Elemental</option>
                    <option value="B1">B1 — Intermedio</option>
                    <option value="B2">B2 — Intermedio Alto</option>
                    <option value="C1">C1 — Avanzado</option>
                    <option value="C2">C2 — Maestría</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>🎫 Cupón de Descuento</h3>
                <div className="cupon-input-group">
                  <input
                    type="text"
                    name="cupon"
                    value={formData.cupon}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu cupón"
                    disabled={cuponInfo.aplicado}
                  />
                  {!cuponInfo.aplicado ? (
                    <button
                      type="button"
                      onClick={verificarCupon}
                      disabled={loading || !formData.cupon.trim()}
                      className="btn-verificar"
                    >
                      {loading ? '...' : 'Aplicar'}
                    </button>
                  ) : (
                    <button type="button" onClick={eliminarCupon} className="btn-eliminar">✕</button>
                  )}
                </div>
                {cuponInfo.mensaje && (
                  <div className="cupon-mensaje success">{cuponInfo.mensaje}</div>
                )}
              </div>

              <div className="info-box">
                🔒 Al hacer clic en "Continuar al pago" serás redirigido a la página segura de Conekta 
                donde podrás pagar con tarjeta, OXXO o transferencia bancaria.
              </div>

              <button
                type="submit"
                className="btn-pagar"
                disabled={loading}
              >
                {loading
                  ? 'Procesando...'
                  : `Continuar al pago — $${precioFinal?.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pago;