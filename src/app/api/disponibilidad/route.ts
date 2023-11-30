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
    const disponibilidadData = await sql`SELECT Disponibilidad.*,
                                        Profesores.nombre AS nombre_profesor,
                                        Dias.dia
                                        FROM Disponibilidad
                                        JOIN Profesores ON Disponibilidad.id_profesor = Profesores.id
                                        JOIN Dias ON Disponibilidad.id_dia = Dias.id
                                        WHERE Disponibilidad.id_profesor = ${id_profesor}`;
    const disponibilidad = disponibilidadData.rows;

    // Verificar si se encontraron resultados
    if (disponibilidad.length === 0) {
      return NextResponse.json({ resultado: 'No se encontró disponibilidad del profesor' }, { status: 200 });
    }


    return NextResponse.json({ disponibilidad }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const disponibilidad: Disponibilidad = body;
  
      // Realizar la inserción en la base de datos
      await sql`INSERT INTO Disponibilidad (id_dia, hora_inicio, hora_cierre, id_profesor)
                  VALUES (${disponibilidad.id_dia}, ${disponibilidad.hora_inicio}, ${disponibilidad.hora_cierre}, ${disponibilidad.id_profesor})`;
  
      return NextResponse.json({ mensaje: 'Disponibilidad creada exitosamente' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

   export  async function DELETE(request: Request) {
    try {
      const body = await request.json();
      const id: number = body.id; // Asegúrate de obtener el campo 'id' del cuerpo
      await sql`DELETE FROM disponibilidad WHERE id = ${id}`; // Corregir el query DELETE
      return NextResponse.json({ mensaje: 'Disponibilidad eliminada' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  } 