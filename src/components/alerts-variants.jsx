import * as React from "react"
import Info from "./Icons/info";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import Check from "./Icons/Check";
  
  export default function Cuenta() {
    return (
        <AlertDialogContent>
            <AlertDialogHeader className="text-center justify-center gap-6">
              <div className="w-full flex justify-center">
              <img src="Icons/check-purple.webp" className="w-20 h-20"/>
              </div>                
                <h2 className="text-lg text-accent font-extrabold">¡Cuenta Verificada!</h2>
                <p className="text-base font-comfortaa font-normal">Tu cuenta ha sido verificada exitosamente</p>
                <p className="text-base font-comfortaa font-normal">Gracias por completar el proceso de verificación. Ahora puedes acceder a todas las funciones de nuestra plataforma.</p>
            </AlertDialogHeader>
            <AlertDialogFooter className="py-6">
              <AlertDialogAction size="full" className="text-center" >Planes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
    );
  }  
  export function Correo() {
    return (
        <AlertDialogContent>
            <AlertDialogHeader className="text-center justify-center gap-6">
              <div className="w-full flex justify-center">
              <Check height={80} width={80} />
              </div>                
                <h2 className="text-lg text-accent font-extrabold">Verifica tu correo</h2>
                <p className="text-base font-comfortaa font-normal">Hemos envíado un enlace de verificación a tu correo electrónico</p>
                <p className="text-base font-comfortaa font-normal">Por favor, revisa tu bandeja de entrada en ejemplo@correo.com y haz clic en el enlace para verificar tu cuenta..</p>
            </AlertDialogHeader>
            <AlertDialogFooter className="py-6">
              <AlertDialogAction size="full" className="text-center" variant="outline" >Volver al registro</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
    );
}  

const Delete = React.forwardRef(({ elemento,link, onClick, asChild = false}, ref) => {
    return (
      (<AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Confirmar Eliminar: {elemento}</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-base">¿Estas seguro que quieres eliminar: {elemento}?</p>
            <div className="text-[#D0BB17] flex flex-row gap-3 align-middle py-2" onClick={onClick}>
                <Info width="20px" height="20px" stroke="#D0BB17"/>
                <p className="text-base">Esta acción no se puede deshacer</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction  variant="destructive" onClick={onClick} link={link}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>)
    );
  })
  Delete.displayName = "AlertDialogContent"

  export function Subsripcion() {
    return (
        <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Cancelar Subscripción</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-base">¿Estas seguro que quieres cancelar tu subscripción?</p>
            <div className="text-[#D0BB17] flex flex-row gap-3 align-middle py-2">
            <Info width="20px" height="20px" stroke="#D0BB17"/>
                <p className="text-base">Esta acción no se puede deshacer</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction  variant="destructive">Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
} 

  export { Delete}