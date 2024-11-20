const TableComponent = ({associatedCosts, developmentCost}) => {

    const titles = ["Producto", "Cantidad", "Unidad", "Precio Unitario", "Precio"];
    const unity = [
        {   type_recurring: "nrc",
            unit: "Unidad"
        },
        {   type_recurring: "ARC",
            unit: "Año"
        },
        {
            type_recurring: "MRC",
            unit: "Mes"
        }
    ]
    return (
        <div className="w-full">
            <table className="w-full text-left">
            <thead>
                <tr className="text-baseColor">
                    {titles.map((title) => (
                        <th key={title} className="p-2 font-bold">{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr className="text-baseColor">
                    <td className="p-2">Costo de desarrollo</td>
                    <td className="p-2">1</td>
                    <td className="p-2">Unidad</td>
                    <td className="p-2">n/a</td>
                    <td className="p-2">{developmentCost && developmentCost.toFixed(2)}</td>
                </tr>
                {associatedCosts.map((cost) => {
                    const foundUnity = unity.find((e) => e.type_recurring === cost.type_recurring);
                    return (
                    <tr key={cost._id} className="text-baseColor">
                        <td className="p-2">{cost.cost_name}</td>
                        <td className="p-2">{cost.quantity}</td>
                        <td className="p-2">{foundUnity ? foundUnity.unit : "No se especificó el tipo de recurrencia en los cargos asociados"}</td>
                        <td className="p-2">{cost.price_unity}</td>
                        <td className="p-2">{cost.price_unity * cost.quantity}</td>
                    </tr>
                    );
                })}
            </tbody>
            </table>

        </div>
    );
};

export default TableComponent;