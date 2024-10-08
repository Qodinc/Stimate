import Navbar from "@/components/Navbar";
import Save from "@/components/Icons/Save";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import Dinero from "@/components/Icons/DollarSign";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { Card, CardVariants } from "@/components/cardArea";
import React, { useState } from "react";
import Trash from "@/components/Icons/Trash";
import { Delete } from "@/components/alerts-variants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function EquipoDeTrabajo() {
  const funcionalidades = [
    {
      team: "Analista",
      hourly_rate: 65.63,
      work_hours_per_day: 3,
    },
    {
      team: "Diseñador gráfico",
      hourly_rate: 60.16,
      work_hours_per_day: 4,
    },
    {
      team: "Frontend JS Junior (Gloria)",
      hourly_rate: 63.75,
      work_hours_per_day: 5,
    },
    {
      team: "Frontend JS Junior (Iván)",
      hourly_rate: 63.75,
      work_hours_per_day: 3,
    },
    {
      team: "Backend JS Junior (Pedro)",
      hourly_rate: 75,
      work_hours_per_day: 3,
    },
    {
      team: "Backend JS Junior (Berenice)",
      hourly_rate: 75,
      work_hours_per_day: 5,
    },
  ];

  const [cardData, setCardData] = useState(funcionalidades);

  const handleAddCard = () => {
    const newCardData = {
      team: "",
      hourly_rate: "",
      work_hours_per_day: "",
    };

    setCardData([...cardData, newCardData]);
  };

  const handleRemoveCard = (index) => {
    const updatedCardData = [...cardData];
    updatedCardData.splice(index, 1);
    setCardData(updatedCardData);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCardData = [...cardData];
    updatedCardData[index] = {
      ...updatedCardData[index],
      [name]: value,
    };
    setCardData(updatedCardData);
  };

  return (
    <>
      <Navbar />
      <div className="flex-row h-[85px] px-4 md:px-14 lg:px-20">
        <div className="flex flex-col gap-5 py-5">
          {cardData.map((cardData, index) => (
            <Card
              size="lg"
              className="grid grid-cols-2 p-2 justify-items-center shadow-lg sm:grid-cols-3 lg:grid-cols-3 lg:h-56 xl:grid-cols-6 xl:h-36"
              key={index}
            >
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">
                  Nombre del área
                </span>
                <Input
                  placeholder="Agregar área"
                  name="team"
                  type="text"
                  icon={<Timer width={24} />}
                  value={cardData.team}
                  onChange={(event) => handleInputChange(event, index)}
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
                  name="hourly_rate"
                  icon={<Dinero width={24} />}
                  value={cardData.hourly_rate}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input
                  placeholder="Agregar sueldo"
                  iconPosition="left"
                  type="number"
                  name="sueldoMes"
                  icon={<Dinero width={24} />}
                  value={cardData.sueldoMes}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  name="work_hours_per_day"
                  icon={<Timer width={24} />}
                  value={cardData.work_hours_per_day}
                  onChange={(event) => handleInputChange(event, index)}
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
                  name="work_hours_per_day"
                  icon={<Timer width={24} />}
                  value={cardData.work_hours_per_day * 5}
                />
              </div>
              <div className="sm:w-[200px] lg:h-12 m-2 w-[155px]">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  type="number"
                  disabled={true}
                  value={cardData.work_hours_per_day * 22}
                  icon={<Timer width={24} />}
                />
              </div>
              

              <div className="col-start-2 mt-3 ml-6 sm:col-start-3 lg:col-start-3 xl:col-start-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>
                      <Trash width={24} stroke="white" />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <Delete
                    elemento={cardData.team}
                    onClick={() => handleRemoveCard(index)}
                  />
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-[30px]">
          <Button onClick={handleAddCard}>
            <Plus width={24} stroke="white" />
            Agregar área
          </Button>
        </div>
      </div>
    </>
  );
}
