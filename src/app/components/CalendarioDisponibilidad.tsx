'use client'
import { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import { transformEventsforDisponibilidad } from "@/ts/transformEvents";
import { getEarliestStartTime } from "@/ts/startAndEndTime";
import { getLatestEndTime } from "@/ts/startAndEndTime";

const CalendarioDisponibilidad = () => {
    const [disponibilidad, setDisponibilidad] = useState<DisponibilidadCalendario[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [events, setEvents] = useState<OutputEvent[]>([]);
    
    const [earliestEventTime, setEarliestEventTime] = useState<string>('09:00');
    const [latestEventTime, setLatestEventTime] = useState<string>('21:00');
    
    //mostrar 
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/disponibilidad?id=1')
                if(!response.ok){
                    throw new Error('No se pudo obtener');
                }
                const data = await response.json();
                setDisponibilidad(data.disponibilidad)
            }catch(error){
                setError((error as Error))
            }
        }
        fetchData();
    }, []);
;
    useEffect(() => {
        if(disponibilidad && disponibilidad.length > 0){
            const transformedEvents = transformEventsforDisponibilidad(disponibilidad);
            setEvents(transformedEvents);
        }
      }, [disponibilidad]);

     useEffect(() =>{
        const eventotemprano = getEarliestStartTime(events)
        setEarliestEventTime(eventotemprano) 
    }, [events, earliestEventTime])
    useEffect(() =>{
        const eventotarde = getLatestEndTime(events)
        setLatestEventTime(eventotarde)
    }, [events, latestEventTime])
     
    
    if(error){
        return <p>No hay disponibilidad de horarios</p>
    }
  return (
    <div>
        {events.length > 0 ?
        (<div>
            <FullCalendar
            hiddenDays={[0, 6]}
            height="auto"
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={events}
            slotDuration="00:20:00" // Duración de cada intervalo de tiempo en la cuadrícula
            allDaySlot={false} // No mostrar eventos de todo el día en esta vista
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
            />
        </div>)
        :
        (<p>No ingresaste disponibilidad todavía</p>)}

    </div>
  )
}

export default CalendarioDisponibilidad