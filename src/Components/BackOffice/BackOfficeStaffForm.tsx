import { createStaff } from '@/Service/users.service'
import {
    BackOfficeStaffFormProps,
    InsertOrUpdateStaffProps,
} from '@/Utils/types'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export const BackOfficeStaffForm: React.FC<BackOfficeStaffFormProps> = ({
    handleClose,
}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [sstStatus, setSstStatus] = useState(false)

    const handleSubmit = () => {
        if (name) {
            let userData: InsertOrUpdateStaffProps = {
                name: name,
                sst_status: sstStatus,
                stillEmployed: true,
            }
            createStaff(userData)
                .then((res) => {
                    toast.success('Salarié enregistré')
                    handleClose()
                })
                .catch((e) =>
                    toast.error("Erreur lors de l'enregistrement du salarié")
                )
        } else {
            setError('Veuillez entre le nom et prénom')
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Ajouter un salarié
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="staffName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nom Prénom du salarié
                            </label>
                            <div className="mt-2">
                                <input
                                    id="staffName"
                                    name="staffName"
                                    type="text"
                                    autoComplete="name"
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Format:  NOM Prénom"
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
                            <label
                                htmlFor="isStaffSst"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Le salarié est il SST ?
                            </label>
                            <div className="mt-2 flex items-center">
                                <input
                                    id="isStaffSst"
                                    name="isStaffSst"
                                    type="checkbox"
                                    autoComplete="isSst"
                                    onChange={() => {
                                        setSstStatus((prev) => !prev)
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
