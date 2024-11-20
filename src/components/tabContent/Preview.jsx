import { DollarSign } from "lucide-react";
import ExportDownload from "../Icons/ExportDownload";
import Percent from "../Icons/Percent";
import Input from "../input";
import { Button } from "../ui/button";
import TextArea from "../Textarea";
import PreviewPDF from "../PreviewPDF";
import { useEffect, useState } from "react";
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

const Preview = ({
  project,
  hours_team,
  estimated_wages,
  estimated_operating_expenses,
  estimated_associated_cost,
  onUpdate,
  onExport
}) => {
  const { data: session } = useSession()
  const httpServices = new HttpServices(session)
  const [statusOptions, setStatusOptions] = useState([]);

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
    <section className="my-5">
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
        <Button onClick={onExport} >Exportar <ExportDownload width={25} height={25} /></Button>
      </div>
      <div className="xl:flex xl:justify-between xl:space-x-6">
        <div className="font-comfortaa xl:w-1/2">
          <h2 className="font-poppins text-lg font-semibold text-accent mb-3">Datos adicionales</h2>
          <div className="my-3">
            <p>Salarios estimados: $ {estimated_wages && estimated_wages.toFixed(2)}</p>
            <p>Gastos operativos: $ {estimated_operating_expenses && estimated_operating_expenses.toFixed(2)}</p>
            <p>Cargos operativos: $ {estimated_associated_cost && estimated_associated_cost.toFixed(2)}</p>
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
                  icon={<DollarSign width={20} height={20} className="text-secondaryIcon" />}
                  iconPosition="left"
                  value={!isNaN(project.sale_comission_total) ? project.sale_comission_total.toFixed(2) : 0}
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
                  icon={<DollarSign width={20} height={20}
                  className="text-secondaryIcon" />}
                  iconPosition="left"
                  value={!isNaN(project.profit_total) ? project.profit_total.toFixed(2) : 0}
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
                  icon={<DollarSign width={20} height={20} className="text-secondaryIcon" />}
                  iconPosition="left"
                  value={!isNaN(project.tax_total) ? project.tax_total.toFixed(2) : 0}
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
        <div className="xl:w-1/2 mt-6 xl:mt-0 order-last xl:order-none">
          <div className="w-full h-full relative aspect-video border-slate-800">
            <PreviewPDF project={project} estimatedWages={estimated_wages} estimatedOperatingExpenses={estimated_operating_expenses} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;