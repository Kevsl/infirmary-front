import { Resolver } from 'react-hook-form'
import { SignUpProps } from '../types'

export const signUpResolver: Resolver<SignUpProps> = async (values) => {
    const errors: Record<string, { type: string; message: string }> = {}

    if (!values.firstName) {
        errors.firstName = {
            type: 'required',
            message: 'Veuillez entrer votre prénom.',
        }
    }
    if (!values.lastName) {
        errors.lastName = {
            type: 'required',
            message: 'Veuillez entrer votre nom.',
        }
    }
    if (!values.email) {
        errors.email = {
            type: 'required',
            message: 'Veuillez entrer votre email.',
        }
    }
    if (!values.password) {
        errors.password = {
            type: 'required',
            message: 'Veuillez entrer un mot de passe.',
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    }
}
