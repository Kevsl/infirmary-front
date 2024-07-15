import * as React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

export default function Datagrid({
    rows,
    columns,
}: {
    rows: GridRowsProp
    columns: GridColDef[]
}) {
    return (
        <div
            style={{
                height: '80vh',
                width: '90%',
                marginLeft: '5%',
                color: 'black',
            }}
            className="text-black"
        >
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
