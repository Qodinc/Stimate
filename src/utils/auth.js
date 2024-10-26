export async function loginUser(credentials) {
    try {
      const res = await fetch('http://localhost:8080/users/login', {
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
  
      return data.user; // Asumiendo que tu API devuelve los datos del usuario
    } catch (error) {
      throw new Error(error.message);
    }
  }

  export async function registerUser(userData) {
    try {
      const res = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Error en el registro');
      }
  
      return data.user;
    } catch (error) {
      throw new Error(error.message);
    }
  }