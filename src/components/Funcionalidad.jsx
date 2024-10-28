import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Timer from "./Icons/Timer";
import { useState } from "react";
import { Card } from "./cardArea";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import Trash from "./Icons/Trash";

export default function Funcionalidad({ featureIndex, feature, teamFeatures, onUpdate, onRemove }) {
  const [errors, setErrors] = useState({});
  const [featureData, setFeatureData] = useState({
    feature,
    team_features: teamFeatures
  });

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
      ...featureData,
      feature: event.target.value
    };
    setFeatureData(newFeatureData);
    validateAndUpdate(newFeatureData);
  };

  const handleTeamTimeChange = (event, teamIndex) => {
    const value = event.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      const time = parseFloat(value) || 0;
      const newTeamFeatures = featureData.team_features.map((team, index) =>
        index === teamIndex ? { ...team, time } : team
      );

      const newFeatureData = {
        ...featureData,
        team_features: newTeamFeatures
      };

      setFeatureData(newFeatureData);
      validateAndUpdate(newFeatureData);
    }
  };

  const calculateTotalHours = () => {
    return featureData.team_features
      .reduce((total, team) => total + (parseFloat(team.time) || 0), 0)
      .toFixed(2);
  };

  return (
    <>
      <Card
        size="lg"
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-2 items-center justify-items-center gap-2 relative pb-16 border"
      >
        <div className="xs:max-w-full sm:max-w-[200px] w-full">
          <span className="font-comfortaa text-base">Funcionalidad</span>
          <Input
            placeholder="Agregar funcionalidad"
            type="text"
            value={featureData.feature}
            icon={<Timer width={24} />}
            onChange={handleFeatureNameChange}
            className={errors.feature ? "border-red-500" : ""}
          />
          {errors.feature && (
            <span className="text-baseM text-[#C03744]">*{errors.feature}</span>
          )}
        </div>

        {featureData.team_features.map((team, index) => (
          <div key={index} className="xs:max-w-full sm:max-w-[200px] w-full">
            <span className="font-comfortaa text-base">{team.team}</span>
            <Input
              placeholder="Agregar horas"
              iconPosition="left"
              type="number"
              value={team.time.toFixed(2)}
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
              elemento={featureData.feature}
              onClick={onRemove}
            />
          </AlertDialog>
        </div>
      </Card>
    </>
  );
}
