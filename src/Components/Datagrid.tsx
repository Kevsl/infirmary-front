import * as React from 'react'
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
} from '@mui/x-data-grid'
import { frFR } from '@mui/x-data-grid/locales'

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
                width: '100%',
                color: 'black',
            }}
            className="text-black"
        >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                slots={{ toolbar: GridToolbar }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </div>
    )
}
