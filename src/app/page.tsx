'use client'
import Datagrid from '@/Components/Datagrid'
import { getAllIncidents } from '@/Service/incident.service'
import { Incident } from '@/Utils/types'
import { GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import BasicModal from '@/Components/Seemoremodal'
import { FaPlusCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [incidentsList, setIncidentsList] = useState<Incident[]>([])
    const { push } = useRouter()
    useEffect(() => {
        getAllIncidents().then((res) => {
            setIncidentsList(res.data.incidents)
        })
    }, [])

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
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-white text-black">
            <h1 className="text-3xl font-bold">Registre infirmerie</h1>
            <button
                onClick={() => push('/form-incident-registration')}
                className=" flex items-center justify-center  py-2 px-4 border-blue-900 border-2 text-blue-900  rounded-md  my-8 mx-auto w-64"
            >
                <FaPlusCircle color="#1e3a8a" />
                <span className="ml-2"> Reporter un incident</span>
            </button>

            {incidentsList && (
                <Datagrid rows={incidentsList} columns={columns} />
            )}
        </main>
    )
}
