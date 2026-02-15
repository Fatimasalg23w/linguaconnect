import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function PaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, precio } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentReference, setPaymentReference] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const publicKey = import.meta.env.VITE_CONEKTA_PUBLIC_KEY || 'key_KJysdbf6PotS2ut2';
      window.Conekta.setPublicKey(publicKey);
      window.Conekta.setLanguage('es');
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardPayment = async () => {
    return new Promise((resolve, reject) => {
      const tokenParams = {
        card: {
          number: formData.cardNumber.replace(/\s/g, ''),
          name: formData.cardName,
          exp_year: formData.expiryYear,
          exp_month: formData.expiryMonth,
          cvc: formData.cvv
        }
      };

      window.Conekta.Token.create(tokenParams, 
        (token) => {
          resolve({ type: 'card', token: token.id });
        },
        (error) => {
          reject(error.message_to_purchaser || 'Error al procesar la tarjeta');
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPaymentReference(null);

    try {
      let paymentData = {
        plan: plan,
        amount: precio * 100,
        customer: {
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono
        },
        paymentMethod: paymentMethod
      };

      if (paymentMethod === 'card') {
        const cardData = await handleCardPayment();
        paymentData.token = cardData.token;
      }

      const response = await fetch('http://localhost:5000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (paymentMethod === 'card') {
          alert('¡Pago procesado exitosamente! Recibirás un correo de confirmación.');
          navigate('/');
        } else {
          setPaymentReference(result.reference);
        }
      } else {
        throw new Error(result.message || 'Error al procesar el pago');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Hubo un error al procesar el pago. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  if (!plan || !precio) {
    return (
      <div style={{padding: '4rem 2rem', textAlign: 'center'}}>
        <h2>No hay plan seleccionado</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  if (paymentReference) {
    return (
      <div className="payment-container">
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <h2>¡Referencia de Pago Generada!</h2>
          
          {paymentMethod === 'oxxo' && (
            <div className="payment-reference-card oxxo-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Oxxo_Logo.svg/200px-Oxxo_Logo.svg.png" alt="OXXO" style={{width: '120px', marginBottom: '1rem'}} />
              <h3>Paga en cualquier OXXO</h3>
              <div className="reference-number">
                <label>Número de referencia:</label>
                <div className="reference-value">{paymentReference.reference}</div>
              </div>
              <div className="amount-to-pay">
                <label>Monto a pagar:</label>
                <div className="amount-value">${precio.toLocaleString('es-MX')} MXN</div>
              </div>
              <div className="expiration-info">
                <p>⏰ Esta referencia expira en 3 días</p>
                <p>📧 También enviamos esta información a {formData.email}</p>
              </div>
              <div className="payment-instructions">
                <h4>Instrucciones:</h4>
                <ol>
                  <li>Acude a cualquier tienda OXXO</li>
                  <li>Indica que quieres realizar un pago de servicio CONEKTA</li>
                  <li>Proporciona el número de referencia</li>
                  <li>Realiza el pago en efectivo</li>
                  <li>Conserva tu comprobante</li>
                </ol>
              </div>
            </div>
          )}

          {paymentMethod === 'spei' && (
            <div className="payment-reference-card spei-card">
              <h3>Transferencia SPEI</h3>
              <div className="bank-info">
                <div className="info-row">
                  <label>CLABE:</label>
                  <div className="info-value">{paymentReference.clabe}</div>
                </div>
                <div className="info-row">
                  <label>Banco:</label>
                  <div className="info-value">STP</div>
                </div>
                <div className="info-row">
                  <label>Monto exacto:</label>
                  <div className="info-value">${precio.toLocaleString('es-MX')} MXN</div>
                </div>
              </div>
              <div className="expiration-info">
                <p>⏰ Esta CLABE expira en 24 horas</p>
                <p>📧 También enviamos esta información a {formData.email}</p>
              </div>
              <div className="payment-instructions">
                <h4>Instrucciones:</h4>
                <ol>
                  <li>Ingresa a tu banca en línea</li>
                  <li>Selecciona transferencia SPEI</li>
                  <li>Ingresa la CLABE proporcionada</li>
                  <li>El monto debe ser exacto: ${precio.toLocaleString('es-MX')} MXN</li>
                  <li>Confirma la transferencia</li>
                </ol>
              </div>
            </div>
          )}

          <div className="payment-actions">
            <button className="btn-primary" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => window.print()}
            >
              Imprimir referencia
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Completar Pago</h1>
        <div className="plan-summary">
          <h3>{plan}</h3>
          <p className="price">${precio.toLocaleString('es-MX')} MXN/mes</p>
        </div>
      </div>

      <div className="payment-methods">
        <h3>Selecciona tu método de pago</h3>
        <div className="payment-method-grid">
          <button
            type="button"
            className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="method-icon">💳</div>
            <div className="method-name">Tarjeta de crédito/débito</div>
            <div className="method-subtitle">Pago inmediato</div>
          </button>

          <button
            type="button"
            className={`payment-method-btn ${paymentMethod === 'oxxo' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('oxxo')}
          >
            <div className="method-icon">🏪</div>
            <div className="method-name">OXXO</div>
            <div className="method-subtitle">Paga en efectivo</div>
          </button>

          <button
            type="button"
            className={`payment-method-btn ${paymentMethod === 'spei' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('spei')}
          >
            <div className="method-icon">🏦</div>
            <div className="method-name">Transferencia SPEI</div>
            <div className="method-subtitle">Desde tu banco</div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="form-section">
          <h3>Información Personal</h3>
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
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="juan.perez@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label>Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
              placeholder="+52 55 1234 5678"
            />
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="form-section">
            <h3>Información de Pago</h3>
            <p className="secure-badge">🔒 Pago seguro procesado por Conekta</p>

            <div className="form-group">
              <label>Número de Tarjeta *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                placeholder="4242 4242 4242 4242"
                maxLength="19"
              />
            </div>

            <div className="form-group">
              <label>Nombre en la Tarjeta *</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                placeholder="JUAN PEREZ"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mes *</label>
                <input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  required
                  placeholder="12"
                  maxLength="2"
                />
              </div>

              <div className="form-group">
                <label>Año *</label>
                <input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  required
                  placeholder="2025"
                  maxLength="4"
                />
              </div>

              <div className="form-group">
                <label>CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>

            <div className="test-cards-info">
              <p><strong>Tarjetas de prueba (Sandbox):</strong></p>
              <ul>
                <li>✅ Éxito: 4242 4242 4242 4242</li>
                <li>❌ Fondos insuficientes: 4000 0000 0000 0127</li>
                <li>❌ Tarjeta rechazada: 4000 0000 0000 0002</li>
              </ul>
              <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
                Usa cualquier fecha futura y CVV de 3 dígitos
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'oxxo' && (
          <div className="payment-method-info oxxo-info">
            <h4>💡 ¿Cómo funciona el pago en OXXO?</h4>
            <ul>
              <li>Generaremos un número de referencia único</li>
              <li>Podrás pagar en cualquier tienda OXXO en México</li>
              <li>El pago se refleja en un máximo de 48 horas</li>
              <li>La referencia es válida por 3 días</li>
              <li>No hay comisiones adicionales</li>
            </ul>
          </div>
        )}

        {paymentMethod === 'spei' && (
          <div className="payment-method-info spei-info">
            <h4>💡 ¿Cómo funciona SPEI?</h4>
            <ul>
              <li>Generaremos una CLABE única para tu pago</li>
              <li>Realiza la transferencia desde tu banca en línea</li>
              <li>El pago se refleja en minutos (24/7)</li>
              <li>La CLABE es válida por 24 horas</li>
              <li>Debes transferir el monto exacto</li>
            </ul>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 
              paymentMethod === 'card' ? `Pagar $${precio.toLocaleString('es-MX')} MXN` :
              'Generar referencia de pago'}
          </button>
          <button 
            type="button" 
            className="btn-secondary btn-large"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="payment-security">
        <p>🔒 Tus datos están protegidos con encriptación SSL</p>
        <p>💳 Procesado por Conekta - Certificado PCI DSS</p>
      </div>
    </div>
  );
}

export default PaymentForm;
