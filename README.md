This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

.AUTH CON CLERK
    -Instalar clerck y crear signin siginup archivos env 
        -incluir boton de clerck como boton de perfil
    
.NAVBAR
    -tailwind usestate y basics https://www.youtube.com/watch?v=8s4DK5PkRNQ&ab_channel=BrettWestwood-SoftwareEngineer 
    -title
.Dashboard:::

    ->ASISTENCIAS PENDIENTES
    ->SIGUIETNES CLASES




.PENDIENTES
    -tabla nombre fecha marcar-asistencia
        ->asistencias pasar de true a false.
        ->va desapareciendo
    

    ------------------------DATABASE:--------------------
    ::::TABLAS:::
    profesores(nombre:varchar100, apellido:varcahr100, id_disponiblidad:integer, id_instrumento:integer, admin:boolean)
    alumnos(nombre:string, apellido:string, id_instrumetno:integer)
    asistencias(id_alumno:integer, id_profesor:integer, asistió,:boolean fecha:date, pendiente: boolean)
    disponibilidad(id_profesor:integer, id_dia:integer, hora_inicio:time, hora_cierre:time)
    clases(id_profesor:integer, id_alumno:integer, hora_inicio:time, hora_cierre:time, id_disponibilidad:integer, id_asistencia:integer)
    instrumentos(instrumento:string)
    dias(dia:string)
    ::::::::::::
    profe-admin agrega ALUMNO Y CLASE, que depende (y afecta a) de la disponiblidad,
            la CLASE genera todas las asistencias del año

    -----------------------------------------------------------
    como funciona db:

    SQL ->vercel y crear archivos ts en api/carpeta. con Docs de vercel sql. 
    en api, creo carpetas y route.ts recibo o envio la información necesaria
    con async function GET(request: Request) try{await sql`` } catch. Recibo tablas y return NextResponse.json({ RETURNA }, { status: 200 }); 
                ->  const { searchParams } = new URL(request.url);
    const id_profesor = searchParams.get('id');  http://localhost:3000/api/asistencia?id=123
    cree interfaces para respetar sus interiores 



