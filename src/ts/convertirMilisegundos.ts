
export function convertirMilisegundosAHoras(milisegundos: number): string {
    const fecha = new Date(milisegundos);
    const horas = padLeft(fecha.getUTCHours(), 2);
    const minutos = padLeft(fecha.getUTCMinutes(), 2);
    const segundos = padLeft(fecha.getUTCSeconds(), 2);
  
    return `${horas}:${minutos}`;
  }
  function padLeft(valor: number, longitud: number): string {
    return valor.toString().padStart(longitud, '0');
  }