import React, { useState } from "react";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";
import CardFuncionalidades from "../cardFuncionalidades";

const FuncionalidadesContent = () => {
  const funcionalidad = [
    {
      name: "Inicio de Sesión",
      teams: [
        {
          team: "Analista",
          time: 1,
        },
        {
          team: "Diseñador gráfico",
          time: 2,
        },
        {
          team: "Frontend JS Junior (Gloria)",
          time: 3,
        },
        {
          team: "Frontend JS Junior (Iván)",
          time: 2,
        },
        {
          team: "Backend JS Junior (Pedro)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 4,
        },
      ],
    },
    {
      name: "Cierre de Sesión",
      teams: [
        {
          team: "Analista",
          time: 1,
        },
        {
          team: "Diseñador gráfico",
          time: 1,
        },
        {
          team: "Frontend JS Junior (Gloria)",
          time: 2,
        },
        {
          team: "Frontend JS Junior (Iván)",
          time: 2,
        },
        {
          team: "Backend JS Junior (Pedro)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 3,
        },
      ],
    },
    {
      name: "Registro",
      teams: [
        {
          team: "Analista",
          time: 2,
        },
        {
          team: "Diseñador gráfico",
          time: 2,
        },
        {
          team: "Frontend JS Junior (Gloria)",
          time: 3.5,
        },
        {
          team: "Frontend JS Junior (Iván)",
          time: 4,
        },
        {
          team: "Backend JS Junior (Omar)",
          time: 1,
        },
        {
          team: "Backend JS Junior (Berenice)",
          time: 5,
        },
      ],
    },
  ];

  const [cardData, setCardData] = useState(funcionalidad.map((func, index) => ({id: index + 1, ...func,})));

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