import React, { useEffect, useState, useRef } from 'react';
import InvoiceCanvas from '@/components/convertDocs-test/InvoiceCanvas';
import { jsPDF } from 'jspdf';

export default function VerPdf() {
    const [clientSide, setClientSide] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        setClientSide(true);
        fetchInvoiceData();
    }, []);

    const fetchInvoiceData = async () => {
        // Simular obtención de datos
        setTimeout(() => {
            setInvoiceData({
                invoiceNumber: "001",
                date: "2024-10-07",
                clientName: "Cliente Ejemplo",
                items: [
                    { description: "Producto 1", quantity: 2, unitPrice: 10, total: 20 },
                    { description: "Producto 2", quantity: 1, unitPrice: 15, total: 15 },
                ],
                total: 35
            });
            setLoading(false);
        }, 1000);
    };

    const generatePDF = () => {
        if (!canvasRef.current) {
            console.error('Canvas not ready');
            return;
        }
        const canvas = canvasRef.current;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("factura.pdf");
    };

    const generatePNG = () => {
        if (!canvasRef.current) {
            console.error('Canvas not ready');
            return;
        }
        const canvas = canvasRef.current;
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'factura.png';
        link.href = imgData;
        link.click();
    };

    if (!clientSide || loading) {
        return <div>Cargando...</div>;
    }

    if (!invoiceData) {
        return <div>Error al cargar los datos de la factura.</div>;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vista previa de la factura</h1>
            
            <div className="mb-6">
                <InvoiceCanvas ref={canvasRef} invoiceData={invoiceData} width={800} height={600} />
            </div>
            
            <div className="text-center mb-6">
                <button 
                    onClick={generatePDF}
                    className="px-6 py-3 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 mr-4"
                >
                    Descargar PDF
                </button>
                <button 
                    onClick={generatePNG}
                    className="px-6 py-3 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 active:bg-green-700"
                >
                    Descargar PNG
                </button>
            </div>
        </div>
    );
}