import TableComponent from "./tableComponent"
import CostBreakdown from "./CostBreakdown"

const previewPDF = ({ project, estimatedWages, estimatedOperatingExpenses }) => {
  // Obtener la fecha actual
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const developmentCost = estimatedWages + estimatedOperatingExpenses + project.sale_comission_total + project.profit_total

  return (
    <>
      <div className="w-full text-center">
        <h1 className="text-2xl font-bold text-baseColor">Cotización</h1>
        <p className="text-baseColor text-sm">Fecha: {formattedDate}</p>
      </div>
      <div className="w-full">
        <TableComponent associatedCosts = {project.associated_costs} developmentCost = {developmentCost} />
      </div>
      <div>
        <h2 className="font-bold text-baseColor">Notas:</h2>
        <pre className="whitespace-pre-wrap break-words">{project.notes}</pre>
      </div>
      <div className="w-full flex justify-end">
        <CostBreakdown associatedCosts = {project.associated_costs} developmentCost = {developmentCost} IVA = {project.tax_total} />
      </div>
    </>
  );
};

export default previewPDF;