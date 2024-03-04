'use client'
import React, { useState, useEffect } from 'react';
import Cargando from '../components/Cargando';
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/router';
const AsignarDisponibilidadId = () =>{
    const user = useUser()
    const router = useRouter();

if(user.isLoaded){
    if(user.user){
      if(user.user.organizationMemberships.length){
  return (

    <div>
        <h1>calendario de id:</h1>
    </div>
    )
}else{
            
    return(
    <h2 className="text-center p-2 ">Solo administradores pueden asignar disponibilidades</h2>
    )
}
}
}else{
return <Cargando />
}


}

