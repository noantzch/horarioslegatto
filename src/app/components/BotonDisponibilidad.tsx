import { getId } from "@/ts/getId";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const BotonDisponibilidad = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleClick = () => {
    setShowForm(!showForm);
  };



  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postData(); 
  };
  const handleChange = (dia: number, horaInicio: string, horaCierre: string) => {
    // Asegúrate de que el valor de 'id' esté disponible antes de asignarlo
    if (!loading) {
      setDisponibilidad({
        id_dia: dia,
        hora_cierre: horaCierre,
        hora_inicio: horaInicio,
        id_profesor: id || null, // Utiliza el ID obtenido del useEffect
      });
    }
  };


   //ID
 const { user } = useUser();
 const [loading, setLoading] = useState(true);
 const [id, setId] = useState<number| null>(null);

 useEffect(() => {
   const fetchData = async () => {
     try {
       if (!user) {
         return;
       }

       const userId: string | null = user.id || null;
       const fetchedId = await getId(userId);
       setId(fetchedId);
     } catch (error) {
       console.error((error as Error).message);
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, [user]);


  //post disponibilidad
  const postData = async () => {
    try {
      const response = await fetch("/api/disponibilidad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(disponibilidad),
      });

      if (response.ok) {
        console.log("Disponibilidad creada exitosamente");
        handleClick()
        window.location.reload();
      } else {
        console.error("Error al crear la disponibilidad");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-green-400 p-4 rounded hover:bg-green-600 transition duration-300 ease-in-out text-white m-7 text-xl"
      >
        Agregar Disponibilidad
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
            <button
              onClick={handleCloseForm}
              className="absolute top-0 right-0 p-1"
            >
              <IoIosClose />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="input1">Día:</label>
                <select
                  id="input1"
                  onChange={(e) =>handleChange(parseInt(e.target.value, 10), (document.getElementById("input2") as HTMLInputElement).value || "7", (document.getElementById("input3") as HTMLInputElement).value || "7")}
                  className="border p-2"
                >
                  <option value="1">Lunes</option>
                  <option value="2">Martes</option>
                  <option value="3">Miércoles</option>
                  <option value="4">Jueves</option>
                  <option value="5">Viernes</option>
                  <option value="6">Sábado</option>
                </select>

                <label htmlFor="input2">De:</label>
                <input
                  type="time"
                  id="input2"
                  onChange={(e) => handleChange(parseInt((document.getElementById("input1") as HTMLInputElement).value || "7"), e.target.value, (document.getElementById("input3") as HTMLInputElement).value || "00:00")}
                  className="border p-2"
                />

                <label htmlFor="input3">A:</label>
                  <input
                    type="time"
                    id="input3"
                    onChange={(e) => handleChange(parseInt((document.getElementById("input1") as HTMLInputElement).value || "7"), (document.getElementById("input2") as HTMLInputElement).value || "02:00", e.target.value)}
                    className="border p-2"
                  />

              </div>
              <button type="submit" className="mx-auto block bg-blue-500 text-white p-2 rounded text-center">Aceptar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonDisponibilidad;
