import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const alumno: Alumno = body;

        // Realizar la inserción en la base de datos y obtener el ID generado
        const result:any = await sql`INSERT INTO alumnos (nombre, apellido, id_instrumento)
                                    VALUES (${alumno.nombre}, ${alumno.apellido}, ${alumno.id_instrumento})
                                    RETURNING id`;

         const id = result.rows[0].id;


        return NextResponse.json({ mensaje: 'Alumno creado exitosamente con id:', id}, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
    
}