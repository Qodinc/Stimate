import React, { useState } from "react";
import CardCargosAsociados from "../cardCargosAsociados";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";

const CargosContent = ({ associatedCost, setAssociatedCost }) => {
  const [cards, setCards] = useState(associatedCost);

  const addCard = () => {
    setCards([...cards, { id: cards.length + 1, cost_name: "" }]);
  };

  return (
    <section>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {cards.map((card, index) => (
          <CardCargosAsociados
            key={index}
            cardID={index}
            cost_name={card.cost_name}
            charge={card.price_unity}
            quantity={card.quantity}
            type={card.type_recurring}
            description={card.description}
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

export default CargosContent;