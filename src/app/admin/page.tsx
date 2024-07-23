'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import React from 'react'
import { LoginButton } from '@/Components/Connexion/LoginButton'

const page = () => {
    return (
        <main className="flex relative">
            <AdminMenu />
            <LoginButton />
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white w-screen"></div>
        </main>
    )
}

export default page
