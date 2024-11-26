import { DollarSign } from "lucide-react";
import ExportDownload from "../Icons/ExportDownload";
import Percent from "../Icons/Percent";
import Input from "../input";
import { Button } from "../ui/button";
import TextArea from "../Textarea";
import PreviewPDF from "../PreviewPDF";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import HttpServices from "@/lib/http-services";
import { useSession } from "next-auth/react";
import formatPrice from "@/lib/formatPrice";

const Preview = ({
  project,
  hours_team,
  estimated_wages,
  estimated_operating_expenses,
  estimated_associated_cost,
  onUpdate,
  onExport,
  isActiveSubscription
}) => {
  const { data: session } = useSession()
  const httpServices = new HttpServices(session)
  const [statusOptions, setStatusOptions] = useState([]);
  const elementRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchStatusOptions = async () => {
      const data = await httpServices.getStatus();
      setStatusOptions(Array.isArray(data) ? data : []);
    };
    fetchStatusOptions();
  }, []);

  const handleStatusChange = (status_Change) => {
    onUpdate({
      ...project, 
      status_project: status_Change
    });
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    const parsedValue = Number(value);
    let updatedProject = { ...project }; 

    switch (name) {
      case "salesCommission":
        updatedProject = {
          ...updatedProject,
          sale_comission: parsedValue
        };
        break;
      case "profitMargin":
        updatedProject = {
          ...updatedProject,
          profit: parsedValue
        };
        break;
      case "tax":
        updatedProject = {
          ...updatedProject,
          tax: parsedValue
        };
        break;
      case "notes":
        updatedProject = {
          ...updatedProject,
          notes: value
        };
        break;
    
      default:
        break;
    }

    onUpdate(updatedProject)
  };

  return (
    <section className="my-5 pb-10">
      <div className="flex justify-end my-3 gap-4">
        <Select onValueChange={handleStatusChange} value={project.status_project}>
            <SelectTrigger className="w-full md:w-56 xl:w-50">
            <SelectValue placeholder={"Seleccionar estado"}/>
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
              {statusOptions.map((option) => (
                <SelectItem key={option.code} value={option.code} color={option.color}>
                  {option.translations.es}
                </SelectItem>
              ))
            }
            </SelectGroup>
            </SelectContent>
        </Select>
        <div>
          {!isActiveSubscription ? (
            <Button onClick={() => onExport(elementRef,"JPG")}>
              Exportar <ExportDownload width={25} height={25} />
            </Button>
          ) : (
            <div className="relative">
              <Button onClick={toggleOpen}>
                Exportar <ExportDownload width={25} height={25} />
              </Button>
              {isOpen && (
                <div
                  className="flex rounded-xl border items-center border-baseColor/10 absolute top-10 z-10 right-0 bg-white overflow-hidden gap-2"
                >
                  <button
                    onClick={() => onExport(elementRef,"PDF")}
                    className="w-full hover:bg-accent hover:text-white p-4 transition-colors duration-200"
                  >
                    PDF
                  </button>
                  <span>-</span>
                  <button
                    onClick={() => onExport(elementRef,"JPG")}
                    className="w-full hover:bg-accent hover:text-white p-4 transition-colors duration-200"
                  >
                    JPG
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="xl:flex xl:justify-between xl:space-x-6">
        <div className="font-comfortaa xl:w-1/2">
          <h2 className="font-poppins text-lg font-semibold text-accent mb-3">Datos adicionales</h2>
          <div className="my-3">
            <p>Salarios estimados: {formatPrice(estimated_wages)}</p>
            <p>Gastos operativos: {formatPrice(estimated_operating_expenses)}</p>
            <p>Cargos operativos: {formatPrice(estimated_associated_cost)}</p>
            <p>Semanas estimadas: {hours_team && hours_team.reduce((total, team) => total += team.totalWeeklyWorkHours, 0).toFixed(2)}</p>
            <p>Días estimados: {hours_team && hours_team.reduce((total, team) => total += team.totalDailyWorkHours, 0).toFixed(2)}</p>
          </div>
          <div className="text-base text-baseColor space-y-6">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 md:gap-6">
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>Comisión por venta</p>
                <Input
                  type="text"
                  name="salesCommission"
                  placeholder="Ingrese un numero"
                  value={!isNaN(project.sale_comission) ? project.sale_comission : 0}
                  min={0}
                  step={0.01}
                  onChange={handleInputChange}
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />}
                  iconPosition="right"
                  className="text-baseColor mb-2"
                />
                <Input
                  value={formatPrice(project.sale_comission_total)}
                  placeholder="Ingrese la comisón por venta"
                  disabled={true}
                />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>Margen de Ganancia</p>
                <Input
                  placeholder="Ingrese un numero"
                  name="profitMargin"
                  value={!isNaN(project.profit) ? project.profit : 0}
                  min={0}
                  step={0.01}
                  onChange={handleInputChange}
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />}
                  iconPosition="right"
                  className="text-baseColor mb-2"
                />
                <Input
                  value={formatPrice(project.profit_total)}
                  placeholder="Ingrese el magen de ganancia"
                  disabled={true}
                />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>IVA</p>
                <Input
                  placeholder="Ingrese un numero"
                  name="tax"
                  value={!isNaN(project.tax) ? project.tax : 0}
                  min={0}
                  step={0.01}
                  onChange={handleInputChange}
                  allowOnlyNumbers={true} // No permitimos letras
                  icon={<Percent width={20} height={20} />}
                  iconPosition="right"
                  className="text-baseColor mb-2"
                />
                <Input
                  value={formatPrice(project.tax_total)}
                  placeholder="Ingrese el impuesto"
                  disabled={true}
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <p>Notas</p>
              <TextArea
                name="notes"
                placeholder={"Añade alguna nota"}
                defaultValue={project.notes}
                onChange={(event) => handleInputChange({ 
                  currentTarget: {
                    value:event,
                    name:'notes'
                  }
                })}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="xl:w-1/2 mt-6 xl:mt-0 order-last xl:order-none border-slate-800 border border-baseColor/10 shadow-sm rounded-xl overflow-x-auto">
          <div className="w-[800px] relative aspect-video border-slate-800 items-center" ref={elementRef}>
            <PreviewPDF project={project} estimatedWages={estimated_wages} estimatedOperatingExpenses={estimated_operating_expenses} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;