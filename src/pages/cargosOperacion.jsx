import { Button } from "@/components/ui/button";
import { useState } from "react";
import Plus from "@/components/Icons/Plus";
import Navbar from "@/components/Navbar";
import CardCargosOperacion from "@/components/cardCargosAsociados";

export default function cargosOperacion() {
    const associated_costs = [
        {
            "cost_name": "Logotipo",
            "price_unity": 700,
            "quantity": 1,
            "type_recurring": "nrc",
            "description": ""
         },
         {
            "cost_name": "Dominio",
            "price_unity": 800,
            "quantity": 1,
            "type_recurring": "arc",
            "description": "cuponera.store"
         },
         {
            "cost_name": "Hosting",
            "price_unity": 100,
            "quantity": 12,
            "type_recurring": "mrc",
            "description": "Almacenamiento de la página web y Seguridad SSL. 100 GB de Almacenamiento"
         },
         {
            "cost_name": "Licencia Software/Librería",
            "price_unity": 0,
            "quantity": 0,
            "type_recurring": "nrc",
            "description": "En nugget algunas licencias son de paga. Como por ejemplo ConvertAPI"
         },
         {
            "cost_name": "Equipo de cómputo/celular/tablet",
            "price_unity": 0,
            "quantity": 0,
            "type_recurring": "nrc",
            "description": "En algunos lugares en necesario compra de equipo de computo para el funcionamiento del sistema. pearPod E-321, 512GB SSD, 16GB de RAM, Procesador Potnt"
         }
    ];
    const [cards, setCards] = useState(associated_costs.map((cost, index) => ({ id: index + 1, ...cost })));


    const addCard = () => {
        setCards([...cards, { id: cards.length + 1, cost_name: ""}]);
    };

    return (
        <>
            <Navbar />
            <div className="w-full justify-center items-center flex flex-col gap-8 p-20">
                <div id="contentCard" className="flex flex-col gap-4 w-full justify-center items-center">
                    {cards.map((card) => (
                        <CardCargosOperacion 
                            key={card.id} 
                            cardID={card.id} 
                            cost_name={card.cost_name} 
                            charge={card.price_unity}
                            quantity={card.quantity}
                            type={card.type_recurring}
                            description={card.description}
                        />
                    ))}
                </div>
                <div className="flex justify-start items-center w-full">
                    <Button variant="default" size="default" onClick={addCard}> 
                        { <Plus width={20} height={20} stroke="white" /> } Agregar gasto
                    </Button>
                </div>
            </div>
        </>
    );
}
