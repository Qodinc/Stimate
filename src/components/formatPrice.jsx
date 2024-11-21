// Función para formatear números como precios
const formatPrice = (value) => {
    const defaultValue = 0;
    if (isNaN(value) || value === null) return defaultValue; // Manejar casos donde no hay valor
    return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
    }).format(value);
};

export default formatPrice;