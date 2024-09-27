import Navbar from "@/components/Navbar"
import Save from "@/components/Icons/Save"
import Input from "@/components/input"
import Timer from "@/components/Icons/Timer"
import Dinero from "@/components/Icons/DollarSign"
import { Button } from "@/components/ui/button"
import Plus from "@/components/Icons/Plus"



export default function Funcionalidades () {
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
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 ">Equipo de trabajo</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0 bg-white">Funcionalidades</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Gastos de operacion</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Cargos Asociados</button>
                <button className="p-1 ml-2 mt-1 rounded-t-[12px] rounded-b-none flex-shrink-0">Previsualizacion</button>
            </div>

            <section className="lg:flex border-2 lg:h-24 rounded-xl mt-3 justify-between md:h-[200px] md:grid sm:grid-cols-3 grid grid-cols-2 h-72">
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40 drop-shadow-none">
                <span className="font-comfortaa text-base">Funcionalidad</span>
                <Input 
                placeholder="Agregar funcionalidad"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Analista</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Front-End</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}

                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Back-End</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Diseño</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Horas totales</span>
                <Input 
                placeholder="0"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div> 
            </section>
            
            <section className="lg:flex border-2 lg:h-24 rounded-xl lg:mt-3 justify-between md:h-[200px] md:grid md:grid-cols-3 grid grid-cols-2 h-72 mt-7">
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Funcionalidad</span>
                <Input 
                placeholder="Agregar funcionalidad"
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Sueldo por hora</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                icon={<Dinero width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Sueldo por mes</span>
                <Input 
                placeholder="Agregar sueldo"
                iconPosition="left"
                icon={<Dinero width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Horas al día</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Horas a la semana</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Horas Totales</span>
                <Input 
                placeholder="0"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div> 
            </section>
            <div className="mt-[40px]">
                <Button>
                    <Plus 
                    width={24}
                    stroke="white"
                    />
                    Agregar funcionalidad
                </Button>
            </div>
            
            <section className="lg:flex border-2 lg:h-24 rounded-xl mt-3 justify-between md:h-[200px] md:grid sm:grid-cols-3 grid grid-cols-2 h-72">
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40 drop-shadow-none">
                <span className="font-comfortaa text-base">Funcionalidad</span>
                <Input 
                placeholder="Agregar funcionalidad"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Analista</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Front-End</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}

                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Back-End</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Diseño</span>
                <Input 
                placeholder="Agregar horas"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div>
            <div className="sm:w-[200px] lg:h-12 mt-2 w-40">
                <span className="font-comfortaa text-base">Horas totales</span>
                <Input 
                placeholder="0"
                iconPosition="left"
                icon={<Timer width={24}/>}
                />
            </div> 
            </section>
        </div>
        </>
       
    )
}