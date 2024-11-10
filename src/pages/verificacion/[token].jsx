import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HttpServices from "@/lib/http-services";
import { useSession } from "next-auth/react";
import LogoStimate from "@/components/Icons/LogoStimate";

export default function Verification() {

    const { data: session } = useSession();
    const httpServices = new HttpServices(session)
    const router = useRouter();
    const { token } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await httpServices.getToken(token)
                if (!response.ok) {
                    setStatusMessage("Cuenta No Verificada");
                } else {
                    const { data } = await response.json();
                    if (data.status === 'success') {
                        setStatusMessage("Tu correo fue verificado! Serás redirigido a iniciar sesión.");
                        setTimeout(() => router.push('/iniciar-sesion'), 6000);
                    } else {
                        setStatusMessage("Ocurrió un error durante la verificación.");
                        setTimeout(() => router.push('/iniciar-sesion'), 6000);
                    }
                }
            } catch (error) {
                setStatusMessage("Error al verificar el token.");
            } finally {
                setTimeout(() => setIsLoading(false), 2000);
            }
        }
        if (token) {
            fetchTokens()
        }
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl">
                Verificando...
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen text-2xl">
             <a href="https://stimate-landing-page.vercel.app/">
                <LogoStimate width={44} height={44} />
            </a>
            <span>{statusMessage}</span>
        </div>
    );
}
