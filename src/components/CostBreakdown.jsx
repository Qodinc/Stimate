import formatPrice from "../lib/formatPrice";

const CostBreakdown = ({associatedCosts, developmentCost, IVA}) => {
  const associatedCostsTotal = associatedCosts.reduce(
    (total, cost) => total + ((cost.price_unity || 0) * (cost.quantity || 0)), 
    0
  );
  const subtotal = developmentCost + associatedCostsTotal;
  const total = subtotal + IVA;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-baseColor">Subtotal: {formatPrice(subtotal)}</h2>
      <h2 className="font-bold text-baseColor">IVA: {formatPrice(IVA)}</h2>
      <h2 className="font-bold text-baseColor">Total: {formatPrice(total)}</h2>
    </div>
  );
};

export default CostBreakdown;