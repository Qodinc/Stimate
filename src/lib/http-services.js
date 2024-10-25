require("dotenv").config();

class HttpServices {
  // ### Project_status

  // ### Areas

  // ### Types_recurrent

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
