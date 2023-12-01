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
  interface AsistenciaInstrumento {
    id: number;
    id_alumno: number;
    id_profesor: number;
    asistio: boolean;
    fecha: string;
    nombre: string;
    apellido: string;
    pendiente: boolean
    id_instrumento: number;
    instrumento: string
  }
  interface AsistenciaMes {
    id: number;
    id_alumno: number;
    id_profesor: number;
    asistio: boolean;
    fecha: string;
    nombre: string;
    apellido: string;
    pendiente: boolean;
    mes: number;
    id_instrumento: number;
    instrumento: string
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

interface Disponibilidad {
  id_dia: number;
  hora_inicio: string;
  hora_cierre: string;
  id_profesor: number;
}

interface DisponibilidadCalendario {
  id: number;
  id_dia: number;
  dia: string,
  hora_inicio: string;
  hora_cierre: string;
  id_profesor: number;
  nombre_profesor: string
}

