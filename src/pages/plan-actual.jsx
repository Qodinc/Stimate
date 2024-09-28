import ReturnDash from "@/components/Icons/ReturnDash"
import Trash from "@/components/Icons/Trash"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function PlanActual() {
    return (
        <>
            <Button className="m-5 font-poppins"><ReturnDash width={25} height={25} stroke="#FFFFFF"  /> Volver al dashboard</Button>
            <Card className="font-poppins text-baseColor flex flex-col max-sm:items-center rounded-3xl pt-4 pb-4 mt-5 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-t-transparent">
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
                    <Button>
                        <Trash width={25} height={25} stroke="#FFFFFF" />
                        Cancelar Suscripción
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
