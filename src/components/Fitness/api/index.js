
const { client } = window;

export const fitnessQueries = ({
    readDatabaseQuery: () => ({
        queryKey: ['readDatabase'],
        queryFn: async () => (await client.get(`/api/system/read_schema`)).data,
    }),
    readTableQuery: (schema) => ({
        queryKey: ['readTableData'],
        queryFn: async () => (await client.get(`/api/system/read_db?table=${schema.table}`)).data,
    }),
    writeTableQuery: () => ({
        mutationKey: ['mutateDb'],
        mutationFn: async (data) => (client.post(`/api/system/write_db?table=${data.table}`, data.data)).data
    }),
    fitnessTablesQuery: () => ({
        queryKey: ['fitnessTables'],
        queryFn: async () => (await client.get(`/api/system/fitness_tables`)).data
    }),
    exercisesQuery: () => ({
        queryKey: ['exercisedb'],
        queryFn: async () => (await client.get(`/api/exercises/get-exercises?name=press`)).data,
        enabled: false
    }),
    foodsQuery: () => ({
        queryKey: ['fooddb'],
        queryFn: async (params) => {
            console.log('foodsQuery.mutationFn: ', params)
            return (await client.get(`/api/foods/get-foods?food=${params.query}`)).data},
        enabled: false
    }),
});