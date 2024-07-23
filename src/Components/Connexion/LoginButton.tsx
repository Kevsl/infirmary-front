import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export const LoginButton = () => {
    const { push } = useRouter()

    try {
        let sub = localStorage.getItem('sub')
        if (!sub) {
            push('/admin/login')
        }
    } catch {
        toast.error("Vous n'êtes pas identifié !")
    }
    return <div></div>
}
