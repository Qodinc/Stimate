import React, { useState, useEffect } from "react"
import {
   Elements,
   useStripe,
   useElements,
   CardNumberElement,
   CardExpiryElement,
   CardCvcElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Input from "@/components/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Payment() {
   const [stripePromise, setStripePromise] = useState(null);
   const [price, setPrice] = useState([]);

   useEffect(() => {
      const fetchConfig = async () => {
         try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/stripe/config`);

            if (!response.ok) {
               return setMessages('Failed to fetch config');
            }

            const { publishableKey, prices } = await response.json();

            setStripePromise(loadStripe(publishableKey));
            setPrice(prices[0]);
         } catch (error) {
            return setMessages('Error fetching Stripe config:', error.message);
         }
      };
      fetchConfig();
   }, [])

   if (!stripePromise || !price) {
      return <div className="h-screen flex justify-center items-center font-comfortaa bg-white">
         Cargando...
      </div>;
   }

   return (
      <>
         <Navbar />
         <div className="font-comfortaa flex min-h-full flex-col items-center bg-white px-4 md:px-14 lg:px-20 pt-16">
            <main className="w-full max-w-2xl flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                  <h2 className="font-poppins font-semibold text-accent text-center text-xl md:text-3xl">Completar Pago</h2>
                  <p>Ingresa los detalles de tu tarjeta para procesar el pago</p>
               </div>

               <Elements stripe={stripePromise}>
                  <CheckoutForm
                     price={price}
                  />
               </Elements>
            </main>
         </div>
      </>
   );
}

function CheckoutForm({ price }) {
   const [messages, setMessages] = useState('');

   // Datos del cliente
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [cardComplete, setCardComplete] = useState({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false
   });

   // Datos para crear transacción
   const [customer_id, setCustomerId] = useState(null);

   // Datos de la transacción
   const [client_secret, setClientSecret] = useState(null);

   // Datos para realizar el pago
   const stripe = useStripe();
   const elements = useElements();

   // Evento para obtener datos de la tarjeta
   const handleCardChange = (event) => {
      setCardComplete({
         ...cardComplete,
         [event.elementType]: event.complete
      });
   };

   // Obtener Cliente
   const getCustomer = async () => {
      if (customer_id) return customer_id;

      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/stripe/customer/create`, {
         method: 'post',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email }),
      });

      if (!response.ok) {
         return setMessages('Falló al obtener el cliente');
      }

      const data = await response.json();
      setCustomerId(data.id);
      return data.id;
   }

   // Obtener Suscripción
   const getSubscription = async (customerId) => {
      if (client_secret) return client_secret;

      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/stripe/subscription/create`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ price: price.id, customer: customerId }),
      });

      if (!response.ok) {
         return setMessages('Failed to fetch subscription');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      return clientSecret;
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return setMessages('Stripe has not loaded yet. Please try again.');
      }

      if (!price) {
         return setMessages('No hay un plan seleccionado. Por favor, seleccione un plan.');
      }

      setMessages('')

      // Validación de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return setMessages("El formato del correo no es válido");
      }

      // Validación de datos de tarjeta
      if (!cardComplete.cardNumber || !cardComplete.cardExpiry || !cardComplete.cardCvc) {
         return setMessages("Por favor, complete todos los campos de la tarjeta.");
      }

      try {
         // Cliente
         const customerId = await getCustomer();

         // Transacción
         const clientSecret = await getSubscription(customerId);

         if (!clientSecret) {
            return setMessages('Error: Payment intent not found');
         }

         setMessages('Esperando...');

         // Elementos de tarjeta
         const cardElement = elements.getElement(CardNumberElement);
         // Realizar Suscripción
         const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: cardElement,
               billing_details: { name }
            }
         });

         if (error) { // 
            setMessages(`Payment failed: ${error.message}`);
         } else {
            setMessages('Payment successful! Se supone aquí debe mandar un modal y redireccionar al dashboard');

            setName('')
            setEmail('')

            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();

            setCustomerId(null)
            setClientSecret(null)
         }

      } catch (error) {
         return setMessages(`Error: ${error.message}`);
      }

   };

   const currencyFormatter = ({ currency, value }) => {
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         minimumFractionDigits: 2,
         currency
      })
      return formatter.format(value)
   }

   const cardElementOptions = {
      style: {
         base: {
            iconColor: '#050315',
            color: '#32325d',
            fontFamily: '"Comfortaa", sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
               color: '#aab7c4'
            },
         },
         invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
         }
      },
      hidePostalCode: true // Opcional: oculta el campo del código postal si no lo necesitas
   };

   return (
      <div>
         <form onSubmit={handleSubmit} className="font-comfortaa">
            <div className="my-2">
               <label>Nombre titular</label>
               <Input
                  type="text"
                  name="full_name"
                  placeholder="Escriba su nombre..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />
            </div>

            <div className="my-2">
               <label>Correo</label>
               <Input
                  type="email"
                  name="email"
                  placeholder="Escriba su correo..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
            </div>

            <div className="mb-4">
               <label>Datos de tarjeta</label>
               <div className="rounded-full border border-gray-300 px-3 py-2 mb-2">
                  <CardNumberElement options={cardElementOptions} onChange={handleCardChange} />
               </div>
               <div className="md:flex">
                  <div className="w-full rounded-full border border-gray-300 px-3 py-2 mb-2">
                     <CardExpiryElement options={cardElementOptions} onChange={handleCardChange} />
                  </div>
                  <div className="w-full rounded-full border border-gray-300 px-3 py-2 mb-2">
                     <CardCvcElement options={cardElementOptions} onChange={handleCardChange} />
                  </div>
               </div>
            </div>

            <div className="text-red-500 text-sm my-4">{messages}</div>

            <div className="flex justify-center font-poppins">
               <Button
                  type="submit"
               >
                  Pagar {currencyFormatter({ currency: price.currency, value: price.unit_amount / 100 })} {price.currency.toUpperCase()}
               </Button>
            </div>
         </form>
      </div>
   );
}
