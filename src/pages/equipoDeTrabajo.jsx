import Navbar from "@/components/Navbar";
import Save from "@/components/Icons/Save";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import Dinero from "@/components/Icons/DollarSign";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { Card, CardVariants } from "@/components/cardArea";
import React, { useState } from "react";

export default function EquipoDeTrabajo() {
  const [cardData, setCardsData] = useState([]);

  const handleAddCard = () => {
    const newCardData = {
      areaName: "",
      sueldoHora: "",
      sueldoMes: "",
      horasDias: "",
      horasSemana: "0",
      horasMes: "0",
    };

    setCardsData([...cardData, newCardData]);
  };

  return (
    <>
      <Navbar />
      <div className="flex-row h-[85px] px-4 md:px-14 lg:px-20">
        <div className="cursor-pointer">
          <Save width={24} height={24} />
        </div>

        <div className="bg-[#DEDCFF] pb-0 rounded-t-[12px] rounded-b-none flex overflow-x-auto scrollbar-hide w-8/12 font-comfortaa">
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 bg-white ">
            Equipo de trabajo
          </button>
          <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">
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
              className="grid grid-cols-2 p-2 justify-items-center sm:grid-cols-3 lg:grid-cols-6 lg:h-24 shadow-lg"
              key={index}
            >
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Nombre del área
                </span>
                <Input
                  placeholder="Agregar área"
                  icon={<Timer width={24} />}
                  value={cardData.areaName}
                  onChange={(e) => {
                    cardData.areaName = e.target.value;
                  }}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Sueldo por hora
                </span>
                <Input
                  placeholder="Agregar sueldo"
                  iconPosition="left"
                  type="number"
                  icon={<Dinero width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input
                  placeholder="Agregar sueldo"
                  iconPosition="left"
                  type="number"
                  icon={<Dinero width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  icon={<Timer width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px] ">
                <span className="font-comfortaa  md:text-base text-[15px]">
                  Horas a la semana
                </span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  type="number"
                  disabled={true}
                  icon={<Timer width={24} />}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  type="number"
                  disabled={true}
                  icon={<Timer width={24} />}
                />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-[40px]">
          <Button onClick={handleAddCard}>
            <Plus width={24} stroke="white" />
            Agregar área
          </Button>
        </div>
      </div>
    </>
  );
}
