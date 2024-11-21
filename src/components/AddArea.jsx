import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MultipleSelect from "./MultipleSelect";
import HttpServices from "@/lib/http-services";

function AddArea({ areasSelected }) {
   const { data: session } = useSession();
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [areas, setAreas] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchAreas = async () => {
         try {
            const httpServices = new HttpServices(); 
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
   }, []);

   const maxAreas = session?.user.state_subscription ? 10 : 3;

   const data = areas.map((area) => ({
      value: area._id,
      text: area.area
   }));

   useEffect(() => {
      areasSelected(selectedOptions);
   }, [selectedOptions, areasSelected]);

   const handleSelectedArea = (selectedArea) => {
      if (selectedOptions.length < maxAreas) {
         setSelectedOptions(prev => [...prev, selectedArea]);
      } else {
         alert(`Has alcanzado el límite de ${maxAreas} áreas.`);
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