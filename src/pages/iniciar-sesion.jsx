import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonGoogle from "@/components/ui/buttonGoogle";
import LogoStimate from "@/components/Icons/LogoStimate";
import Head from 'next/head';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/' });
    };

    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            formErrors.email = "El correo electrónico es obligatorio";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "El formato del correo no es válido";
        }

        if (!formData.password) {
            formErrors.password = "La contraseña es obligatoria";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                const result = await signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (!result.ok) {
                    console.error('Error de autenticación:', result.error);
                    setErrors({ auth: "El correo o contraseña son incorrectos." });
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors({ auth: "Error al iniciar sesión" });
            }
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <Head>
                <title>Inicio de sesion</title>
            </Head>
            <div className="flex w-full min-h-screen md:relative justify-center items-center">
                <div className="w-full h-screen hidden md:block lg:p-4">
                    <img
                        className="opacity-40 lg:opacity-100 lg:rounded-xl lg:h-full object-cover w-full h-screen"
                        src="imgLogin.jpg"
                        alt="LoginImg"
                    />
                </div>
                <div className="flex bg-white font-comfortaa md:absolute lg:static md:py-8 md:max-w-96 lg:min-w-[50%] lg:rounded-none md:rounded-xl flex-col items-center justify-center w-full px-4 py-4 lg:px-12 gap-8">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <a href="https://stimate-landing-page.vercel.app/">
                            <LogoStimate width={44} height={44} />
                        </a>
                        <h1 className="font-bold text-2xl text-accent font-poppins">Bienvenido!</h1>
                    </div>
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                        {errors.auth && (
                            <div className="text-red-500 text-sm text-center">
                                {errors.auth}
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <span>Correo Electrónico</span>
                            <div className="flex flex-col gap-1">
                                <Input
                                    placeholder="Correo Electrónico"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="text-[#C03744] text-xs">*{errors.email}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>Contraseña</span>
                            <div className="flex flex-col gap-1">
                                <Input
                                    placeholder="Contraseña"
                                    type="password"
                                    icon="Icons/icon-eye-off.svg"
                                    iconPosition="right"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.password && <p className="text-[#C03744] text-xs">*{errors.password}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center py-8">
                            <Button
                                variant="default"
                                size="default"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
                            </Button>
                            <div className="flex w-full p-4 justify-end items-center">
                                <Link href="/crear-cuenta" className="text-accent">
                                    ¿No tienes cuenta?
                                </Link>
                            </div>
                        </div>
                        <div className="flex w-full p-4 justify-center items-center gap-4">
                            <div className="border min-w-[50%]"></div>
                            <p>o</p>
                            <div className="border min-w-[50%]"></div>
                        </div>
                    </form>
                    <div className="flex w-full justify-center items-center p-4">
                        <ButtonGoogle text="Google" onClick={handleGoogleSignIn} />
                    </div>
                </div>
            </div>
        </>
    );
}