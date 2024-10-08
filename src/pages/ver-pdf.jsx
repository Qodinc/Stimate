import Invoice from '@/components/convertDocs-test/Invoice';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import ImageConverter from '../components/convertDocs-test/ImageConverter';
import InvoiceHTML from '@/components/convertDocs-test/InvoiceHTML';


export default function VerPdf() {
    const [clientSide, setClientSide] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setClientSide(true);
        fetchInvoiceData();
    }, []);

    const fetchInvoiceData = async () => {
        try {
            // Aquí harías tu llamada a la API o base de datos
            // Por ejemplo:
            // const response = await fetch('/api/invoice/1');
            // const data = await response.json();
            // setInvoiceData(data);

            // Por ahora, simularemos los datos:
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
        } catch (error) {
            console.error("Error fetching invoice data:", error);
            setLoading(false);
        }
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
                <PDFViewer className="w-full h-[70vh] rounded-lg shadow-lg">
                    <Invoice invoiceData={invoiceData} />
                </PDFViewer>
            </div>
            
            <div className="text-center mb-6">
                <PDFDownloadLink 
                    document={<Invoice invoiceData={invoiceData} />} 
                    fileName="facturaStimate.pdf"
                    className="inline-block"
                >
                    {({ blob, url, loading, error }) => (
                        <button 
                            className={`px-6 py-3 rounded-full font-semibold text-white transition duration-300 ease-in-out ${
                                loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                            }`}
                            disabled={loading}
                        >
                            {loading ? 'Cargando documento...' : 'Descargar PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Versión PNG</h2>
                <ImageConverter>
                    <InvoiceHTML invoiceData={invoiceData} />
                </ImageConverter>
            </div>
        </div>
    );
}