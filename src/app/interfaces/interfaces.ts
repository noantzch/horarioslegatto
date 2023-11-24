interface Asistencia {
    id: number;
    id_alumno: number;
    id_profesor: number;
    asistio: boolean;
    fecha: string;
    nombre: string;
    apellido: string;
    pendiente: boolean
    // Otras propiedades de la asistencia
  }
  interface Clase {
    id: number;
    id_profesor: number;
    id_alumno: number;
    hora_inicio: string;
    hora_cierre: string;
    id_disponibilidad: number;
    id_asistencia: number;
    id_dia: number;
    id_instrumento: number;
    nombre_alumno: string;
    apellido_alumno: string;
    dia: string;
    instrumento: string;
  }
  
  interface InputEvent {
    id: number;
    id_profesor: number;
    id_alumno: number;
    hora_inicio: string;
    hora_cierre: string;
    id_disponibilidad: number;
    id_asistencia: number;
    id_dia: number;
    id_instrumento: number;
    nombre_alumno: string;
    apellido_alumno: string;
    dia: string;
    instrumento: string;
}

interface OutputEvent {
    title: string;
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
    extendedProps: {
        subtitle: string;
    };
}

