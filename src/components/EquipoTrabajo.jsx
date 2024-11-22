import formatPrice from "@/lib/formatPrice";
import Trash from "@/components/Icons/Trash";
import { Delete } from "@/components/alerts-variants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Input from "@/components/input";
import Timer from "@/components/Icons/Timer";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function EquipoTrabajo({ team_project, onUpdate, onRemove }) {

    const [isEditingH, setIsEditingH] = useState(false);
    const [isEditingM, setIsEditingM] = useState(false);
    
    const handleBlurTeamProject = (event) => {
        const { name, value } = event.target;
        const numericValue = parseFloat(value);
        const updatedArea = {
            ...team_project,
            [name]: isNaN(numericValue) ? value : numericValue
        };
    
        if (name === "hourly_rate") {
            updatedArea.hourly_rate = Number(numericValue.toFixed(2));
            updatedArea.mouthly_charge = Number((numericValue * 160).toFixed(2));
        } else if (name === "mouthly_charge") {
            updatedArea.mouthly_charge = Number(numericValue.toFixed(2));
            updatedArea.hourly_rate = Number((numericValue / 160).toFixed(2));
        }
        
        onUpdate(updatedArea); // Llama a onUpdate con el área modificada
    };

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

    return (
        <div
            size="lg"
            className="p-3 items-start relative order shadow-[5px_5px_7px_rgba(0,0,0,0.1)] rounded-md"
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
                  value={team_project.team}
                  error={!team_project.team ? '*Campo requerido' : ''}
                  onChange={(event) => handleChangeTeamProject(event, index)}
                  onBlur={(event) => handleBlurTeamProject(event)}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">
                  Sueldo por hora
                </span>
                {
                  isEditingH ?
                  (
                    <Input
                      placeholder="Agregar sueldo"
                      type="number"
                      name="hourly_rate"
                      min={0}
                      step={0.01}
                      value={Number(team_project.hourly_rate ?? 0)}
                      error={Number(team_project.hourly_rate) == 0 ? '*Campo requerido' : ''}
                      onChange={(event) => handleChangeTeamProject(event, index)}
                      onBlur={(event) => {handleBlurTeamProject(event), setIsEditingH(false)}}
                    />
                  ) :(
                    <Input
                      placeholder="Agregar sueldo"
                      type="text"
                      name="hourly_rate"
                      value={formatPrice(Number(team_project.hourly_rate ?? 0))}
                      error={Number(team_project.hourly_rate) == 0 ? '*Campo requerido' : ''}
                      onClick={()=>setIsEditingH(true)}
                    />
                  )
                }
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                {
                  isEditingM ? (
                    <Input
                      placeholder="Agregar sueldo"
                      type="number"
                      name="mouthly_charge"
                      min={0}
                      step={0.01}
                      value={!!team_project.mouthly_charge ? Number(team_project.mouthly_charge) : Number((team_project.hourly_rate * 160))}
                      onChange={(event) => handleChangeTeamProject(event, index)}
                      onBlur={(event) => {handleBlurTeamProject(event), setIsEditingM(false)}}
                    />
                  ) : (
                    <Input
                      placeholder="Agregar sueldo"
                      type="text"
                      name="mouthly_charge"
                      value={formatPrice(!!team_project.mouthly_charge ? Number(team_project.mouthly_charge) : Number((team_project.hourly_rate * 160)))}
                      onClick={()=>setIsEditingM(true)}
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
                  value={Number(team_project.work_hours_per_day)}
                  error={Number(team_project.work_hours_per_day) == 0 ? '*Campo requerido' : ''}
                  onChange={(event) => handleChangeTeamProject(event, index)}
                  onBlur={(event) => handleBlurTeamProject(event)}
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
                  value={Number((team_project.work_hours_per_day * 5).toFixed(1))}
                />
              </div>
              <div className="w-full">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input
                  placeholder="0"
                  iconPosition="left"
                  type="number"
                  disabled={true}
                  value={Number((team_project.work_hours_per_day * 20).toFixed(1))}
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
                  elemento={team_project.team}
                  onClick={onRemove}
                />
              </AlertDialog>
            </div>
          </div>
    )
}