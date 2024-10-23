import { getSession } from "next-auth/react";

export async function sendUserDataToBackend(userData) {
  const session = await getSession();
  
  if (!session) {
    throw new Error("No hay sesión activa");
  }

  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}` // Asumiendo que tienes un token de acceso en la sesión
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Error al enviar los datos del usuario');
  }

  return await response.json();
}

