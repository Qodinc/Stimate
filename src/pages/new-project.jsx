import AddArea from "@/components/AddArea";
import Check from "@/components/Icons/Check";
import Input from "@/components/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { useState } from "react";



export default function NewProject() {
   const [areasSeleted, setAreasSeleted] = useState([])
   const [valueInput, setValueInpt] = useState('')

   const handleInput = (input) => {
      console.log("handleInput", input.target.value);

   }
   const handleAreasSeleted = (selectedAreas) => {
      console.log("handleAreasSeleted", selectedAreas);
      // setAreasSeleted
      // Validar el usuario limite de áreas
   };

   const submitProject = (e) => {
      console.log("submitProject", e);

   }

   return (
      <>
         <Navbar />
         <div className="font-comfortaa flex min-h-full flex-col items-center bg-white px-4 md:px-14 lg:px-20 pt-16">
            <main className="w-full max-w-4xl flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                  <label className="font-poppins font-semibold text-accent text-center text-xl md:text-3xl">Nombre del Proyecto</label>

                  <Input placeholder="Nombre del proyecto" onChange={handleInput} icon={<Check height={24} width={24}/>} iconPosition="left" value="Cuponera digital"></Input>
                  <Input placeholder="Nombre del proyecto" onChange={handleInput} icon={'Icons/icon-eye-off.svg'} iconPosition="right"></Input>
                  
                  <span className="text-red-700">*Este campo es obligatorio</span>
               </div>

               <div className="flex flex-col gap-3">
                  <AddArea areasSeleted={handleAreasSeleted} />
                  <span className="text-red-700">*Este campo es obligatorio</span>
               </div>

               <div className="flex justify-end">
                  <Button onClick={submitProject}>
                     Continuar
                     <ArrowRightCircle
                        stroke="#fff"
                        width={24}
                        height={24}
                     />
                  </Button>
               </div>
            </main>
         </div>
      </>
   );
}
