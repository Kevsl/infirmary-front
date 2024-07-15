'use client'
import Datagrid from '@/Components/Datagrid'
import { getAllIncidents } from '@/Service/incident.service'
import { Incident } from '@/Utils/types'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

export default function Home() {
    const [incidentsList, setIncidentsList] = useState<Incident[]>([])

    useEffect(() => {
        getAllIncidents().then((res) => {
            setIncidentsList(res.data.incidents)
        })
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'incident_date',
            headerName: 'Date',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>
                        {new Date(params.row.incident_date).toLocaleDateString(
                            'fr'
                        )}
                    </p>
                )
            },
        },
        { field: 'staff', headerName: 'Salarié', width: 100 },
        { field: 'injury', headerName: 'Blessure', width: 100 },
        {
            field: 'incident_description',
            headerName: 'Description',
            width: 100,
        },
        { field: 'location_id', headerName: 'Secteur', width: 100 },
        {
            field: 'employee_arrival_time',
            headerName: 'Arrivée infirmerie',
            width: 100,
        },
        {
            field: 'employee_departure_time',
            headerName: 'Depart infirmerie',
            width: 100,
        },
        {
            field: 'injury_situation',
            headerName: 'Cause incident',
            width: 100,
        },
        {
            field: 'samu',
            headerName: 'Samu',
            width: 100,
        },
        {
            field: 'id',
            headerName: '',
            renderCell: (params: GridRenderCellParams<any>) => (
                <button className="text-white bg-blue-400 rounded-md text-sm p-2">
                    Voir plus
                </button>
            ),
        },
    ]
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
            {incidentsList && (
                <Datagrid rows={incidentsList} columns={columns} />
            )}
        </main>
    )
}
