export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { nombre, apellido, email, password } = req.body;
            const name = nombre + ' ' + apellido
            console.log("Datos recibidos en el servidor:", req.body); // Añade este log

            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data); // Añade este log

            if (response.ok) {
                res.status(200).json(data);
            } else {
                res.status(response.status).json(data);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}