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
    const asistenciasData = await sql`SELECT Asistencias.*, Alumnos.nombre, Alumnos.apellido
                                      FROM Asistencias
                                      JOIN Alumnos ON Asistencias.id_alumno = Alumnos.id
                                      WHERE Asistencias.id_profesor = ${id_profesor}
                                      AND Asistencias.pendiente = true;
                                      AND Asistencias.fecha <= CURRENT_DATE
                                      `;
    const asistencias = asistenciasData.rows;

    // Verificar si se encontraron resultados
    if (asistencias.length === 0) {
      return NextResponse.json({ resultado: 'No se encontraron asistencias pendientes' }, { status: 200 });
    }


    return NextResponse.json({ asistencias }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
      const body = await request.json();
      const asistencia: Asistencia = body;
  
      // Realizar la inserción en la base de datos
      await sql`INSERT INTO asistencias (id_profesor, id_alumno, fecha, asistio, pendiente, id_instrumento)
                  VALUES (${asistencia.id_profesor}, ${asistencia.id_alumno}, ${asistencia.fecha}, ${asistencia.asistio}, ${asistencia.pendiente}, ${asistencia.id_instrumento})`;
  
      return NextResponse.json({ mensaje: 'Asistencia creada exitosamente' }, { status: 201 });
      } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
  }
}