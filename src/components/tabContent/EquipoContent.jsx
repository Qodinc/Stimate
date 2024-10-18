import React, { useState } from "react";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import Dinero from "@/components/Icons/DollarSign";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { Card } from "@/components/cardArea";
import Trash from "@/components/Icons/Trash";
import { Delete } from "@/components/alerts-variants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const EquipoContent = ({ teamProject, setTeamProject }) => {
  const [team, setTeam] = useState(teamProject);

  const handleAddCard = () => {
    const newCardData = {
      team: "",
      hourly_rate: "",
      work_hours_per_day: "",
    };

    // setCardData([...cardData, newCardData]);
  };

  const handleRemoveCard = (index) => {
    const updatedCardData = [...cardData];
    updatedCardData.splice(index, 1);
    setCardData(updatedCardData);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    const updatedCardData = [...cardData];
    updatedCardData[index] = {
      ...updatedCardData[index],
      [name]: value,
    };
    // setCardData(updatedCardData);

    setTeam((prevTeam) => {
      if (!Array.isArray(prevTeam)) {
        return [];
      }

      const updatedAreas = prevTeam.map((area, i) => {
        if (i === index) {
          if (name === "hourly_charge") {
            return {
              ...area,
              hourly_charge: value,
              mouthly_charge: !isNaN(numericValue) ? (numericValue * 160).toFixed(2) : "",
            };
          } else if (name === "mouthly_charge") {
            return {
              ...area,
              mouthly_charge: value,
              hourly_charge: !isNaN(numericValue) ? (numericValue / 160).toFixed(2) : "",
            };
          } else if (name === "area") {

            return {
              ...area,
              area: {
                ...area.area,
                area: value
              },
            };
          } else {
            return {
              ...area,
              [name]: value,
            };
          }
        }

        return area;
      });

      return updatedAreas;
    });
  };

    return (
      <section>
        <div className="flex flex-col gap-5 py-5">
          {team.map((cardData, index) => (
            <Card
              size="lg"
              className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-2 items-center justify-items-center gap-2 relative pb-16 border"
              key={index}
            >
              <div className="w-full">
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
              <div className="w-full">
                <span className="font-comfortaa text-base">
                  Sueldo por hora
                </span>
                <Input
                  placeholder="Agregar sueldo"
                  iconPosition="left"
                  type="number"
                  name="hourly_charge"
                  icon={<Dinero width={24} />}
                  value={cardData.hourly_rate}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input
                  placeholder="Agregar sueldo"
                  iconPosition="left"
                  type="number"
                  name="mouthly_charge"
                  icon={<Dinero width={24} />}
                  value={cardData.sueldoMes}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input
                  placeholder="Agregar horas"
                  iconPosition="left"
                  type="number"
                  name="hours_work_per_day"
                  icon={<Timer width={24} />}
                  value={cardData.work_hours_per_day}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <div className="w-full">
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
              <div className="w-full">
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

              <div className="mt-5 sm:col-start-3 ml-6 absolute bottom-2 right-2">
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

        <div className="mt-[40px]">
          <Button onClick={handleAddCard}>
            <Plus width={24} stroke="white" />
            Agregar área
          </Button>
        </div>
      </section>
    );
  };
  
  export default EquipoContent;