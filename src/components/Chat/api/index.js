
const { client } = window;

export const queries = () => ({

  readFromDb: (table) => ({
    queryKey: [`readFromDb-${table || "schema"}`],
    queryFn: () => client.get(`/database/read_db?table=${table}`),
    select: (data) => {
      console.log("in readFromDb select data: ", data)
      return data
    },
  }),

  readOneFromDb: () => ({
    queryKey: ['readOneFromDb'],
    queryFn: (params) => client.get(`/database/read_one_row?table=chats&id=`),
    select: (data) => {
      console.log("in select data: ", data)

      return data
    },
  }),

  modifyDb2: () => ({
    queryKey: ['mutateServer'],
    mutationFn: (params) => client[params.method || "post"](`/database/${params.endpoint || 'create_row'}?table=${params.table}`, params.payload),
  }),

  readFromServer: () => ({
    queryKey: ['readFromServer'],
    mutationFn: (params) => client(params.endpoint)
  }),

  readFromServer2: (params) => ({
    queryKey: ['readFromServer'],
    queryFn: async () => {
      console.log("readFromServer2: ", params)
      return (await client.get(`/api/${params.endpoint}`)).data
    }
  }),

  postToServer: () => ({
    queryKey: ['postToServer'],
    mutationFn: async (params) => (await client.post(params.url, params.payload)).data,
    select: (response) => {
        console.log("post to server select fn: ", response)
        return response
    }
  }),

  getStabilityBalance: {
    queryKey: ['stabilityBalance'],
    queryFn: () => client.get(`/api/llms/stability-balance`)
  },

  getIngestedFilesQuery: {
    queryKey: ['privateGPTingestedFiles'],
    queryFn: async () => {
      const data = await client.get(`${hostname}/api/llms/list-ingested-files`)
      return data;
    }
  },

  getWebPageContent: {
    queryKey: ['webPageContent'],
    queryFn: async (params) => {
      const data = await client.get(`${hostname}/api/llms/puppeteer?url=${params.url}`);
      return data;
    },
  },

  getBraveSearchQuery: {
    queryKey: ['braveSearch'],
    queryFn: async (params) => {
      const data = await client.get(`/api/llms/brave-search?query=${params.query}`);
      return data;
    },
    enabled: false,
  }
});
