export function agregarCampoMes(registros: AsistenciaInstrumento[]): AsistenciaMes[] {
    return registros.map((registro) => ({
      ...registro,
      mes: new Date(registro.fecha).getMonth() + 1,
    }));
  }