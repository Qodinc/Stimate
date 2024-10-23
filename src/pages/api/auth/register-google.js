import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await getSession({ req });
            
            if (!session) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            const { name, email } = session.user;
            
            console.log("Datos de sesión:", { name, email });

            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            }); 

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            if (response.ok) {
                res.status(200).json(data);
            } else {
                res.status(response.status).json(data);
            }
        } catch (error) {
            console.error("Error en el registro con Google:", error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}