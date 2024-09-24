import Navbar from "@/components/Navbar";
import CardGastosOperacion from "@/components/cardGastosOperacion";


export default function GastosOperacion() {
// const meseslaborales = 1.9
    return (
        <div className="w-full justify-center items-center flex flex-col gap-4">
            <Navbar />
            <CardGastosOperacion />
        </div>
    );
}