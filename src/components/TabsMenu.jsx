import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importar TabsMenu en index o pagina de prueba

const TabsMenu = () => {
    return(

        <Tabs defaultValue="uno" className="w-full md:w-[400px]">
            <TabsList className="bg-[#DEDCFF] pb-0 rounded-t-[12px] rounded-b-none flex overflow-x-auto scrollbar-hide">
              <TabsTrigger value="uno" className="rounded-t-[12px] rounded-b-none flex-shrink-0">Equipo de trabajo</TabsTrigger>
              <TabsTrigger value="dos" className="rounded-t-[12px] rounded-b-none flex-shrink-0">Funcionalidades</TabsTrigger>
              <TabsTrigger value="tres" className="rounded-t-[12px] rounded-b-none flex-shrink-0">Gastos de operacion</TabsTrigger>
              <TabsTrigger value="cuatro" className="rounded-t-[12px] rounded-b-none flex-shrink-0">Cargos asociados</TabsTrigger>
              <TabsTrigger value="cinco" className="rounded-t-[12px] rounded-b-none flex-shrink-0">Previsualizacion</TabsTrigger>
            </TabsList>
            <TabsContent value="uno">Make changes to your account here.</TabsContent>
            <TabsContent value="dos">Change your password here.</TabsContent>
            <TabsContent value="tres">Hola</TabsContent>
        </Tabs>

    )
}

export default TabsMenu