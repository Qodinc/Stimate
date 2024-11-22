import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Plus from "@/components/Icons/Plus";
import { useSession } from "next-auth/react";
import EquipoTrabajo from "@/components/EquipoTrabajo";

const EquipoContent = ({ team_project, onUpdate }) => {
  const { data: session, status } = useSession();
  const [isActiveSubscription, setIsActiveSubscription] = useState(session.user.isActiveSubscription);

  const [isEditing, setIsEditing] = useState(false);
  const [maxAreas, setMaxAreas] = useState(4);

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

  const addArea = () => {
    if (isActiveSubscription || team_project.length < maxAreas) {
      return (
        <div>
          <Button onClick={handleAddTeamProject}>
            <Plus width={24} stroke="white" />
            Agregar área
          </Button>
        </div>
      )
    }
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

  const handleRemoveContent = (contentIndex) => {
    const updatedTeamProject = team_project.filter((_, index) => index !== contentIndex);
    onUpdate(updatedTeamProject);
  };

  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {team_project.map((area, index) => (
          <EquipoTrabajo key={index} 
            team_project={area} 
            onUpdate={(updatedArea) => {
              const updatedTeamProject = team_project.map((a, i) => i === index ? updatedArea : a);
              onUpdate(updatedTeamProject);
            }}
            onRemove={() => handleRemoveContent(index)}  
          />
        ))}
      </div>

      {addArea()}
    </section>
  );
};

export default EquipoContent;