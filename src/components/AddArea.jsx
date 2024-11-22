import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MultipleSelect from "./MultipleSelect";
import HttpServices from "@/lib/http-services";

function AddArea({ areasSelected }) {
   const { data: session, status } = useSession();
   
   const [isActiveSubscription, setIsActiveSubscription] = useState(false);
   const [maxAreas, setMaxAreas] = useState(4);
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [areas, setAreas] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (status === 'authenticated') {
         setIsActiveSubscription(session.user.isActiveSubscription)
      }
   }, [session, status]);

   useEffect(() => {
      const fetchAreas = async () => {
         try {
            const httpServices = new HttpServices(session); 
            const areasData = await httpServices.getAreas();
            setAreas(areasData);
            setLoading(false);
         } catch (err) {
            setError("Error al cargar las áreas");
            setLoading(false);
            console.error("Error fetching areas:", err);
         }
      };

      fetchAreas();
   }, [session]);

   const data = areas.map((area) => ({
      value: area._id,
      text: area.area
   }));

   useEffect(() => {
      areasSelected(selectedOptions);
   }, [selectedOptions, areasSelected]);

   const handleSelectedArea = (selectedArea) => {
      // Limite de usuario Básico
      if (isActiveSubscription || selectedOptions.length < maxAreas) {
         setSelectedOptions(prev => [...prev, selectedArea]);
      }
   };

  /*  const handleSelectedArea = (selectedArea) => {
      if (selectedOptions.length < 4) {
         setSelectedOptions(prev => [...prev, selectedArea]);
      }
   } */

   const handleRemoveArea = (optionToRemove) => {
      setSelectedOptions(prev =>
         prev.filter((option) => option.value !== optionToRemove.value)
      );
   }

   if (loading) {
      return <div>Cargando áreas...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <MultipleSelect
         label="Selecciona las áreas que trabajarán en el proyecto"
         labelAddNew="Añadir nueva área"
         placeholder="Buscar o añadir opción..."
         onSelected={handleSelectedArea}
         onRemove={handleRemoveArea}
         options={data}
         selectedOptions={selectedOptions}
      />
   )
}

export default AddArea;