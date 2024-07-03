
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@tanstack/react-query'

import { client } from '../../config/api';

interface CodeRepoType {
    id: string, 
    name: string, 
    description: string, 
    updated_at: string 
    html_url: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
}


const githubQueryPath = '/api/sensative?endpoint=/api/github';
const testQueryPath = '/api/openfitness/fitness_tables';

const queries = {
    githubQuery: () => ({
        queryKey: ['githubQuery'], 
        queryFn: () => client.get(githubQueryPath)
    }),

    testQuery: () => ({
        queryKey: ['testQuery'], 
        queryFn: () => client.get(testQueryPath)
    })
};

const GithubAdmin = () => {
    const githubQuery = useQuery(queries.githubQuery());
    const generalQuery = useQuery(queries.testQuery());

    console.log("generalQuery: ", generalQuery);

    console.log("GithubAdmin.githubQuery: ", githubQuery);

    const handleDelete = async (repo: CodeRepoType) => {
        const confirmed = await confirm(`Are you sure you want to delete ${repo.name}`)
        
        if (!confirmed) return;

        const response = await client.delete(`${githubQueryPath}/${repo.name}`);

        console.log("response: ", response);
    };

    return (
        <Grid container sx={{ margin: "64px 0 0 260px" }}>
            <Grid item xs={12}>
                <Typography variant="h4">Github Admin</Typography>
            </Grid>
            <Grid item xs={12}>
                <List sx={{ width: "100%" }}>
                    <ListItemText primary="Profile"/>
                    <Divider />
                    {githubQuery?.data?.data 
                        && Object
                            .keys(githubQuery.data.data)
                            .map(key => (typeof(githubQuery.data.data[key]) === "string") && (
                                <ListItemText 
                                    key={key}
                                    primary={key}
                                    secondary={githubQuery.data.data[key]}
                                />
                            ))
                    }
                    <Divider />
                    <ListItemText primary="Repositories"/>
                    <Divider />
                    {githubQuery?.data?.data?.repos?.data.map((repo : CodeRepoType) => (
                        <ListItem key={repo.id} divider sx={{ maxWidth: "80vw", '&:hover': { background: "rgba(0,0,0,0.1)" }}}>
                            <ListItemText
                                primary={`${repo.name} - ${repo.id} - ${new Date(repo?.updated_at).toLocaleDateString()}`}
                                secondary={repo.description}
                            />
                            <ListItemIcon>
                                <DeleteIcon color="error" onClick={() => handleDelete(repo)} sx={{ cursor: "pointer" }} />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}

export default GithubAdmin