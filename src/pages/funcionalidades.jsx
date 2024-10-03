import Navbar from "@/components/Navbar";
import Save from "@/components/Icons/Save";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import Trash from "@/components/Icons/Trash";
import { Card } from "@/components/cardArea";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";

function calculate(teams) {
  return teams.reduce((total, team) => total + team.time, 0);
}
export default function Funcionalidades() {
  const funcionalidad = [
    {
      name: "Inicio de Sesión",
      teams: [
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
          time: 2,
        },
        {
          team: "Backend JS Junior (Pedro)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 4,
        },
      ],
    },
    {
      name: "Cierre de Sesión",
      teams: [
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
          time: 2,
        },
        {
          team: "Backend JS Junior (Pedro)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 3,
        },
      ],
    },
    {
      name: "Registro",
      teams: [
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
          time: 4,
        },
        {
          team: "Backend JS Junior (Pedro)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 5,
        },
      ],
    },
  ];

  const [cardData, setCardData] = useState(funcionalidad);

  const handleAddCard = () => {
    const newCardData = {
      name: "",
      teams: [
        { team: "Analista", time: 0 },
        { team: "Diseñador gráfico", time: 0 },
        { team: "Frontend JS Junior", time: 0 },
        { team: "Frontend JS Junior", time: 0 },
        { team: "Backend JS Junior", time: 0 },
        { team: "Backend JS Junior", time: 0 },
      ],
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
    const teamIndex = parseInt(name.slice(-1));
    const updateCardData = [...cardData];
    updateCardData[index].teams[teamIndex - 1] = {
      ...updateCardData[index].teams[teamIndex - 1],
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
          {cardData.map((funcionalidad, index) => (
            <Card
              size="lg"
              className="grid grid-cols-2 p-2 justify-items-center sm:grid-cols-3 lg:grid-cols-8 lg:h-34 shadow-lg"
              key={index}
            >
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Funcionalidad</span>
                <Input
                  placeholder="Agregar funcionalidad"
                  type="text"
                  value={funcionalidad.name}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Analista</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[0].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Diseñador gráfico
                </span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[1].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa md:text-base text-[15px]">
                  Frontend JS Junior
                </span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[2].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Frontend JS Junior
                </span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[3].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Backend JS Junior
                </span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[4].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa md:text-base text-[14px]">
                  Backend JS Junior
                </span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  value={funcionalidad.teams[5].time}
                  icon={<Timer width={24} />}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Horas totales</span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  disabled={true}
                  value={calculate(funcionalidad.teams)}
                  icon={<Timer width={24} />}
                />
              </div>

              <div className="col-start-2 mt-5 sm:col-start-3 lg:col-start-8 ml-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>
                      <Trash width={24} stroke="white" />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <Delete
                    elemento={funcionalidad.name}
                    onClick={() => handleRemoveCard(index)}
                  />
                </AlertDialog>
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
