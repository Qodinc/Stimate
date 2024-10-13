import Navbar from "@/components/Navbar";
import CargosContent from "@/components/tabContent/CargosContent";
import EquipoContent from "@/components/tabContent/EquipoContent";
import FuncionalidadesContent from "@/components/tabContent/FuncionalidadesContent";
import GastosContent from "@/components/tabContent/GastosContent";
import Preview from "@/components/tabContent/Preview";
import TabsMenu from "@/components/TabsMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const ProjectInterfaz = {
  owner_id: null,
  slug: "",
  name_project: "",
  status_project: "",
  team_project: [],
  features_project: [],
  operating_expenses: [],
  associated_cost: [],
  sale_comission: 0,
  profit: 0,
  tax: 0,
  notes: ""
}

export default function TabsPages() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState("equipo");
  const [project, setProject] = useState(ProjectInterfaz);
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(1.9);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const tabs = [
    { value: "equipo", label: "Equipo de trabajo" },
    { value: "funcionalidades", label: "Funcionalidades" },
    { value: "gastos", label: "Gastos de operación" },
    { value: "cargos", label: "Cargos asociados" },
    { value: "preview", label: "Previsualización" },
  ];

  useEffect(() => {
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

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  useEffect(() => {

  }, [estimatedTime])

  useEffect(() => {

  }, [estimatedCost])

  

  const renderContent = () => {
    switch (activeTab) {
      case "equipo":
        return <EquipoContent teamProject={project.team_project}/>
      case "funcionalidades":
        return <FuncionalidadesContent featuresProject={project.features_project} />
      case "gastos":
        return <GastosContent operatingExpenses={project.operating_expenses} />
      case "cargos":
        return <CargosContent associatedCosts={project.associated_cost} />
      case "preview":
        return <Preview project={project}/>
      default:
        return null
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!project.slug) {
    return (
      <>
        <Navbar />
        <div className="h-[75vh] flex justify-center items-center font-comfortaa bg-white md:text-lg">
          No se encontró el proyecto
        </div>;
      </>
    )
  }

  return (
    <>
      <Navbar />
      <header className="sticky top-[85px] left-0 right-0 flex flex-wrap justify-between font-comfortaa md:text-lg grid-cols-3 px-4 md:px-14 lg:px-20 pt-5 bg-white z-40 border-b">
        <h2>Nombre del proyecto: <strong>{project.name_project}</strong></h2>
        <h2>Tiempo estimado: <strong>{estimatedTime} meses</strong></h2>
        <h2>Costo estimado: <strong>${estimatedCost}</strong></h2>
      </header>
      <main className="px-4 md:px-14 lg:px-20">
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
        {renderContent()}
      </main>
    </>
  );
}
