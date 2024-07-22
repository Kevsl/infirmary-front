'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import { BackOfficeInjuryForm } from '@/Components/BackOffice/BackOfficeInjuryForm'
import { BackOfficeInjuryModal } from '@/Components/BackOffice/BackOfficeInjuryModal'
import { BackOfficeLocationForm } from '@/Components/BackOffice/BackOfficeLocationForm'
import { BackOfficeLocationModal } from '@/Components/BackOffice/BackOfficeLocationModal'
import { BackOfficeStaffForm } from '@/Components/BackOffice/BackOfficeStaffForm'
import { BackOfficeStaffModal } from '@/Components/BackOffice/BackOfficeStaffModal'

import React from 'react'

const page = () => {
    return (
        <main className="flex ">
            <AdminMenu />
            <div className="pt-8 px-6 lg:px-8 bg-white w-full">
                <BackOfficeStaffModal title="Ajouter un(e) salarié(e)" />
                <BackOfficeLocationModal title="Ajouter un secteur" />
                <BackOfficeInjuryModal title="Ajouter un type de blessure" />
            </div>
        </main>
    )
}

export default page
