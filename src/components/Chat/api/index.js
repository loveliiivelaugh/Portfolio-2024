import axios from 'axios'

const hostname = import.meta.env.VITE_HOSTNAME;


const client = axios.create({
  baseURL: hostname,
  timeout: 5000,
  // headers: {
  //   'X-Custom-Header': 'foobar',
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Authorization': `Bearer ${key}`,
  //   'Accept-Language': 'en-US',
  // },
  // withCredentials: true,
  // validateStatus: (status) => status < 500,
})

export const queries = {

  readFromDb: (table) => ({
    queryKey: [`readFromDb-${table || "schema"}`],
    queryFn: () => client.get(`/api/system/read_db?table=${table}`),
    select: (data) => {
      // console.log("in select data: ", data)
      return data
    },
  }),

  readOneFromDb: () => ({
    queryKey: ['readOneFromDb'],
    queryFn: () => client.get(`/api/system/read_one_row?table=chats&id=`),
    select: (data) => {
    //   console.log("in select data: ", data)
      return data
    },
  }),

  modifyDb2: () => ({
    queryKey: ['mutateServer'],
    mutationFn: (params) => client[params.method || "post"](`/api/system/${params.endpoint || 'create_row'}?table=${params.table}`, params.payload),
  }),

  readFromServer: () => ({
    queryKey: ['readFromServer'],
    mutationFn: (params) => axios(params.endpoint)
  }),

  readFromServer2: (params) => ({
    queryKey: ['readFromServer'],
    queryFn: async () => (await client.get(`/api/${params.endpoint}`)).data
  }),

  postToServer: () => ({
    queryKey: ['postToServer'],
    mutationFn: async (params) => (await axios.post(params.url, params.payload)).data,
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
      const data = await axios.get(`${hostname}/api/llms/list-ingested-files`)

      console.log("getIngestedFilesQuery: ", data);

      return data;
    }

  },
};
