import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try{
        const {searchParams} = new URL(request.url);
        const id_profesor = searchParams.get('id');

        // Verificar si se proporcionó un ID
        if (!id_profesor) {
        return NextResponse.json({ error: 'Debes proporcionar un ID de profesor' }, { status: 400 });
        }
    
         // Consulta SQL con el ID proporcionado
         const clasesData = await sql`SELECT Clases.*, 
                                            Alumnos.nombre AS nombre_alumno, 
                                            Alumnos.apellido AS apellido_alumno, 
                                            Dias.dia, 
                                            Instrumentos.instrumento
                                    FROM Clases
                                    JOIN Alumnos ON Clases.id_alumno = Alumnos.id
                                    JOIN Dias ON Clases.id_dia = Dias.id
                                    JOIN Instrumentos ON Clases.id_instrumento = Instrumentos.id
                                    WHERE Clases.id_profesor = ${id_profesor};
  
         
                                        `;
         const clases = clasesData.rows;

         // Verificar si se encontraron resultados
        if (clases.length < 0) {
            return NextResponse.json({ resultado: 'No se encontraron clases asignadas' }, { status: 200 });
        }
        return NextResponse.json({ clases }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const clase: Clase2 = body;
    
        // Realizar la inserción en la base de datos
        await sql`INSERT INTO clases (id_profesor, id_alumno, hora_inicio, hora_cierre, id_disponibilidad, id_dia, id_instrumento)
                    VALUES (${clase.id_profesor}, ${clase.id_alumno}, ${clase.hora_inicio}, ${clase.hora_cierre}, ${clase.id_disponibilidad}, ${clase.id_dia}, ${clase.id_instrumento})`;
    
        return NextResponse.json({ mensaje: 'Clase creada exitosamente' }, { status: 201 });
        } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
  }