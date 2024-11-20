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
        <h2>Subtotal: ${!isNaN(subtotal) ? subtotal.toFixed(2) : 0}</h2>
        <h2>IVA: ${!isNaN(IVA) ? IVA.toFixed(2) : 0}</h2>
        <h2>Total: ${!isNaN(total) ? total.toFixed(2) : 0}</h2>
      </div>
    </div>
  );
};

export default CostBreakdown;