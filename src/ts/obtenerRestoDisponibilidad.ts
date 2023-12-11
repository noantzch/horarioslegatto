interface HorasObjeto {
    hora_min: string;
    hora_max: string;
    hora_inicio: string;
    hora_cierre: string;
  }
  
  interface HorasResultantes {
    [key: string]: [string, string] ;
    
  }
  
  export function convertirHoraANumero(horaString: string): number {
    const [horas, minutos] = horaString.split(":");
    return parseInt(horas) + parseInt(minutos) / 60;
  }
  
  export  function formatearHora(numeroHora: number): string {
    const horas = Math.floor(numeroHora);
    const minutos = Math.round((numeroHora % 1) * 60);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }
  
  export  function calcularHorasRestantes(hora: HorasObjeto): HorasResultantes | null {
    const minutosHoraMin = convertirHoraANumero(hora.hora_min) * 60;
    const minutosHoraMax = convertirHoraANumero(hora.hora_max) * 60;
    const minutosHoraSeccionadaMin = convertirHoraANumero(hora.hora_inicio) * 60;
    const minutosHoraSeccionadaMax = convertirHoraANumero(hora.hora_cierre) * 60;
  
    // Verificar si hay solución
    if (minutosHoraSeccionadaMin >= minutosHoraSeccionadaMax) {
      return null; // No hay solución válida
    }
  
    const formatearHoraResultado = (numeroHora: number): string => {
      const horas = Math.floor(numeroHora);
      const minutos = Math.round((numeroHora % 1) * 60);
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    };
  
    const horasResultantes: HorasResultantes = {
      horaResultante1: [
        formatearHoraResultado(minutosHoraMin / 60),
        formatearHoraResultado(minutosHoraSeccionadaMin / 60),
      ],
      horaResultante2: [
        formatearHoraResultado(minutosHoraSeccionadaMax / 60),
        formatearHoraResultado(minutosHoraMax / 60),
      ],
    };
  
    // Verificar si los elementos son iguales y eliminar si es necesario
    if (horasResultantes.horaResultante1 && horasResultantes.horaResultante1[0] === horasResultantes.horaResultante1[1]) {
      delete horasResultantes.horaResultante1;
    }
    if (horasResultantes.horaResultante2 && horasResultantes.horaResultante2[0] === horasResultantes.horaResultante2[1]) {
      delete horasResultantes.horaResultante2;
    }
  
    return horasResultantes;
  }
  
