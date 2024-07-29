'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import { BackOfficeInjuryModal } from '@/Components/BackOffice/BackOfficeInjuryModal'
import { BackOfficeLocationModal } from '@/Components/BackOffice/BackOfficeLocationModal'
import { BackOfficeStaffModal } from '@/Components/BackOffice/BackOfficeStaffModal'
import { BackOfficeCareModal } from '@/Components/BackOffice/BackOfficeCareModal'

import React from 'react'
import { BackOfficeUpdateStaffModal } from '@/Components/BackOffice/BackOfficeUpdateStaffModal'

const page = () => {
    return (
        <main className="flex ">
            <AdminMenu />
            <div className="pt-8 px-6 lg:px-8 bg-white w-full">
                <BackOfficeStaffModal title="Ajouter un(e) salarié(e)" />
                <BackOfficeLocationModal title="Ajouter un secteur" />
                <BackOfficeInjuryModal title="Ajouter un type de blessure" />
                <BackOfficeCareModal title="Ajouter un type de soin" />
                <BackOfficeUpdateStaffModal title="Modifier statut salarié" />
            </div>
        </main>
    )
}

export default page
