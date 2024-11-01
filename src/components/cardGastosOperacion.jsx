import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState, useEffect } from "react"; 
import Trash from "./Icons/Trash";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";

export default function CardGastosOperacion({ cardID, cost_name, total_per_month, onUpdate, onRemove  }) {
    const [montoPorMes, setMontoPorMes] = useState(total_per_month || 0);
    const [total, setTotal] = useState(montoPorMes * 1.9);
    const [inputValue, setInputValue] = useState(cost_name || "");
    const [errors, setErrors] = useState({ nombre: "", montoPorMes: "" });

    const handleMontoChange = (amount) => {
        const monto = parseFloat(amount.target.value);
        if (isNaN(monto) || monto < 0) {
            setErrors((prev) => ({ ...prev, montoPorMes: "El monto debe ser un número mayor o igual a 0" }));
        } else {
            setErrors((prev) => ({ ...prev, montoPorMes: "" }));
            setMontoPorMes(monto);
            setTotal(monto * 1.9);
        }
    };

    const handleNombreChange = (name) => {
        const nombre = name.target.value;
        if (nombre.trim() === "") {
            setErrors((prev) => ({ ...prev, nombre: "Este campo es obligatorio" }));
        } else {
            setErrors((prev) => ({ ...prev, nombre: "" }));
        }
        setInputValue(nombre);
    };

    useEffect(() => {
        onUpdate({ cost_name: inputValue, total_per_month: montoPorMes });
    }, [inputValue, montoPorMes]);

    return (
        <div id={`cardGO-${cardID}`} className="flex flex-col gap-4 p-4 text-base font-comfortaa items-center justify-start border rounded-md w-full md:min-w-[10rem] shadow-[5px_5px_7px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2 w-full">
                <span>Nombre</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        id={`nombre-${cardID}`}
                        value={inputValue}
                        onChange={handleNombreChange}
                        placeholder="Nombre"
                        type="text"
                        className={errors.nombre ? "border-red-500" : ""}
                    />
                    {errors.nombre && <span className="text-baseM text-[#C03744]">*{errors.nombre}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Monto por Mes</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={montoPorMes}
                        placeholder="Monto por Mes"
                        icon={<Dinero width={20} height={20} />}
                        onChange={handleMontoChange}
                        iconPosition="left"
                        className={errors.montoPorMes ? "border-red-500" : ""}
                    />
                    {errors.montoPorMes && <span className="text-baseM text-[#C03744]">*{errors.montoPorMes}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Total</span>
                <Input disabled type="number" placeholder="Total" icon={<Dinero width={20} height={20} />} iconPosition="left" value={total} />
            </div>
            <div className="flex justify-end items-center w-full">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>{<Trash width={20} height={20} stroke="white" />} Eliminar</Button>
                    </AlertDialogTrigger>
                    <Delete elemento={inputValue ? inputValue : "Tarjeta"} onClick={onRemove} />
                </AlertDialog>
            </div>
        </div>
    );
}

function deleteCard(cardID) {
    const card = document.getElementById(`cardGO-${cardID}`);
    card.remove();
}
