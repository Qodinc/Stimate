import { Button } from "@/components/ui/button";
import { Card } from "@/components/cardArea";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react"
import HttpServices from "@/lib/http-services";
import { useSession } from "next-auth/react";
import Star from "@/components/Icons/Star";
import Loading from "@/components/Loading";

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(true);
  const [planes, setPlanes] = useState([
    {
      title: "Básico",
      price: 0,
      price_text: "Gratis",
      benefits: [
        "Almacenaje para 5 proyectos",
        "Define hasta 4 áreas por proyecto",
        "Exportación en imagen",
      ],
      button: "Continuar",
      href: "/crear-proyecto",
      isActive: true
    },
    {
      id: "price_1QPd2OLiRxVT0FOq2WGESfHL",
      title: "Premium",
      price: 20,
      price_text: "$20 MXN /Mensual",
      benefits: [
        "Almacenaje para proyectos ilimitado",
        "Agregar áreas de trabajo ilimitado",
        "Exportaciones en PDF",
      ],
      button: "Contrata Ahora",
      href: "/suscripcion",
      isActive: false
    },
  ])
  const { data: session, status } = useSession();
  const [httpServices, setHttpServices] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      getPlanes();
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      const services = new HttpServices(session);
      setHttpServices(services);
    }
  }, [session, status])

  const getPlanes = async () => {
    try {
      setIsLoading(true)
      if (status === 'authenticated' && session?.user?.email) {
        const httpServices = new HttpServices(session);
        const user = session.user ? session.user : null

        if (user) {
          const response = await httpServices.getPlanesCustomer({
            email: session.user.email
          });

          if (response.ok) {
            const { data } = await response.json()

            // mapear data.subscriptions y mapear planes, planes hay que convertirlo en hook State
            if (data.subscriptions && !!data.subscriptions.length) {
              const plans = planes.map(plan => {
                const subscription = data.subscriptions.find(subscription => subscription.plan.id == plan.id)
  
                if (!!subscription)
                  plan.isActive = true
                else
                  plan.isActive = false
  
                return plan
              })
  
              setPlanes(plans)
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);

    } finally {
      setIsLoading(false)
    }
  }

  const showButton = (plan) => {
    if (plan.isActive)
      return (
        <Link href={'/plan-actual'}>
          <Button variant="" size="lg" >Continuar</Button>
        </Link>
      )
    else
      if (plan.price)
        return (
          <Link href={'/suscripcion'}>
            <Button variant="" size="lg" >Contratar</Button>
          </Link>
        )

    return


  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <title>Planes</title>
      </Head>
      <Navbar />
      <div className="flex flex-col gap-5 max-w-full w-full py-8 lg:px-20 md:px-8 px-4 items-center justify-center">
        <h2 className="text-accent text-center text-lg md:text-3xl font-poppins font-semibold">
          Elige el mejor plan para ti
        </h2>
        <div className="w-full lg:px-28 lg:py-24 relative">
          <Image
            width={90}
            height={82}
            className="hidden lg:block absolute right-0 top-0"
            src="Icons/Vector8.svg"
            alt=""
          />
          <Image
            width={90}
            height={82}
            className="hidden lg:block absolute left-0 bottom-0"
            src="Icons/Vector7.svg"
            alt=""
          />
          <div className="w-full flex flex-col justify-center items-center md:flex-row gap-16">
            {planes.map((plan, index) => (
              <Card key={index} className="flex flex-col justify-between rounded-3xl">
                <div className={(plan.isActive ? `bg-accent text-white ` : `bg-white text-accent `) + ` flex flex-col justify-end w-full px-4 py-1 rounded-t-3xl`}>
                  <h2 className="flex w-full text-3xl font-poppins font-semibold justify-between items-end px-2">
                    <span>{plan.title}</span>
                  </h2>
                  <div className="flex justify-between items-end">
                    <p className="text-lg">{plan.price_text} </p>
                    {plan.isActive && <small className="text-slate-300 text-sm pb-1">plan actual</small>}
                  </div>
                </div>
                <div className="py-5">
                  <ul className="px-4 flex flex-col justify-center align-center gap-5">
                    {plan.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-center before:bg-contain before:bg-no-repeat before:bg-[url('/Icons/check.svg')]"
                      >
                        <p className="text-base/loose text-base font-comfortaa font-light">{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center align-center py-10 ">
                  {showButton(plan)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
