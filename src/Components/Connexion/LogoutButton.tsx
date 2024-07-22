import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { TbDoorExit } from 'react-icons/tb'

export const LogoutButton = () => {
    const { push } = useRouter()

    try {
        let sub = localStorage.getItem('sub')
        if (sub) {
            return (
                <button
                    onClick={() => localStorage.removeItem('sub')}
                    className="flex items-center justify-center py-4 px-4 border-blue-900 border-2 text-blue-900 rounded-md my-1 mx-auto w-16 absolute top-4 right-4"
                >
                    <TbDoorExit />
                </button>
            )
        }
    } catch {
        toast.error('Vous êtes déconnecté !')
        push('/admin')
    }
}
