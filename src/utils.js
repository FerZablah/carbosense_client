export const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

export const BASE_URL =
    isDev ?
        // dev code
        'http://localhost:4000'
        :
        // production code
        'http://172.31.3.170/api'

export const SOCKET_BASE_URL =
    isDev ?
        // dev code
        'http://localhost:4000'
        :
        // production code
        'http://172.31.3.170'