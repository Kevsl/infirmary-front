import { getAllStaff, getStaffById, updateStaff } from '@/Service/users.service'
import {
    BackOfficeStaffFormProps,
    InsertOrUpdateStaffProps,
    Victim,
} from '@/Utils/types'
import { log } from 'console'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const BackOfficeUpdateStaffForm: React.FC<BackOfficeStaffFormProps> = ({
    handleClose,
}) => {
    const [staffList, setStaffList] = useState<Victim[]>([])
    const [error, setError] = useState('')
    const [sstStatus, setSstStatus] = useState(false)
    const [isStillEmployed, setIsStillEmployed] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState<Victim>()

    useEffect(() => {
        getAllStaff().then((res) => setStaffList(res.data))
    }, [])

    const handleStaffSearch = async (id: string) => {
        getStaffById(id).then((res) => {
            console.log(res.data)

            setSelectedStaff(res.data)
            setIsStillEmployed(res.data.stillEmployed)
            setSstStatus(res.data.sst_status)
        })
    }

    const handleSubmit = () => {
        if (selectedStaff) {
            let updatedStaff: InsertOrUpdateStaffProps = {
                name: selectedStaff.name,
                sst_status: sstStatus,
                stillEmployed: isStillEmployed,
            }
            updateStaff(updatedStaff, selectedStaff.id)
                .then((res) => {
                    toast.success('Informatons salarié(e) mis a jour')
                    handleClose()
                })
                .catch((e) =>
                    toast.error(
                        'Erreur lors de la modification de statut du statut du salarié(e)'
                    )
                )
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Mettre à jour le statut d'un salarié
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="staffName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Salarié(e)
                            </label>
                            <div className="mt-2">
                                <select
                                    id="staffName"
                                    name="staffName"
                                    autoComplete="name"
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        handleStaffSearch(e.target.value)
                                    }}
                                >
                                    <option></option>

                                    {staffList &&
                                        staffList.map((staff) => (
                                            <option value={staff.id}>
                                                {staff.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <p className="italic text-sm my-1 text-red-600">
                                {error}
                            </p>
                        </div>
                        <div className="flex">
                            <div className="flex items-center">
                                <input
                                    className="align-middle"
                                    type="checkbox"
                                    autoComplete="isSst"
                                    onChange={() => {
                                        setSstStatus((prev) => !prev)
                                    }}
                                    checked={sstStatus}
                                />
                            </div>
                            <label
                                htmlFor="isStaffSst"
                                className="block text-sm mx-2 align-middle font-medium leading-6 text-gray-900"
                            >
                                Le salarié est-il SST ?
                            </label>
                            <p className="italic text-sm my-1 text-red-600">
                                {error}
                            </p>
                        </div>
                        <div className="flex">
                            <div className="flex items-center">
                                <input
                                    className="align-middle"
                                    type="checkbox"
                                    autoComplete="isSst"
                                    onChange={() => {
                                        setIsStillEmployed((prev) => !prev)
                                    }}
                                    checked={isStillEmployed}
                                />
                            </div>
                            <label
                                htmlFor="isStaffSst"
                                className="block text-sm mx-2 align-middle font-medium leading-6 text-gray-900"
                            >
                                Le salarié est-il toujours dans l'entreprise ?
                            </label>
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
