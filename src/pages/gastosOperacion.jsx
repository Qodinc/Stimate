import CardGastosOperacion from "@/components/cardGastosOperacion";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function GastosOperacion() {
// const meseslaborales = 1.9
    const [cards, setCards] = useState([{ id: 1 }]);

    const addCard = () => {
    setCards([...cards, { id: cards.length + 1 }]);
    };
    return (
        <div className="w-full justify-center items-center flex flex-col gap-8 p-8">
            <div id="contentCard" className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-center items-center">
                {cards.map((card) => (
                        <CardGastosOperacion key={card.id} cardID={card.id} />
                    ))}
            </div>
            <div className="flex justify-start items-center w-full">
                <Button variant="default" size="default" onClick={addCard}>Agregar gasto</Button>
            </div>
        </div>
    );
}