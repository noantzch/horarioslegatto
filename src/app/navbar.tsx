'use client'
import Image from "next/image"
import Logo from '../../public/legato_logo.jpg'
import Link from "next/link"
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () =>{
        setMenuOpen(!menuOpen)
    }
  return (
    <nav className="w-full h-auto shadow-xl bg-white p-2">
        <div className="flex justify-between item-center h-full w-full px-4 2xl:px-16">
            <Link href='/'>
                <Image 
                    src={Logo}
                    alt="Logo"
                    width="55"
                    height="10"
                    className="cursor-pointer"
                    priority
                />
            </Link>
            <div className="hidden sm:flex">
                <ul className="hidden sm:flex">
                    <Link href="/disponibilidad">
                        <li className="ml-10 mt-2 suppercase hover:border-b text-lg">Disponibilidad</li>
                    </Link>
                    <Link href="/asistencias">
                        <li className="ml-10 mt-2 suppercase hover:border-b text-lg">Asistencias</li>
                    </Link>
                    <Link href="/agenda">
                        <li className="ml-10 mt-2 suppercase hover:border-b text-lg">Agenda</li>
                    </Link>

                    <Link href="/asignar">
                        <li className="ml-10 mt-2 suppercase hover:border-b text-lg" title="Sólo administradores pueden asignar clases">Asignar Clase*</li>
                    </Link>

                    <li className="ml-10 mt-2 suppercase hover:border-b text-lg">  
                        <UserButton />
                    </li>
                </ul>
            </div>
            <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
                <AiOutlineMenu size={25} />
            </div>
        </div>
        <div className={
            menuOpen
            ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }
        >
            <div className="flex w-full items-center justify-end">
                <div onClick={handleNav} className="cursor-pointer">
                    <AiOutlineClose size={25} />
                </div>
            </div>

            <div className="flex-col py-4">
                <ul>
                    <Link href="/disponibilidad">
                        <li onClick={() =>{ setMenuOpen(false)}} className="py-4 cursor-pointer">Disponibilidad</li>
                    </Link>
                    <Link href="/asistencias">
                        <li onClick={() =>{ setMenuOpen(false)}} className="py-4 cursor-pointer">Asistencias</li>
                    </Link>
                    <Link href="/agenda">
                        <li onClick={() =>{ setMenuOpen(false)}} className="py-4 cursor-pointer">Agenda</li>
                    </Link>
                    <Link href="/asignar">
                        <li onClick={() =>{ setMenuOpen(false)}} className="py-4 cursor-pointer">Asignar Clase</li>
                    </Link>
                    <li className="py-4 cursor-pointer">  
                        <UserButton />
                    </li>
                </ul>
            </div>

        </div>
    </nav>
  )
}

export default Navbar