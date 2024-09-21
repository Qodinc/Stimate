import AddArea from "@/components/AddArea";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



export default function NewProject() {
   const [areasSeleted, setAreasSeleted] = useState([])
   const [valueInput, setValueInpt] = useState('')

   const handleInput = (input) => {
      console.log("Value", input);
      
   }
   const handleAreasSeleted = (selectedAreas) => {
      console.log("New Project", selectedAreas);
      // setAreasSeleted
      // Validar el usuario limite de áreas
   };

   const submitProject = (e) => {
      console.log("event", e);
      
   }

   return (
      <div className="font-comfortaa flex min-h-screen flex-col items-center bg-white p-5">
         <main className="w-full max-w-3xl flex flex-col gap-3">
            <label className="text-accent text-center text-xl font-bold">Nombre del Proyecto</label>
            <Input placeholder="Nombre del proyecto" onChange={handleInput}></Input>
            <span className="text-red-700">*Este campo es obligatorio</span>

            <AddArea areasSeleted={handleAreasSeleted} />
            <span className="text-red-700">*Este campo es obligatorio</span>

            <div className="flex justify-end">
               <Link href="/">
                  <Button onClick={submitProject}>
                     Continuar
                     <ArrowRightCircle
                        stroke="#fff"
                        width={16}
                        height={16}
                     />
                  </Button>
               </Link>
            </div>
         </main>
      </div>
   );
}
