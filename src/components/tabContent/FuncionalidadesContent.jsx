import React, { useState } from "react";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";
import CardFuncionalidades from "../cardFuncionalidades";

const FuncionalidadesContent = ({ features_project, team_project, onUpdateFeaturesProject }) => {
  // TODO: Debe obtener la información del componente Equipo de Trabajo   

  const handleChangeFeaturesProject = (event, index) => {
    // onUpdateFeaturesProject
  }

  const handleAddFeaturesProject = () => {
    // onUpdateFeaturesProject
  }

  const handleRemoveFeaturesProject = (index) => {
    // onUpdateFeaturesProject
  }
  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {features_project.map((funcionalidad, index) => (
          <CardFuncionalidades key={index} cardKey={funcionalidad.id} feature={funcionalidad.feature} teams={funcionalidad.team_feature} />
        ))}
      </div>

      <div className="">
        <Button onClick={handleChangeFeaturesProject}>
          <Plus width={24} stroke="white" />
          Agregar funcionalidad
        </Button>
      </div>
    </section>
  );
};

export default FuncionalidadesContent;