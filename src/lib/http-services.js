require("dotenv").config();

class HttpServices {
  session = {}
  tokenSession = null

  constructor(session) {
    this.session = session;

    if (session) {
      const { token } = session;
      this.tokenSession = token
    }
  }

  // ### Project_status
  getStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/status`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error al obtener el estado");
      }
      const jsonData = await response.json();

      // Extrae solo el arreglo en la propiedad 'data'
      return jsonData.data || []; // Retorna un arreglo vacío si 'data' no está definido
    } catch (error) {
      console.error("Error en getStatus:", error);
      return []; // Retorna un array vacío en caso de error
    }
  };


  // ### Areas

  getAreas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/area`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error al obtener areas");
      }
      const jsonData = await response.json();

      // Extrae solo el arreglo en la propiedad 'data'
      return jsonData.data || []; // Retorna un arreglo vacío si 'data' no está definido
    } catch (error) {
      console.error("Error en getAreas:", error);
      return []; // Retorna un array vacío en caso de error
    }
  };

  // ### Types_recurrent
  getTypes_Recurrent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/type_recurring`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error al obtener los tipos");
      }
      const jsonData = await response.json();

      // Extrae solo el arreglo en la propiedad 'data'
      return jsonData.data || []; // Retorna un arreglo vacío si 'data' no está definido
    } catch (error) {
      console.error("Error en getTypes_Recurrent:", error);
      return []; // Retorna un array vacío en caso de error
    }
  };
  // ### Users

  // ### Projects

  createProyect = async (project) => {
    const { token } = this.session;
    if (!token) {
      throw new Error("No hay token de acceso disponible");
    }

    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.tokenSession}`
      },
      body: JSON.stringify(project),
    });
  };


  getProyects = async () => {
    try {
      const { token } = this.session;
      if (!token) {
        throw new Error("No hay token de acceso disponible");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.tokenSession}`,
          "Content-Type": "application/json"
        }
      });

      return response
    } catch (error) {
      throw new Error("Error al obtener proyectos", error);

    }
  };

  getProyect = async (slug) => {
    const { token } = this.session;
    if (!token) {
      throw new Error("No hay token de acceso disponible");
    }

    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${slug}`, {
      headers: {
        "Authorization": `Bearer ${this.tokenSession}`,
        "Content-Type": "application/json"
      }
    });
  };


  updateUser = async (user) => {
    const { token } = this.session;
    if (!token) {
      throw new Error("No hay token de acceso disponible");
    }

    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.tokenSession}`
      },
      body: JSON.stringify({ user }),
    });
  };


  getToken = async (token) => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/users/verificacion/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  };

  deleteProyect = async (slug) => {
    const { token } = this.session;
    if (!token) {
      throw new Error("No hay token de acceso disponible");
    }

    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${slug}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this.tokenSession}`,
        "Content-Type": "application/json"
      }
    });
  };


  updateProyect = async (project) => {
    const { token } = this.session;
    if (!token) {
      throw new Error("No hay token de acceso disponible");
    }

    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${project.slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.tokenSession}`
      },
      body: JSON.stringify(project),
    });
  };


  // ### Payments ###
  /**
   *
   * @returns
   */
  configPayment = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/payment/config`, {
      headers: {
        "Authorization": `Bearer ${this.tokenSession}`,
        "Content-Type": "application/json"
      }
    });
  };

  createCustomer = async ({ email }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/customer/create`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.tokenSession}`
        },
        body: JSON.stringify({ email }),
      }
    );
  };

  createSubscription = async ({ price, customer }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/subscription/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.tokenSession}`
        },
        body: JSON.stringify({ price, customer }),
      }
    );
  };

  cancelSubscription = async (subscriptionId) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/subscription/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.tokenSession}`
        },
        body: JSON.stringify({ subscriptionId }),
      }
    );
  };

  getPlanesCustomer = async ({ email }) => {
    // Check if token exists 
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      if (!this.tokenSession) {
        throw new Error("No access token available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT}/payment/subscription/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.tokenSession}`
          },
          body: JSON.stringify({ email }),
        }
      );

      // Add error handling for non-ok responses
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
      }

      return response;
    } catch (error) {
      console.error("Error fetching customer plans:", error);
      throw error;
    }
  };
}
module.exports = HttpServices;
