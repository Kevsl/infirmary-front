'use client'
import { FormError } from '@/Components/FormError'
import { signin } from '@/Service/auth.service'
import { signInResolver } from '@/Utils/resolvers/signinresolver'
import { SignInProps } from '@/Utils/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInProps>({
        resolver: signInResolver,
    })
    const onSubmit: SubmitHandler<SignInProps> = (data) => handleRequest(data)
    const { push } = useRouter()

    const handleRequest = async (data: SignInProps) => {
        signin(data)
            .then((res) => {
                console.log(res)

                if (res.data.access_token) {
                    try {
                        localStorage.setItem('sub', res.data.access_token)
                        toast.success('Connexion réussie')
                        push('/admin')
                    } catch {
                        toast.error('Problème avec vos identifiants')
                    }
                }
            })
            .catch(() => toast.error('Identifiant invalide'))
    }
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="/banniere-mithieux.svg" alt="Mithieux" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Back Office
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Adresse email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                    {...register('email')}
                                />
                            </div>
                            {errors.email?.message && (
                                <FormError message={errors.email.message} />
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Mot de passe
                                </label>
                                <div className="text-sm">
                                    {/* <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Mot de passe oublié?
                                    </a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                    {...register('password')}
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
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Se connecter
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Pas encore de compte?{' '}
                        <a
                            href="/admin/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            S'enregistrer
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default page
