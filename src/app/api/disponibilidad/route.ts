import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    // Obtener el ID de los parámetros de consulta
    const { searchParams } = new URL(request.url);
    const id_profesor = searchParams.get('id');

    // Consulta SQL condicional
    let disponibilidadData;
    if (id_profesor) {
      // Consulta para un profesor específico
      disponibilidadData = await sql`SELECT Disponibilidad.*,
                                      Profesores.nombre AS nombre_profesor,
                                      Dias.dia
                                      FROM Disponibilidad
                                      JOIN Profesores ON Disponibilidad.id_profesor = Profesores.id
                                      JOIN Dias ON Disponibilidad.id_dia = Dias.id
                                      WHERE Disponibilidad.id_profesor = ${id_profesor}`;
    } else {
      // Consulta para todas las filas sin excepción
      disponibilidadData = await sql`SELECT Disponibilidad.*,
                                      CONCAT(Profesores.nombre, ' ', Profesores.apellido) AS nombre_profesor,
                                      Dias.dia
                                FROM Disponibilidad
                                JOIN Profesores ON Disponibilidad.id_profesor = Profesores.id
                                JOIN Dias ON Disponibilidad.id_dia = Dias.id;
                                `;
    }

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
  
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, hora_inicio, hora_cierre } = body;

    // Verificar si se proporciona el ID y al menos uno de los campos de hora_inicio o hora_cierre
    if (!id || (!hora_inicio && !hora_cierre)) {
      return NextResponse.json({ mensaje: 'Se requiere el ID y al menos uno de los campos de hora_inicio o hora_cierre' }, { status: 400 });
    }

    // Actualizar la base de datos según los campos proporcionados
    if (hora_inicio && hora_cierre) {
      // Actualizar ambos campos
      await sql`UPDATE Disponibilidad SET hora_inicio = ${hora_inicio}, hora_cierre = ${hora_cierre} WHERE id = ${id}`;
    } else if (hora_inicio) {
      // Actualizar solo el campo de hora_inicio
      await sql`UPDATE Disponibilidad SET hora_inicio = ${hora_inicio} WHERE id = ${id}`;
    } else {
      // Actualizar solo el campo de hora_cierre
      await sql`UPDATE Disponibilidad SET hora_cierre = ${hora_cierre} WHERE id = ${id}`;
    }

    return NextResponse.json({ mensaje: 'Disponibilidad actualizada exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}