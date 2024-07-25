import { createCareType } from '@/Service/care.service'
import { BackOfficeCareFormProps } from '@/Utils/types'

import React, { useState } from 'react'
import toast from 'react-hot-toast'

export const BackOfficeCareForm: React.FC<BackOfficeCareFormProps> = ({
    handleClose,
}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = () => {
        if (name) {
            createCareType(name)
                .then((res) => {
                    toast.success('Enregistrement réussi')
                    handleClose()
                })
                .catch((e) => toast.error("Erreur lors de l'enregistrement"))
        } else {
            setError('Veuillez entre le nom du soin')
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Ajouter un type de soin
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="incidentName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nom du type de soin
                            </label>
                            <div className="mt-2">
                                <input
                                    id="incidentName"
                                    name="incidentName"
                                    type="text"
                                    autoComplete="name"
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        setError('')
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                            <p className="italic text-sm my-1 text-red-600">
                                {error}
                            </p>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
