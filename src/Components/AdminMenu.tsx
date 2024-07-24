import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FaMagnifyingGlass, FaUserInjured } from 'react-icons/fa6'
import { IoMdTimer } from 'react-icons/io'
import {
    IoPlaySharp,
    IoSettingsSharp,
    IoStatsChart,
    IoTimeOutline,
} from 'react-icons/io5'

import { MdLocationPin, MdOutlineBloodtype } from 'react-icons/md'
import { LogoutButton } from './Connexion/LogoutButton'

export const AdminMenu = () => {
    const { push } = useRouter()
    const pathname = usePathname()

    return (
        <>
            <div className="bg-gray-100 text-black static w-1/3">
                <LogoutButton />
                <img
                    src="/banniere-mithieux.svg"
                    alt="Bannière Mithieux"
                    className="cursor-pointer"
                    onClick={() => push('/admin/global-search')}
                />
                <ul className="h-screen pl-1">
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin')}
                    >
                        <IoStatsChart size={23} />
                        <span className="ml-2">Statistiques</span>
                        {pathname === '/admin' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/global-search')}
                    >
                        <FaMagnifyingGlass size={23} />
                        <span className="ml-2"> Recherche globale </span>
                        {pathname === '/admin/global-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/injury-type-search')}
                    >
                        <MdOutlineBloodtype size={23} />
                        <span className="ml-2"> Type de blessure </span>
                        {pathname === '/admin/injury-type-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/location-search')}
                    >
                        <MdLocationPin size={23} />
                        <span className="ml-2"> Lieu d'incidents</span>
                        {pathname === '/admin/location-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/moment-search')}
                    >
                        <IoTimeOutline size={23} />
                        <span className="ml-2"> Moment d'incidents</span>
                        {pathname === '/admin/moment-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/month-search')}
                    >
                        <CiCalendar size={23} />
                        <span className="ml-2"> Incidents par mois</span>
                        {pathname === '/admin/month-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/staff-search')}
                    >
                        <FaUserInjured size={23} />
                        <span className="ml-2"> Incidents par personne</span>
                        {pathname === '/admin/staff-search' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                    <li
                        className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                        onClick={() => push('/admin/back-office')}
                    >
                        <IoSettingsSharp size={23} />
                        <span className="ml-2"> Back office</span>
                        {pathname === '/admin/back-office' && (
                            <span className="ml-auto mr-8">
                                <IoPlaySharp />
                            </span>
                        )}
                    </li>
                </ul>
            </div>
        </>
    )
}
