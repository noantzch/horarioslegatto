import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import type { UserResource } from '@clerk/types';


export async function GET(request: Request) {
    try{
        const{searchParams} = new URL(request.url)
        const clerk_user = searchParams.get('clerk_user')
        if(!clerk_user){
            return NextResponse.json({error: 'Problema al obtener usuario de clerk'}, {status: 400})
        }
        const profesorData = await sql`SELECT * FROM profesores WHERE user_clerk = ${clerk_user}`
        const profesor = profesorData.rows
        if(profesor.length === 0){
            return NextResponse.json({resultado: 'No hay información del profesor'}, {status: 200})
        }
        return NextResponse.json({profesor}, {status: 200})
    }catch(error){
        return NextResponse.json({error}, {status: 500})
    }
    
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const usuario = body.data;

        // Agrega un log para mostrar los datos del usuario antes de la inserción
        console.log('Datos del usuario:', usuario);

        await sql`INSERT INTO profesores (nombre, apellido, admin, user_clerk)
                VALUES (${usuario.username}, ${usuario.lastName}, false, ${usuario.id})`;

        // Agrega un log para indicar que la inserción se realizó con éxito
        console.log('Profesor registrado con éxito.');

        return NextResponse.json({ mensaje: 'Profesor Registrado' }, { status: 201 });
    } catch (error) {
        // Agrega un log para mostrar información detallada sobre el error
        console.error('Error al registrar al profesor:', error);

        return NextResponse.json({ error }, { status: 500 });
    }
}