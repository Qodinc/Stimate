import Navbar from "@/components/Navbar";
import CargosContent from "@/components/tabContent/CargosContent";
import EquipoContent from "@/components/tabContent/EquipoContent";
import Funcionalidades from "@/components/tabContent/FuncionalidadesContent";
import GastosContent from "@/components/tabContent/GastosContent";
import Preview from "@/components/tabContent/Preview";
import TabsMenu from "@/components/TabsMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import ProjectInterfaz from "@/interfaces/project.interface";
import Head from "next/head";
import httpServices from "@/lib/http-services";
import Save from "@/components/Icons/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TabsPages() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState("equipo");
  const [project, setProject] = useState(ProjectInterfaz);
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [estimatedWages, setEstimatedWages] = useState(0);
  const [estimatedOperatingExpenses, setEstimatedOperatingExpenses] = useState(0);
  const [estimatedAssociatedCost, setEstimatedAssociatedCost] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [hoursTeam, setHoursTeam] = useState(null)

  const tabs = [
    { value: "equipo", label: "Equipo de trabajo" },
    { value: "funcionalidades", label: "Funcionalidades" },
    { value: "gastos", label: "Gastos de operación" },
    { value: "cargos", label: "Cargos asociados" },
    { value: "preview", label: "Previsualización" },
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await httpServices.getProyect(slug);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const { data } = await response.json();
        if (data.project)
          setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  useEffect(() => {
    const sumHoursByTeam = (features) => {
      const teamHoursMap = {};

      features.forEach((feature) => {
        feature.team_features.forEach((teamFeature) => {
          const { team, time } = teamFeature;
          if (teamHoursMap[team]) {
            teamHoursMap[team] += time;
          } else {
            teamHoursMap[team] = time;
          }
        });
      });

      const teamHoursArray = Object.entries(teamHoursMap).map(([team, totalTime]) => {
        // Buscar costo por hora del area
        const team_project = project.team_project.find(team_project => team_project.team == team)
        const wage = !!team_project?.hourly_rate ? totalTime * team_project.hourly_rate : 0
        const totalDailyWorkHours = !!team_project?.work_hours_per_day ? totalTime / team_project.work_hours_per_day : 0
        const totalWeeklyWorkHours = !!team_project?.work_hours_per_day ? totalTime / (team_project.work_hours_per_day * 5) : 0
        const totalMonthlyWorkHours = !!team_project?.work_hours_per_day ? totalTime / (team_project.work_hours_per_day * 20) : 0

        return {
          team,
          totalTime,
          wage,
          totalDailyWorkHours,
          totalWeeklyWorkHours,
          totalMonthlyWorkHours,
        }
      });

      const estimatedWage = teamHoursArray.reduce((total, team) => total += team.wage, 0)
      const estimatedMonthlyWork = teamHoursArray.reduce((total, team) => total += team.totalMonthlyWorkHours, 0)

      setEstimatedWages(estimatedWage)
      setEstimatedTime(estimatedMonthlyWork)
      setHoursTeam(teamHoursArray)
    };

    sumHoursByTeam(project.features_project)
  }, [project])

  const updateTeamProject = (updatedTeamProject) => {
    // Actualiza el equipo
    const updatedProject = {
      ...project,
      team_project: updatedTeamProject
    };

    // Actualiza las funcionalidades
    const updatedFeaturesProject = project.features_project.map(feature => {

      // Para cada funcionalidad, creamos un nuevo array de team_features
      const updatedTeamFeatures = updatedTeamProject.map((newTeam, newIndex) => {

        // Buscamos si existe un tiempo previo para este equipo
        const existingTeamFeature = feature.team_features.find(
          (tf, indexTeamFeature) => {
            const originalTeamIndex = project.team_project.findIndex(
              originalTeam => originalTeam.team === tf.team
            );
            return originalTeamIndex === newIndex;
          }
        );

        // Si existe, mantenemos el tiempo, si no, usamos 0
        return {
          team: newTeam.team,
          time: existingTeamFeature ? existingTeamFeature.time : 0
        };
      });

      // Retorna la funcionalidad actualizada
      return {
        ...feature,
        team_features: updatedTeamFeatures
      };
    });

    // Actualiza el estado completo del proyecto
    setProject({
      ...updatedProject,
      features_project: updatedFeaturesProject
    });
  }
const onUpdateAssociatedCosts = (associatedCost) => {
  setProject((prevProject) => ({
    ...prevProject,
    associated_costs: associatedCost
  }))
}

  const updateFeaturesProject = (featuresProject) => {
    setProject((prevProject) => ({
      ...prevProject,
      features_project: featuresProject,
    }));
  }
  const onUpdateOperatingExpenses = (operatingExpenses) => {
    setProject((prevProject) => ({
      ...prevProject,
      operating_expenses: operatingExpenses
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "equipo":
        return <EquipoContent 
          team_project={project.team_project} 
          onUpdate={updateTeamProject} />
      case "funcionalidades":
        return <Funcionalidades 
          features_project={project.features_project} 
          team_project={project.team_project} 
          hours_team={hoursTeam} 
          onUpdate={updateFeaturesProject} />
      case "gastos":
        return <GastosContent 
          operating_expenses={project.operating_expenses}
          onUpdate={onUpdateOperatingExpenses} />
      case "cargos":
        return <CargosContent 
          associated_costs={project.associated_costs} 
          onUpdate={onUpdateAssociatedCosts} />
      case "preview":
        return <Preview 
          project={project} 
          hours_team={hoursTeam} 
          estimated_wages={estimatedWages} 
          estimated_operating_expenses={estimatedOperatingExpenses}
          estimated_associated_cost={estimatedAssociatedCost} />
      default:
        return null
    }
  }

  const saveProject = async () => {
    const updateProject = await httpServices.updateProyect(project)
    
    if(!updateProject.ok){
      throw new Error('Failed to fetch project');
    }
    toast.success("Información guardada");
    const { data } = await updateProject.json();
    if (data.project){
      setProject(data.project);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!project.slug) {
    return (
      <>
        <Head>
          <title>No se encontró el proyecto</title>
        </Head>
        <Navbar />
        <div className="h-[75vh] flex justify-center items-center font-comfortaa bg-white md:text-lg">
          No se encontró el proyecto
        </div>;
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{project.name_project}</title>
      </Head>
      <Navbar />
      <header className="sticky top-[85px] left-0 right-0 flex flex-wrap justify-between font-comfortaa md:text-lg grid-cols-3 px-4 md:px-14 lg:px-20 pt-5 bg-white z-40 border-b">
        <div className="flex items-center cursor-pointer" onClick={() => saveProject()}>
          <Save width={24} />
          <span className="hidden md:block text-base ml-2">Guardar</span>
        </div>
        <h2>Nombre del proyecto:</h2> <strong>{project.name_project}</strong>
        <h2>Tiempo estimado:</h2> <strong>{estimatedTime.toFixed(2)} meses</strong>
        <h2>Costo estimado:</h2> <strong>$ {(estimatedWages + estimatedOperatingExpenses + estimatedAssociatedCost).toFixed(2)}</strong>
      </header>
      <main className="px-4 md:px-14 lg:px-20">
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
        {renderContent()}
      </main>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
      />
    </>
  );
}
