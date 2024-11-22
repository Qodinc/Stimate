import React from "react";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";
import Funcionalidad from "../Funcionalidad";
import formatPrice from "@/lib/formatPrice";

const Funcionalidades = ({ features_project, team_project, hours_team, onUpdate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleUpdateFeature = (updatedFeature, featureIndex) => {
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
            feature={funcionalidad}
            onUpdate={(updatedFeature) => handleUpdateFeature(updatedFeature, index)}
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

      {hours_team && team_project.length > 0 && features_project.length > 0 &&  (
        <div className="my-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-4 border-4 bg-background hover:bg-accentBackground rounded-lg border-accentBackground hover:border-accent100 transition-colors"
          >
            <h3 className="text-lg font-bold">Total de horas</h3>
            <svg 
              className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          <div 
            className={`
              bg-background 
              border-accentBackground
              rounded-b-lg 
              overflow-hidden 
              transition-all 
              duration-300 
              ease-in-out
              ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="p-4">
              <div className="flex gap-5 flex-wrap justify-center">
                {hours_team.map((team, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow flex-1 min-w-[250px] max-w-72"
                  >
                    <p className="font-bold">{team.team}</p>
                    <p>Horas totales: {team.totalTime.toFixed(2)}</p>
                    <p>Salario: {formatPrice(team.wage)}</p>
                    <p>Días estimados: {team.totalDailyWorkHours.toFixed(3)}</p>
                    <p>Semanas estimadas: {team.totalWeeklyWorkHours.toFixed(3)}</p>
                    <p>Meses estimados: {team.totalMonthlyWorkHours.toFixed(3)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Funcionalidades;