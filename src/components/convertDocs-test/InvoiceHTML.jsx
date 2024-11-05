import React from 'react';

const InvoiceHTML = ({ invoiceData }) => (
  <div style={{ fontFamily: 'Roboto, sans-serif', padding: '30px', backgroundColor: '#ffffff' }}>
    <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #112131', alignItems: 'stretch' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', color: '#112131' }}>Factura</h1>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '40px' }}>
      <div>
        <p><strong>Número de Factura:</strong> {invoiceData.invoiceNumber}</p>
        <p><strong>Fecha:</strong> {invoiceData.date}</p>
      </div>
      <div>
        <p><strong>Cliente:</strong> {invoiceData.clientName}</p>
      </div>
    </div>

    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ border: '1px solid #bfbfbf', padding: '8px' }}>Descripción</th>
          <th style={{ border: '1px solid #bfbfbf', padding: '8px' }}>Cantidad</th>
          <th style={{ border: '1px solid #bfbfbf', padding: '8px' }}>Precio Unitario</th>
          <th style={{ border: '1px solid #bfbfbf', padding: '8px' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoiceData.items.map((item, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #bfbfbf', padding: '8px' }}>{item.description}</td>
            <td style={{ border: '1px solid #bfbfbf', padding: '8px' }}>{item.quantity}</td>
            <td style={{ border: '1px solid #bfbfbf', padding: '8px' }}>${item.unitPrice.toFixed(2)}</td>
            <td style={{ border: '1px solid #bfbfbf', padding: '8px' }}>${item.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p style={{ marginTop: '30px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>
      Total: ${invoiceData.total.toFixed(2)}
    </p>
  </div>
);

export default InvoiceHTML;