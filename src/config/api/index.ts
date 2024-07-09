import axios from 'axios';

let isDev = (import.meta.env.MODE === "development");
const paths = {
    "hostname": import.meta.env.VITE_HOSTNAME,
    "local": "http://localhost:5001",
    "themeConfig": "/api/theme/themeConfig",
    "content": "/api/cms/content",
    "getAppConfig": "/api/appConfig",
    "homeApp": isDev
        ? "http://localhost:3000" 
        : (window as any).appContent?.apps.find(({ name }: any) => name === "home")?.url,
    "getCrossPlatformState": '/api/cross-platform',
    "getNotion": "/api/v1/notion",
    "githubQueryPath": '/api/sensative?endpoint=/api/github',
    "users": '/auth/v1/user'

};

// Initialize Server Client with Basic Auth
const client = axios.create({
    baseURL: isDev
        ? paths.local 
        : paths.hostname,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": `userAuthToken=${"1234-5678-9012"}&appId=${import.meta.env.VITE_APP_ID}`
    },
    // // Interferes with Bearer Auth
    // auth: {
    //     username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
    //     password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
    // }
});

const queries = {
    getContentQuery: () => ({
        queryKey: ["content"],
        queryFn: async () => (await client.get(paths.content)).data
    }),

    getThemeQuery: () => ({
        queryKey: ["themeConfig"],
        queryFn: async () => (await client.get(paths.themeConfig)).data,
    }),
    getAppConfigQuery: () => ({
        queryKey: ["appConfig"],
        queryFn: async () => (await client.get(paths.getAppConfig)).data
    }),
    getYouTubeData: ({
        queryKey: ["youtube"],
        queryFn: async () => (await client.get("/api/google/youtube")).data
    }),
    githubQuery: ({
        queryKey: ['githubQuery'], 
        queryFn: async () => (await client.get(paths.githubQueryPath)).data
    }),
    getUser: ({
        queryKey: ['user'], 
        queryFn: async () => (await client.get(paths.users)).data
    }),
    notionQuery: ({
        queryKey: ['notion'], 
        queryFn: async () => (await client.get(paths.getNotion)).data
    }),

    // General Query to use any query with a passed queryPath
    query: (queryPath: string, method?: string, payload?: any) => ({
        queryKey: [queryPath],
        queryFn: async () => payload 
            ? (await (client as any)[method || "post"](queryPath, payload)).data
            : (await (client as any)[method || "get"](queryPath)).data
    })
}

export { client, queries, paths };