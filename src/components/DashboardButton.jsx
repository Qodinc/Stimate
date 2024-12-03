import Link from "next/link";
import { useRouter } from "next/router";
import { Home } from "lucide-react";

const DashboardButton = () => {
  const { pathname } = useRouter();

  // Ocultar botón si estás en el dashboard
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="ml-2 md:ml-10 font-bold flex items-center place-self-center text-white bg-accent py-2 px-3 rounded-full cursor-pointer hover:bg-white justify-between gap-2 hover:text-accent transition-colors duration-200"
    >
      <Home className="w-6 h-6" />
      <span className="hidden md:block">Proyectos</span> 
    </Link>
  );
};

export default DashboardButton;