
                    ACOMODAR CODIGO CALENDARIO PROFESOR
## AUTH CON CLERK
    -Instalar clerck y crear signin siginup archivos env 
        -incluir boton de clerck como boton de perfil
    obtengo el id de clerk con useClient y con getId y la api consulta obtengo el id de la DB
    -en webhooks user.created para aplicar logidca del back que aregar ala DB la información
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
## clases pasadas
    solo un get y funcion para organizar pro mes

## ASIGNAR CLASE
        ->Consultar si es admin en asignar
        ->Desarrollar asignar clase
YA FUNCIONAAAAA 
    .Asignar Clase:
c       calendario con todas las disponibilidades con botón por día (5 calendarios)
        hacer click en la disponibilidad para plicar
        ABRE FORMULARIO 
            se determina horas limites con el objeto obtenido del evento seleccionado
            se ingresa datos de alumno (UN ALUMNO PRO HORARIO, HABRAN ALUMNOS REPETIDOS)
                MUCHA LOCIGA PARA GESTIONAR ESE FORMULARIO Y SWAL PARA CONFIRMAR
                SEGUIR CON EL BACK
                idea:       /* crear alumno
                            nombre = hora.nombre
                            apellido = hora.apellido
                            id_instrumento = hora.id_instrumento
                            
                            obtener id alumno nuevo

                        crear clase

                            Id_profesor= eventForm.extendedProps.id_profesor
                            Id_alumno= id obtenido
                            Hora_inicio= hora.hora_inicio
                            Hora_cierre= hora.hora_cierre
                            Id_disponibilidad= eventForm.extendedProps.id
                            Id_dia = eventForm.recurringDef.typeData.daysOfWeek[0]
                            Id_instrumento = hora.id_instrumento

                        actualizar disponibilidad
                            uso  calcularHorasRestantes(hora: HorasObjeto): HorasResultantes | null 
                                retorna horaResultante{}
                            if(horaResultante.length > 1?){
                                //ELIMINAR DISPONIBILIDAD Y CREAR 2 NUEVAS
                                }else{
                                    //ACTUALIZAR DISPONIBILIDAD
                        }	
                            
                        crear asistencias

                        arreglo con fechas de todos los días del año: obtenerTodasLasFechas(diaSemana: number)
                            function Mapear(){
                                    const fechas = obtenerTodasLasFechas(1)
                                    fechas.map((fecha)=>{
                            REALIZAR GET CADA VEZ CON LA FECHA NUEVA
                                })
                                }

                        */











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
    const id_profesor = searchParams.get('id');  https://horarioslegatto.vercel.app/api/asistencia?id=123
    cree interfaces para respetar sus interiores 



