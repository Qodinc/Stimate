import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState } from "react";
import Trash from "./Icons/Trash";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import { Card } from "./cardArea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function CardCargosOperacion({ cardID, cost_name, charge, quantity, type, description }) {
    const [Cargo, setCargo] = useState(charge || 0);
    const [Cantidad, setCantidad] = useState(quantity || 1)
    const [total, setTotal] = useState(Cargo * Cantidad);
    const [tipo, settipo] = useState(type ? type.toUpperCase() : "")
    const [Descripcion, setDescripcion] = useState(description || "")
    const [inputValue, setInputValue] = useState(cost_name || "");
    const [errors, setErrors] = useState({ nombre: "", Cargo: "", Cantidad:"", Descripcion:"", tipo:""});

    const handleMontoChange = (amount) => {
        const monto = parseFloat(amount.target.value);
        if (isNaN(monto) || monto < 0) {
            setErrors((prev) => ({ ...prev, total: "El monto debe ser un número mayor o igual a 0" }));
        } else {
            setErrors((prev) => ({ ...prev, total: "" }));
            setCargo(monto);
            setTotal(monto * Cantidad);
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

    const handleCantidadChange = (amount) => {
        const monto = parseFloat(amount.target.value);
        if (isNaN(monto) || monto < 0) {
            setErrors((prev) => ({ ...prev, total: "El monto debe ser un número mayor o igual a 0" }));
        } else {
            setErrors((prev) => ({ ...prev, total: "" }));
            setCantidad(monto);
        }
    };

    const handleTipoChange = (Tipo_r) => {
        settipo(Tipo_r);
    };

    return (
        <>
        <Card size="lg">
            <div className="flex flex-col gap-2 w-full">
            <span>Nombre</span>
        <div className="flex flex-col gap-1 w-full">
            <Input 
            id={`nombre-${cardID}`} 
            value={inputValue} 
            onChange={handleNombreChange} 
            placeholder="Nombre" 
            type="text" 
            className={errors.nombre ? "border-red-500" : ""}/>
        </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span>Costo Unitario</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={charge}
                        placeholder="Costo Unitario"
                        icon={<Dinero width={20} height={20} />}
                        onChange={handleMontoChange}
                        iconPosition="left"
                        className={errors.charge ? "border-red-500" : ""}
                    />
                    {errors.Cargo && <span className="text-baseM text-[#C03744]">*{errors.Cargo}</span>}
                </div>
                
                </div>
                <div className="flex flex-col gap-2 w-full">
                <span>Cantidad</span>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={Cantidad}
                        placeholder="Cantidad"
                        onChange={handleCantidadChange}
                        iconPosition="left"
                        className={errors.charge ? "border-red-500" : ""}
                    />
                    {errors.Cantidad && <span className="text-baseM text-[#C03744]">*{errors.Cantidad}</span>}
                </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                <span>Tipo de Recurrente</span>
                <div className="flex flex-col gap-1 w-full">
                <Select onChange={handleTipoChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={tipo || "Tipo de cargo"}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="MRC">MRC</SelectItem>
          <SelectItem value="ARC">ARC</SelectItem>
          <SelectItem value="NRC">NRC</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                    {errors.tipo && <span className="text-baseM text-[#C03744]">*{errors.tipo}</span>}
                </div>
                </div>
        </Card>
        </>
        // <div id={`cardGO-${cardID}`} className="flex flex-col gap-4 p-4 text-base font-comfortaa items-center justify-start border rounded-md w-full md:min-w-[10rem] md:max-w-[19rem] shadow-[5px_5px_7px_rgba(0,0,0,0.1)]">
        //     <div className="flex flex-col gap-2 w-full">
        //         <span>Nombre</span>
        //         <div className="flex flex-col gap-1 w-full">
        //             <Input id={`nombre-${cardID}`} value={inputValue} onChange={handleNombreChange} placeholder="Nombre" type="text" className={errors.nombre ? "border-red-500" : ""}/>
        //             {errors.nombre && <span className="text-baseM text-[#C03744]">*{errors.nombre}</span>}
        //         </div>
        //     </div>
            // <div className="flex flex-col gap-2 w-full">
            //     <span>Monto por Mes</span>
            //     <div className="flex flex-col gap-1 w-full">
            //         <Input
            //             type="number"
            //             min={0}
            //             step={0.01}
            //             value={montoPorMes}
            //             placeholder="Monto por Mes"
            //             icon={<Dinero width={20} height={20} />}
            //             onChange={handleMontoChange}
            //             iconPosition="left"
            //             className={errors.montoPorMes ? "border-red-500" : ""}
            //         />
            //         {errors.montoPorMes && <span className="text-baseM text-[#C03744]">*{errors.montoPorMes}</span>}
            //     </div>
            //     </div>
        //     <div className="flex flex-col gap-2 w-full">
        //         <span>Total</span>
        //         <Input disabled type="number" placeholder="Total" icon={<Dinero width={20} height={20} />} iconPosition="left" value={total} />
        //     </div>
        //     <div className="flex justify-end items-center w-full">
        //         <AlertDialog>
        //             <AlertDialogTrigger asChild>
        //                 <Button>{<Trash width={20} height={20} stroke="white" />} Eliminar</Button>
        //             </AlertDialogTrigger>
        //             <Delete elemento={inputValue ? inputValue : "Tarjeta"} onClick={() => deleteCard(cardID)} />
        //         </AlertDialog>
        //     </div>
        // </div>
    );
}

function deleteCard(cardID) {
    const card = document.getElementById(`cardGO-${cardID}`);
    card.remove();
}
