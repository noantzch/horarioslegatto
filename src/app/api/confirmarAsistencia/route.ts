import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_asistencia = searchParams.get('id');

    if (!id_asistencia) {
      return NextResponse.json({ error: 'Debes proporcionar un ID de asistencia' }, { status: 400 });
    }

    // Obtener el valor de "asistio" y "pendiente" del cuerpo de la solicitud
    const requestBody = await request.json();
    const { asistio } = requestBody;

    // Verificar si se proporcionó el valor de "asistio"
    if (asistio === undefined || asistio === null) {
      return NextResponse.json({ error: 'Debes proporcionar un valor para "asistio" en el cuerpo de la solicitud' }, { status: 400 });
    }

    // Actualizar la columna "asistio" y "pendiente" en la tabla "Asistencias"
    const updateQuery = await sql`
      UPDATE Asistencias
      SET asistio = ${asistio}, pendiente = false
      WHERE id = ${id_asistencia}
    `;

    // Verificar si se realizó la actualización
    if (updateQuery.rowCount === 0) {
      return NextResponse.json({ error: 'No se encontró ninguna asistencia con el ID proporcionado' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
