export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { nombre, apellido, name, email, password, isGoogleAuth } = req.body;
            
            // Determinar el nombre final
            let finalName;
            if (isGoogleAuth) {
                finalName = name; // Usar el nombre completo de Google directamente
            } else {
                finalName = nombre + ' ' + apellido; // Concatenar para registro normal
            }

            const userImage = isGoogleAuth ? null : 
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;

            console.log("Datos recibidos en el servidor:", req.body);

            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: finalName, 
                    email, 
                    password,
                    isGoogleAuth 
                }),
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data);

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