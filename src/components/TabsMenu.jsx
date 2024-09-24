import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


const TabsMenu = ({ activeTab, onTabChange }) => {
  const tabs = [
    { value: "equipo", label: "Equipo de trabajo" },
    { value: "funcionalidades", label: "Funcionalidades" },
    { value: "gastos", label: "Gastos de operación" },
    { value: "cargos", label: "Cargos asociados" },
    { value: "preview", label: "Previsualización" },
  ];

  return (
    <Tabs defaultValue="equipo" className="w-full overflow-x-auto font-comfortaa">
      <TabsList className="w-max min-w-full flex">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => onTabChange(tab.value)}
            className="flex-shrink-0 whitespace-nowrap"
            data-state={activeTab === tab.value ? "active" : "inactive"}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};


export default TabsMenu

















// TabsMenu originalmente
{/* <Tabs defaultValue="uno" className="w-full font-comfortaa">
<div className="overflow-x-auto">
  <TabsList className="w-max min-w-full flex">
    <TabsTrigger value="uno" >Equipo de trabajo</TabsTrigger>
    <TabsTrigger value="dos" >Funcionalidades</TabsTrigger>
    <TabsTrigger value="tres" >Gastos de operación</TabsTrigger>
    <TabsTrigger value="cuatro" >Cargos asociados</TabsTrigger>
    <TabsTrigger value="preview" >Previsualización</TabsTrigger>
  </TabsList>
</div>
<TabsContent value="uno">Contenido del equipo de trabajo.</TabsContent> ESTE COMPONENTE SE DEJO DE USAR
<TabsContent value="dos">Contenido de funcionalidades.</TabsContent>
<TabsContent value="tres">Contenido de gastos de operación.</TabsContent>
<TabsContent value="cuatro">Contenido de cargos asociados.</TabsContent>
<TabsContent value="preview">Contenido de previsualización.</TabsContent>
</Tabs> */}