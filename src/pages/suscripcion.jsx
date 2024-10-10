import Input from "@/components/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"
import {
   Elements,
   useStripe,
   useElements,
   CardNumberElement,
   CardExpiryElement,
   CardCvcElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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

            setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
            setPrice(prices[0]);
         } catch (error) {
            return setMessages('Error fetching Stripe config:', error.message);
         }
      };
      fetchConfig();
   }, [])
   if (!stripePromise) {
      return <div>Loading...</div>;
   }

   return (
      <>
         <Navbar />
         <div className="font-comfortaa flex min-h-full flex-col items-center bg-white px-4 md:px-14 lg:px-20 pt-16">
            <main className="w-full max-w-4xl flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                  <h2 className="font-poppins font-semibold text-accent text-center text-xl md:text-3xl">Completar Pago</h2>
                  <p>Ingresa los detalles de tu tarjeta para procesar el pago</p>
               </div>

               <Elements stripe={stripePromise}>
                  <PaymentForm
                     price={price}
                  />
               </Elements>
            </main>
         </div>
      </>
   );
}

function PaymentForm({ price }) {
   const [messages, setMessages] = useState('');

   // Datos del cliente
   const [fullName, setFullName] = useState('');
   const [email, setEmail] = useState('');
   const [cardComplete, setCardComplete] = useState({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false
   });

   // Datos para crear transacción
   const [customer, setCustomer] = useState(null);

   // Datos de la transacción
   const [clientSecret, setClientSecret] = useState(null);
   const [subscriptionId, setSubscriptionId] = useState(null);

   // Datos para realizar el pago
   const stripe = useStripe();
   const elements = useElements();

   // 
   const handleCardChange = (event) => {
      setCardComplete({
         ...cardComplete,
         [event.elementType]: event.complete
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return setMessages('Stripe has not loaded yet. Please try again.');
      }

      setMessages('')

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return setMessages("El formato del correo no es válido");
      }

      if (!cardComplete.cardNumber || !cardComplete.cardExpiry || !cardComplete.cardCvc) {
         return setMessages("Por favor, complete todos los campos de la tarjeta.");
      }

      try {
         // Cliente
         setCustomer(await getCustomer())

         // Transacción
         const subscription = await getSubscription()
         if (!subscription.clientSecret || !subscription.subscriptionId) {
            return setMessages('Error: Payment intent not found');
         }

         setSubscriptionId(subscription.subscriptionId);
         setClientSecret(subscription.clientSecret);

         // Elementos de tarjeta
         const cardElement = elements.getElement(CardNumberElement);
         // Realizar Suscripción
         const { error } = await stripe.confirmCardPayment(subscription.clientSecret, {
            payment_method: {
               card: elements.getElement(CardNumberElement),
               billing_details: {
                  name: fullName,
               }
            }
         });

         if (error) {
            return setMessages(error.message);
         }

      } catch (error) {
         if (error) {
            return setMessages(`Error: ${error.message}`);
         }
      }

   };

   // Obtener Cliente
   const getCustomer = async () => {
      if (customer)
         return customer

      const resCustomer = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/stripe/customer/create`, {
         method: 'post',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email }),
      });

      if (!resCustomer.ok) {
         return setMessages('Falló al obtener el cliente');
      }
      return await resCustomer.json();
   }

   // Obtener Suscripción
   const getSubscription = async () => {
      if (subscriptionId)
         return { subscriptionId, clientSecret }

      const resSubscription = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/stripe/subscription/create`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            price: price.id,
            customer: customer.id
         }),
      });

      if (!resSubscription.ok) {
         return setMessages('Failed to fetch subscription');
      }

      return await resSubscription.json()
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
               <div className="flex space-x-2">
                  <div className="w-1/2 rounded-full border border-gray-300 px-3 py-2">
                     <CardExpiryElement options={cardElementOptions} onChange={handleCardChange} />
                  </div>
                  <div className="w-1/2 rounded-full border border-gray-300 px-3 py-2">
                     <CardCvcElement options={cardElementOptions} onChange={handleCardChange} />
                  </div>
               </div>
            </div>

            <div className="text-red-500 text-sm my-4">{messages}</div>

            <Button
               type="submit"
            >
               Pagar
            </Button>
         </form>
      </div>
   );
}
