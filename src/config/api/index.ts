import axios from 'axios';

const paths = {
    "hostname": import.meta.env.VITE_HOSTNAME,
    "local": "http://localhost:5001",
    "themeConfig": "/api/theme/themeConfig",
    "content": "/api/cms/content"
};

// Initialize Server Client with Basic Auth
const client = axios.create({
    baseURL: (import.meta.env.MODE === "development") 
        ? paths.local 
        : paths.hostname,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    auth: {
        username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
    }
});

const queries = {
    getContentQuery: () => ({
        queryKey: ["content"],
        queryFn: async () => (await client.get(paths.content)).data
    }),

    getThemeQuery: () => ({
        queryKey: ["themeConfig"],
        queryFn: async () => (await client.get(paths.themeConfig)).data,
    })
}

export { client, queries };