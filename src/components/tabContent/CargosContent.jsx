import React, { useState } from "react";
import CardCargosAsociados from "../cardCargosAsociados";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";

const CargosContent = ({ associated_cost, onUpdate }) => {
  const addCard = () => {
    console.log(associated_cost)
    const newCargo = {
      cost_name: "",
      price_unity: 0,
      quantity: 0,
      type_recurring: "",
      description: ""
    };
    onUpdate([...associated_cost, newCargo]);
  };

  const updateCard = (index, updatedCard) => {
    const updatedCargos = associated_cost.map((card, i) =>
      i === index ? { ...card, ...updatedCard } : card
    );
    onUpdate(updatedCargos); // Asegúrate de que esto actualice el estado padre
};

const deleteCard = (cardID) => {
  // Elimina el cargo en el índice especificado
  const updatedCargos = associated_cost.filter((_, index) => index !== cardID);
  onUpdate(updatedCargos);
};


  return (
    <section>
      <div className="flex flex-col gap-4 w-full justify-center items-center py-5">
        {associated_cost.map((card, index) => (
          <CardCargosAsociados
            key={index}
            cardID={index}
            cost_name={card.cost_name}
            price_unity={card.price_unity}
            quantity={card.quantity}
            type_recurring={card.type_recurring}
            description={card.description}
            onUpdate={(updatedCard) => updateCard(index, updatedCard)} // Asegúrate de pasar onUpdate aquí
            onRemove={() => deleteCard(index)} // Pasa el índice correcto aquí
          />

        ))}
      </div>

      <div>
        <Button onClick={addCard}>
          {<Plus width={20} height={20} stroke="white" />} Agregar cargo
        </Button>
      </div>
    </section>
  );
};

export default CargosContent;