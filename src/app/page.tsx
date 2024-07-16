'use client'
import Datagrid from '@/Components/Datagrid'
import { getAllIncidents } from '@/Service/incident.service'
import { Incident } from '@/Utils/types'
import { GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import BasicModal from '@/Components/Seemoremodal'

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
            width: 125,
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
            width: 125,
            renderCell: (params) => {
                return <p>{params.row.victim.name}</p>
            },
        },
        {
            field: 'injury',
            headerName: 'Blessure',
            width: 125,
            renderCell: (params) => {
                return <p>{params.row.injury.description}</p>
            },
        },
        {
            field: 'location_id',
            headerName: 'Secteur',
            width: 125,
            renderCell: (params) => {
                return <p>{params.row.location.name}</p>
            },
        },
        {
            field: 'sst_name',
            headerName: 'SST',
            width: 125,
            renderCell: (params) => {
                return <p>{params.row.sst.name}</p>
            },
        },
        {
            field: 'sst_signature',
            headerName: 'Signature SST',
            width: 150,
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
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-white text-black">
            {incidentsList && (
                <Datagrid rows={incidentsList} columns={columns} />
            )}
        </main>
    )
}
