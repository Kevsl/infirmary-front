import { SignInProps, SignUpProps } from '@/Utils/types'
import axios from 'axios'

export async function signUp(auth: SignUpProps) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
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

export async function signin(auth: SignInProps) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
        {
            email: auth.email,
            password: auth.password,
        },
        axiosConfig
    )
}
