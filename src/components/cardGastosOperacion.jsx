import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState } from "react";
import Trash from "./Icons/Trash";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";

export default function GastoOperacion({ expense, estimated_time, onUpdate, onRemove }) {
    const [errors, setErrors] = useState({ cost_name: "", total_per_month: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        const parseValue = parseFloat(value)

        switch (name) {
            case "cost_name":
                if (value.trim() === "")
                    setErrors({ ...errors, cost_name: "Este campo es obligatorio" }); 
                else
                    setErrors({ ...errors, cost_name: "" });

                onUpdate({
                    ...expense,
                    cost_name: value.trim()
                });

                break;
            case "total_per_month":
                if (isNaN(parseValue) || parseValue < 0)
                    setErrors({ ...errors, total_per_month: "El monto debe ser un número mayor o igual a 0", total: 0 });
                else
                    setErrors({ ...errors, total_per_month: "" });

                onUpdate({
                    ...expense,
                    total_per_month: parseValue,
                    total: parseValue * estimated_time
                })
                break;

            default:
                break;
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 text-base font-comfortaa items-center justify-start border rounded-md w-full md:min-w-[10rem] shadow-[5px_5px_7px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2 w-full">
                <label>Nombre</label>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        name="cost_name"
                        placeholder="Nombre"
                        type="text"
                        value={expense.cost_name}
                        onChange={handleInputChange}
                        className={errors.cost_name ? "border-red-500" : ""}
                    />
                    {errors.cost_name && <span className="text-baseM text-[#C03744]">*{errors.cost_name}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Monto por Mes</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        name="total_per_month"
                        placeholder="Monto por Mes"
                        type="number"
                        value={expense.total_per_month}
                        min={0}
                        step={0.01}
                        icon={<Dinero width={20} height={20} />}
                        iconPosition="left"
                        onChange={handleInputChange}
                        className={errors.total_per_month ? "border-red-500" : ""}
                    />
                    {errors.total_per_month && <span className="text-baseM text-[#C03744]">*{errors.total_per_month}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Total</span>
                <Input disabled 
                    placeholder="Total" 
                    type="number" 
                    value={!isNaN(expense.total) ? expense.total.toFixed(2) : (!isNaN(expense.total_per_month) ? (expense.total_per_month * estimated_time).toFixed(2) : 0)} 
                    icon={<Dinero width={20} height={20} />} 
                    iconPosition="left" 
                />
            </div>
            <div className="flex justify-end items-center w-full">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>{<Trash width={20} height={20} stroke="white" />} Eliminar</Button>
                    </AlertDialogTrigger>
                    <Delete elemento={expense.cost_name ? expense.cost_name : "Tarjeta"} onClick={onRemove} />
                </AlertDialog>
            </div>
        </div>
    );
}
