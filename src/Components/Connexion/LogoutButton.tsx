import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { TbDoorExit } from 'react-icons/tb'

export const LogoutButton = () => {
    const { push } = useRouter()

    try {
        let sub = localStorage.getItem('sub')
        if (!sub) {
            toast.error('Vous êtes déconnecté !', { id: 'login' })
            push('/admin/login')
        }
    } catch {
        toast.error('Vous êtes déconnecté !')
        push('/admin/login')
    }

    return (
        <button
            onClick={() => {
                localStorage.removeItem('sub')
                toast.error('Vous êtes déconnecté !', { id: 'login' })
                push('/admin/login')
            }}
            className="flex items-center justify-center py-2 px-1 border-blue-900 border-2 text-blue-900 rounded-md my-1 mx-auto w-16 absolute top-4 right-4"
        >
            <TbDoorExit />
        </button>
    )
}
