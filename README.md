

## AUTH CON CLERK
    -Instalar clerck y crear signin siginup archivos env 
        -incluir boton de clerck como boton de perfil
    obtengo el id de clerk con useClient y con getId y la api consulta obtengo el id de la DB
## NAVBAR
    -tailwind usestate y basics https://www.youtube.com/watch?v=8s4DK5PkRNQ&ab_channel=BrettWestwood-SoftwareEngineer 
    -title
## Dashboard:::

    ->ASISTENCIAS PENDIENTES
            .PENDIENTES
        -tabla nombre fecha marcar-asistencia
        ->asistencias pasar de true a false.
        ->va desapareciendo

    ->AGENDA
        -se obtiene un obetj o con toras las clases
        luego se filtra con una funcion las clases
    -calendario de FULLCALENDAR facil docs
    -funciones para las clases filtradas adaptarlas al formato que pide fullcalendar
    -funciones para los horarios
        .Disponibilidad
    -Agregar Disponibilidad BOTON post AGREGAR UN CARGANDO
    -Calendario de Clase+Disponibilidad
    -eliminar disponibilidad boton delete AGREGAR UN CARGANDO

    ->Agregar Disponibilidad


## ¿SIGN-UP + AGREGAR PROFESOR?
        ->Consultar si es admin
        ->Desarrollar asignar clase

.Asignar Clase:
    -Seleccionar Profe
    -













OJO CON EL DEPLOY QUE HAY QUE CAMBAIR EL FETCH


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



