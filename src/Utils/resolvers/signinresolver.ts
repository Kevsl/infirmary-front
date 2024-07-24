import { Resolver } from 'react-hook-form'
import { SignInProps, SignUpProps } from '../types'

export const signInResolver: Resolver<SignInProps> = async (values) => {
    const errors: Record<string, { type: string; message: string }> = {}

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
