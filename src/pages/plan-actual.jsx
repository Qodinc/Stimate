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
import { useState } from "react"
import CheckCancel from "@/components/Icons/CheckCancel"
import Info from "@/components/Icons/info"

export default function PlanActual() {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleCancelSubscription = () => {
    setShowCancelDialog(false)
    setShowSuccessDialog(true)
  };

  return (
    <>
      <Navbar />
      <Link href={"/"}>
        <Button className="m-5 font-poppins"><ReturnDash width={25} height={25} stroke="#FFFFFF" /> Volver al dashboard</Button>
      </Link>
      <Card className="font-poppins text-baseColor flex flex-col max-sm:items-center rounded-3xl pt-4 pb-4 mt-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-t-transparent">
        <CardHeader>
          <CardTitle>Tu Suscripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gestiona tu plan de suscripción</p>
        </CardContent>
        <CardContent>
          <p>Tu plan actual: Pro</p>
        </CardContent>
        <CardContent>
          <p>Proximo corte: 27/09/2024</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowCancelDialog(true)}>
            <Trash width={25} height={25} stroke="#FFFFFF" />
            Cancelar Suscripción
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="font-poppins">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Cancelar Subscripción</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-base">¿Estas seguro que quieres cancelar tu subscripción?</p>
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
    </>
  )
}