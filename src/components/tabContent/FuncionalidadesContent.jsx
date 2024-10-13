import React, { useState } from "react";
import { Card } from "../cardArea";
import Timer from "../Icons/Timer";
import Input from "../input";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import Trash from "../Icons/Trash";
import { Delete } from "../alerts-variants";
import Plus from "../Icons/Plus";

const FuncionalidadesContent = () => {
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

  function calculate(teams) {
    return teams.reduce((total, team) => total + team.time, 0);
  }

  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {cardData.map((funcionalidad, index) => (
          <Card
            size="lg"
            className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-2 items-center justify-items-center gap-2 relative pb-16 border"
            key={index}
          >
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
              <span className="font-comfortaa text-base">Funcionalidad</span>
              <Input
                placeholder="Agregar funcionalidad"
                type="text"
                value={funcionalidad.name}
                icon={<Timer width={24} />}
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
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
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
              <span className="font-comfortaa text-base">
                Diseñador gráfico
              </span>
              <Input
                placeholder="sm:max-w-full Agregar horas"
                iconPosition="left"
                type="number"
                value={funcionalidad.teams[1].time}
                icon={<Timer width={24} />}
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
              <span className="font-comfortaa md:text-base text-[15px]">
                Frontend JS Junior
              </span>
              <Input
                placeholder="sm:max-w-full Agregar horas"
                iconPosition="left"
                type="number"
                value={funcionalidad.teams[2].time}
                icon={<Timer width={24} />}
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
              <span className="font-comfortaa text-base">
                Frontend JS Junior
              </span>
              <Input
                placeholder="sm:max-w-full Agregar horas"
                iconPosition="left"
                type="number"
                value={funcionalidad.teams[3].time}
                icon={<Timer width={24} />}
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
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
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
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
            <div className="xs:max-w-full sm:max-w-[200px] w-full">
              <span className="font-comfortaa text-base">Horas totales</span>
              <Input
                placeholder="0"
                iconPosition="left"
                disabled={true}
                value={calculate(funcionalidad.teams)}
                icon={<Timer width={24} />}
              />
            </div>

            <div className="mt-5 sm:col-start-3 ml-6 absolute bottom-2 right-2">
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

      <div className="">
        <Button onClick={handleAddCard}>
          <Plus width={24} stroke="white" />
          Agregar funcionalidad
        </Button>
      </div>
    </section>
  );
};

export default FuncionalidadesContent;