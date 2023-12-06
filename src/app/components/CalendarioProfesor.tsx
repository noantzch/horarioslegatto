import { transformEventsforDisponibilidad2 } from "@/ts/transformEvents2";
import { useEffect, useState } from "react"
import Cargando from "./Cargando";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import { addDays, getDay, format } from 'date-fns';
import { IoIosClose } from "react-icons/io";

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
        const handleEventClick = (info: any) =>{
            setClickEvent(true)
            setEventForm(info.event._def.extendedProps.id)
            console.log("Disponibilidad: ", info.event._def)
            //pendiente seguir con este id!!!
        }
      const handleCloseForm = () =>{
        setClickEvent(false)
      }
      const [eventForm, setEventForm] = useState<any>()

  return (
    <div>
        {clickEvent?
        (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
                    <button onClick={handleCloseForm} className="absolute top-0 right-0 p-1"><IoIosClose /></button>
                    <h4 className="space-y-4">Formulario de horario #</h4>
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
                slotDuration="00:30:00"
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
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
                hiddenDays={[0, 1]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:30:00"
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
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
                hiddenDays={[0, 1, 2]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:30:00"
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
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
                hiddenDays={[0, 1, 2, 3]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:30:00"
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
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
                hiddenDays={[0, 1, 2, 3, 4]}
                height="auto"
                plugins={[timeGridPlugin]}
                events = {events}
                initialView = 'timeGridOneDay'
                views = {{timeGridOneDay: {type: 'timeGrid',duration: { days: 1 }}}}
                slotDuration="00:30:00"
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
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