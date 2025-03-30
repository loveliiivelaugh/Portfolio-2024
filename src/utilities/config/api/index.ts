import axios from 'axios';

let isDev = (import.meta.env.MODE === "development");

const paths = {
    "hostname": isDev ? "http://localhost:5051" : import.meta.env.VITE_HOSTNAME,
    "local": `${window.location.protocol}//${window.location.hostname}:5051`,
    "themeConfig": "/api/theme/themeConfig",
    "content": "/api/cms/content",
    "getAppConfig": "/api/appConfig",
    "homeApp": isDev
        ? "http://localhost:3000" 
        : (window as any).appContent?.apps.find(({ name }: any) => name === "home")?.url,
    "getCrossPlatformState": '/api/cross-platform',
    "getNotion": "/api/v1/notion",
    "githubQueryPath": '/api/sensative?endpoint=/api/github',
    "users": '/auth/v1/user',
    "login": '/auth/v1/login',
    "logout": '/auth/v1/logout',
    "protected": '/auth/v1/protected',
    "getPhotos": '/api/sensative?endpoint=/api/v1/local/photos',
    "getImage": '/api/sensative?endpoint=/api/v1/local/image',
    "getAllTables": '/database/read_schema',
    "readTable": '/database/read_db?table=',
    "sensative": "/api/sensative?endpoint=",
    "getNoahsAppConfig": "/api/v1/appConfig/noah",
};

// Initialize Server Client with Basic Auth
const client = axios.create({
    baseURL: paths.hostname,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + import.meta.env.VITE_MASTER_API_KEY
    }
});

type PayloadTypes = {
    QueryPayload: {
        [propertyKey: string]: any
    }
    MutatePayload: {
        options?: {
            debounce?: number
        }
        [propertyKey: string]: any
    }
};

type DebounceType = (...args: any) => any;
const debounce: DebounceType = (fn, ms) => setTimeout(() => fn(), ms);

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
    }),
    mutate: (queryPath: string) => ({
        mutationKey: [queryPath],
        mutationFn: async (payload?: PayloadTypes["MutatePayload"]) => payload?.options?.debounce
            ? (await debounce(client.post(queryPath, payload), payload.options.debounce)).data
            : (await client.post(queryPath, payload)).data
    }),
}

export { client, queries, paths };