import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Timer from "./Icons/Timer";
import { useState } from "react";
import { Card } from "./cardArea";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import Trash from "./Icons/Trash";

export default function CardFuncionalidades({ cardKey, name, teams, setTeams }) {
  const [errors, setErrors] = useState({ nombre: "", tipo: "" });
  const [inputValue, setInputValue] = useState(name);
  const [team, setTeam] = useState(setTeams);
  const [sum, setSum] = useState(0);

  const handleRemoveCard = (cardKey) => {
    const card = document.getElementById(cardKey);
    card.remove();
  };

  const handleCantidadChange = (event, index) => {
    const inputValue = event.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
        const monto = parseFloat(inputValue);
        const newTeams = [...teams];

        if (!isNaN(monto) && monto >= 0) {
            setErrors((prev) => ({ ...prev, [`team${index}`]: "" }));  
            newTeams[index].time = monto;  
            setTeam(newTeams); 
            setSum(calculate(newTeams));
        } else {
            setErrors((prev) => ({ ...prev, [`team${index}`]: "El monto debe ser mayor a 0" }));
        }
    } else {
        setErrors((prev) => ({ ...prev, [`team${index}`]: "Solo se permiten números positivos" }));
    }
};


  const editValue = (name) => {
    const nombre = name.target.value;
    if (nombre.trim() === "") {
      setErrors((prev) => ({ ...prev, nombre: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, nombre: "" }));
    }
    setInputValue(nombre);
  };

  function calculate(teams) {
    return teams.reduce((total, team) => total + (parseFloat(team.time) || 0), 0);
  }

  return (
    <>
      <Card
        id={cardKey}
        size="lg"
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-2 items-center justify-items-center gap-2 relative pb-16 border"
      >
        <div className="xs:max-w-full sm:max-w-[200px] w-full">
          <span className="font-comfortaa text-base">Funcionalidad</span>
          <Input
            placeholder="Agregar funcionalidad"
            type="text"
            value={inputValue}
            icon={<Timer width={24} />}
            onChange={editValue}
            className={errors.nombre ? "border-red-500" : ""}
          />
          {errors.nombre && (
            <span className="text-baseM text-[#C03744]">*{errors.nombre}</span>
          )}
        </div>
        {teams.map((team, index) => (
          <div key={index} className="xs:max-w-full sm:max-w-[200px] w-full">
            <span className="font-comfortaa text-base">{team.team}</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              value={team.time}
              icon={<Timer width={24} />}
              min={0}
              step={0.01}
              onChange={(event) => handleCantidadChange(event, index)}
              className={errors[`team${index}`] ? "border-red-500" : ""}
            />
            {errors[`team${index}`] && (
              <span className="text-baseM text-[#C03744]">
                *{errors[`team${index}`]}
              </span>
              
            )}
          </div>
        ))}
        <div className="xs:max-w-full sm:max-w-[200px] w-full">
          <span className="font-comfortaa text-base">Horas totales</span>
          <Input
            placeholder="0"
            iconPosition="left"
            disabled={true}
            value={calculate(teams)}
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
              elemento={name}
              onClick={() => handleRemoveCard(cardKey)}
            />
          </AlertDialog>
        </div>
      </Card>
    </>
  );
}
