export const BASE_URL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        return 'http://localhost:4000';
    } else {
        // production code
        return 'http://172.31.3.170/api';
    }
}