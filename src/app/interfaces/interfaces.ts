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
interface OutputEvent2 {
  title: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  extendedProps: {
      subtitle: string;
      id: number;
      id_profesor: number
  };
}

interface Disponibilidad {
  id_dia: number;
  hora_inicio: string;
  hora_cierre: string;
  id_profesor: number | null;
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

interface Profesores {
  id: number;
  nombre: string;
  apellido: string;
  admin: boolean;
  user_clerk: string;
}
interface Alumno{
  nombre: string;
  apellido: string;
  id_instrumento: number
}

interface Clase2{
  id_profesor: number;
  id_alumno: number;
  hora_inicio: string;
  hora_cierre: string;
  id_disponibilidad: number;
  id_dia: number;
  id_instrumento: number
}
interface Asistencia{
  id_alumno: number;
  id_profesor: number;
  asistio: boolean;
  fecha: string;
  pendiente: boolean;
  id_instrumento: number

}