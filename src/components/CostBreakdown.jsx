import formatPrice from "../lib/formatPrice";

const CostBreakdown = ({associatedCosts, developmentCost, IVA}) => {
  const associatedCostsTotal = associatedCosts.reduce(
    (total, cost) => total + ((cost.price_unity || 0) * (cost.quantity || 0)), 
    0
  );
  const subtotal = developmentCost + associatedCostsTotal;
  const total = subtotal + IVA;

  return (
    <div className="text-base w-full bg-accent font-bold text-white text-right py-4 px-8">
      <div className="flex flex-col border-t-4 py-3 border-b-4 border-white gap-3">
        <h2 className="font-bold">Subtotal: {formatPrice(subtotal)}</h2>
        <h2 className="font-bold">IVA: {formatPrice(IVA)}</h2>
        <h2 className="font-bold">Total: {formatPrice(total)}</h2>
      </div>
    </div>
  );
};

export default CostBreakdown;