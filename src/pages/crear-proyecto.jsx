require('dotenv').config()
import React, { useState, useEffect, useCallback } from 'react';
import AddArea from "@/components/AddArea";
import Input from "@/components/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Router from "next/router"

export default function NewProject() {
   const [projectName, setProjectName] = useState('');
   const [areasSelected, setAreasSelected] = useState([]);
   const [errors, setErrors] = useState({
      project: false,
      areas: false,
   });
   const [isFormValid, setIsFormValid] = useState(false);

   useEffect(() => {
      const newErrors = {
         project: projectName.trim() === '',
         areas: areasSelected.length === 0
      };
      setErrors(newErrors);

      const isValidated = !newErrors.project && !newErrors.areas
      setIsFormValid(isValidated);
   }, [projectName, areasSelected]);

   const handleProjectNameChange = async (event) => {
      setProjectName(event.target.value);
   }

   const handleAreasSelected = (selectedAreas) => {
      setAreasSelected(selectedAreas);
   }

   const submitProject = async () => {
      if (isFormValid) {
         const data = {
            name_project: projectName,
            areas_selected: areasSelected
         };
         const requestOptions = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         };

         const response = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/project`, requestOptions);
         if (!response.ok) {
            throw new Error(
               "Ocurrió un error al realizar la solicitud: " + response.status
            );
         }

         // Estos datos se deben contextualizar
         const data_context = await response.json();
         console.log(data_context);
         
         
         // Debe esperar a que el backend retorne el slug
         Router.push('/editar/' + data_context.slug)
      }
   }

   return (
      <>
         <Navbar />
         <div className="font-comfortaa flex min-h-full flex-col items-center bg-white px-4 md:px-14 lg:px-20 pt-16">
            <main className="w-full max-w-4xl flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                  <label className="font-poppins font-semibold text-accent text-center text-xl md:text-3xl">Nombre del Proyecto</label>
                  <Input
                     placeholder="Nombre del proyecto"
                     onChange={handleProjectNameChange}
                     value={projectName}
                  />
                  {errors.project && <span className="text-red-700">*Este campo es obligatorio</span>}
               </div>

               <div className="flex flex-col gap-3">
                  <AddArea areasSelected={handleAreasSelected} />
                  {errors.areas && <span className="text-red-700">*Este campo es obligatorio</span>}
               </div>

               <div className="flex justify-end">
                  <Button onClick={submitProject} disabled={!isFormValid}>
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
