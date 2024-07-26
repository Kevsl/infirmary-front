'use client'
import { FormError } from '@/Components/FormError'
import { InputContainer } from '@/Components/InputContainer'
import SignCanvas from '@/Components/SignCanvas'
import { getAllCares } from '@/Service/care.service'
import { reportIncident } from '@/Service/incident.service'
import { getAllInjuries } from '@/Service/injury.service'
import { getAllLocations } from '@/Service/location.service'
import { getAllTransports } from '@/Service/transport.service'
import { getAllStaff, getSstStaff } from '@/Service/users.service'
import { createIncidentResolver } from '@/Utils/resolvers/createIncidentResolver'
import {
    Care,
    incidentSubmit,
    Injury,
    Location,
    Transport,
    Victim,
} from '@/Utils/types'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SignaturePad from 'react-signature-pad-wrapper'

const page = () => {
    const [staffList, setStaffList] = useState<Victim[]>()
    const [injuriesList, setInjuriesList] = useState<Injury[]>()
    const [locationsList, setLocationsList] = useState<Location[]>()
    const [caresList, setCaresList] = useState<Care[]>()
    const [sstStaff, setSstStaff] = useState<Victim[]>()
    const [transportsList, setTransportsList] = useState<Transport[]>()
    const [signature, setSignature] = useState<string | null>(null)
    const signaturePadRef = useRef<SignaturePad>(null)
    const [isSamuCalled, setisSamuCalled] = useState(false)
    const [willVictimGoHome, setWillVictimGoHome] = useState(false)
    const [victimSignature, setVictimSignature] = useState<string | null>(null)
    const victimSignaturePadRef = useRef<SignaturePad>(null)
    const { push } = useRouter()
    const [careIds, setCareIds] = useState<string[]>([])

    useEffect(() => {
        setValue('care_ids', careIds)
    }, [careIds])

    const handleCheckboxChange = (event: any) => {
        const { value, checked } = event.target
        setCareIds((prevCareIds) =>
            checked
                ? [...prevCareIds, value]
                : prevCareIds.filter((id) => id !== value)
        )
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<incidentSubmit>({
        resolver: createIncidentResolver,
    })

    const onSubmit: SubmitHandler<incidentSubmit> = (data) => {
        reportIncident(data)
            .then((res) => {
                toast.success('Incident enregistré')
                push('/')
            })
            .catch(() => toast.error('Une erreur est survenue'))
    }

    const fetchData = async () => {
        try {
            const [
                staffResponse,
                injuriesResponse,
                locationsResponse,
                caresResponse,
                sstStaffResponse,
                transportsResponse,
            ] = await Promise.all([
                getAllStaff(),
                getAllInjuries(),
                getAllLocations(),
                getAllCares(),
                getSstStaff(),
                getAllTransports(),
            ])

            const staffList = staffResponse.data
            const injuriesList = injuriesResponse.data
            const locationsList = locationsResponse.data
            const caresList = caresResponse.data
            const sstStaff = sstStaffResponse.data
            const transportsList = transportsResponse.data

            setStaffList(staffList)
            setInjuriesList(injuriesList)
            setLocationsList(locationsList)
            setCaresList(caresList)
            setSstStaff(sstStaff)
            setTransportsList(transportsList)
        } catch (error) {
            console.error('Failed to fetch data', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        signature && setValue('sst_signature', signature)
        victimSignature && setValue('employee_discharge', victimSignature)
    }, [signature])

    useEffect(() => {
        victimSignature && setValue('employee_discharge', victimSignature)
    }, [victimSignature])

    return (
        <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white w-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                    <a href="/">
                        <img
                            alt="Mithieux metal protect"
                            src="/banniere-mithieux.svg"
                            className="mx-auto w-full "
                        />
                    </a>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Renseigner un incident
                    </h2>
                </div>

                <div className="my-10 sm:mx-auto sm:w-full sm:max-w-xl border-2 border-gray-100 p-2 rounded-md">
                    <InputContainer
                        title="Salarié(e) concerné(e)"
                        htmlFor="concernedStaff"
                    >
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            {...register('victim_id')}
                        >
                            <option></option>

                            {staffList &&
                                staffList.map((staff) => {
                                    return (
                                        <option key={staff.id} value={staff.id}>
                                            {staff.name}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.victim_id?.message && (
                            <FormError message={errors.victim_id.message} />
                        )}{' '}
                    </InputContainer>
                    <InputContainer
                        title="Type de blessure"
                        htmlFor="incidentType"
                    >
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            {...register('injury_id')}
                        >
                            <option></option>
                            {injuriesList &&
                                injuriesList.map((injury) => {
                                    return (
                                        <option
                                            key={injury.id}
                                            value={injury.id}
                                        >
                                            {injury.description}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.injury_id?.message && (
                            <FormError message={errors.injury_id.message} />
                        )}
                    </InputContainer>
                    <InputContainer
                        title="Localisation de l'incident"
                        htmlFor="incidentLocation"
                    >
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            {...register('location_id')}
                        >
                            <option></option>
                            {locationsList &&
                                locationsList.map((location) => {
                                    return (
                                        <option
                                            key={location.id}
                                            value={location.id}
                                        >
                                            {location.name}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.location_id?.message && (
                            <FormError message={errors.location_id.message} />
                        )}
                    </InputContainer>
                    <InputContainer
                        title="Description de l'incident"
                        htmlFor="incidentDescription"
                    >
                        <textarea
                            id="incidentDescription"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            rows={5}
                            {...register('injury_description', {
                                required: true,
                                minLength: 1,
                                maxLength: 150,
                            })}
                        />
                        {errors.injury_description?.message && (
                            <FormError
                                message={errors.injury_description.message}
                            />
                        )}
                    </InputContainer>
                    <InputContainer
                        title="Que faisait le salarié?"
                        htmlFor="injury situation"
                    >
                        <textarea
                            id="incidentSituation"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            rows={5}
                            {...register('injury_situation', {
                                required: true,
                                minLength: 1,
                                maxLength: 150,
                            })}
                        />
                        {errors.injury_situation?.message && (
                            <FormError
                                message={errors.injury_situation.message}
                            />
                        )}
                    </InputContainer>
                    <InputContainer
                        title="Soin apporté au salarié"
                        htmlFor="careType"
                    >
                        <FormGroup>
                            {caresList?.map((care) => (
                                <FormControlLabel
                                    key={care.id}
                                    control={
                                        <Checkbox
                                            value={care.id}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={care.treatment}
                                    className={'text-black'}
                                />
                            ))}
                        </FormGroup>
                    </InputContainer>
                    <InputContainer title="SST" htmlFor="sst">
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            {...register('sst_id')}
                        >
                            <option></option>

                            {sstStaff &&
                                sstStaff.map((sst) => {
                                    return (
                                        <option key={sst.id} value={sst.id}>
                                            {sst.name}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.sst_id?.message && (
                            <FormError message={errors.sst_id.message} />
                        )}
                    </InputContainer>
                    <div className="my-3 flex items-center">
                        <label
                            htmlFor="samuCall"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Appel Samu ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="checkbox"
                                className="mx-3 mb-3"
                                onClick={() => setisSamuCalled((prev) => !prev)}
                                {...register('samu')}
                            />
                        </div>
                    </div>
                    {isSamuCalled && (
                        <div>
                            <InputContainer
                                title="Décision du Samu"
                                htmlFor="samuDecision"
                            >
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...register('samu_report')}
                                />
                                {errors.samu_report?.message && (
                                    <FormError
                                        message={errors.samu_report.message}
                                    />
                                )}
                            </InputContainer>
                            <InputContainer
                                title="Heure de départ de la victime"
                                htmlFor="victimDeparture"
                            >
                                <input
                                    type="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...register('samu_departure_time')}
                                />
                                {errors.samu_departure_time?.message && (
                                    <FormError
                                        message={
                                            errors.samu_departure_time.message
                                        }
                                    />
                                )}
                            </InputContainer>
                            <InputContainer
                                title="Destination"
                                htmlFor="destination"
                            >
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...register('samu_destination')}
                                />
                                {errors.samu_destination?.message && (
                                    <FormError
                                        message={
                                            errors.samu_destination.message
                                        }
                                    />
                                )}
                            </InputContainer>
                        </div>
                    )}
                    <InputContainer title="Signature SST" htmlFor="signature">
                        <SignCanvas
                            setSignature={setSignature}
                            signaturePadRef={signaturePadRef}
                        />
                        {errors.sst_signature?.message && (
                            <FormError message={errors.sst_signature.message} />
                        )}
                    </InputContainer>
                    <div className="my-3 flex items-center">
                        <label
                            htmlFor="willVictimGoHome"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Le salarié retourne t'il à son domicile ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="checkbox"
                                className="mx-3 mb-3"
                                onClick={() =>
                                    setWillVictimGoHome((prev) => !prev)
                                }
                                {...register('willVictimeGoHome')}
                            />
                        </div>
                    </div>
                    {willVictimGoHome && (
                        <div>
                            <InputContainer
                                title="Transport utilisé"
                                htmlFor="transport"
                            >
                                <select
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                                    {...register('transport_id')}
                                    defaultValue={
                                        transportsList
                                            ? [transportsList[0].id]
                                            : ''
                                    }
                                >
                                    <option></option>
                                    {transportsList &&
                                        transportsList.map((transport) => {
                                            return (
                                                <option
                                                    key={transport.id}
                                                    value={transport.id}
                                                >
                                                    {transport.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.transport_id?.message && (
                                    <FormError
                                        message={errors.transport_id.message}
                                    />
                                )}
                            </InputContainer>
                            <InputContainer
                                title="Heure de départ"
                                htmlFor="victimDeparture"
                            >
                                <input
                                    type="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...register('employee_departure_time')}
                                />
                                {errors.employee_departure_time?.message && (
                                    <FormError
                                        message={
                                            errors.employee_departure_time
                                                .message
                                        }
                                    />
                                )}
                            </InputContainer>
                            <InputContainer
                                title="Heure d'arrivée"
                                htmlFor="victimDeparture"
                            >
                                <input
                                    type="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...register('employee_arrival_time')}
                                />
                                {errors.employee_arrival_time?.message && (
                                    <FormError
                                        message={
                                            errors.employee_arrival_time.message
                                        }
                                    />
                                )}
                            </InputContainer>
                            <InputContainer
                                title="Décharge salarié"
                                htmlFor="discharge_employee"
                            >
                                <SignCanvas
                                    setSignature={setVictimSignature}
                                    signaturePadRef={victimSignaturePadRef}
                                />
                                {errors.employee_discharge?.message && (
                                    <FormError
                                        message={
                                            errors.employee_discharge.message
                                        }
                                    />
                                )}
                            </InputContainer>
                        </div>
                    )}
                    <div className="my-4 flex items-center">
                        <label
                            htmlFor="isEmailNeeded"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Prévenir responsables par email ?
                        </label>
                        <div className="mt-2">
                            <input
                                type="checkbox"
                                className="mx-3  mb-3"
                                {...register('notify_manager')}
                            />
                        </div>
                    </div>
                    {errors.isVictimSst?.message && (
                        <FormError message={errors.isVictimSst.message} />
                    )}{' '}
                    <div className="my-3">
                        <input
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            value="Enregistrer"
                        />
                    </div>
                </div>
            </form>
        </main>
    )
}

export default page
