'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import Datagrid from '@/Components/Datagrid'
import { InputContainer } from '@/Components/InputContainer'
import BasicModal from '@/Components/Seemoremodal'
import {
    getAllIncidents,
    getIncidentsByLocation,
    searchIncident,
} from '@/Service/incident.service'
import { getAllLocations } from '@/Service/location.service'
import { Incident, Location } from '@/Utils/types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [query, setQuery] = useState<string>('')
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
        if (query) {
            searchIncident(query).then((res) => {
                setIncidentsList(res.data.incidents)
            })
        } else {
            getAllIncidents().then((res) => {
                setIncidentsList(res.data.incidents)
            })
        }
    }, [query])

    return (
        <main className="flex items-center">
            <AdminMenu />
            <div className="flex min-h-screen flex-col justify-center px-6 lg:px-8 bg-white w-screen">
                <InputContainer
                    title="Recherche globale"
                    htmlFor="concernedStaff"
                >
                    <input
                        type="text"
                        placeholder="Mot clef à rechercher"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                        onChange={(e: any) => setQuery(e.target.value)}
                    />
                </InputContainer>
                {incidentsList && (
                    <Datagrid rows={incidentsList} columns={columns} />
                )}
            </div>
        </main>
    )
}

export default page
