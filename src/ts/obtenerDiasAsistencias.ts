export function obtenerTodasLasFechas(diaSemana: number): string[] {
    const hoy = new Date();
    const diaActual = hoy.getDay(); // domingo = 0, lunes = 1, ..., sábado = 6

    // Calcular la diferencia de días para llegar al día de la semana deseado
    const diferenciaDias = (diaSemana - diaActual + 7) % 7;

    // Calcular la fecha del próximo día de la semana deseado
    const fechaInicial = new Date(hoy);
    fechaInicial.setDate(hoy.getDate() + diferenciaDias);

    // Definir la fecha final como el 31 de diciembre del año en curso
    const fechaFinal = new Date(hoy.getFullYear(), 11, 31); // mes 11 representa diciembre

    // Crear un array para almacenar las fechas en formato 'YYYY-MM-DD'
    const fechas: string[] = [];

    // Iterar sobre las fechas y agregarlas al array
    while (fechaInicial <= fechaFinal) {
        const fechaFormateada = fechaInicial.toISOString().split('T')[0];
        fechas.push(fechaFormateada);
        fechaInicial.setDate(fechaInicial.getDate() + 7);
    }

    return fechas;
}