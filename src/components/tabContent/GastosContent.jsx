import React, { useState } from "react";
import CardGastosOperacion from "../cardGastosOperacion";
import Plus from "../Icons/Plus";
import { Button } from "../ui/button";

const GastosContent = ({ operating_expenses, onUpdate }) => {
  const addCard = () => {
    const newCargo = {
      cost_name: "",
      total_per_month: 0,
    }
    onUpdate([...operating_expenses, newCargo])
  };

  const handleUpdateCard = (updatedCard, index) => {
    const updatedExpenses = operating_expenses.map((card, i) =>
      i === index ? updatedCard : card
    );
    onUpdate(updatedExpenses);
  };

  const handleDeleteCard = (index) => {
    const updatedExpenses = operating_expenses.filter((_, i) => i !== index);
    onUpdate(updatedExpenses);
  };

  return (
    <section>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full justify-center items-center py-5">
        {operating_expenses.map((card, index) => (
          <CardGastosOperacion
          key={index}
          cardID={index}
          cost_name={card.cost_name}
          total_per_month={card.total_per_month}
          onUpdate={(updatedCard) => handleUpdateCard(updatedCard, index)}
          onRemove={() => handleDeleteCard(index)}
        />
        ))}
      </div>

      <div>
        <Button onClick={addCard}>
          {<Plus width={20} height={20} stroke="white" />} Agregar gasto
        </Button>
      </div>
    </section>
  );
};

export default GastosContent;