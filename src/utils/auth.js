export async function loginUser(credentials) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }
  
      return data; // Asumiendo que tu API devuelve los datos del usuario
    } catch (error) {
      throw new Error(error.message);
    }
  }

  export async function registerUser(userData) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Error en el registro');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }