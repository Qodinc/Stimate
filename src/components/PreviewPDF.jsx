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
    <div className="min-h-[1128px] flex flex-col justify-between w-full bg-white font-poppins text-baseM">
      {/* Main */}
      <div className="m-7 mb-12">
        {/* Header */}
        <div className="w-full mb-3 flex justify-between">
          <div>
            <h1 className="text-lg font-bold text-baseColor">Cotización</h1>
            <p className="text-baseColor">Fecha: {formattedDate}</p>
          </div>
          <div>
            <h2 className="text-zoom font-semibold italic">{project.name_project}</h2>
          </div>
        </div>
        {/* /Header */}

        {/* Content */}
        <TableComponent associatedCosts = {project.associated_costs} developmentCost = {developmentCost} />
        {/* /Content */}

        {/* Notes */}
        <div className="w-full mb-3">
          <h2 className="font-bold text-baseColor">Notas:</h2>
          <pre className="whitespace-pre-wrap break-words">{project.notes}</pre>
        </div>
        {/* /Notes */}
      </div>
      {/* /Main */}

      {/* Footer */}
      <CostBreakdown associatedCosts = {project.associated_costs} developmentCost = {developmentCost} IVA = {project.tax_total} />
      {/* Footer */}
    </div>
  );
};

export default previewPDF;