import Navbar from "@/components/Navbar";
import CargosContent from "@/components/tabContent/CargosContent";
import EquipoContent from "@/components/tabContent/EquipoContent";
import FuncionalidadesContent from "@/components/tabContent/FuncionalidadesContent";
import GastosContent from "@/components/tabContent/GastosContent";
import Preview from "@/components/tabContent/Preview";
import TabsMenu from "@/components/TabsMenu";
import { useState } from "react";
import { useRouter } from "next/router";

export default function TabsPages() {
  const router = useRouter()
  const slug = router.query.slug
  const nameProject = 'Cuponera Digital'
  const [activeTab, setActiveTab] = useState("equipo")

  const tabs = [
    { value: "equipo", label: "Equipo de trabajo" },
    { value: "funcionalidades", label: "Funcionalidades" },
    { value: "gastos", label: "Gastos de operación" },
    { value: "cargos", label: "Cargos asociados" },
    { value: "preview", label: "Previsualización" },
  ];

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

    return (
      <>
        <Navbar />
        <div className="sticky top-[85px] left-0 right-0 flex flex-wrap justify-between font-comfortaa md:text-lg grid-cols-3 px-4 md:px-14 lg:px-20 pt-5 bg-white  z-40 border-b">
          <h2>Nombre del proyecto: <strong>{nameProject}</strong></h2>
          <h2>Tiempo estimado: <strong>{'1.9'} meses</strong></h2>
          <h2>Costo estimado: <strong>{'$44,060.41'}</strong></h2>
        </div>
        <div className="px-4 md:px-14 lg:px-20"> 
          <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
          {renderContent()}
        </div>
      </>
    );
  }