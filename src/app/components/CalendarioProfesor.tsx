import { transformEventsforDisponibilidad2 } from "@/ts/transformEvents2";
import { useEffect, useState } from "react"
import Cargando from "./Cargando";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import { addDays, getDay, format } from 'date-fns';
import { IoIosClose } from "react-icons/io";
import { convertirMilisegundosAHoras } from "@/ts/convertirMilisegundos";
import { obtenerDiaSemana } from "@/ts/getDayOfTheWeekts";
import Swal from "sweetalert2";
import { calcularHorasRestantes } from "@/ts/obtenerRestoDisponibilidad";
import { obtenerTodasLasFechas } from "@/ts/obtenerDiasAsistencias";

const CalendarioProfesor = () => {
    
    const [showDay, setShowDay] = useState<boolean[]>([false, false, false, false, false])
    const [disponibilidades, setDisponibilidades] = useState<DisponibilidadCalendario[]>()
    const [error, setError] = useState<Error | null>(null);
    const [events, setEvents] = useState<OutputEvent[]>([]);
    const [earliestEventTime, setEarliestEventTime] = useState<string>('09:00');
    const [latestEventTime, setLatestEventTime] = useState<string>('21:00');
    const [clickEvent, setClickEvent] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://horarioslegatto.vercel.app/api/disponibilidad`);
                
                if (!response.ok) {
                throw new Error('No se pudo obtener');
                }
        
                const data = await response.json();
                setDisponibilidades(data.disponibilidad);
            } catch (error) {
                setError(error as Error);
            }
            };

        fetchData();
        }, []);
        useEffect(() => {
        if(disponibilidades && disponibilidades.length > 0){
            const transformedEvents = transformEventsforDisponibilidad2(disponibilidades);
            setEvents(transformedEvents);
        }
        }, [disponibilidades]);

        const handleClick = (numero: number) =>{
        setShowDay((prevShowDay) => {
            return prevShowDay.map((value, index) => (index === numero ? !value : value));
        });
        };
        const getNextWeekdayDate = (props: number): string => {
            const dayOfWeek = props

            // Obtener la fecha actual
            const currentDate = new Date();

            // Calcular la diferencia de días para llegar al próximo día de la semana solicitado
            let daysToAdd = dayOfWeek - getDay(currentDate);
            if (daysToAdd <= 0) {
              // Si el día solicitado es igual o anterior al día actual, sumar 7 días
            daysToAdd += 7;
            }

            // Calcular la fecha del próximo día de la semana
            const nextWeekdayDate = addDays(currentDate, daysToAdd);

            // Formatear la fecha como string (puedes ajustar el formato según tus necesidades)
            const formattedDate = format(nextWeekdayDate, 'yyyy-MM-dd');

            return formattedDate;
            };
            const handleEventClick = (info: any) => {
                setClickEvent(true);
                const eventInfo = info.event._def;
                // Asegurarse de que eventId es un valor válido antes de establecerlo
                    if (eventInfo) {
                        setEventForm(eventInfo);
                    }
                };
            
            const handleCloseForm = () => {
                setClickEvent(false);
            };
            
            const [eventForm, setEventForm] = useState<any>();
        
            //form horario
            const [hora, setHora] = useState<any>({
                                            hora_cierre: "",
                                            hora_inicio: "",
                                            hora_min: "",
                                            hora_max: "",
                                            id_instrumento: 0,
                                            nombre: "",
                                            apellido: ""
                                            })
            const handleChange = (horaInicio: string, horaCierre: string, horaMin: string, horaMax: string, instrumentoSeleccionado:number, nombre: string, apellido: string) => {
                const index = instrumentoSeleccionado - 1;

                    setHora({
                    hora_cierre: horaCierre,
                    hora_inicio: horaInicio,
                    hora_min: horaMin,
                    hora_max: horaMax,
                    id_instrumento: instrumentoSeleccionado,
                    nombre: nombre,
                    apellido: apellido
                    });  
                };
                const opciones = [
                    { id: 1, instrumento: 'Piano' },
                    { id: 2, instrumento: 'Violín' },
                    { id: 3, instrumento: 'Batería' },
                    { id: 4, instrumento: 'Guitarra' },
                    { id: 5, instrumento: 'Canto' },
                    { id: 6, instrumento: 'Teoría' },
                    { id: 7, instrumento: 'Bajo' },
                    { id: 8, instrumento: 'Ukelele' },
                    { id: 9, instrumento: 'Iniciación' },
                    { id: 10, instrumento: 'Cello' }
                ];
                const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<number>(0);

                const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const horaInicioDate = new Date(`2000-01-01T${hora.hora_Inicio}`);
                    const horaCierreDate = new Date(`2000-01-01T${hora.hora_cierre}`);
                    const horaMinDate = new Date(`2000-01-01T${hora.hora_min}`);
                    const horaMaxDate = new Date(`2000-01-01T${hora.hora_max}`);
                
                    if (horaInicioDate < horaMinDate || horaCierreDate > horaMaxDate) {
                        alert('No se respeto la disponibilidad horaria, revisa las horas');
                    } else {
                        Swal.fire({
                            title: `Confirmación de Clase: ${opciones[(hora.id_instrumento - 1)].instrumento} 
                                                      con el/la ${eventForm.extendedProps.subtitle}, 
                                                      día ${obtenerDiaSemana(eventForm.recurringDef.typeData.daysOfWeek[0])}
                                                      de ${hora.hora_inicio} a ${hora.hora_cierre}-
                                                      Alumno/Grupo: ${hora.nombre} ${hora.apellido}`,
                            showDenyButton: true,
                            confirmButtonText: "Confirmar",
                            cancelButtonText: "Cancelar"
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              
                              await postAlumno(); //post alumno incluye post clase
                      
                              // Este bloque se ejecutará después de que se haya actualizado idAlumno
                              await actualizarDisponibilidad();
                              
                              Swal.fire("Clase asignada");
                      
                              // Considera otras opciones en lugar de recargar la página
                              window.location.reload();
                            }
                          });
                    
                    }
                };
     
                
                //::::::::::::::LOGICA PARA AGREGAR AL CALENDARIO 
                    //#1 CREAR AL ALUMNO + POSTCLASE Y CREARASISTENCIA
                    const postAlumno = async () => {
                        try {
                            const response = await fetch("https://horarioslegatto.vercel.app/api/alumno", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(hora),
                            });
                    
                            if (response.ok) {
                                const data = await response.json(); // Convertir la respuesta a JSON
                                
                                await postClase(data.id)
                                await crearAsistencias(data.id)
                                return data.id
                            } else {
                                console.error("Error al crear el alumno");
                            }
                        } catch (error) {
                            console.error("Error en la solicitud POST:", error);
                        }
                    };
                    //Eliminar disponibilidad
                    const eliminarDisponibilidad = async (id:any) => {
                        try {
                            const response = await fetch('/api/disponibilidad', {
                                method: 'DELETE',
                                headers: {
                                'Content-Type': 'application/json', // Corregir la tipografía en "application/json"
                                },
                                body: JSON.stringify({ id }), // Envolvemos el ID en un objeto
                            });
                        
                            if (response.ok) {
                                window.location.reload();
                                
                            } else {
                                console.error('Error al eliminar');
                            }
                            } catch (error) {
                            console.error('Error en la solicitud DELETE: ', error);
                            }
                        };
                

                    //#2 CREAR LA CLASE
                    const postClase = async (idA:any) => {
                        try {
                           
                            const claseBody: Clase2 = {
                                id_profesor: eventForm.extendedProps.id_profesor,
                                id_alumno: idA,
                                hora_inicio: hora.hora_inicio,
                                hora_cierre: hora.hora_cierre,
                                id_disponibilidad: eventForm.extendedProps.id,
                                id_dia: eventForm.recurringDef.typeData.daysOfWeek[0],
                                id_instrumento: hora.id_instrumento
                            };
                            
                            const response = await fetch("https://horarioslegatto.vercel.app/api/clases", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(claseBody),
                            });
                    
                            if (response.ok) {
                                const data = await response.json(); // Convertir la respuesta a JSON
                               
                            } else {
                                console.error("Error al crear la clase");
                            }
                        } catch (error) {
                            console.error("Error en la solicitud POST:", error);
                        }
                    };
                    //#ACTTUALIZAR DISPONIBLIDAD
                    const actualizarDisponibilidad = () =>{
                        const horaResultante =  calcularHorasRestantes(hora)
                        if (horaResultante !== null && typeof horaResultante === 'object') {
                            // Obtener un array de claves
                            const keysArray = Object.keys(horaResultante);
                          
                            // Obtener la cantidad de claves
                            const cantidadDeKeys = keysArray.length;
                           if(cantidadDeKeys > 0){
                                
                                //edito la disponibilidad
                                const primeraClave = Object.keys(horaResultante)[0]
                                const valorCorrespondiente = horaResultante[primeraClave]
                                editarDisponibilidad(valorCorrespondiente[0], valorCorrespondiente[1], eventForm.extendedProps.id)
            
                                if(cantidadDeKeys > 1){
                                    //agrego la nueva disponibilidad
                                    const segundaClave = Object.keys(horaResultante)[1]
                                    const valorCorrespondiente2 = horaResultante[segundaClave]
                                    postDisponibilidad(valorCorrespondiente2[0], valorCorrespondiente2[1], eventForm.recurringDef.typeData.daysOfWeek[0], eventForm.extendedProps.id_profesor)
                                }
                            }else{
                                //elimina disponibilidad
                                deleteData(eventForm.extendedProps.id)
                            } 
                        }

                    }
                        //CODIGO ELIMINAR DISPONIBILIDAD
                        const deleteData = async (id: number) => {
                            try {
                                const response = await fetch('/api/disponibilidad', {
                                    method: 'DELETE',
                                    headers: {
                                    'Content-Type': 'application/json', // Corregir la tipografía en "application/json"
                                    },
                                    body: JSON.stringify({ id }), // Envolvemos el ID en un objeto
                                });
                            
                                if (response.ok) {
                                
                                
                                } else {
                                    console.error('Error al eliminar');
                                }
                                } catch (error) {
                                console.error('Error en la solicitud DELETE: ', error);
                                }
                            };
                        //CODIGO EDITAR DISPONIBILIDAD
                        const editarDisponibilidad = async (hora_inicio: string , hora_cierre: string, id: number) => {
                            try {
                              // Realiza la solicitud PUT
                              const response = await fetch('/api/disponibilidad', {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  hora_inicio: hora_inicio,
                                  hora_cierre: hora_cierre,
                                  id: id,
                                }),
                              });
                          
                              // Verifica si la solicitud fue exitosa
                              if (response.ok) {
                                const data = await response.json();
                                
                              } else {
                                const error = await response.json();
                                console.error(error); // Maneja el error si la solicitud no fue exitosa
                              }
                            } catch (error) {
                              console.error(error); // Maneja errores de red u otros errores
                            }
                            };
                        //codigo AGREGAR DISPONIBLIDAD
                        const postDisponibilidad = async (hora_inicio: string , hora_cierre: string, id_dia: number, id_profesor: number) => {
                            try {
                              const response = await fetch("/api/disponibilidad", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    hora_inicio: hora_inicio,
                                    hora_cierre: hora_cierre,
                                    id_profesor: id_profesor,
                                    id_dia: id_dia
                                  }),
                              });
                        
                              if (response.ok) {
                          
                               
                              } else {
                                console.error("Error al crear la disponibilidad");
                              }
                            } catch (error) {
                              console.error("Error en la solicitud POST:", error);
                            }
                            };
                    //#CREAR ASISTENCIAS
                    const crearAsistencias = async (idA:any) =>{
                        const fechas = obtenerTodasLasFechas(eventForm.recurringDef.typeData.daysOfWeek[0])
                        for (const fecha of fechas){
                            
                            await postAsistencia(eventForm.extendedProps.id_profesor, idA, fecha, false, true, hora.id_instrumento)
                        }
                    }
                            //codigo CREAR ASISTENCIA
                            const postAsistencia = async (id_profesor:number, id_alumno: number, fecha: string, asistio: boolean, pendiente: boolean, id_instrumento: number) => {
                                try {
                                  const response = await fetch("/api/asistencia", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id_profesor : id_profesor,
                                        id_alumno: id_alumno, 
                                        fecha : fecha, 
                                        asistio: asistio, 
                                        pendiente: pendiente, 
                                        id_instrumento: id_instrumento
                                      }),
                                  });
                            
                                  if (response.ok) {
                                 
                                   
                                  } else {
                                    console.error("Error al crear la asistencia");
                                  }
                                } catch (error) {
                                  console.error("Error en la solicitud POST:", error);
                                }
                                };


    return (
    <div>
        {clickEvent?
        (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                    <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>
                    {eventForm ?
                    (<div>
                        <p>Clase con el/la {eventForm.extendedProps.subtitle}</p>
                        <p>Seleccionar horario dentro de la disponibilidad ({convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds)} a {convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds)}, {obtenerDiaSemana(eventForm.recurringDef.typeData.daysOfWeek[0])}):</p>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="horaInicio">De:</label>
                                            <input
                                            type="time"
                                            id="horaInicio"
                                            onChange={(e) => handleChange(
                                                e.target.value, 
                                                (document.getElementById("horaCierre") as HTMLInputElement).value || "00:00", 
                                                convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds), 
                                                convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds), 
                                                parseInt((document.getElementById("instrumentoSeleccionado") as HTMLInputElement).value), 
                                                (document.getElementById("nombre") as HTMLInputElement).value, 
                                                (document.getElementById("apellido") as HTMLInputElement).value
                                                )}
                                            className="border p-2"
                                            />

                                    <label htmlFor="horaCierre">A:</label>
                                            <input
                                                type="time"
                                                id="horaCierre"
                                                onChange={(e) => handleChange(
                                                    (document.getElementById("horaInicio") as HTMLInputElement).value || "02:00", 
                                                    e.target.value, convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds), 
                                                    convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds), 
                                                    parseInt((document.getElementById("instrumentoSeleccionado") as HTMLInputElement).value),
                                                    (document.getElementById("nombre") as HTMLInputElement).value, 
                                                    (document.getElementById("apellido") as HTMLInputElement).value)}
                                                className="border p-2"
                                            />
                                </div>
                                <div>
                                    <label htmlFor="instrumento">Instrumento:</label>
                                        <select 
                                            onChange={(e) => handleChange(
                                                (document.getElementById("horaInicio") as HTMLInputElement).value || "02:00", 
                                                (document.getElementById("horaCierre") as HTMLInputElement).value || "00:00",
                                                convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds),
                                                convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds), 
                                                parseInt(e.target.value),
                                                (document.getElementById("nombre") as HTMLInputElement).value, 
                                                (document.getElementById("apellido") as HTMLInputElement).value
                                                )}
                                            value={hora.id_instrumento || 0} id="instrumentoSeleccionado">
                                                    {opciones.map(opcion => (
                                                        <option key={opcion.id} value={opcion.id}>{opcion.instrumento}</option>
                                                    ))}
                                        </select>
                                </div>
                                <div>
                                    <label htmlFor="alumno">Nombre Alumno: </label>
                                    <input type="text" id="nombre" 
                                        onChange={(e) => handleChange(
                                            (document.getElementById("horaInicio") as HTMLInputElement).value || "02:00", 
                                            (document.getElementById("horaCierre") as HTMLInputElement).value || "00:00",
                                            convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds),
                                            convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds), 
                                            parseInt((document.getElementById("instrumentoSeleccionado") as HTMLInputElement).value),
                                            e.target.value,
                                            (document.getElementById("apellido") as HTMLInputElement).value
                                        )}
                                        />
                                        
                                    </div>
                                    <div>
                                    <label htmlFor="alumno">Apellido Alumno: </label>
                                        <input type="text" id="apellido" 
                                        onChange={(e) => handleChange(
                                            (document.getElementById("horaInicio") as HTMLInputElement).value || "02:00", 
                                            (document.getElementById("horaCierre") as HTMLInputElement).value || "00:00",
                                            convertirMilisegundosAHoras(eventForm.recurringDef.typeData.startTime.milliseconds),
                                            convertirMilisegundosAHoras(eventForm.recurringDef.typeData.endTime.milliseconds), 
                                            parseInt((document.getElementById("instrumentoSeleccionado") as HTMLInputElement).value),
                                            (document.getElementById("nombre") as HTMLInputElement).value,
                                            e.target.value
                                        )}
                                        />
                                </div>
                                <button className="bg-green-400 p-2 m-2">Asignar Clase</button>
                            </form>
                                <button className="bg-red-400 p-2 m-2" onClick={()=> eliminarDisponibilidad(eventForm.extendedProps.id)}>Eliminar esta Disponibilidad</button>
                    </div>)
                    :
                    (<p>Cargando...</p>)}
                </div>
            </div>
            )
        :
        (<></> )}
        {events.length > 0 ?
        (
            <div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-blue-500 text-center transition-all duration-300 ease-in-out"
                        onClick={() => handleClick(0)}
                    >
                        Lunes{showDay[0]?  " ↑" : " ↓"}
                    </button>
                </div>
            {showDay[0] ?
            (<FullCalendar
                initialDate={getNextWeekdayDate(0)}
                eventClick = {handleEventClick}
                hiddenDays={[0]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:20:00"
                allDaySlot={false}
                slotMinTime = {earliestEventTime}
                slotMaxTime = {latestEventTime}
                headerToolbar={false}
                dayHeaderFormat={{ weekday: 'long' }}
                locale={esLocale}
                eventContent={(eventInfo) => (
                    <>
            <div style={{ width: 'auto', margin: '0 auto' }}>
                <p className="text-xs">{eventInfo.timeText}</p>
                <p className="text-xs">{eventInfo.event.title}</p>
                <p className="text-xs">{eventInfo.event.extendedProps.subtitle}</p>
            </div>
        </>
                )}
            />)
            :
            (<></>)}

            <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-blue-500 text-center transition-all duration-300 ease-in-out"
                        onClick={() => handleClick(1)}
                    >
                        Martes{showDay[1]?  " ↑" : " ↓"}
                    </button>
                </div>            
            {showDay[1] ?
            (
             <FullCalendar
                initialDate={getNextWeekdayDate(0)}
                eventClick = {handleEventClick}
                hiddenDays={[0, 1]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:20:00"
                allDaySlot={false}
                slotMinTime = {earliestEventTime}
                slotMaxTime = {latestEventTime}
                headerToolbar={false}
                dayHeaderFormat={{ weekday: 'long' }}
                locale={esLocale}
                    eventContent={(eventInfo) => (
        <>
            <p className="text-xs">{eventInfo.timeText}</p>
            <p className="text-xs">{eventInfo.event.title}</p>
            <p className="text-xs">{eventInfo.event.extendedProps.subtitle}</p>
        </>
    )}
            />)
            :
            (<></>)}

            <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-blue-500 text-center transition-all duration-300 ease-in-out"
                        onClick={() => handleClick(2)}
                    >
                        Miércoles{showDay[2]?  " ↑" : " ↓"}
                    </button>
                </div>
                            {showDay[2] ?
            (
             <FullCalendar
                initialDate={getNextWeekdayDate(0)}
                eventClick = {handleEventClick}
                hiddenDays={[0, 1, 2]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:20:00"
                allDaySlot={false}
                slotMinTime = {earliestEventTime}
                slotMaxTime = {latestEventTime}
                headerToolbar={false}
                dayHeaderFormat={{ weekday: 'long' }}
                locale={esLocale}
                    eventContent={(eventInfo) => (
        <>
            <p className="text-xs">{eventInfo.timeText}</p>
            <p className="text-xs">{eventInfo.event.title}</p>
            <p className="text-xs">{eventInfo.event.extendedProps.subtitle}</p>
        </>
    )}
            />)
            :
            (<></>)}

            <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-blue-500 text-center transition-all duration-300 ease-in-out"
                        onClick={() => handleClick(3)}
                    >
                        Jueves{showDay[3]?  " ↑" : " ↓"}
                    </button>
                </div>           
                 {showDay[3] ?
            (
             <FullCalendar
             initialDate={getNextWeekdayDate(0)}
             eventClick = {handleEventClick}
                hiddenDays={[0, 1, 2, 3]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:20:00"
                allDaySlot={false}
                slotMinTime = {earliestEventTime}
                slotMaxTime = {latestEventTime}
                headerToolbar={false}
                dayHeaderFormat={{ weekday: 'long' }}
                locale={esLocale}
                eventContent={(eventInfo) => (
                    <>
                        <p className="text-xs">{eventInfo.timeText}</p>
                        <p className="text-xs">{eventInfo.event.title}</p>
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle}</p>
                    </>
    )}
            />)
            :
            (<></>)}

            <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-blue-500 text-center transition-all duration-300 ease-in-out"
                        onClick={() => handleClick(4)}
                    >
                        Viernes{showDay[4]?  " ↑" : " ↓"}
                    </button>
                </div>
                            {showDay[4] ?
            (
             <FullCalendar
             initialDate={getNextWeekdayDate(0)}
             eventClick = {handleEventClick}
                hiddenDays={[0, 1, 2, 3, 4]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:20:00"
                allDaySlot={false}
                slotMinTime = {earliestEventTime}
                slotMaxTime = {latestEventTime}
                headerToolbar={false}
                dayHeaderFormat={{ weekday: 'long' }}
                locale={esLocale}
                    eventContent={(eventInfo) => (
        <>
            <p className="text-xs">{eventInfo.timeText}</p>
            <p className="text-xs">{eventInfo.event.title}</p>
            <p className="text-xs">{eventInfo.event.extendedProps.subtitle}</p>
        </>
    )}
            />)
            :
            (<></>)}
            </div>
        )
        :
        (<Cargando />)
        }
    </div>
  )
}

export default CalendarioProfesor