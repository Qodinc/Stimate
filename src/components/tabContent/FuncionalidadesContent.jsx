import React, { useState } from "react";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";
import CardFuncionalidades from "../cardFuncionalidades";

const FuncionalidadesContent = ({ featuresProject, setFeaturesProject }) => {
  const [cardData, setCardData] = useState(featuresProject);

  // TODO: Debe obtener la información del componente Equipo de Trabajo 
  const handleAddCard = () => {
    const newCardData = {
      id: cardData.length + 1,
      name: "",
      teams: [
        { team: "Analista", time: 0 },
        { team: "Diseñador gráfico", time: 0 },
        { team: "Frontend JS Junior", time: 0 },
        { team: "Frontend JS Junior", time: 0 },
        { team: "Backend JS Junior", time: 0 },
        { team: "Backend JS Junior", time: 0 },
      ],
    };
    setCardData([...cardData, newCardData]);
  };
  return (
    <section>
      <div className="flex flex-col gap-5 py-5">
        {cardData.map((funcionalidad, index) => (
          <CardFuncionalidades key={index} cardKey={funcionalidad.id} name={funcionalidad.name} teams={funcionalidad.teams} />
        ))}
      </div>

      <div className="">
        <Button onClick={handleAddCard}>
          <Plus width={24} stroke="white" />
          Agregar funcionalidad
        </Button>
      </div>
    </section>
  );
};

export default FuncionalidadesContent;