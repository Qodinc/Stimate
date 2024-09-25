import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState } from "react";
import Trash from "./Icons/Trash";
import {AlertDialog, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import { Delete } from "@/components/alerts-variants";

export default function CardGastosOperacion({cardID}) {

    const [setMontoPorMes] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputValue, setInputValue] = useState(null);

    const handleMontoChange = (e) => {
        const monto = parseFloat(e.target.value) || 0;
        setMontoPorMes(monto);
        setTotal(monto * 1.9);
    };

    return (
        <div id={`cardGO-${cardID}`} className="flex flex-col gap-4 p-4 text-base font-comfortaa items-center justify-start border rounded-md w-full md:min-w-[10rem] md:max-w-[19rem] shadow-[10px_10px_15px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-2 w-full">
                <span>Nombre</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input id={`nombre-${cardID}`} value={inputValue} onChange={(e) => {setInputValue(e.target.value)} } placeholder="Nombre" type="text"/>
                    <span className="text-baseM text-[#C03744]">*Este campo es obligatorio</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Monto por Mes</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input type="number" placeholder="Monto por Mes" icon={<Dinero width={20} height={20} />} onChange={handleMontoChange} iconPosition="left" />
                    <span className="text-baseM text-[#C03744]">*Este campo es obligatorio</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Total</span>
                <Input disabled type="number" placeholder="Total" icon={<Dinero width={20} height={20} />} iconPosition="left" value={total} />
            </div>
            <div className="flex justify-end items-center w-full">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>{ <Trash width={20} height={20} stroke="white" /> } Eliminar</Button>
                    </AlertDialogTrigger>
                        <Delete
                        elemento={inputValue ? inputValue : "Tarjeta"}
                        onClick = {() => deleteCard(cardID)}
                    />
                </AlertDialog>
            </div>
        </div>
    )
}

function deleteCard(cardID) {
    const card = document.getElementById(`cardGO-${cardID}`);
    card.remove();
}