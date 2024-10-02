import Navbar from "@/components/Navbar";
import CargosContent from "@/components/tabContent/CargosContent";
import EquipoContent from "@/components/tabContent/EquipoContent";
import FuncionalidadesContent from "@/components/tabContent/FuncionalidadesContent";
import GastosContent from "@/components/tabContent/GastosContent";
import Preview from "@/components/tabContent/Preview";
import TabsMenu from "@/components/TabsMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TabsPages() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState("equipo");
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const tabs = [
    { value: "equipo", label: "Equipo de trabajo" },
    { value: "funcionalidades", label: "Funcionalidades" },
    { value: "gastos", label: "Gastos de operación" },
    { value: "cargos", label: "Cargos asociados" },
    { value: "preview", label: "Previsualización" },
  ];

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  useEffect(() => {

  }, [estimatedTime])

  useEffect(() => {

  }, [estimatedCost])

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "equipo":
        return <EquipoContent />
      case "funcionalidades":
        return <FuncionalidadesContent />
      case "gastos":
        return <GastosContent />
      case "cargos":
        return <CargosContent />
      case "preview":
        return <Preview />
      default:
        return null
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!project) {
    return <div>No se encontró el proyecto</div>;
  }

  return (
    <>
      <Navbar />
      <div className="sticky top-[85px] left-0 right-0 flex flex-wrap justify-between font-comfortaa md:text-lg grid-cols-3 px-4 md:px-14 lg:px-20 pt-5 bg-white z-40 border-b">
        <h2>Nombre del proyecto: <strong>{project.name_project}</strong></h2>
        <h2>Tiempo estimado: <strong>{estimatedTime} meses</strong></h2>
        <h2>Costo estimado: <strong>${estimatedCost}</strong></h2>
      </div>
      <div className="px-4 md:px-14 lg:px-20">
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
        {renderContent()}
      </div>
    </>
  );
}
