'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import Datagrid from '@/Components/Datagrid'
import { InputContainer } from '@/Components/InputContainer'
import BasicModal from '@/Components/Seemoremodal'
import { getAllIncidents, getIncidentsDate } from '@/Service/incident.service'
import { monthesList } from '@/Utils/const'
import { Incident } from '@/Utils/types'
import { generateYearsList } from '@/Utils/yearList'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const monthes = monthesList
    const years = generateYearsList(new Date().getFullYear(), 9)
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
        if (year && month) {
            getIncidentsDate(year, month).then((res) => {
                setIncidentsList(res.data.incidents)
            })
        } else {
            getAllIncidents().then((res) => {
                setIncidentsList(res.data.incidents)
            })
        }
    }, [year, month])

    return (
        <main className="flex items-center">
            <AdminMenu />
            <div className="flex min-h-screen flex-col justify-center px-6 lg:px-8 bg-white w-screen">
                <InputContainer title="Mois" htmlFor="month">
                    <div className="flex items-center">
                        <select
                            className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            onChange={(e: any) => setMonth(e.target.value)}
                        >
                            <option>Mois</option>

                            {monthes &&
                                monthes.map((month) => {
                                    return (
                                        <option key={month.id} value={month.id}>
                                            {month.name}
                                        </option>
                                    )
                                })}
                        </select>
                        <select
                            className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                            onChange={(e: any) => setYear(e.target.value)}
                        >
                            <option>Année</option>

                            {years &&
                                years.map((year) => {
                                    return (
                                        <option key={year.id} value={year.id}>
                                            {year.name}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                </InputContainer>
                {incidentsList && (
                    <Datagrid rows={incidentsList} columns={columns} />
                )}
            </div>
        </main>
    )
}

export default page
