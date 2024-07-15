'use client'
import { FormError } from '@/Components/formError'
import { InputContainer } from '@/Components/InputContainer'
import SignCanvas from '@/Components/SignCanvas'
import { getAllCares } from '@/Service/care.service'
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
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<incidentSubmit>({
        resolver: createIncidentResolver,
    })
    const onSubmit: SubmitHandler<incidentSubmit> = (data) => {
        console.log(data)
    }

    // Todo :  Remplacer les states par register, pour mettre une validation sur le départ salarié
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

            // staffList && setValue('victim_id', staffList[0]?.id)
            // injuriesList && setValue('injury_id', injuriesList[0]?.id)
            // locationsList && setValue('location_id', locationsList[0]?.id)
            // caresList && setValue('care_id', caresList[0]?.id)
            // sstStaff && setValue('sst_id', sstStaff[0]?.id)
            // transportsList && setValue('transport_id', transportsList[0]?.id)
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
        <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white w-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Mithieux metal protect"
                        src="banniere-mithieux.svg"
                        className="mx-auto w-full "
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Renseigner un incident
                    </h2>
                </div>

                <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputContainer
                        title="Salarié concerné(e)"
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
                                        <option key={staff.id}>
                                            {staff.name}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.victim_id && <FormError />}
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
                                        <option key={injury.id}>
                                            {injury.description}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.injury_id && <FormError />}
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
                                        <option key={location.id}>
                                            {location.name}
                                        </option>
                                    )
                                })}
                            {errors.location_id && <FormError />}
                        </select>
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
                        {errors.injury_description && <FormError />}
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
                        {errors.injury_situation && <FormError />}
                    </InputContainer>
                    <InputContainer
                        title="Soin apporté au salarié"
                        htmlFor="careType"
                    >
                        <select
                            {...register('care_id')}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 "
                        >
                            <option></option>
                            {caresList &&
                                caresList.map((care) => {
                                    return (
                                        <option key={care.id}>
                                            {care.treatment}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.care_id && <FormError />}
                    </InputContainer>
                    <InputContainer title="Sst" htmlFor="sst">
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            {...register('sst_id')}
                        >
                            <option></option>

                            {sstStaff &&
                                sstStaff.map((sst) => {
                                    return (
                                        <option key={sst.id}>{sst.name}</option>
                                    )
                                })}
                        </select>
                        {errors.sst_id && <FormError />}
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
                                {errors.samu_report && <FormError />}
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
                                {errors.samu_departure_time && <FormError />}
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
                                {errors.samu_destination && <FormError />}
                            </InputContainer>
                        </div>
                    )}
                    <InputContainer title="Signature SST" htmlFor="signature">
                        <SignCanvas
                            setSignature={setSignature}
                            signaturePadRef={signaturePadRef}
                        />
                        {errors.sst_signature && <FormError />}
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
                                                <option key={transport.id}>
                                                    {transport.name}
                                                </option>
                                            )
                                        })}
                                </select>
                                {errors.transport_id && <FormError />}
                            </InputContainer>
                            <InputContainer
                                title="Heure de départ"
                                htmlFor="victimDeparture"
                            >
                                <input
                                    type="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...(register('employee_departure_time'),
                                    {
                                        required: willVictimGoHome,
                                    })}
                                />
                            </InputContainer>
                            <InputContainer
                                title="Heure d'arrivée"
                                htmlFor="victimDeparture"
                            >
                                <input
                                    type="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    {...(register('employee_arrival_time'),
                                    {
                                        required: willVictimGoHome,
                                    })}
                                />
                                {errors.employee_departure_time && (
                                    <FormError />
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
