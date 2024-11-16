import React, { useEffect, forwardRef } from 'react';

const InvoiceCanvas = forwardRef(({ invoiceData, width = 800, height = 600 }, ref) => {
  useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);

    // Configurar estilo base
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';

    // Dibujar encabezado
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Factura', 40, 40);

    // Dibujar información de la factura
    ctx.font = '16px Arial';
    ctx.fillText(`Número de Factura: ${invoiceData.invoiceNumber}`, 40, 80);
    ctx.fillText(`Fecha: ${invoiceData.date}`, 40, 110);
    ctx.fillText(`Cliente: ${invoiceData.clientName}`, 40, 140);

    // Dibujar tabla de items
    const startY = 200;
    const lineHeight = 30;
    ctx.fillText('Descripción', 40, startY);
    ctx.fillText('Cantidad', 300, startY);
    ctx.fillText('Precio Unitario', 450, startY);
    ctx.fillText('Total', 650, startY);

    invoiceData.items.forEach((item, index) => {
      const y = startY + (index + 1) * lineHeight;
      ctx.fillText(item.description, 40, y);
      ctx.fillText(item.quantity.toString(), 300, y);
      ctx.fillText(`$${item.unitPrice.toFixed(2)}`, 450, y);
      ctx.fillText(`$${item.total.toFixed(2)}`, 650, y);
    });

    // Dibujar total
    const totalY = startY + (invoiceData.items.length + 2) * lineHeight;
    ctx.font = 'bold 18px Arial';
    ctx.fillText(`Total: $${invoiceData.total.toFixed(2)}`, 650, totalY);

  }, [invoiceData, width, height, ref]);

  return <canvas ref={ref} width={width} height={height} />;
});

InvoiceCanvas.displayName = 'InvoiceCanvas';

export default InvoiceCanvas;