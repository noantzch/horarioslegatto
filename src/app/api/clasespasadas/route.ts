import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Obtener el ID de los parámetros de consulta
    const { searchParams } = new URL(request.url);
    const id_profesor = searchParams.get('id');

    // Verificar si se proporcionó un ID
    if (!id_profesor) {
      return NextResponse.json({ error: 'Debes proporcionar un ID de profesor' }, { status: 400 });
    }

    // Consulta SQL con el ID proporcionado
    const asistenciasData = await sql`SELECT 
                                        Asistencias.*, 
                                        Alumnos.nombre, 
                                        Alumnos.apellido,
                                        Instrumentos.instrumento
                                    FROM 
                                        Asistencias
                                    JOIN 
                                        Alumnos ON Asistencias.id_alumno = Alumnos.id
                                    JOIN 
                                        Instrumentos ON Asistencias.id_instrumento = Instrumentos.id
                                    WHERE 
                                        Asistencias.id_profesor = ${id_profesor}
                                        AND Asistencias.pendiente = false;`;
    const clases = asistenciasData.rows;

    // Verificar si se encontraron resultados
    if (clases.length === 0) {
      return NextResponse.json({ resultado: 'No se encontraron asistencias pendientes' }, { status: 200 });
    }


    return NextResponse.json({ clases }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
