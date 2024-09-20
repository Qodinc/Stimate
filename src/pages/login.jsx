import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonGoogle from "@/components/ui/buttonGoogle";

export default function Login() {
    return (
        <div className="flex w-full min-h-screen md:relative justify-center items-center">
            <div className="w-full h-screen hidden md:block lg:p-4">
                <img className="opacity-40 lg:opacity-100 lg:rounded-xl lg:h-full object-cover w-full h-screen" src="imgLogin.jpg" alt="LoginImg" />
            </div>
            <div className="flex bg-white font-comfortaa md:absolute lg:static md:py-20 md:max-w-96 lg:min-w-[50%] lg:rounded-none md:rounded-xl flex-col items-center justify-center w-full px-4 lg:px-12 gap-8">
                <h1 className="font-bold text-2xl text-accent" >Bienvenido!</h1>
                <form className="flex flex-col gap-4 w-full" action="#">
                    <div className="flex flex-col gap-2">
                        <span>Correo Electrónico</span>
                        <Input placeholder="Correo Electrónico" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>Contraseña</span>
                        <Input placeholder="Contraseña" type="password" icon="Icons/icon-eye-off.svg" iconPosition="right" />
                    </div>
                    <div className="flex justify-end items-center">
                        <Link className="text-accent" href="#">Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="flex justify-center items-center py-8">
                        <Button variant="default" size="default" >Iniciar Sesión</Button>
                    </div>
                    <div className="flex w-full p-4 justify-center items-center gap-4">
                        <div className="border min-w-[50%]"></div>
                        <div><p>o</p></div>
                        <div className="border min-w-[50%]"></div>
                    </div>
                    <div className="flex w-full justify-center items-center p-4">
                        <ButtonGoogle text="Google" href="#" />
                    </div>
                </form>
            </div>
        </div>
    );
  }