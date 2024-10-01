import Navbar from "@/components/Navbar";
import Save from "@/components/Icons/Save";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import Trash from "@/components/Icons/Trash";
import { Card } from "@/components/cardArea";
import { useState } from "react";

export default function Funcionalidades() {
  const inicioSesion = [
    {
      team: "Analista",
      time: 1,
    },
    {
      team: "Diseñador gráfico",
      time: 2,
    },
    {
      team: "Frontend JS Junior (Gloria)",
      time: 3,
    },
    {
      team: "Frontend JS Junior (Iván)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Pedro)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Berenice)",
      time: 4,
    },
  ];

  const cierreSesion = [
    {
      team: "Analista",
      time: 1,
    },
    {
      team: "Diseñador gráfico",
      time: 1,
    },
    {
      team: "Frontend JS Junior (Gloria)",
      time: 2,
    },
    {
      team: "Frontend JS Junior (Iván)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Pedro)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Berenice)",
      time: 3,
    },
  ];

  const registro = [
    {
      team: "Analista",
      time: 2,
    },
    {
      team: "Diseñador gráfico",
      time: 2,
    },
    {
      team: "Frontend JS Junior (Gloria)",
      time: 3.5,
    },
    {
      team: "Frontend JS Junior (Iván)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Pedro)",
      time: 0,
    },
    {
      team: "Backend JS Junior (Berenice)",
      time: 5,
    },
  ];
  const [cardData, setCardData] = useState(
    registro,
    inicioSesion,
    cierreSesion
  );

  const handleAddCard = () => {
    const newCardData = {
      team: "",
      time: "",
    };
    setCardData([...cardData, newCardData]);
  };

  const handleRemoveCard = (index) => {
    const updateCardData = [...cardData];
    updateCardData.splice(index, 1);
    setCardData(updateCardData);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updateCardData = [...cardData];
    updateCardData[index] = {
      ...updateCardData[index],
      [name]: value,
    };
    setCardData(updateCardData);
  };

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

        <div className="flex flex-col gap-5 py-5">
          {cardData.map((cardData, index) => (
            <Card
              size="lg"
              className="grid grid-cols-2 p-2 justify-items-center sm:grid-cols-3 lg:grid-cols-6 lg:h-36 shadow-lg"
              key={index}
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
                <span className="font-comfortaa text-base">Diseñador gráfico</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  icon={<Timer width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Frontend JS Junior (Gloria)</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  icon={<Timer width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Frontend JS Junior (Iván)</span>
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

              <div className="col-start-2 mt-3 sm:col-start-3 lg:col-start-6 ml-6">
                <Button onClick={() => handleRemoveCard(index)}>
                  <Trash width={24} stroke="white" />
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-[40px]">
          <Button onClick={handleAddCard}>
            <Plus width={24} stroke="white" />
            Agregar funcionalidad
          </Button>
        </div>
      </div>
    </>
  );
}
