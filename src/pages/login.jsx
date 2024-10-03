import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonGoogle from "@/components/ui/buttonGoogle";
import { useState } from 'react';
import LogoStimate from "@/components/Icons/LogoStimate";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        console.log('Validando formulario...');
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            formErrors.email = "El correo electrónico es obligatorio";
        } else if (!emailRegex.test(email)) {
            formErrors.email = "El formato del correo no es válido";
        }

        if (!password) {
            formErrors.password = "La contraseña es obligatoria";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (handle) => {
        handle.preventDefault();
        if (validateForm(handle)) {}
    };

    return (
        <div className="flex w-full min-h-screen md:relative justify-center items-center">
            <div className="w-full h-screen hidden md:block lg:p-4">
                <img className="opacity-40 lg:opacity-100 lg:rounded-xl lg:h-full object-cover w-full h-screen" src="imgLogin.jpg" alt="LoginImg" />
            </div>
            <div className="flex bg-white font-comfortaa md:absolute lg:static md:py-8 md:max-w-96 lg:min-w-[50%] lg:rounded-none md:rounded-xl flex-col items-center justify-center w-full px-4 py-4 lg:px-12 gap-8">
                <div className="flex flex-col items-center justify-center gap-8">
                    <a href="https://stimate-landing-page.vercel.app/">
                        <LogoStimate width={44} height={44} />
                    </a>
                    <h1 className="font-bold text-2xl text-accent font-poppins" >Bienvenido!</h1>
                </div>
                <form className="flex flex-col gap-4 w-full" action="#" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <span>Correo Electrónico</span>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Correo Electrónico" 
                                value={email}
                                onChange={(handle) => setEmail(handle.target.value)}
                                className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-[#C03744] text-xs">*{errors.email}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>Contraseña</span>
                        <div className="flex flex-col gap-1">
                            <Input placeholder="Contraseña" type='password' icon="Icons/icon-eye-off.svg" iconPosition="right" 
                                value={password}
                                onChange={(handle) => setPassword(handle.target.value)}
                                className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.password && <p className="text-[#C03744] text-xs">*{errors.password}</p>}
                        </div>
                    </div>
                    {/* <div className="flex justify-end items-center">
                        <Link className="text-accent" href="#">Olvidaste tu contraseña?</Link>
                    </div> */}
                    <div className="flex flex-col justify-center items-center py-8">
                        <Button variant="default" size="default" type="submit">Iniciar Sesión</Button>
                        <div className="flex w-full p-4 justify-end items-center">
                            <Link href={"/signIn"} className="text-accent">¿No tienes cuenta?</Link>
                        </div>
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