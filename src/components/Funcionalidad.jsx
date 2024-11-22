import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Timer from "./Icons/Timer";
import { useState } from "react";
import { Card } from "./cardArea";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import Trash from "./Icons/Trash";

export default function Funcionalidad({ feature, onUpdate, onRemove }) {
  const [errors, setErrors] = useState({});

  const validateAndUpdate = (newFeatureData) => {
    const newErrors = {};

    // Validar nombre de funcionalidad
    if (!newFeatureData.feature.trim()) {
      newErrors.feature = "Este campo es obligatorio";
    }

    // Validar tiempos de equipo
    newFeatureData.team_features.forEach((team, index) => {
      if (isNaN(team.time) || team.time < 0) {
        newErrors[`team${index}`] = "El tiempo debe ser un número positivo";
      }
    });

    setErrors(newErrors);

    // Si no hay errores, actualizar
    onUpdate(newFeatureData);

    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureNameChange = (event) => {
    const newFeatureData = {
      ...feature,
      feature: event.target.value
    };

    validateAndUpdate(newFeatureData);
  };

  const handleTeamTimeChange = (event, teamIndex) => {
    const value = event.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      const time = parseFloat(value) || 0;
      const newTeamFeatures = feature.team_features.map((team, index) =>
        index === teamIndex ? { ...team, time } : team
      );

      const newFeatureData = {
        ...feature,
        team_features: newTeamFeatures
      };

      validateAndUpdate(newFeatureData);
    }
  };

  const calculateTotalHours = () => {
    return feature.team_features
      .reduce((total, team) => total + (parseFloat(team.time) || 0), 0)
      .toFixed(2);
  };

  return (
    <Card
      size="lg"
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-3 items-start justify-items-center gap-2 relative pb-16 border"
    >
      <div className="xs:max-w-full sm:max-w-[200px] w-full">
        <label className="font-comfortaa text-base">Funcionalidad</label>
        <Input
          name="feature"
          placeholder="Agregar funcionalidad"
          type="text"
          value={feature.feature}
          icon={<Timer width={24} />}
          onChange={handleFeatureNameChange}
          className={errors.feature ? "border-red-500" : ""}
        />
        {errors.feature && (
          <span className="text-baseM text-[#C03744]">*{errors.feature}</span>
        )}
      </div>

      {feature.team_features.map((team, index) => (
        <div key={index} className="xs:max-w-full sm:max-w-[200px] w-full">
          <span className="font-comfortaa text-base">{team.team}</span>
          <Input
            name={`team_feature_${index}`}
            placeholder="Agregar horas"
            iconPosition="left"
            type="number"
            value={team.time}
            icon={<Timer width={24} />}
            min={0}
            step={0.01}
            onChange={(event) => handleTeamTimeChange(event, index)}
            className={errors[`team${index}`] ? "border-red-500" : ""}
          />
          {errors[`team${index}`] && (
            <span className="text-baseM text-[#C03744]">*{errors[`team${index}`]}</span>
          )}
        </div>
      ))}
      <div className="xs:max-w-full sm:max-w-[200px] w-full">
        <span className="font-comfortaa text-base">Horas totales</span>
        <Input
          placeholder="0"
          iconPosition="left"
          disabled={true}
          value={calculateTotalHours()}
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
            elemento={feature.feature}
            onClick={onRemove}
          />
        </AlertDialog>
      </div>
    </Card>
  );
}
