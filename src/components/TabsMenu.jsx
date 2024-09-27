import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabsMenu = ({ activeTab, onTabChange, tabs }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full overflow-x-auto font-comfortaa">
      <TabsList className="w-max min-w-full flex">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-shrink-0 whitespace-nowrap"
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