import ReturnDash from "@/components/Icons/ReturnDash"
import Trash from "@/components/Icons/Trash"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import CheckCancel from "@/components/Icons/CheckCancel"
import Info from "@/components/Icons/info"
import HttpServices from "@/lib/http-services"
import { useRouter } from "next/router"
import Head from "next/head"
import { useSession } from "next-auth/react"

export default function PlanActual() {
  const { data: session, status } = useSession();
  const [httpServices, setHttpServices] = useState(null);

  const router = useRouter();
  const [misPlanes, setMisPlanes] = useState(null)
  const [plan, setPlan] = useState({
    id: null,
    name: ""
  })
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only create HttpServices when session is available
    if (status === 'authenticated') {
      const services = new HttpServices(session);
      setHttpServices(services);
    }
  }, [session, status]);

  const getPlanes = async () => {
    try {
      if (status === 'authenticated' && session?.user?.email) {
        const httpServices = new HttpServices(session);
        const response = await httpServices.getPlanesCustomer({ 
          email: session.user.email 
        });

        const { subscriptions } = await response.json();
        setMisPlanes(subscriptions);
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      setError(error);
      // Optionally redirect or show error message
    }
  };


  const handleCancelSubscription = async () => {
    const response = await httpServices.cancelSubscription(plan.id)

    if (!response.ok) {
      return setError('Error: Falló el servidor. Favor de comunicarse a soporte técnico');
    }

    const { data } = await response.json()

    setShowCancelDialog(false)
    setShowSuccessDialog(true)
    getPlanes()
  };

  // if (misPlanes && !!!misPlanes.length) {
  //   router.push(`/suscripcion`);
  // }

  const notSubscribed = () => {
    return (
      <div className="flex flex-col items-center">
        <p className="text-xl text-center my-5">Actualmente, no cuentas con un plan de suscripción</p>
        <Button onClick={() => { router.push(`/suscripcion`) }}>
          Suscribirse
        </Button>
      </div>
    )
  }

  const subscribed = () => {
    return misPlanes.map((miPlan, index) => {
      const fecha = new Date(miPlan.current_period_end * 1000)
      const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const userLocale = navigator.language;
      const proximoCorte = fecha.toLocaleString(userLocale, opciones)
      return (
        <div key={index} className="flex flex-col max-sm:items-center gap-2 text-zoom">
          <p className="text-2xl font-semibold leading-none tracking-tight my-5">Tu Suscripción</p>
          <p>Plan actual: {miPlan.plan.product.name}</p>
          <p>Proximo corte: {proximoCorte}</p>

          <div className="flex items-center py-2">
            <Button onClick={() => { setPlan(miPlan); setShowCancelDialog(true) }}>
              <Trash width={25} height={25} stroke="#FFFFFF" />
              Cancelar Suscripción
            </Button>
          </div>
        </div>

      )
    })
  }
  useEffect(() => {
    if (status === 'authenticated') {
      getPlanes();
    }
  }, [status]);

  if (error) {
    return <div>Error loading subscriptions. Please try again later.</div>;
  }

  return (
    <>
      <Head>
        <title>Plan Actual</title>
      </Head>
      <Navbar />
      <div className="font-comfortaa flex gap-5 bg-white px-4 md:px-14 lg:px-20 pt-8">
        {misPlanes && subscribed()}

        {!misPlanes && notSubscribed()}
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Cancelar Subscripción</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-base">¿Estas seguro que quieres cancelar tu subscripción <strong>{plan?.plan?.product?.name}</strong>?</p>
              <div className="text-[#D0BB17] flex flex-row gap-3 align-middle py-2">
                <Info width="20px" height="20px" stroke="#D0BB17" />
                <p className="text-base">Esta acción no se puede deshacer</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelSubscription} variant="destructive">Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle className="mx-auto"><CheckCancel width={50} height={50} /></AlertDialogTitle>
            <AlertDialogDescription className="text-baseColor text-sm text-center">
              Tu suscripción ha sido cancelada. Mantendrás acceso a las funciones premium hasta el final de tu período de facturación actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)} className=" text-sm rounded-lg">Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle className="mx-auto">
              <CheckCancel width={50} height={50} />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-baseColor text-sm text-center">
              Tu suscripción ha sido cancelada. Mantendrás acceso a las funciones premium hasta el final de tu período de facturación actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)} className=" text-sm rounded-lg">Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}