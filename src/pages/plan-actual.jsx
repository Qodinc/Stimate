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
import httpServices from "@/lib/http-services"
import { useRouter } from "next/router"
import Head from "next/head"

export default function PlanActual() {
  const router = useRouter();
  const customer = "cus_R0FB19JAWESla8" // cus_R0xn9s2rvsRYxq:1 cus_R1k54bidHk6zn0:0 cus_R0FB19JAWESla8 cus_R0O8Cy98KgKpPc
  const [misPlanes, setMisPlanes] = useState(null)
  const [plan, setPlan] = useState({
    id: null,
    name: ""
  })
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    getPlanes()
  }, [])

  const getPlanes = async () => {
    const response = await httpServices.getPlanesCustomer({ customer })

    const { data } = await response.json()

    setMisPlanes(data.subscriptions)
  }

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

  const unsubscription = () => {
    return (
      <div className="flex flex-col items-center">
        <p className="text-xl text-center my-5">Actualmente, no cuentas con un plan de suscripción</p>
        <Button onClick={() => { router.push(`/suscripcion`) }}>
          Suscribirse
        </Button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Plan Actual</title>
      </Head>
      <Navbar />
      <div className="font-comfortaa flex min-h-full flex-col bg-white px-4 md:px-14 lg:px-20 pt-8">
        <Link href={"/"}>
          <Button className="font-poppins"><ReturnDash width={25} height={25} stroke="#FFFFFF" /> Volver al dashboard</Button>
        </Link>

        {misPlanes && misPlanes.map((miPlan, index) => {
          const fecha = new Date(miPlan.current_period_end * 1000)
          const opciones = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          };
          const userLocale = navigator.language;
          const proximoCorte = fecha.toLocaleString(userLocale, opciones)
          return (
            <Card key={index} className="font-poppins text-baseColor flex flex-col max-sm:items-center rounded-3xl pt-4 pb-4 mt-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-t-transparent">
              <CardHeader>
                <CardTitle>Tu Suscripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gestiona tu plan de suscripción</p>
              </CardContent>
              <CardContent>
                <p>Tu plan actual: {miPlan.plan.product.name}</p>
              </CardContent>
              <CardContent>
                <p>Proximo corte: {proximoCorte}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => { setPlan(miPlan); setShowCancelDialog(true) }}>
                  <Trash width={25} height={25} stroke="#FFFFFF" />
                  Cancelar Suscripción
                </Button>
              </CardFooter>
            </Card>
          )
        })}

        {misPlanes && !!!misPlanes.length && unsubscription()}
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