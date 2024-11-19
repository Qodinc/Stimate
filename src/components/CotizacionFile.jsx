import React from 'react'

export default function CotizacionFile() {
   return (
      <div className="w-[800px] bg-white">
         <div className="space-y-4">
            <div className="text-center space-y-1">
               <h1 className="text-2xl font-bold">Cotización</h1>
               <p className="text-sm">Fecha: [Insert Date]</p>
               <p className="text-sm">No.: [Insert Number]</p>
            </div>

            <div className="flex justify-between text-sm">
               <div>
                  <h2 className="font-bold">Emisor:</h2>
                  <p>[Name Project]</p>
               </div>
               <div>
                  <h2 className="font-bold">Receptor:</h2>
                  <p>[Insert Receptor Details]</p>
               </div>
            </div>

            <table className="w-full text-sm">
               <thead>
                  <tr className="bg-gray-200">
                     <th className="p-2 text-left">Producto</th>
                     <th className="p-2 text-left">Description</th>
                     <th className="p-2 text-right">Cantidad</th>
                     <th className="p-2 text-right">Unidad</th>
                     <th className="p-2 text-right">Precio Unitario</th>
                     <th className="p-2 text-right">Precio</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className="p-2">Costo del Desarrollo</td>
                     <td className="p-2">UI Design Landing Page (1 Page)</td>
                     <td className="p-2 text-right">1</td>
                     <td className="p-2 text-right">Unidad</td>
                     <td className="p-2 text-right">$0</td>
                     <td className="p-2 text-right">$24,834.34</td>
                  </tr>
                  <tr>
                     <td className="p-2">Hosting y SSL</td>
                     <td className="p-2">Almacenamiento de la página web y Seguridad SSL. 100 GB de Almacenamiento</td>
                     <td className="p-2 text-right">1</td>
                     <td className="p-2 text-right">Año</td>
                     <td className="p-2 text-right">$2,796.87</td>
                     <td className="p-2 text-right">$3,244.37</td>
                  </tr>
                  <tr>
                     <td className="p-2">Dominio</td>
                     <td className="p-2">mipaginachida.com</td>
                     <td className="p-2 text-right">1</td>
                     <td className="p-2 text-right">Año</td>
                     <td className="p-2 text-right">$300.00</td>
                     <td className="p-2 text-right">$348.00</td>
                  </tr>
                  <tr>
                     <td className="p-2">Logo</td>
                     <td className="p-2"></td>
                     <td className="p-2 text-right">1</td>
                     <td className="p-2 text-right">Pieza</td>
                     <td className="p-2 text-right">$700.00</td>
                     <td className="p-2 text-right">$812.00</td>
                  </tr>
               </tbody>
            </table>

            <div className="text-sm space-y-1">
               <h2 className="font-bold">Notas:</h2>
               <ul className="list-disc pl-4 space-y-1">
                  <li>El costo ya incluye el IVA.</li>
                  <li>El hosting solo almacena la página web.</li>
                  <li>Es costo no incluye almacenamiento de documentos ni bases de datos.</li>
                  <li>El dominio se debe de renovar al terminar el año (el precio puede variar al culminar el año)</li>
                  <li>Se requiere de un 50% de anticipado. El otro 50% al entregar la página en producción.</li>
               </ul>
            </div>

            <div className="border-t pt-4">
               <h2 className="font-bold mb-2">Datos de depósito:</h2>
               <p><strong>Banco:</strong> [Insert Bank]</p>
               <p><strong>Tarjeta:</strong> [Insert Card]</p>
               <p><strong>Clabe:</strong> [Insert Clabe]</p>
            </div>

            <div className="text-right space-y-1">
               <p>Subtotal: Rp 16.500.000</p>
               <p>Impuesto: Rp 1.650.000</p>
               <p className="font-bold text-lg">Total: Rp 18.150.000</p>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
               <p>Thank you for use Stimate!</p>
            </div>
         </div>
      </div>
   )
}