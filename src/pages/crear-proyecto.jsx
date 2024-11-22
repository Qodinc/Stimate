require('dotenv').config()
import React, { useState, useEffect, useCallback } from 'react';
import AddArea from "@/components/AddArea";
import Input from "@/components/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Router from "next/router"
import HttpServices from '@/lib/http-services';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Loading from '@/components/Loading';

export default function NewProject() {
   const { data: session, status } = useSession();
   const [httpServices, setHttpServices] = useState(null);

   const [isActiveSubscription, setIsActiveSubscription] = useState(false);
   const [maxProjects, setMaxProjects] = useState(5);
   const [countProjects, setCountProjects] = useState(0);
   const [projectName, setProjectName] = useState('');
   const [areasSelected, setAreasSelected] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [errors, setErrors] = useState({
      project: false,
      areas: false,
      validator: false
   });
   const [isFormValid, setIsFormValid] = useState(false);

   useEffect(() => {
      if (status === 'authenticated') {
         setIsActiveSubscription(session.user.isActiveSubscription)
         getCountProjects()
      }
   }, [session, status]);

   useEffect(() => {
      const newErrors = {
         project: projectName.trim() === '',
         areas: areasSelected.length === 0
      };
      setErrors(newErrors);

      const isValidated = !newErrors.project && !newErrors.areas
      setIsFormValid(isValidated);
   }, [projectName, areasSelected]);

   const getCountProjects = async () => {
      try {
         setIsLoading(true);
         if (session) {
            const httpServices = new HttpServices(session);
            const response = await httpServices.getProyects();
            
            if (!response.ok) {
               throw new Error('Failed to get project');
            }

            const { data } = await response.json();
            if (!isActiveSubscription && data.projects.length >= maxProjects) {
               Router.push('/');
            }
      
            setCountProjects(data.projects.length);
         }
      } catch (error) {
         console.error("Error:", error);
      } finally {
         setTimeout(() => {
            setIsLoading(false);
         }, 300);
      }
   }

   const handleProjectNameChange = async (event) => {
      setProjectName(event.target.value);
   }

   const handleAreasSelected = (selectedAreas) => {
      setAreasSelected(selectedAreas);
   }

   const submitProject = async () => {
      const httpServices = new HttpServices(session);

      if (isFormValid) {
         const dataProject = {
            name_project: projectName,
            areas_selected: areasSelected
         };

         const response = await httpServices.createProyect(dataProject);
         if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData.error);

            return setErrors({
               validator: true
            })
         }

         const { data } = await response.json();
         Router.push('/editar/' + data.project.slug);
      }
   }

   if (isLoading) {
      return <Loading />;
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
                     maxLength={25}
                     onChange={handleProjectNameChange}
                     value={projectName}
                  />
                  {errors.project && <span className="text-red-700">*Este campo es obligatorio</span>}
               </div>

               <div className="flex flex-col gap-3">
                  <AddArea areasSelected={handleAreasSelected} />
                  {errors.areas && <span className="text-red-700">*Este campo es obligatorio</span>}
               </div>

               <div className="flex flex-col gap-3">
                  {errors.validator && <span className="text-red-700">Error al crear el proyecto. Llamar a soporte técnico.</span>}
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
