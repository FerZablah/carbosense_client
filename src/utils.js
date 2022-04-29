export const BASE_URL =
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
        // dev code
        'http://localhost:4000'
        :
        // production code
        'http://172.31.3.170/api'
