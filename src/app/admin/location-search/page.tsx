'use client'
import { AdminMenu } from '@/Components/AdminMenu'
import Datagrid from '@/Components/Datagrid'
import { InputContainer } from '@/Components/InputContainer'
import BasicModal from '@/Components/Seemoremodal'
import {
    getAllIncidents,
    getIncidentsByLocation,
    getIncidentStatsByLocation,
} from '@/Service/incident.service'
import { getAllLocations } from '@/Service/location.service'
import { Incident, IncidentStatProps, Location, Victim } from '@/Utils/types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'

const page = () => {
    const [locationsList, setLocationsList] = useState<Location[]>()
    const [locationId, setLocationId] = useState<string>('')
    const [incidentsList, setIncidentsList] = useState<Incident[]>([])
    const [incidentsStats, setincidentsStats] = useState<IncidentStatProps[]>(
        []
    )
    const [incidentsLabel, setIncidentsLabel] = useState([''])
    const [incidentsCount, setIncidentsCount] = useState([0])
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        getAllLocations().then((res) => {
            setLocationsList(res.data)
        })

        getIncidentStatsByLocation().then((res) => {
            setincidentsStats(res.data)
            let incLabels = ['']
            let incCounts = [0]

            res.data.map((stat: IncidentStatProps) => {
                incLabels.push(stat.location)
                incCounts.push(stat.count)
                setIsLoading(false)
            })

            setIncidentsLabel(incLabels)
            setIncidentsCount(incCounts)
        })
    }, [])

    useEffect(() => {
        if (locationId) {
            getIncidentsByLocation(locationId).then((res) => {
                setIncidentsList(res.data.incidents)
            })
        } else {
            getAllIncidents().then((res) => {
                setIncidentsList(res.data.incidents)
            })
        }
    }, [locationId])

    return (
        <main className="flex">
            <AdminMenu />

            <div className="flex min-h-screen flex-col justify-center px-6 lg:px-8 bg-white w-screen">
                <InputContainer title="Lieux" htmlFor="concernedStaff">
                    <select
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent:3 pl-3"
                        onChange={(e: any) => setLocationId(e.target.value)}
                    >
                        <option>Tous les lieux</option>

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
                </InputContainer>
                {incidentsList && (
                    <Datagrid rows={incidentsList} columns={columns} />
                )}
                <h2 className="text-center text-3xl text-black font-bold mt-8">
                    Statistique par lieux
                </h2>
                <div className="w-55 mx-auto">
                    <BarChart
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: incidentsLabel,
                            },
                        ]}
                        series={[{ data: incidentsCount }]}
                        width={900}
                        height={300}
                    />
                </div>
            </div>
        </main>
    )
}

export default page
