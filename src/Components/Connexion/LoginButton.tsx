import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { GoPasskeyFill } from 'react-icons/go'

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
    return ''
    // <button
    //     onClick={() => push('/login-register')}
    //     className="flex items-center justify-center  py-4 px-4 border-blue-900 border-2 text-blue-900 rounded-md my-1 mx-auto w-16 absolute top-4 right-4"
    // >
    //     <GoPasskeyFill />
    // </button>
}
