import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState } from "react";

export default function CardGastosOperacion({cardID}) {

    const [montoPorMes, setMontoPorMes] = useState(0);
    const [total, setTotal] = useState(0);

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
                    <Input placeholder="Nombre" type="text" />
                    <span className="text-baseM text-[#C03744]">*Este campo es obligatorio</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Monto por Mes</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input type="number" placeholder="Monto por Mes" icon={<Dinero width={20} height={20} />}  value={montoPorMes} onChange={handleMontoChange} iconPosition="left" />
                    <span className="text-baseM text-[#C03744]">*Este campo es obligatorio</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Total</span>
                <Input disabled type="number" placeholder="Total" icon={<Dinero width={20} height={20} />} iconPosition="left" value={total} />
            </div>
            <div className="flex justify-end items-center w-full">
                <Button variant="default" size="default" onClick={() => deleteCard(cardID)}>Eliminar</Button>
            </div>
        </div>
    )
}

function deleteCard(cardID) {
    const card = document.getElementById(`cardGO-${cardID}`);
    card.remove();
}