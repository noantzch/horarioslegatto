// filtro.ts

export function filtrarClasesUnicas(clases: Clase[]): Clase[] {
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
