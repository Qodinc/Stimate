import CargosContent from "@/components/tabContent/CargosContent";
import EquipoContent from "@/components/tabContent/EquipoContent";
import FuncionalidadesContent from "@/components/tabContent/FuncionalidadesContent";
import GastosContent from "@/components/tabContent/GastosContent";
import Preview from "@/components/tabContent/Preview";
import TabsMenu from "@/components/TabsMenu";
import { useState } from "react";

export default function TabsPages() {
  const [activeTab, setActiveTab] = useState("equipo")

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
      <div>
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
    );
  }