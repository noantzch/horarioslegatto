// filtro.ts

export function filtrarClasesUnicas(clases: Clase[]): Clase[] {
  // Verificar si 'clases' es un arreglo
  if (!Array.isArray(clases)) {
    throw new Error('El parámetro clases debe ser un arreglo de clases.');
  }

  const uniqueCombinations: Set<string> = new Set();

  return clases.filter((clase) => {
    // Verificar si 'clase' es un objeto con las propiedades necesarias
    if (
      typeof clase !== 'object' ||
      typeof clase.dia !== 'string' ||
      typeof clase.hora_inicio !== 'string' ||
      typeof clase.hora_cierre !== 'string'
    ) {
      throw new Error('Cada elemento en el arreglo debe ser un objeto con propiedades dia, hora_inicio y hora_cierre.');
    }

    const key = `${clase.dia}-${clase.hora_inicio}-${clase.hora_cierre}`;

    if (!uniqueCombinations.has(key)) {
      uniqueCombinations.add(key);
      return true;
    }

    return false;
  });
}

export function filtrarClasesUnicas3(clases: Clase3[]): Clase3[] {
  const uniqueCombinations: Set<string> = new Set();

  return clases.filter((clase) => {
    const key = `${clase.dia}-${clase.hora_inicio}-${clase.hora_cierre}`;

    if (!uniqueCombinations.has(key)) {
      uniqueCombinations.add(key);
      return true;
    }

    return false;
  });
}
