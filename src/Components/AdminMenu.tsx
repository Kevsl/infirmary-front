import { useRouter } from 'next/navigation'
import React from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FaMagnifyingGlass, FaUserInjured } from 'react-icons/fa6'
import { IoMdTimer } from 'react-icons/io'
import { IoTimeOutline } from 'react-icons/io5'
import { MdLocationPin, MdOutlineBloodtype } from 'react-icons/md'

export const AdminMenu = () => {
    const { push } = useRouter()

    return (
        <div className="bg-gray-100 text-black static w-1/3">
            <img
                src="/banniere-mithieux.svg"
                alt="Bannière Mithieux"
                className="cursor-pointer"
                onClick={() => push('/admin/global-search')}
            />
            <ul className="h-screen pl-1">
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/global-search')}
                >
                    <FaMagnifyingGlass size={23} />
                    <span className="ml-2"> Recherche globale </span>
                </li>
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/injury-type-search')}
                >
                    <MdOutlineBloodtype size={23} />
                    <span className="ml-2"> Type de blessure </span>
                </li>
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/location-search')}
                >
                    <MdLocationPin size={23} />
                    <span className="ml-2"> Lieu d'incidents</span>
                </li>
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/moment-search')}
                >
                    <IoTimeOutline size={23} />
                    <span className="ml-2"> Moment d'incidents</span>
                </li>
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/month-search')}
                >
                    <CiCalendar size={23} />
                    <span className="ml-2"> Incidents par mois</span>
                </li>
                <li
                    className="h-12 flex items-center my-2 hover:bg-blue-950 hover:text-white p-2 cursor-pointer"
                    onClick={() => push('/admin/staff-search')}
                >
                    <FaUserInjured size={23} />
                    <span className="ml-2"> Incidents par personne</span>
                </li>
            </ul>
        </div>
    )
}
