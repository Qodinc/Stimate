import Navbar from "@/components/Navbar"
import Save from "@/components/Icons/Save"
import Input from "@/components/input"
import Timer from "@/components/Icons/Timer"
import Check from "@/components/Icons/Check"


export default function EquipoDeTrabajo () {
    return (
        <>
        <Navbar  />
        <div className="flex-row h-[85px] px-4 md:px-14 lg:px-20">
            <div className="cursor-pointer">
               <Save 
            width={24}
            height={24}
            /> 
            </div>

            <div className="bg-[#DEDCFF] pb-0 rounded-t-[12px] rounded-b-none flex overflow-x-auto scrollbar-hide w-8/12 font-comfortaa">
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 bg-white ">Equipo de trabajo</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Funcionalidades</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Gastos de operacion</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Cargos Asociados</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Previsualizacion</button>
            </div>

            <section className="flex border-2 h-24 rounded-xl mt-3 justify-between ">
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Nombre del área</span>
                <Input 
                placeholder="Agregar área"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Sueldo por hora</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas a la semana</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div> 
            </section>
            <section className="flex border-2 h-24 rounded-xl mt-3 justify-between ">
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Nombre del área</span>
                <Input 
                placeholder="Agregar área"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Sueldo por hora</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas a la semana</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div>
            <div className="w-[200px] h-12 mt-2">
                <span className="font-comfortaa text-base">Horas al mes</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                />
            </div> 
            </section>
        </div>
        </>
       
    )
}