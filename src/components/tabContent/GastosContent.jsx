import React, { useState } from "react";
import CardGastosOperacion from "../cardGastosOperacion";
import Plus from "../Icons/Plus";
import { Button } from "../ui/button";

const GastosContent = () => {
  const operatingExpenses = [
    {
      "cost_name": "Renta",
      "total_per_month": 120
    },
    {
      "cost_name": "Luz",
      "total_per_month": 163
    },
    {
      "cost_name": "Agua",
      "total_per_month": 400
    },
    {
      "cost_name": "Internet",
      "total_per_month": 630
    },
    {
      "cost_name": "Mobiliario (computadora, impresora, etc.)",
      "total_per_month": 710
    },
    {
      "cost_name": "Jira",
      "total_per_month": 815
    }
  ];

  const [cards, setCards] = useState(operatingExpenses.map((expense, index) => ({ id: index + 1, ...expense })));

  const addCard = () => {
    setCards([...cards, { id: cards.length + 1, cost_name: "", total_per_month: 0 }]);
  };

  return (
    <section>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full justify-center items-center py-5">
        {cards.map((card) => (
          <CardGastosOperacion
            key={card.id}
            cardID={card.id}
            cost_name={card.cost_name}
            total_per_month={card.total_per_month}
          />
        ))}
      </div>

      <div className="flex justify-start items-center w-full">
        <Button variant="default" size="default" onClick={addCard}>
          {<Plus width={20} height={20} stroke="white" />} Agregar gasto
        </Button>
      </div>
    </section>
  );
};

export default GastosContent;