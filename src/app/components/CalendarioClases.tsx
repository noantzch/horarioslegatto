import { filtrarClasesUnicas, filtrarClasesUnicas3 } from "@/ts/filtroClases";
import { transformEvents, transformEvents3 } from "@/ts/transformEvents";
import FullCalendar from "@fullcalendar/react";
import { addDays, getDay, format } from "date-fns";
import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io";
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import Swal from "sweetalert2";


const CalendarioClases = () => {
    const [showDay, setShowDay] = useState<boolean[]>([false, false, false, false, false])
    const [clases, setClases] = useState<Clase3[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [clasesUnicas, setClasesUnicas] = useState<Clase3[]>([])
    const [events, setEvents] = useState<OutputEvent[]>([]);
    const [clickEvent, setClickEvent] = useState<boolean>(false)
    const [eventForm, setEventForm] = useState<any>();

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
         //GET CLASES
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://horarioslegatto.vercel.app/api/clases");
            if (!response.ok) {
              throw new Error('No se pudo obtener');
            }
            const data = await response.json();
            setClases(data.clases);
          } catch (error) {
            setError(error as Error);
          }
        };
      
        fetchData();
      }, []);
        //dejar solo clases por semana
    useEffect(() => {
        const filtracionDeClases = filtrarClasesUnicas3(clases);
        setClasesUnicas(filtracionDeClases)
    }, [clases]);
    //formatear para fullcalendar calses
    useEffect(() => {
        if(clasesUnicas && clasesUnicas.length > 0){
            const transformedEvents = transformEvents3(clasesUnicas);
            setEvents(transformedEvents);
            
        }
      }, [clasesUnicas]);
      const handleClick = (numero: number) =>{
        setShowDay((prevShowDay) => {
            return prevShowDay.map((value, index) => (index === numero ? !value : value));
        });
        };
        const handleCloseForm = () => {
            setClickEvent(false);
        };
        const handleEventClick = (info: any) => {
            setClickEvent(true);
            const eventInfo = info.event._def;
            // Asegurarse de que eventId es un valor válido antes de establecerlo
                if (eventInfo) {
                    setEventForm(eventInfo);
                }
            };
        
        const eliminarClase = async (id:number) => {
                try {
                    const response = await fetch(`https://horarioslegatto.vercel.app/api/clases?id=${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        await eliminarAsistencias(eventForm.extendedProps.idProfesor, eventForm.extendedProps.idAlumno)
                        Swal.fire({
                            title: `Se eliminó la clase`,
                            confirmButtonText: "Confirmar",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                          });
                    } else {
                        const errorData = await response.json();
                        console.error(errorData.error); // Mensaje de error
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            const eliminarAsistencias = async (idProfesor:number, idAlumno:number) =>{
                try {
                    // Realiza la solicitud DELETE al endpoint correspondiente
                    const response = await fetch(`/api/asistencia?id_profesor=${idProfesor}&id_alumno=${idAlumno}`, {
                      method: 'DELETE',
                    });
              
                    if (response.ok) {
                      const data = await response.json();
                      
                    } else {
                      const errorData = await response.json();
                      
                    }
                  } catch (error) {
                    console.error(error)
                  }
                };
      if(error){
        return <p className="text-center">No se asignaron clases todavía</p>
    }
  return (
    <div>
        
            {clickEvent?
            (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                     <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                        <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>

                        {eventForm ?
                        (
                            <div>
                                <h4 className="p-2">Eliminar clase: {eventForm.title} - {eventForm.extendedProps.subtitle}</h4>
                                <button className="bg-red-400 p-2" onClick={() =>eliminarClase(eventForm.extendedProps.id)}>Elminar</button>

                            </div>
                        )
                        :
                        (<p>Cargando...</p>)}
                    </div>
                </div>
            )
            :
            (<></>)}  
            {events && events.length > 0 ?
                (
                    <div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-orange-500 text-center transition-all duration-300 ease-in-out"
                                onClick={() => handleClick(0)}
                            >
                                Lunes{showDay[0]?  " ↑" : " ↓"}
                            </button>       
                        </div>

                        {showDay[0] ?
                        (
                            <FullCalendar
                                initialDate={getNextWeekdayDate(0)}
                                eventClick = {handleEventClick}
                                hiddenDays={[0]}
                                height="auto"
                                plugins={[timeGridPlugin]}
                                events = {events}
                                initialView = 'timeGridOneDay'
                                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                                slotDuration="00:30:00"
                                allDaySlot={false}
                                slotMinTime = {'09:00'}
                                slotMaxTime = {'21:00'}
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'long' }}
                                locale={esLocale}
                                eventContent={(eventInfo) => (
                                    <>
                                        <p className="text-xs">{eventInfo.timeText}</p>
                                        <p className="text-xs">{eventInfo.event.title}</p>
                                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                                    </>
                                )}
                            />
                        )
                        :
                        (<></>)}
                    </div>    
                )
                :
                (<div></div>)
            }

        
            {clickEvent?
            (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                     <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                        <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>

                        {eventForm ?
                        (
                            <div>
                                <h4 className="p-2">Eliminar clase: {eventForm.title} - {eventForm.extendedProps.subtitle}</h4>
                                <button className="bg-red-400 p-2" onClick={() =>eliminarClase(eventForm.extendedProps.id)}>Elminar</button>

                            </div>
                        )
                        :
                        (<p>Cargando...</p>)}
                    </div>
                </div>
            )
            :
            (<></>)}  
            {events && events.length > 0 ?
                (
                    <div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-orange-500 text-center transition-all duration-300 ease-in-out"
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
                                slotDuration="00:30:00"
                                allDaySlot={false}
                                slotMinTime = {'09:00'}
                                slotMaxTime = {'21:00'}
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'long' }}
                                locale={esLocale}
                                eventContent={(eventInfo) => (
                                    <>
                                        <p className="text-xs">{eventInfo.timeText}</p>
                                        <p className="text-xs">{eventInfo.event.title}</p>
                                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                                    </>
                                )}
                            />
                        )
                        :
                        (<></>)}
                    </div>    
                )
                :
                (<div></div>)
            }

        
            {clickEvent?
            (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                     <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                        <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>

                        {eventForm ?
                        (
                            <div>
                                <h4 className="p-2">Eliminar clase: {eventForm.title} - {eventForm.extendedProps.subtitle}</h4>
                                <button className="bg-red-400 p-2" onClick={() =>eliminarClase(eventForm.extendedProps.id)}>Elminar</button>

                            </div>
                        )
                        :
                        (<p>Cargando...</p>)}
                    </div>
                </div>
            )
            :
            (<></>)}  
            {events && events.length > 0 ?
                (
                    <div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-orange-500 text-center transition-all duration-300 ease-in-out"
                                onClick={() => handleClick(2)}
                            >
                                Miercoles{showDay[2]?  " ↑" : " ↓"}
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
                                slotDuration="00:30:00"
                                allDaySlot={false}
                                slotMinTime = {'09:00'}
                                slotMaxTime = {'21:00'}
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'long' }}
                                locale={esLocale}
                                eventContent={(eventInfo) => (
                                    <>
                                        <p className="text-xs">{eventInfo.timeText}</p>
                                        <p className="text-xs">{eventInfo.event.title}</p>
                                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                                    </>
                                )}
                            />
                        )
                        :
                        (<></>)}
                    </div>    
                )
                :
                (<div></div>)
            }

       
            {clickEvent?
            (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                     <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                        <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>

                        {eventForm ?
                        (
                            <div>
                                <h4 className="p-2">Eliminar clase: {eventForm.title} - {eventForm.extendedProps.subtitle}</h4>
                                <button className="bg-red-400 p-2" onClick={() =>eliminarClase(eventForm.extendedProps.id)}>Elminar</button>

                            </div>
                        )
                        :
                        (<p>Cargando...</p>)}
                    </div>
                </div>
            )
            :
            (<></>)}  
            {events && events.length > 0 ?
                (
                    <div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-orange-500 text-center transition-all duration-300 ease-in-out"
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
                                slotDuration="00:30:00"
                                allDaySlot={false}
                                slotMinTime = {'09:00'}
                                slotMaxTime = {'21:00'}
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'long' }}
                                locale={esLocale}
                                eventContent={(eventInfo) => (
                                    <>
                                        <p className="text-xs">{eventInfo.timeText}</p>
                                        <p className="text-xs">{eventInfo.event.title}</p>
                                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                                    </>
                                )}
                            />
                        )
                        :
                        (<></>)}
                    </div>    
                )
                :
                (<div></div>)
            }

            {clickEvent?
            (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                     <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                        <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>

                        {eventForm ?
                        (
                            <div>
                                <h4 className="p-2">Eliminar clase: {eventForm.title} - {eventForm.extendedProps.subtitle}</h4>
                                <button className="bg-red-400 p-2" onClick={() =>eliminarClase(eventForm.extendedProps.id)}>Elminar</button>

                            </div>
                        )
                        :
                        (<p>Cargando...</p>)}
                    </div>
                </div>
            )
            :
            (<></>)}  
            {events && events.length > 0 ?
                (
                    <div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange-200 rounded-full p-2 pl-6 pr-6 m-2 hover:bg-orange-500 text-center transition-all duration-300 ease-in-out"
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
                                slotDuration="00:30:00"
                                allDaySlot={false}
                                slotMinTime = {'09:00'}
                                slotMaxTime = {'21:00'}
                                headerToolbar={false}
                                dayHeaderFormat={{ weekday: 'long' }}
                                locale={esLocale}
                                eventContent={(eventInfo) => (
                                    <>
                                        <p className="text-xs">{eventInfo.timeText}</p>
                                        <p className="text-xs">{eventInfo.event.title}</p>
                                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                                    </>
                                )}
                            />
                        )
                        :
                        (<></>)}
                    </div>    
                )
                :
                (<div></div>)
            }


    </div>
  )
}

export default CalendarioClases