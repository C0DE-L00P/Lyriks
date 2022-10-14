import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const ShazamCoreApi = createApi({
    reducerPath: 'ShazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers)=> {
            headers.set('X-RapidAPI-Key','28824ae233msh04cd2f4c55de6e1p132429jsn1fc0fa96576b')
            return headers
        }
    }),
    endpoints:(builder)=> ({
        getTopCharts: builder.query({query: ()=> '/charts/world'})
    })
})

export const { useGetTopChartsQuery } = ShazamCoreApi