import { useState, useEffect } from 'react';
import './Pago.css';

function Pago() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    nivelEstimado: '',
    metodoPago: 'card', // 'card' o 'oxxo'
  });
  
  const [loading, setLoading] = useState(false);
  const [oxxoData, setOxxoData] = useState(null);
  const [conektaLoaded, setConektaLoaded] = useState(false);

  // Cargar script de Conekta
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js';
    script.async = true;
    script.onload = () => {
      window.Conekta.setPublicKey(import.meta.env.VITE_CONEKTA_PUBLIC_KEY);
      setConektaLoaded(true);
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.metodoPago === 'card') {
        // Proceso para tarjeta
        const tokenParams = {
          card: {
            number: formData.numeroTarjeta.replace(/\s/g, ''),
            name: formData.nombreTarjeta,
            exp_year: formData.expYear,
            exp_month: formData.expMonth,
            cvc: formData.cvv,
          }
        };

        window.Conekta.Token.create(tokenParams, 
          async (token) => {
            await procesarPago(token.id);
          },
          (error) => {
            alert('Error al procesar tarjeta: ' + error.message_to_purchaser);
            setLoading(false);
          }
        );
      } else {
        // Proceso para OXXO (no requiere token)
        await procesarPago(null);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el pago');
      setLoading(false);
    }
  };

  const procesarPago = async (conektaToken) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        conektaToken,
        montoPagado: calcularMonto(), // Tu función para calcular el monto
        metodoPago: formData.metodoPago
      })
    });

    const data = await response.json();
    
    if (data.success) {
      if (formData.metodoPago === 'oxxo') {
        setOxxoData(data);
      } else {
        // Redirigir a selección de cita
        window.location.href = `/seleccionar-cita?orderId=${data.orderId}`;
      }
    } else {
      alert(data.message);
    }
    
    setLoading(false);
  };

  if (oxxoData) {
    return (
      <div className="oxxo-confirmation">
        <h2>¡Pago en tiendas Generado!</h2>
        <p>Presenta esta referencia en cualquier tienda 7eleven,Farmacias Benavides, Extra y demás tiendas participantes:</p>
        <div className="oxxo-reference">
          <h3>{oxxoData.oxxoReference}</h3>
        </div>
        <img src={oxxoData.oxxoBarcode} alt="Código de barras OXXO" />
        <p>Monto a pagar: ${oxxoData.amount} MXN</p>
        <p>Válido hasta: {new Date(oxxoData.expiresAt * 1000).toLocaleDateString()}</p>
        <button onClick={() => window.print()}>Imprimir</button>
      </div>
    );
  }

  return (
    <div className="pago-container">
      <h1>Información de Pago</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos de información personal */}
        <input
          type="text"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          required
        />
        
        {/* Selector de método de pago */}
        <div className="metodo-pago-selector">
          <label>
            <input
              type="radio"
              value="card"
              checked={formData.metodoPago === 'card'}
              onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
            />
            Tarjeta de Crédito/Débito
          </label>
          <label>
            <input
              type="radio"
              value="oxxo"
              checked={formData.metodoPago === 'oxxo'}
              onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
            />
            Pago en 7eleven,Farmacias Benavides, Extra y demás tiendas participantes
          </label>
        </div>

        {/* Mostrar campos de tarjeta solo si se selecciona tarjeta */}
        {formData.metodoPago === 'card' && (
          <div className="tarjeta-campos">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={formData.numeroTarjeta}
              onChange={(e) => setFormData({...formData, numeroTarjeta: e.target.value})}
              required
            />
            {/* Más campos de tarjeta... */}
          </div>
        )}

        {formData.metodoPago === 'oxxo' && (
          <div className="oxxo-info">
            <p>💰 Recibirás una referencia de pago para OXXO</p>
            <p>⏱️ Tu inscripción se activará al confirmar el pago</p>
          </div>
        )}

        <button type="submit" disabled={loading || !conektaLoaded}>
          {loading ? 'Procesando...' : 
           formData.metodoPago === 'oxxo' ? 'Generar Referencia OXXO' : 'Pagar Ahora'}
        </button>
      </form>
    </div>
  );
}

export default Pago;