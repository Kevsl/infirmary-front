'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import React from 'react'

const page = () => {
    return (
        <main className="flex items-center">
            <AdminMenu />
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white w-screen"></div>
        </main>
    )
}

export default page
