import { transformEventsforDisponibilidad } from "@/ts/transformEvents";
import { useEffect, useState } from "react"
import Cargando from "./Cargando";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';


const CalendarioProfesor = () => {
    const [showDay, setShowDay] = useState<boolean[]>([false, false, false, false, false])
    const [disponibilidades, setDisponibilidades] = useState<DisponibilidadCalendario[]>()
    const [error, setError] = useState<Error | null>(null);
    const [events, setEvents] = useState<OutputEvent[]>([]);
    const [earliestEventTime, setEarliestEventTime] = useState<string>('09:00');
    const [latestEventTime, setLatestEventTime] = useState<string>('21:00');
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
            const transformedEvents = transformEventsforDisponibilidad(disponibilidades);
            setEvents(transformedEvents);
        }
      }, [disponibilidades]);

      const handleClick = (numero: number) =>{
        setShowDay((prevShowDay) => {
            return prevShowDay.map((value, index) => (index === numero ? !value : value));
          });
        };

  return (
    <div>
        {events.length > 0 ?
        (
            <div>
            <button className="bg-blue-200 rounded-full p-2 m-2 hover:bg-blue-500 text-center w-full" onClick={()=> handleClick(0)}>Lunes</button>
            {showDay[0] ?
            (<FullCalendar
            
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
                        <p className="text-xs">{eventInfo.timeText}</p>
                        <p className="text-xs">{eventInfo.event.title}</p>
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                    </>
                )}
            />)
            :
            (<></>)}

            <button className="bg-blue-200 rounded-full p-2 m-2 hover:bg-blue-500 text-center w-full" onClick={()=> handleClick(1)}>Martes</button>
            {showDay[1] ?
            (
             <FullCalendar
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                    </>
                )}
            />)
            :
            (<></>)}

            <button className="bg-blue-200 rounded-full p-2 m-2 hover:bg-blue-500 text-center w-full" onClick={()=> handleClick(2)}>Miercoles</button>
            {showDay[2] ?
            (
             <FullCalendar
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                    </>
                )}
            />)
            :
            (<></>)}

            <button className="bg-blue-200 rounded-full p-2 m-2 hover:bg-blue-500 text-center w-full" onClick={()=> handleClick(3)}>Jueves</button>
            {showDay[3] ?
            (
             <FullCalendar
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
                        <p className="text-xs">{eventInfo.event.extendedProps.subtitle} </p> {/* Muestra el subtítulo */}
                    </>
                )}
            />)
            :
            (<></>)}

            <button className="bg-blue-200 rounded-full p-2 m-2 hover:bg-blue-500 text-center w-full" onClick={()=> handleClick(4)}>Viernes</button>
            {showDay[4] ?
            (
             <FullCalendar
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