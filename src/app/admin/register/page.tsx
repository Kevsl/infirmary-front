'use client'
import { FormError } from '@/Components/formError'
import { signUp } from '@/Service/auth.service'
import { signUpResolver } from '@/Utils/resolvers/signUpResolver'
import { SignUpProps } from '@/Utils/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpProps>({
        resolver: signUpResolver,
    })
    const onSubmit: SubmitHandler<SignUpProps> = (data) => handleRequest(data)
    const { push } = useRouter()

    const handleRequest = async (data: SignUpProps) => {
        signUp(data)
            .then((res) => {
                if (res.data.access_token) {
                    try {
                        localStorage.setItem('sub', res.data.access_token)
                        toast.success('Enregistrement réussi')
                        push('/')
                    } catch {
                        toast.error('Problème avec vos identifiants')
                    }
                }
            })
            .catch(() => toast.error('Identifiant déjà utilisé'))
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="/banniere-mithieux.svg" alt="Mithieux" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enregistrement
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 indent-3 text-gray-900"
                            >
                                Prénom
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstname"
                                    type="text"
                                    {...register('firstName')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                />
                                {errors.firstName?.message && (
                                    <FormError
                                        message={errors.firstName.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium leading-6 indent-3 text-gray-900"
                            >
                                Nom
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastname"
                                    type="text"
                                    {...register('lastName')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                />
                                {errors.lastName?.message && (
                                    <FormError
                                        message={errors.lastName.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 indent-3 text-gray-900"
                            >
                                Adresse email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                />
                                {errors.email?.message && (
                                    <FormError message={errors.email.message} />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 indent-3 text-gray-900"
                                >
                                    Mot de passe
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                />
                                {errors.password?.message && (
                                    <FormError
                                        message={errors.password.message}
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 indent-3 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                S'enregistrer
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Déjà un compte?{' '}
                        <a
                            href="/admin/login"
                            className="font-semibold leading-6 indent-3 text-indigo-600 hover:text-indigo-500"
                        >
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default page
