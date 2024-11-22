import React from "react";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { Card } from "@/components/cardArea";
import Trash from "@/components/Icons/Trash";
import { Delete } from "@/components/alerts-variants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import formatPrice from "@/lib/formatPrice";

const EquipoContent = ({ team_project, onUpdate }) => {

  const [isEditing, setIsEditing] = useState(false);

  const handleChangeTeamProject = (event, index) => {
    const { name, value } = event.target;

    const numericValue = parseFloat(value);
    
    const updatedTeamProject = team_project.map((area, i) => {
      if (i === index) {
        if (name === "hourly_rate" || name === "mouthly_charge" || name === "work_hours_per_day") {
          return {
            ...area,
            [name]: numericValue
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

  const handleBlurTeamProject = (event, index) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

    const updatedTeamProject = team_project.map((area, i) => {
      if (i === index) {
        if (name === "hourly_rate") {
          return {
            ...area,
            hourly_rate: Number(numericValue.toFixed(2)),
            mouthly_charge: !isNaN(numericValue) ? Number((numericValue * 160).toFixed(2)) : "",
          };
        } else if (name === "mouthly_charge") {
          return {
            ...area,
            mouthly_charge: Number(numericValue.toFixed(2)),
            hourly_rate: !isNaN(numericValue) ? Number((numericValue / 160).toFixed(2)) : "",
          };
        } if (name === "work_hours_per_day") {
          const workHoursPerDay = (!isNaN(numericValue) & numericValue > 24) ? 0 : Number(numericValue.toFixed(2))
          return {
            ...area,
            work_hours_per_day: workHoursPerDay
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
    setIsEditing(false);
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
            className="p-3 items-start relative order"
            key={index}
          >
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
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
                  onBlur={(event) => handleBlurTeamProject(event, index)}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">
                  Sueldo por hora
                </span>
                {
                  isEditing ?
                  (
                    <Input
                      placeholder="Agregar sueldo"
                      type="number"
                      name="hourly_rate"
                      min={0}
                      step={0.01}
                      value={Number(area.hourly_rate ?? 0)}
                      error={Number(area.hourly_rate) == 0 ? '*Campo requerido' : ''}
                      onChange={(event) => handleChangeTeamProject(event, index)}
                      onBlur={(event) => {handleBlurTeamProject(event, index)}}
                    />
                  ) :(
                    <Input
                      placeholder="Agregar sueldo"
                      type="text"
                      name="hourly_rate"
                      value={formatPrice(Number(area.hourly_rate ?? 0))}
                      error={Number(area.hourly_rate) == 0 ? '*Campo requerido' : ''}
                      onClick={()=>setIsEditing(true)}
                    />
                  )
                }
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                {
                  isEditing ? (
                    <Input
                      placeholder="Agregar sueldo"
                      type="number"
                      name="mouthly_charge"
                      min={0}
                      step={0.01}
                      value={!!area.mouthly_charge ? Number(area.mouthly_charge) : Number((area.hourly_rate * 160))}
                      onChange={(event) => handleChangeTeamProject(event, index)}
                      onBlur={(event) => {handleBlurTeamProject(event, index)}}
                    />
                  ) : (
                    <Input
                      placeholder="Agregar sueldo"
                      type="text"
                      name="mouthly_charge"
                      value={formatPrice(!!area.mouthly_charge ? Number(area.mouthly_charge) : Number((area.hourly_rate * 160)))}
                      onClick={()=>setIsEditing(true)}
                    />
                  )
                }
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
                  step={0.01}
                  value={Number(area.work_hours_per_day)}
                  error={Number(area.work_hours_per_day) == 0 ? '*Campo requerido' : ''}
                  onChange={(event) => handleChangeTeamProject(event, index)}
                  onBlur={(event) => handleBlurTeamProject(event, index)}
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
                  value={Number((area.work_hours_per_day * 5).toFixed(1))}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  type="number"
                  disabled={true}
                  value={Number((area.work_hours_per_day * 20).toFixed(1))}
                  icon={<Timer width={24} />}
                />
              </div>
            </div>

            <div className="w-full flex justify-end my-3">
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