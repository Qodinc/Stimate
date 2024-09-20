export default function Home() {

  const areas = [
    {"name":"FrontEnd"},
    {"name":"BackEnd"},
    {"name":"DB"},
    {"name":"DevOps"}
  ]

  let stateImg = "block"
  let flagImg = false

  function selected(){
     if (flagImg) {
      stateImg = "hidden"
      flagImg = false
      console.log("Hola")
     }else{
      stateImg = "block"
      flagImg = true
      console.log("Adios")
     }
  }

    return (
      <div className="flex flex-col px-4 items-start justify-center gap-2 w-full">
        {areas.map((area, index) => (
            <div key={index} className="flex justify-center items-center" onClick={selected} >
              <div className="min-w-4"><img src="Icons/check.webp" alt="check" className={`size-4 ${stateImg}`} /></div>
              <label htmlFor="Name" className="flex gap-1 hover:bg-blue-400 w-full px-1">{area.name}</label>
            </div>
        ))}
      </div>
    );
  }
  