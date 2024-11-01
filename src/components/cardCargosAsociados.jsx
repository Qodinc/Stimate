import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Dinero from "./Icons/DollarSign";
import { useState, useEffect } from "react";
import Trash from "./Icons/Trash";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import { Card } from "./cardArea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function CardCargosAsociados({ cardID, cost_name, price_unity, quantity, type_recurring, description, onUpdate, onRemove }) {
    const [Cargo, setCargo] = useState(price_unity || 0);
    const [Cantidad, setCantidad] = useState(quantity || 0);
    const [total, setTotal] = useState(Cargo * Cantidad);
    const [tipo, settipo] = useState(type_recurring || null);
    const [Descripcion, setDescripcion] = useState(description || "");
    const [inputValue, setInputValue] = useState(cost_name || "");
    const [errors, setErrors] = useState({ nombre: "", Cargo: "", Cantidad: "", Descripcion: "", tipo: "" });

    useEffect(() => {
        setTotal(Cargo * Cantidad);
    }, [Cargo, Cantidad]);

    useEffect(() => {
        // Llama a onUpdate solo cuando los valores cambian
        onUpdate({ cost_name: inputValue, price_unity: Cargo, quantity: Cantidad, type_recurring: tipo, description: Descripcion });
    }, [Cargo, Cantidad, inputValue, tipo, Descripcion, onUpdate]);


    const handleMontoChange = (amount) => {
        const monto = parseFloat(amount.target.value);
        if (isNaN(monto) || monto <= 0) {
            setErrors((prev) => ({ ...prev, Cargo: "El monto debe ser un número mayor a 0" }));
        } else {
            setErrors((prev) => ({ ...prev, Cargo: "" }));
            setCargo(monto);
            // No llamamos a onUpdate aquí porque usamos useEffect para eso
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
        // No llamamos a onUpdate aquí porque usamos useEffect para eso
    };

    const handleCantidadChange = (amount) => {
        const monto = parseFloat(amount.target.value);
        if (isNaN(monto) || monto <= 0) {
            setErrors((prev) => ({ ...prev, Cantidad: "El monto debe ser un número mayor a 0" }));
        } else {
            setErrors((prev) => ({ ...prev, Cantidad: "" }));
            setCantidad(monto);
            // No llamamos a onUpdate aquí porque usamos useEffect para eso
        }
    };

    const handleTipoChange = (Tipo_r) => {
        settipo(Tipo_r);
        // No llamamos a onUpdate aquí porque usamos useEffect para eso
    };

    const handleDescripcionChange = (D) => {
        const Descripcion = D.target.value;
        if (Descripcion.trim() === "") {
            setErrors((prev) => ({ ...prev, Descripcion: "Este campo es obligatorio" }));
        } else {
            setErrors((prev) => ({ ...prev, Descripcion: "" }));
        }
        setDescripcion(Descripcion);
        // No llamamos a onUpdate aquí porque usamos useEffect para eso
    };


    return (
        <>
            <Card size="lg" id={`cardGO-${cardID}`} className="flex flex-col gap-5 shadow-lg">
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 ">
                    <div className="flex flex-col gap-2 w-full px-1">
                        <span>Nombre</span>
                        <div className="flex flex-col gap-1 w-full">
                            <Input
                                id={`nombre-${cardID}`}
                                value={inputValue}
                                onChange={handleNombreChange}
                                placeholder="Nombre"
                                type="text"
                                className={errors.nombre ? "border-red-500" : ""} />
                            {errors.nombre && <span className="text-baseM text-[#C03744]">*{errors.nombre}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full px-1">
                        <span>Costo Unitario</span>
                        <div className="flex flex-col gap-1 w-full">
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={Cargo}
                                placeholder="Costo Unitario"
                                icon={<Dinero width={20} height={20} />}
                                onChange={handleMontoChange}
                                iconPosition="left"
                                className={errors.Cargo  ? "border-red-500" : ""}
                            />
                            {errors.Cargo && <span className="text-baseM text-[#C03744]">*{errors.Cargo}</span>}
                        </div>

                    </div>
                    <div className="flex flex-col gap-2 w-full px-1">
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
                    <div className="flex flex-col gap-2 w-full px-1">
                        <span>Tipo de Recurrente</span>
                        <div className="flex flex-col gap-1 w-full">
                        <Select onValueChange={handleTipoChange} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={tipo || "Tipo de cargo"} />
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
                </div>
                <div className="flex flex-col lg:grid lg:grid-cols-2 ">
                    <div className="flex flex-col gap-2 w-full px-1">
                        <span>Descripción</span>
                        <input
                            className="w-full h-24 px-3 py-2 text-[#0A0A0B] bg-baseTextarea text-base border-2 rounded-3xl focus:outline-none focus:border-[#2F27CE] resize-none placeholder-[#5A5555]"
                            placeholder="Describe tu cargo"
                            onChange={handleDescripcionChange}
                            value={Descripcion}
                        />
                        {errors.Descripcion && <span className="text-baseM text-[#C03744]">*{errors.Descripcion}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-full px-1">
                        <span>Total</span>
                        <div className="flex flex-col gap-1 w-full max-w-md">
                            <Input
                                type="text"
                                value={total}
                                placeholder="Total"
                                icon={<Dinero width={20} height={20} />}
                                disabled
                                iconPosition="left"
                                className={errors.charge ? "border-red-500" : "text-[#777779] bg-baseTextarea text-base border-2 rounded-3xl focus:outline-none placeholder-[#5A5555] justify-start align-top "}
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-end items-center w-full">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>{<Trash width={20} height={20} stroke="white" />} Eliminar</Button>
                        </AlertDialogTrigger>
                        <Delete elemento={inputValue ? inputValue : "Tarjeta"} onClick={onRemove} />
                    </AlertDialog>
                </div>
            </Card>
        </>
    );
}