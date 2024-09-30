import Navbar from "@/components/Navbar";
import Save from "@/components/Icons/Save";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import Dinero from "@/components/Icons/DollarSign";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { Card } from "@/components/cardArea";

export default function Funcionalidades() {
  return (
    <>
      <Navbar />
      <div className="flex-row h-[85px] px-4 md:px-14 lg:px-20">
        <div className="cursor-pointer">
          <Save width={24} height={24} />
        </div>

        <div className="bg-[#DEDCFF] pb-0 rounded-t-[12px] rounded-b-none flex overflow-x-auto scrollbar-hide w-8/12 font-comfortaa">
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 ">
            Equipo de trabajo
          </button>
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 bg-white">
            Funcionalidades
          </button>
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">
            Gastos de operacion
          </button>
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">
            Cargos Asociados
          </button>
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">
            Previsualizacion
          </button>
        </div>

        <Card
          size="lg"
          className="grid grid-cols-2 p-2 justify-items-center sm:grid-cols-3 lg:grid-cols-6 lg:h-24"
        >
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Funcionalidad</span>
            <Input
              placeholder="Agregar funcionalidad"
              type="text"
              icon={<Timer width={24} />}
            />
          </div>
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Analista</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              icon={<Timer width={24} />}
            />
          </div>
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Front-End</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              icon={<Timer width={24} />}
            />
          </div>
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Back-End</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              icon={<Timer width={24} />}
            />
          </div>
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Diseño</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              icon={<Timer width={24} />}
            />
          </div>
          <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
            <span className="font-comfortaa text-base">Horas totales</span>
            <Input
              placeholder="0"
              iconPosition="left"
              disabled={true}
              icon={<Timer width={24} />}
            />
          </div>
        </Card>

        <div className="mt-[40px]">
          <Button>
            <Plus width={24} stroke="white" />
            Agregar funcionalidad
          </Button>
        </div>
      </div>
    </>
  );
}
