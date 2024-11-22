import React from "react";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import CardEquipoTrabajo from "@/components/cardEquipoTrabajo";

const EquipoContent = ({ team_project, onUpdate }) => {

  const handleAddTeamProject = () => {
    const newTeamProject = {
      team: "",
      hourly_rate: 0,
      work_hours_per_day: 0,
    };
  
    const updatedTeamProject = [...team_project, newTeamProject];
    onUpdate(updatedTeamProject);
  };

  const handleRemoveContent = (contentIndex) => {
    const updatedTeamProject = team_project.filter((_, index) => index !== contentIndex);
    onUpdate(updatedTeamProject);
  };

  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {team_project.map((area, index) => (
          <CardEquipoTrabajo key={index} 
            team_project={area} 
            onUpdate={(updatedArea) => {
              const updatedTeamProject = team_project.map((a, i) => i === index ? updatedArea : a);
              onUpdate(updatedTeamProject);
            }}
            onRemove={() => handleRemoveContent(index)}  
          />
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