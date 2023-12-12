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

export const transformEvents3 = (inputEvents: Clase3[]): OutputEvent[] => {
    const outputEvents: OutputEvent[] = [];

    inputEvents.forEach((inputEvent) => {
        const {
            nombre_alumno,
            apellido_alumno,
            id_dia,
            hora_inicio,
            hora_cierre,
            instrumento,
            id,
            nombre_profesor,
            id_alumno,
            id_profesor
        } = inputEvent;

        const outputEvent: OutputEvent3 = {
            title: `${nombre_alumno}`,
            daysOfWeek: [id_dia],
            startTime: hora_inicio,
            endTime: hora_cierre,
            extendedProps: {
                subtitle: instrumento + " - Prof. " + nombre_profesor,
                id: id,
                idProfesor: id_profesor,
                idAlumno: id_alumno
            },
        };

        outputEvents.push(outputEvent);
    });

    return outputEvents;
};