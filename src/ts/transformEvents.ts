export const transformEvents = (inputEvents: Clase[]): OutputEvent[] => {
    const outputEvents: OutputEvent[] = [];

    inputEvents.forEach((inputEvent) => {
        const {
            nombre_alumno,
            apellido_alumno,
            id_dia,
            hora_inicio,
            hora_cierre,
            instrumento,
        } = inputEvent;

        const outputEvent: OutputEvent = {
            title: `${nombre_alumno}`,
            daysOfWeek: [id_dia],
            startTime: hora_inicio,
            endTime: hora_cierre,
            extendedProps: {
                subtitle: instrumento,
            },
        };

        outputEvents.push(outputEvent);
    });

    return outputEvents;
};

export const transformEventsforDisponibilidad = (inputEvents: DisponibilidadCalendario[]): OutputEvent[] => {
    const outputEvents: OutputEvent[] = [];

    inputEvents.forEach((inputEvent) => {
        const {
            nombre_profesor,
            id_dia,
            hora_inicio,
            hora_cierre,
        } = inputEvent;

        const outputEvent: OutputEvent = {
            title: `Hora Disponible`,
            daysOfWeek: [id_dia],
            startTime: hora_inicio,
            endTime: hora_cierre,
            extendedProps: {
                subtitle:  `Prof. ${nombre_profesor}`,
            },
        };

        outputEvents.push(outputEvent);
    });

    return outputEvents;
};