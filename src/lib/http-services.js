require("dotenv").config();

class HttpServices {
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

  createProyect = async ({ name_project, areas_selected }) => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name_project, areas_selected }),
    });
  };

  getProyects = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project`);
  };

  getProyect = async (slug) => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${slug}`);
  };

  deleteProyect = async (slug) => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${slug}`, {
      method: "DELETE",
    });
  };

  updateProyect = async (project) => {
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${project.slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
    return await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/payment/config`);
  };

  createCustomer = async ({ email }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/customer/create`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
  };

  createSubscription = async ({ price, customerId }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/subscription/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: price.id, customer: customerId }),
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
        },
        body: JSON.stringify({ subscriptionId }),
      }
    );
  };

  getPlanesCustomer = async ({ customer }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT}/payment/subscriptions/customer`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer }),
      }
    );
  };
}

module.exports = new HttpServices();
