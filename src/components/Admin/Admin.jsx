import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const { client } = window;

const Admin = () => {
    const databaseQueries = useQuery(({
        queryKey: ["readAllDatabaseTables"],
        queryFn: async () => (await client.get(hostname + `/database/read_schema`)).data
    }));

    return databaseQueries.isLoading ? <div>Loading...</div> : (
        <Grid container spacing={2} mt={6} p={2}>
            <Grid item sm={12}>
                <Typography variant="h4">Database Admin</Typography>
            </Grid>
            <Grid item sm={12}>
                {databaseQueries.data.map(table => <ReusableTable key={table.table} {...table} />)}
            </Grid>
        </Grid>
    )
}

export default Admin

const ReusableTable = ({ table, columns }) => {

    if (["tables", "inventory"].includes(table)) return;

    const tableData = useQuery({
        queryKey: [table],
        queryFn: async () => (await client.get(hostname + `/database/read_db?table=${table}`)).data,
    });

    console.log("tableData: ", tableData)

    return tableData.isLoading 
        ? <div>Loading...</div> 
        : (tableData?.data && Array.isArray(tableData?.data)) 
            ? (
                <Box sx={{ height: 400, width: '100%', my: 4 }}>
                    <Typography variant="h6">{table}</Typography>
                        <DataGrid
                            rows={tableData?.data.map((item, key) => ({ id: key, ...item }))}
                            columns={columns.map(field => ({
                                field,
                                headerName: field,
                                width: 150,
                                editable: true
                            }))}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                </Box>
            ) 
            : null
}