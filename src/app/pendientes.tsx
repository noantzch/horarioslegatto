import Link from "next/dist/client/link"

const Pendientes = () =>{
    return(
        <div>
            <h2>Pendientes de Asistencia</h2>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Alumno</th>
                        <th>Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>FECHA ALUMNO   ...  . . </td>
                        <td>.....NOMBRE ALUMNO</td>
                        <td><button>Marcar Asistencia</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Pendientes