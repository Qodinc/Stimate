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
import HttpServices from "@/lib/http-services";
import TextArea from "./Textarea";

export default function CardCargosAsociados({ cost, onUpdate, onRemove }) {
    const [errors, setErrors] = useState({
        cost_name: "",
        price_unity: "",
        quantity: "",
        description: "",
        type_recurring: ""
    });
    const httpServices = new HttpServices();
    const [typesOptions, setTypesOptions] = useState([]);

    useEffect(() => {
        const fetchTypesOptions = async () => {
            const data = await httpServices.getTypes_Recurrent();
            setTypesOptions(Array.isArray(data) ? data : []);
        };
        fetchTypesOptions();
    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case 'cost_name':
            case 'description':
                return value.trim() === "" ? "Este campo es obligatorio" : "";
            case 'price_unity':
            case 'quantity':
                const numValue = parseFloat(value);
                return isNaN(numValue) || numValue <= 0
                    ? "El valor debe ser un número mayor a 0"
                    : "";
            default:
                return "";
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target
        const error = validateField(name, value);

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));

        const costUpdate = {
            ...cost,
            [name]: value
        }

        onUpdate(costUpdate);
    };

    return (
        <Card size="lg" className="flex flex-col gap-5 shadow-lg">
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Nombre</span>
                    <div className="flex flex-col gap-1 w-full">
                        <Input
                            name="cost_name"
                            placeholder="Nombre"
                            type="text"
                            value={cost.cost_name}
                            onChange={handleInputChange}
                            className={errors.cost_name ? "border-red-500" : ""}
                        />
                        {errors.cost_name && <span className="text-baseM text-[#C03744]">*{errors.cost_name}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Costo Unitario</span>
                    <div className="flex flex-col gap-1 w-full">
                        <Input
                            name="price_unity"
                            placeholder="Costo Unitario"
                            type="number"
                            min={0}
                            step={0.01}
                            value={cost.price_unity}
                            icon={<Dinero width={20} height={20} />}
                            iconPosition="left"
                            onChange={handleInputChange}
                            className={errors.price_unity ? "border-red-500" : ""}
                        />
                        {errors.price_unity && <span className="text-baseM text-[#C03744]">*{errors.price_unity}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Cantidad</span>
                    <div className="flex flex-col gap-1 w-full">
                        <Input
                            name="quantity"
                            placeholder="Cantidad"
                            type="number"
                            min={0}
                            step={0.01}
                            value={cost.quantity}
                            onChange={handleInputChange}
                            className={errors.quantity ? "border-red-500" : ""}
                        />
                        {errors.quantity && <span className="text-baseM text-[#C03744]">*{errors.quantity}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Tipo de Recurrente</span>
                    <div className="flex flex-col gap-1 w-full">
                        <Select
                            value={cost.type_recurring}
                            onValueChange={(event) => handleInputChange({
                                target: {
                                    value: event,
                                    name: "type_recurring"
                                }
                            })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tipo de cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {typesOptions.map((option) => (
                                    <SelectItem key={option.code} value={option.code}>
                                        {option.translations.es}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type_recurring && <span className="text-baseM text-[#C03744]">*{errors.type_recurring}</span>}
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2">
                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Descripción</span>
                    <TextArea
                        className="w-full px-3 py-2 text-[#0A0A0B] bg-baseTextarea text-base border-2 rounded-3xl focus:outline-none focus:border-[#2F27CE] resize-none placeholder-[#5A5555]"
                        name="description"
                        placeholder="Describe tu cargo"
                        defaultValue={cost.description}
                        onChange={(event) => handleInputChange({
                            target: {
                                value: event,
                                name: "description"
                            }
                        })}
                        required={true}
                    />
                    {errors.description && <span className="text-baseM text-[#C03744]">*{errors.description}</span>}
                </div>

                <div className="flex flex-col gap-2 w-full px-1">
                    <span>Total</span>
                    <div className="flex flex-col gap-1 w-full max-w-md">
                        <Input
                            name="total"
                            placeholder="Total"
                            type="text"
                            value={Number(cost.quantity * cost.price_unity).toFixed(2)}
                            icon={<Dinero width={20} height={20} />}
                            iconPosition="left"
                            className="text-[#777779] bg-baseTextarea text-base border-2 rounded-3xl focus:outline-none placeholder-[#5A5555] justify-start align-top"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center w-full">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>{<Trash width={20} height={20} stroke="white" />} Eliminar</Button>
                    </AlertDialogTrigger>
                    <Delete elemento={cost.cost_name || "Tarjeta"} onClick={onRemove} />
                </AlertDialog>
            </div>
        </Card>
    );
}