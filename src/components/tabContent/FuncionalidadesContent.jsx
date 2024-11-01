import React, { useState } from "react";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";
import Funcionalidad from "../Funcionalidad";

const Funcionalidades = ({ features_project, team_project, hours_team, onUpdate }) => {

  const handleFeatureUpdate = (updatedFeature, featureIndex) => {
    const updatedFeatures = features_project.map((feature, index) =>
      index === featureIndex ? updatedFeature : feature
    );
    onUpdate(updatedFeatures);
  }

  const handleAddFeature = () => {
    const team_features = team_project.map(team => ({
      team: team.team,
      time: 0
    }));

    const newFeature = {
      feature: "",
      team_features
    };

    onUpdate([...features_project, newFeature]);
  };

  const handleRemoveFeature = (featureIndex) => {
    const updatedFeatures = features_project.filter((_, index) => index !== featureIndex);
    onUpdate(updatedFeatures);
  };

  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {features_project.map((funcionalidad, index) => (
          <Funcionalidad
            key={index}
            featureIndex={index}
            feature={funcionalidad}
            teamFeatures={funcionalidad.team_features}
            onUpdate={(updatedFeature) => handleFeatureUpdate(updatedFeature, index)}
            onRemove={() => handleRemoveFeature(index)}
          />
        ))}
      </div>

      <div>
        <Button onClick={handleAddFeature}>
          <Plus width={24} stroke="white" />
          Agregar funcionalidad
        </Button>
      </div>

      {
        hours_team && (
          <div className="my-2 p-2 bg-gray-300 rounded-lg">
            <h3 className="text-lg font-bold">Total de horas</h3>
            <div className="flex gap-5">
              {hours_team && hours_team.map((team, index) => {
                return (
                  <div key={index}>
                    <p className="font-bold">{team.team}</p>
                    <p>Horas totales: {team.totalTime.toFixed(2)}</p>
                    <p>Salario: $ {team.wage.toFixed(2)}</p>
                    <p>Días estimados: {team.totalDailyWorkHours.toFixed(3)}</p>
                    <p>Semanas estimadas: {team.totalWeeklyWorkHours.toFixed(3)}</p>
                    <p>Meses estimados: {team.totalMonthlyWorkHours.toFixed(3)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
    </section>
  );
};

export default Funcionalidades;