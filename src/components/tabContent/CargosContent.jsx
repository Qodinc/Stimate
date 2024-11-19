import React, { useState } from "react";
import CargoAsociado from "../cardCargosAsociados";
import { Button } from "../ui/button";
import Plus from "../Icons/Plus";

const CargosContent = ({ associated_costs, onUpdate }) => {
  const handleAddCost = () => {
    const newCargo = {
      cost_name: "",
      price_unity: 0,
      quantity: 0,
      type_recurring: "",
      description: ""
    };
    onUpdate([...associated_costs, newCargo]);
  };

  const handleUpdateCost = (index, updatedCost) => {
    const updatedCargos = associated_costs.map((card, i) =>
      i === index ? { ...card, ...updatedCost } : card
    );
    onUpdate(updatedCargos);
};

  const handleDeleteCost = (costIndex) => {
    const updatedCargos = associated_costs.filter((_, index) => index !== costIndex);
    onUpdate(updatedCargos);
  };


  return (
    <section>
      <div className="flex flex-col gap-4 w-full justify-center items-center py-5">
        {associated_costs.map((cargo, index) => (
          <CargoAsociado
            key={index}
            cost={cargo}
            onUpdate={(updatedCost) => handleUpdateCost(index, updatedCost)} // Asegúrate de pasar onUpdate aquí
            onRemove={() => handleDeleteCost(index)} // Pasa el índice correcto aquí
          />

        ))}
      </div>

      <div>
        <Button onClick={handleAddCost}>
          {<Plus width={20} height={20} stroke="white" />} Agregar cargo
        </Button>
      </div>
    </section>
  );
};

export default CargosContent;