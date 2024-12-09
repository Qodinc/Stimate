import formatPrice from "../lib/formatPrice";

const TableComponent = ({associatedCosts, developmentCost}) => {

    const titles = ["Producto", "Descripción", "Cantidad", "Unidad", "Precio Unitario", "Precio"];
    const unity = [
        {
            type_recurring: "nrc",
            unit: "Unidad"
        },
        {
            type_recurring: "ARC",
            unit: "Año"
        },
        {
            type_recurring: "MRC",
            unit: "Mes"
        }
    ]

    return (
        <div className="w-full mb-5 border-b-4">
            <h2 className="pt-1 pb-2 font-bold border-b-4">Detalles</h2>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-baseColor border-b-4">
                        {titles.map((title) => (
                            <th key={title} className="pt-1 pb-2 font-bold">{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-baseColor">
                        <td className="">Costo de desarrollo</td>
                        <td className=""> </td>
                        <td className="">1</td>
                        <td className="">Unidad</td>
                        <td className="">{developmentCost && formatPrice(developmentCost)}</td>
                        <td className="">{developmentCost && formatPrice(developmentCost)}</td>
                    </tr>
                    {associatedCosts.map((cost) => {
                        const foundUnity = unity.find((e) => e.type_recurring === cost.type_recurring);
                        return (
                            <tr key={cost._id} className="text-baseColor">
                                <td className="">{cost.cost_name}</td>
                                <td className="">{cost.description}</td>
                                <td className="">{cost.quantity}</td>
                                <td className="">{foundUnity ? foundUnity.unit : ""}</td>
                                <td className="">{formatPrice(cost.price_unity)}</td>
                                <td className="">{formatPrice(cost.price_unity * cost.quantity)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;