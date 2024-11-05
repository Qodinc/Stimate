import React from "react";
import GastoOperacion from "../cardGastosOperacion";
import Plus from "../Icons/Plus";
import { Button } from "../ui/button";

const GastosOperativos = ({ operating_expenses, estimated_time, onUpdate }) => {

  const handleUpdateExpense = (updateExpense, expensesIndex) => {
    const updatedExpenses = operating_expenses.map((expense, index) =>
      index === expensesIndex ? updateExpense : expense
    );
    onUpdate(updatedExpenses);
  };

  const handleAddExpense = () => {
    const newExpense = {
      cost_name: "",
      total_per_month: 0,
    }
    onUpdate([...operating_expenses, newExpense])
  };

  const handleDeleteExpense = (expensesIndex) => {
    const updatedExpenses = operating_expenses.filter((_, index) => index !== expensesIndex);
    onUpdate(updatedExpenses);
  };

  return (
    <section>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full justify-center items-center py-5">
        {operating_expenses.map((gasto, index) => (
          <GastoOperacion
            key={index}
            expense={gasto}
            estimated_time={estimated_time}
            onUpdate={(updateExpense) => handleUpdateExpense(updateExpense, index)}
            onRemove={() => handleDeleteExpense(index)}
        />
        ))}
      </div>

      <div>
        <Button onClick={handleAddExpense}>
          {<Plus width={20} height={20} stroke="white" />} 
          Agregar gasto
        </Button>
      </div>
    </section>
  );
};

export default GastosOperativos;