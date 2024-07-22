'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import Datagrid from '@/Components/Datagrid'
import { InputContainer } from '@/Components/InputContainer'
import BasicModal from '@/Components/Seemoremodal'
import { getAllInjuries } from '@/Service/injury.service'
import {
    getAllIncidents,
    getIncidentsByInjury,
} from '@/Service/incident.service'
import { Incident, Injury } from '@/Utils/types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { LoginButton } from '@/Components/Connexion/LoginButton'
import { LogoutButton } from '@/Components/Connexion/LogoutButton'

const page = () => {
    const [injuryList, setInjuryList] = useState<Injury[]>()
    const [injuryId, setInjuryId] = useState<string>('')
    const [incidentsList, setIncidentsList] = useState<Incident[]>([])

    const columns: GridColDef[] = [
        {
            field: 'incident_date',
            headerName: 'Date',
            flex: 1,
            renderCell: (params) => {
                return (
                    <p>
                        {new Date(params.row.created_at).toLocaleDateString(
                            'fr'
                        )}
                    </p>
                )
            },
        },
        {
            field: 'staff',
            headerName: 'Salarié',
            flex: 1,
            renderCell: (params) => {
                return <p>{params.row.victim.name}</p>
            },
        },
        {
            field: 'injury',
            headerName: 'Blessure',
            flex: 1,
            renderCell: (params) => {
                return <p>{params.row.injury.description}</p>
            },
        },
        {
            field: 'location_id',
            headerName: 'Secteur',
            flex: 1,
            renderCell: (params) => {
                return <p>{params.row.location.name}</p>
            },
        },
        {
            field: 'sst_name',
            headerName: 'SST',
            flex: 1,
            renderCell: (params) => {
                return <p>{params.row.sst.name}</p>
            },
        },
        {
            field: 'sst_signature',
            headerName: 'Signature SST',
            flex: 1.2,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.sst_signature}
                        alt={params.row.sst_name}
                    />
                )
            },
        },
        {
            field: 'id',
            headerName: '',
            renderCell: (params: GridRenderCellParams<any>) => {
                return <BasicModal incident={params.row} />
            },
        },
    ]

    useEffect(() => {
        getAllInjuries().then((res) => {
            setInjuryList(res.data)
        })
    }, [])

    useEffect(() => {
        if (injuryId) {
            getIncidentsByInjury(injuryId).then((res) => {
                setIncidentsList(res.data.incidents)
            })
        } else {
            getAllIncidents()
                .then((res) => {
                    setIncidentsList(res.data.incidents)
                })
                .catch((e) => console.log(e))
        }
    }, [injuryId])

    return (
        <main className="flex">
            <AdminMenu />
            <LoginButton />
            <LogoutButton />
            <div className="flex min-h-screen flex-col pt-8 px-6 lg:px-8 bg-white w-screen">
                <InputContainer
                    title="Type de blessures"
                    htmlFor="concernedStaff"
                >
                    <select
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                        onChange={(e: any) => setInjuryId(e.target.value)}
                    >
                        <option value="">Tous les types de blessures</option>

                        {injuryList &&
                            injuryList.map((injury) => {
                                return (
                                    <option key={injury.id} value={injury.id}>
                                        {injury.description}
                                    </option>
                                )
                            })}
                    </select>
                </InputContainer>
                {incidentsList && (
                    <Datagrid rows={incidentsList} columns={columns} />
                )}
            </div>
        </main>
    )
}

export default page
