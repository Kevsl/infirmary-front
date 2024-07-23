import { SignUpProps } from '@/Utils/types'
import axios from 'axios'

export async function signUp(auth: SignUpProps) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
        {
            firstName: auth.firstName,
            lastName: auth.lastName,
            email: auth.email,
            password: auth.password,
        },
        axiosConfig
    )
}
