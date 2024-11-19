import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const { default: MultipleSelect } = require("./MultipleSelect");

function AddArea({ areasSelected }) {
   const { data: session } = useSession();
   const [selectedOptions, setSelectedOptions] = useState([]);

   const areas = [
      {
         "_id": "66e85eb5f5705d7ac2915548",
         "area": "Frontend JS Junior"
      },
      {
         "_id": "66e85ebfd328ce6fa6ba14a6",
         "area": "Frontend JS Middle"
      },
      {
         "_id": "66e85ec91b0daa6b97bb2955",
         "area": "Frontend JS Senior"
      },
      {
         "_id": "66e85ecfda5ca3d02f6d5228",
         "area": "Backend JS Junior"
      },
      {
         "_id": "66e85edf9a45822243294132",
         "area": "Backend JS Middle"
      },
      {
         "_id": "66e85ee46054e17e9c0c24c9",
         "area": "Backend JS Senior"
      },
      {
         "_id": "66e86fde9454f07c8097e3a8",
         "area": "DBA (Administrador de Base de Datos)"
      },
      {
         "_id": "66e86f427ae538fccdde8e02",
         "area": "SRE (Site Reliability Engineer)"
      },
      {
         "_id": "66e86f4f153df6d14f338631",
         "area": "DevOps (Desarrollo y Operaciones)"
      },
      {
         "_id": "66e8c6333fb73bde562c6254",
         "area": "Scrum Master"
      },
      {
         "_id": "66e8c656f890074f104cac28",
         "area": "Tester / QA (Quality Assurance)"
      },
      {
         "_id": "66e8c67790a2200f1ca911b6",
         "area": "Especialista en Seguridad"
      },
      {
         "_id": "66e8c6c1d69dd46f5df16441",
         "area": "Especialista en SEO"
      },
      {
         "_id": "66e8c6e4bf5361d8366f9e5c",
         "area": "Especialista en Accesibilidad"
      },
      {
         "_id": "66e8c6fe357322a24a66ad89",
         "area": "Especialista en Rendimiento"
      },
      {
         "_id": "66e8c71922e43a71f6196297",
         "area": "Documentador Técnico"
      },
      {
         "_id": "66e8c7310f2cfe58f4d8a566",
         "area": "Product Owner"
      },
      {
         "_id": "66e85ee85f1e06b6686b452f",
         "area": "Diseñador gráfico",
         "user_id": "66786e26d399c065162a0e61"
      },
      {
         "_id": "66e8c5795298be72b79d0f0a",
         "area": "Analista",
         "user_id": "66786e26d399c065162a0e61"
      }
   ]

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