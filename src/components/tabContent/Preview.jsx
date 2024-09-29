import { DollarSign } from "lucide-react";
import ExportDownload from "../Icons/ExportDownload";
import Percent from "../Icons/Percent";
import Input from "../input";
import { Button } from "../ui/button";
import TextArea from "../Textarea";
import Image from "next/image";

const Preview = () => {

  /* const handleInputChange = (e) => {
    console.log('Nuevo valor:', e.target.value);
  };  */

  return (
    <main className="max-sm:mx-3 sm:mx-10 mt-5">
      <div className="flex justify-end mb-6">
        <Button>Exportar <ExportDownload width={25} height={25} /></Button>
      </div>
      <div className="xl:flex xl:justify-between xl:space-x-6">
        <div className="xl:w-1/2">
          <h2 className="font-poppins text-lg font-semibold text-accent mb-3">Datos adicionales</h2>
          <div className="font-comfortaa text-base text-baseColor space-y-6">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 md:gap-6">
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>Comisión por venta</p>
                <Input
                  type="text"
                  placeholder="Ingrese un numero"
                  /* onChange={handleInputChange} */
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />} 
                  iconPosition="right" 
                  className="text-baseColor mb-2" 
                />
                <Input 
                  icon={<DollarSign width={20} height={20} className="text-secondaryIcon"/>} 
                  iconPosition="left" 
                  placeholder="3,222.14" 
                  disabled={true} 
                />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>Margen de Ganancia</p>
                <Input
                  placeholder="Ingrese un numero"
                  /* onChange={handleInputChange} */
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />} 
                  iconPosition="right"
                  className="text-baseColor mb-2" 
                  />
                <Input 
                  icon={<DollarSign width={20} height={20} 
                  className="text-secondaryIcon"/>} 
                  iconPosition="left" placeholder="6,808.18" 
                  disabled={true} 
                  />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>IVA</p>
                <Input
                  placeholder="Ingrese un numero"
                  /* onChange={handleInputChange} */
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />} 
                  iconPosition="right" 
                  className="text-baseColor mb-2" 
                />
                <Input 
                  icon={<DollarSign width={20} height={20} className="text-secondaryIcon"/>} 
                  iconPosition="left" 
                  placeholder="2.148.09" 
                  disabled={true} 
                />
              </div>
            </div>
            
            <div className="space-y-2 w-full">
              <p>Notas</p>
              <TextArea 
                placeholder={"Añade alguna nota"} 
                required={true}
              />
              <p className="text-red-600 text-[12px]">*Este campo es obligatorio</p>
            </div>
          </div>
        </div>
        <div className="xl:w-1/2 mt-6 xl:mt-0 order-last xl:order-none">
          <div className="w-full h-full relative aspect-video">
            <Image
              src="/preview.jpg"
              alt="Descripción de la imagen"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Preview;