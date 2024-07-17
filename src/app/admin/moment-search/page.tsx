'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import Datagrid from '@/Components/Datagrid'
import { InputContainer } from '@/Components/InputContainer'
import BasicModal from '@/Components/Seemoremodal'
import {
    getAllIncidents,
    getIncidentsByMoment,
    getIncidentStatsByMoments,
} from '@/Service/incident.service'
import { Incident } from '@/Utils/types'
import { PieChart } from '@mui/x-charts'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

const page = () => {
    const momentList = ['Matin', 'Après-Midi', 'Nuit']
    const [momentId, setMomentId] = useState<string>('')
    const [incidentsList, setIncidentsList] = useState<Incident[]>([])
    const [incidentsCount, setIncidentsCount] = useState([0])

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
        if (momentId) {
            getIncidentsByMoment(momentId).then((res) => {
                setIncidentsList(res.data.incidents)
            })
        } else {
            getAllIncidents()
                .then((res) => {
                    setIncidentsList(res.data.incidents)
                })
                .catch((e) => console.log(e))

            getIncidentStatsByMoments().then((res) => {
                setIncidentsCount(res.data)
            })
        }
    }, [momentId])

    return (
        <main className="flex">
            <AdminMenu />
            <div className="flex min-h-screen flex-col pt-8 px-6 lg:px-8 bg-white w-screen">
                <InputContainer
                    title="Incidents par équipe"
                    htmlFor="concernedStaff"
                >
                    <select
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                        onChange={(e: any) => setMomentId(e.target.value)}
                    >
                        <option value="">Choix de l'équipe</option>

                        {momentList &&
                            momentList.map((moment) => {
                                return (
                                    <option key={moment} value={moment}>
                                        {moment}
                                    </option>
                                )
                            })}
                    </select>
                </InputContainer>
                {incidentsList && (
                    <Datagrid rows={incidentsList} columns={columns} />
                )}
                <h2 className="text-center text-3xl text-black font-bold my-8">
                    Statistique par lieux
                </h2>
                <div className="w-55 mx-auto mb-16">
                    <PieChart
                        series={[
                            {
                                data: [
                                    {
                                        id: 0,
                                        value: incidentsCount[0],
                                        label: 'Matin',
                                    },
                                    {
                                        id: 1,
                                        value: incidentsCount[1],
                                        label: 'Après-midi',
                                    },
                                    {
                                        id: 2,
                                        value: incidentsCount[2],
                                        label: 'Nuit',
                                    },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
            </div>
        </main>
    )
}

export default page
