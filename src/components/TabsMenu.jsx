import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importar TabsMenu en index o pagina de prueba

const TabsMenu = () => {
    return(

        <Tabs defaultValue="uno" className="w-full font-comfortaa">
        <div className="overflow-x-auto">
          <TabsList className="w-max min-w-full flex">
            <TabsTrigger value="uno" >Equipo de trabajo</TabsTrigger>
            <TabsTrigger value="dos" >Funcionalidades</TabsTrigger>
            <TabsTrigger value="tres" >Gastos de operación</TabsTrigger>
            <TabsTrigger value="cuatro" >Cargos asociados</TabsTrigger>
            <TabsTrigger value="preview" >Previsualización</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="uno">Contenido del equipo de trabajo.</TabsContent>
        <TabsContent value="dos">Contenido de funcionalidades.</TabsContent>
        <TabsContent value="tres">Contenido de gastos de operación.</TabsContent>
        <TabsContent value="cuatro">Contenido de cargos asociados.</TabsContent>
        <TabsContent value="preview">Contenido de previsualización.</TabsContent>
      </Tabs>

    )
}

export default TabsMenu