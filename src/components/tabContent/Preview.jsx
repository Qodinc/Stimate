import ExportDownload from "../Icons/ExportDownload";
import Percent from "../Icons/Percent";
import Input from "../input";
import { Button } from "../ui/button";


const Preview = () => {
    return (
      <main className="m-2 mt-5">
        <div className="flex justify-end">
          <Button>Exportar <ExportDownload width={25} height={25}  /></Button>
        </div>
        <div>
          <h2 className="font-poppins text-lg font-semibold text-accent mb-3">Datos adicionales</h2>
          <div>
            <p className="font-comfortaa text-base text-baseColor">Comisión por venta</p>
            <Input icon={<Percent width={20} height={20}  />} iconPosition="right"  />

            <Input />
          </div>
        </div>
      </main>
    );
  };
  
  export default Preview;