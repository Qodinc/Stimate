import { DollarSign } from "lucide-react";
import ExportDownload from "../Icons/ExportDownload";
import Percent from "../Icons/Percent";
import Input from "../input";
import { Button } from "../ui/button";
import TextArea from "../Textarea";
import Image from "next/image";
import { useEffect, useState } from "react";

const Preview = ({
  project,
  hours_team,
  estimated_wages,
  estimated_operating_expenses,
  estimated_associated_cost
}) => {
  const [preview, setPreview] = useState({
    salesCommission: 0,
    salesCommissionTotal: 0,
    profitMargin: 0,
    profitMarginTotal: 0,
    tax: 0,
    taxTotal: 0,
    notes: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    const parsedValue = Number(value);

    switch (name) {
      case "salesCommission":
        setPreview((preview) => ({
          ...preview,
          salesCommission: parsedValue, 
          salesCommissionTotal: (parsedValue / 100) * estimated_wages
        }))
        break;
      case "profitMargin":
        setPreview((preview) => ({
          ...preview,
          profitMargin: parsedValue,
          profitMarginTotal: (parsedValue / 100) * (estimated_wages + estimated_operating_expenses + estimated_associated_cost)
        }))
        break;
      case "tax":
        setPreview((preview) => ({
          ...preview,
          tax: parsedValue,
          taxTotal: (estimated_wages + estimated_operating_expenses + estimated_associated_cost + preview.salesCommissionTotal + preview.profitMarginTotal) * (parsedValue / 100)
        }))
        break;
      case "notes":
        setPreview((preview) => ({
          ...preview,
          notes: value
        }))
        break;
    
      default:
        break;
    }
  };
  
  useEffect(() => {
    // TODO: onUpdated
  }, [preview])

  return (
    <section className="my-5">
      <div className="flex justify-end my-3">
        <Button>Exportar <ExportDownload width={25} height={25} /></Button>
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
                  value={preview.salesCommission}
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
                  value={preview.salesCommissionTotal.toFixed(2)}
                  placeholder="Ingrese la comisón por venta"
                  disabled={true}
                />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>Margen de Ganancia</p>
                <Input
                  placeholder="Ingrese un numero"
                  name="profitMargin"
                  value={preview.profitMargin}
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
                  value={preview.profitMarginTotal.toFixed(2)}
                  placeholder="Ingrese el magen de ganancia"
                  disabled={true}
                />
              </div>
              <div className="space-y-2 mb-4 sm:mb-0">
                <p>IVA</p>
                <Input
                  placeholder="Ingrese un numero"
                  name="tax"
                  value={preview.tax}
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
                  value={preview.taxTotal.toFixed(2)}
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
                value={preview.notes}
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
            <Image
              src="/preview.jpg"
              alt="Descripción de la imagen"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;