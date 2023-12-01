'use client'
import { filtrarClasesUnicas } from "@/ts/filtroClases"
import { useEffect, useState } from "react"
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import { transformEvents } from "@/ts/transformEvents";
import { getEarliestStartTime } from "@/ts/startAndEndTime";
import { getLatestEndTime } from "@/ts/startAndEndTime";
import { transformEventsforDisponibilidad } from "@/ts/transformEvents";

const CalendarioSemanal = () => {
    const [clases, setClases] = useState<Clase[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [clasesUnicas, setClasesUnicas] = useState<Clase[]>([])
    const [events, setEvents] = useState<OutputEvent[]>([]);
    const [events2, setEvents2] = useState<OutputEvent[]>([])
    const [disponibilidad, setDisponibilidad] = useState<DisponibilidadCalendario[]>([]);

    const [earliestEventTime, setEarliestEventTime] = useState<string>('09:00');
    const [latestEventTime, setLatestEventTime] = useState<string>('21:00');
    
    //GET CLASES
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/clases?id=1')
                if(!response.ok){
                    throw new Error('No se pudo obtener');
                }
                const data = await response.json();
                setClases(data.clases)
            }catch(error){
                setError((error as Error))
            }
        }
        fetchData();
    }, []);
    //get disponibilidad
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




    //dejar solo clases por semana
    useEffect(() => {
        const filtracionDeClases = filtrarClasesUnicas(clases);
        setClasesUnicas(filtracionDeClases)
    }, [clases]);
    //formatear para fullcalendar calses
    useEffect(() => {
        if(clasesUnicas && clasesUnicas.length > 0){
            const transformedEvents = transformEvents(clasesUnicas);
            setEvents(transformedEvents);
        }
      }, [clasesUnicas]);
      //formatear para fullcalendar disponibilidad
      useEffect(() => {
        if(disponibilidad && disponibilidad.length > 0){
            const transformedEvents = transformEventsforDisponibilidad(disponibilidad);
            setEvents2(transformedEvents);
        }
      }, [disponibilidad]);



     useEffect(() =>{
        const allEvents:OutputEvent[] = [...events, ...events2]
        const eventotemprano = getEarliestStartTime(allEvents)
        setEarliestEventTime(eventotemprano) 
    }, [events, earliestEventTime, events2])
    useEffect(() =>{
        const allEvents:OutputEvent[] = [...events, ...events2]
        const eventotarde = getLatestEndTime(allEvents)
        setLatestEventTime(eventotarde)
    }, [events, latestEventTime, events2])
     
    
    if(error){
        return <p>No se asignaron clases todavía</p>
    }
  return (
    <div>
        <h3 className="font-semibold text-lg p-4 text-center ">Calendario Semanal</h3>
        {events.length > 0 ? 
        (<div >
            <FullCalendar 
            
            hiddenDays={[0, 6]}
            height="auto"
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={[...events, ...events2]}
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
        (<p>Cargando..</p>)}
    </div>
  )
}

export default CalendarioSemanal