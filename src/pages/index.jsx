import React, { useEffect, useState } from 'react';
import HttpServices, { getProyects } from "../lib/http-services"
import Link from "next/link";
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PlusCircle from "@/components/Icons/PlusCircle";
import MenuButton from "@/components/ui/menu-button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Delete } from "@/components/alerts-variants";
import Loading from '@/components/Loading';
import Head from 'next/head';

const project_status = [
  {
    "code": "pending",
    "color": "#0ea5e9",
    "translations": {
      "es": "Pendiente",
      "en": "Pending"
    }
  },
  {
    "code": "completed",
    "color": "#22c55e",
    "translations": {
      "es": "Finalizado",
      "en": "Completed"
    }
  },
  {
    "code": "in_review",
    "color": "#eab308",
    "translations": {
      "es": "En revisión",
      "en": "In review"
    }
  },
  {
    "code": "canceled",
    "color": "#4c0519",
    "translations": {
      "es": "Cancelado",
      "en": "Canceled"
    }
  }
];

const getStatusColor = (status) => {
  const statusObj = project_status.find(s => s.code.toLowerCase() === status.toLowerCase());
  return statusObj ? statusObj.color : '#000000';
};

const getStatusTranslation = (status) => {
  const statusObj = project_status.find(s => s.code.toLowerCase() === status.toLowerCase());
  return statusObj ? statusObj.translations.es : status;
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [proyecto, setProyecto] = useState({name_project: '', slug: ''});
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    getProyects()
  }, [])

  const getProyects = async () => {
    try {
      setIsLoading(true);
      const response = await HttpServices.getProyects();
      if (!response.ok) {
        throw new Error('Failed to get project');
      }
      const { data } = await response.json();
      setProyectos(data.projects);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (slug) => {
    router.push(`/editar/${slug}`);
  };

  const handleDelete = async (slug) => {
    try {
      setIsLoading(true);
      const responseDelete = await HttpServices.deleteProyect(slug);
      if (!responseDelete.ok) {
        throw new Error(
          "Ocurrió un error al realizar la solicitud: " + response.status
        );
      }
      getProyects();

    } catch (error) {
      console.error("Error:", error);
    } finally{
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Navbar />
      <div className="ml-9 mt-7 space-y-3">
        <h1 className="text-accent font-poppins font-semibold text-2xl">Mis Proyectos</h1>
        <Link href="/crear-proyecto">
          <Button variant="default" size="default">
            <PlusCircle width={20} height={20} stroke="white" />
            Agregar proyecto
          </Button>
        </Link>
      </div>
      <div className="p-4 space-y-4 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        {proyectos.map((project) => {
          const borderColor = getStatusColor(project.status_project);
          const statusTranslation = getStatusTranslation(project.status_project);

          return (
            <Card key={project.slug} className="border-2 font-comfortaa" style={{ borderColor }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/editar/${project.slug}`}>
                      <h3 className="text-lg font-semibold text-accent cursor-pointer hover:underline">
                        {project.name_project}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#323F49]">Estatus: {statusTranslation}</p>
                  </div>
                  <div>
                    <MenuButton 
                      onEdit={() => handleEdit(project.slug)}
                      onDelete={() => { setIsDialogOpen(true); setProyecto(project); }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Contenido adicional */}
              </CardContent>
            </Card>
          );
        })}

        <div className="flex justify-end items-center w-full">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            <Delete elemento={`Proyecto ${proyecto.name_project}`} onClick={() => handleDelete(proyecto.slug)} />
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
