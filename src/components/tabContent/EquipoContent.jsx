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

const EquipoContent = ({ team_project, onUpdate }) => {

  const handleChangeTeamProject = (event, index) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

    const updatedTeamProject = team_project.map((area, i) => {
      if (i === index) {
        if (name === "hourly_rate") {
          return {
            ...area,
            hourly_rate: numericValue,
            mouthly_charge: !isNaN(numericValue) ? Number((numericValue * 160).toFixed(2)) : "",
          };
        } else if (name === "mouthly_charge") {
          return {
            ...area,
            mouthly_charge: numericValue,
            hourly_rate: !isNaN(numericValue) ? Number((numericValue / 160).toFixed(2)) : "",
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

    onUpdate(updatedTeamProject);
  }

  const handleAddTeamProject = () => {
    const newTeamProject = {
      team: "",
      hourly_rate: 0,
      work_hours_per_day: 0,
    };
  
    const updatedTeamProject = [...team_project, newTeamProject];
    onUpdate(updatedTeamProject);
  };

  const handleRemoveTeamProject = (index) => {
    const updatedTeamProject = team_project.filter((_, i) => i !== index);
    onUpdate(updatedTeamProject); 
  };

  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {team_project.map((area, index) => (
          <Card
            size="lg"
            className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-2 items-start justify-items-center gap-2 relative pb-16 border"
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
                value={area.team}
                error={!area.team ? '*Campo requerido' : ''}
                onChange={(event) => handleChangeTeamProject(event, index)}
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
                name="hourly_rate"
                icon={<Dinero width={24} />}
                min={0}
                value={Number(area.hourly_rate).toFixed(2)}
                error={Number(area.hourly_rate) == 0 ? '*Campo requerido' : ''}
                onChange={(event) => handleChangeTeamProject(event, index)}
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
                min={0}
                value={area.mouthly_charge ? area.mouthly_charge.toFixed(2) : (area.hourly_rate * 160).toFixed(2)}
                onChange={(event) => handleChangeTeamProject(event, index)}
              />
            </div>
            <div className="w-full">
              <span className="font-comfortaa text-base">Horas al día</span>
              <Input
                placeholder="Agregar horas"
                iconPosition="left"
                type="number"
                name="work_hours_per_day"
                icon={<Timer width={24} />}
                min={0}
                max={24}
                value={Number(area.work_hours_per_day).toFixed(1)}
                error={Number(area.work_hours_per_day) == 0 ? '*Campo requerido' : ''}
                onChange={(event) => handleChangeTeamProject(event, index)}
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
                value={(area.work_hours_per_day * 5).toFixed(1)}
              />
            </div>
            <div className="w-full">
              <span className="font-comfortaa text-base">Horas al mes</span>
              <Input
                placeholder="0"
                iconPosition="left"
                type="number"
                disabled={true}
                value={(area.work_hours_per_day * 20).toFixed(1)}
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
                  elemento={area.team}
                  onClick={() => handleRemoveTeamProject(index)}
                />
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <Button onClick={handleAddTeamProject}>
          <Plus width={24} stroke="white" />
          Agregar área
        </Button>
      </div>
    </section>
  );
};

export default EquipoContent;