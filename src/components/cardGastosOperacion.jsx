import Input from "@/components/input";
import { Button } from "@/components/ui/button";
export default function CardGastosOperacion(cardID = 1) {
    return (
        <div id={`cardGO-${cardID}`} className="flex flex-col gap-4 p-4 text-base font-comfortaa items-center justify-start border rounded-md shadow-xl min-w-[19rem]">
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
                    <Input type="number" placeholder="Monto por Mes" icon="Icons/dollar-sign-purple.webp" iconPosition="left" />
                    <span className="text-baseM text-[#C03744]">*Este campo es obligatorio</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Total</span>
                <Input disabled type="number" placeholder="Total" icon="Icons/dollar-sign-purple.webp" iconPosition="left" />
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