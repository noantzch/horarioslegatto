export function formatearFecha(fechaString: string) {
    const fechaObjeto = new Date(fechaString);
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1;
    const anio = fechaObjeto.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }