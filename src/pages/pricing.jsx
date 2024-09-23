import { Button } from "@/components/ui/button";
import { Card } from "@/components/cardArea";
import Navbar from "@/components/Navbar";

export default function pricing() {
  const cards = [
    {
      title: "Basic",
      price: "Gratis",
      background: "white",
      titleColor: "accent",
      benefits: [
        "Almacenaje para 5 proyectos",
        "Exportación solo en JPEG",
        "Define hasta 4 áreas por proyecto",
        "Solo 2 exportaciones por proyecto",
      ],
      button: "Continuar",
    },
    {
      title: "Premium",
      price: "$10 usd",
      background: "accent",
      titleColor: "white",
      benefits: [
        "Almacenaje para proyectos ilimitado",
        "Exportaciones en PDF y JPG",
        "Exportaciones por proyecto ilimitadas",
        "Agregar más áreas de trabajo por proyecto",
      ],
      button: "Contrata Ahora",
    },
  ];

  return (
    <div>
      <Navbar />
      <div class="flex flex-col gap-8 max-w-full w-full py-8 lg:px-20 md:px-8 px-4 items-center justify-center">
        <h2 className="text-accent text-center text-lg md:text-3xl font-poppins font-semibold">
          Elige el mejor plan para ti
        </h2>
        <div class="w-full lg:px-28 lg:py-24 relative">
          <img
            class="hidden lg:block absolute right-0 top-0"
            src="Icons/Vector8.svg"
            alt=""
          />
          <img
            class="hidden lg:block absolute left-0 bottom-0"
            src="Icons/Vector7.svg"
            alt=""
          />
          <div class="w-full flex flex-col md:flex-row justify-center items-center xl:items-end gap-16">
            {cards.map((card, index) => (
              <Card key={index}>
                <div
                  className={`bg-${card.background} w-full max-w-[25.25rem] px-4 py-1 rounded-t-3xl text-${card.titleColor}`}
                >
                  <h2 className="text-3xl font-poppins font-semibold "> {card.title} </h2>
                  <p className="text-lg">{card.price} </p>
                </div>
                <div className="py-5">
                  <ul className="px-4 flex flex-col justify-center align-center">
                    {card.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="relative pl-6 py-1 md:py-3 xl:py-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-center before:bg-contain before:bg-no-repeat before:bg-[url('/Icons/check.svg')]"
                      >
                        <p>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center align-center py-10 ">
                  <Button variant="" size="lg">{card.button} </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
