const NODE_ENV = typeof window !== 'undefined' ? window.env.NODE_ENV : process.env.NODE_ENV
const PUBLIC_PATH = typeof window !== 'undefined' ? window.env.PUBLIC_PATH : process.env.PUBLIC_PATH
const RAZZLE_SERVER_ON = typeof window !== 'undefined' ? window.env.RAZZLE_SERVER_ON : process.env.RAZZLE_SERVER_ON

export const isServer = () => !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
)

export function getEnvTit(title = 'SYSWARE需求管理系统') {
    if (NODE_ENV === 'production' && (!/^\/$/.test(PUBLIC_PATH) || RAZZLE_SERVER_ON === "true" ) ) {
        return `${title} - 联调稳定版` // /alichs/sysware
    }
    else if (NODE_ENV === 'development' && !/^\/$/.test(PUBLIC_PATH)) {
        return `${title} - 联调开发版` // /sysware
    }
    else if (NODE_ENV === 'production' && /^\/$/.test(PUBLIC_PATH)) {
        return `${title} - 正式稳定版` // /sysware
    }
    else {
        return `${title} - 不可控版`  // /sysware
    }
}

export function getPath(path_name = '') {
    if (/^\/(.+)/.test(path_name)) {
        path_name = path_name.replace(/^\/(.+)/, "$1")
    }
    return NODE_ENV === 'production' && !/^\/$/.test(PUBLIC_PATH) ? 
        RAZZLE_SERVER_ON === "true" ? '/' + path_name : PUBLIC_PATH + path_name
        : '/' + path_name
}

export function getUri(request_uri = '') {
    return NODE_ENV === 'production' && !/^\/$/.test(PUBLIC_PATH) ? 
        RAZZLE_SERVER_ON === "true" ? request_uri : PUBLIC_PATH.substr(0, PUBLIC_PATH.length - 1) + request_uri
        : request_uri
}

export default {
    isServer,
    getEnvTit,
    getPath,
    getUri
}