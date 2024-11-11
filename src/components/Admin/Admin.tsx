// Packages
import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query'

import ReusablePopover from '../Layout/ReusablePopover';

import { paths, queries } from '../../config/api';



const Admin = () => {
    const databaseQueries = useQuery(queries.query(paths.getAllTables));
    const database2Queries = useQuery(queries.query(paths.sensative + paths.getAllTables));

    let excludedTables = ["users", "posts", "postsRelations", "validationMap", "blogs"];
    // console.log("Admin Page: ", databaseQueries, database2Queries)

    const databases = [
        {
            name: "Database 1",
            nickname: "Supabase",
            tables: databaseQueries.data
        },
        {
            name: "Database 2",
            nickname: "Local",
            tables: database2Queries.data
        }
    ]

    type DatabaseTablesType = {
        table: string
        columns: string[]
    };

    return databaseQueries.isLoading ? <div>Loading...</div> : (
        <Grid container spacing={2} mt={6} p={2} sx={{ maxWidth: "100vw" }}>
            <Grid item sm={12}>
                <Typography variant="h4">Database Admin</Typography>
            </Grid>
            <Grid item sm={12}>
                <Grid container spacing={2} p={2} columnSpacing={2}>
                    {databases.map((database, key) => (
                        <Grid key={key} item sm={12} md={6} component={Card} p={2} elevation={4}>
                            <Typography variant="h6">
                                {database.nickname}
                            </Typography>
                            <Divider />
                            <List>
                                {database?.tables && database.tables.map((table: DatabaseTablesType) => !excludedTables.includes(table.table) && (
                                    <ListItem key={table.table}>
                                        <ListItemText primary={table.table} />
                                    </ListItem>
                                ) )}
                            </List>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item sm={12}>
                {databaseQueries.data.map((table: DatabaseTablesType) => !excludedTables.includes(table.table) && <ReusableTable key={table.table} {...table} /> )}
            </Grid>
        </Grid>
    );
};

export default Admin;


const ReusableTable = ({ table, columns }: { table: string, columns: string[] }) => {

    // console.log("ReusableTable: ", table, columns)
    if (["tables", "inventory"].includes(table)) return;

    const tableData = useQuery(queries.query(paths.readTable + table));

    // console.log("tableData: ", tableData)

    return tableData.isLoading 
        ? <div>Loading...</div> 
        : (tableData?.data && Array.isArray(tableData?.data)) 
            ? (
                <Box sx={{ height: 400, width: '100%', my: 4 }}>
                    <Typography variant="h6">{table}</Typography>
                        <DataGrid
                            rows={tableData?.data.map((item, key) => ({ id: key, ...item }))}
                            columns={columns.map((field: any) => ({
                                // ...field,
                                field: field.name,
                                headerName: field.name,
                                width: 150,
                                editable: true,
                                ...(field.name === "messages") && {
                                    renderCell: (params) => <ReusablePopover params={params} />
                                }
                            }))}
                            // pageSize={5}
                            // rowsPerPageOptions={[5]}
                            sx={{ height: 400, width: '100%' }}
                        />
                </Box>
            ) 
            : null
}