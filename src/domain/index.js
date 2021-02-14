import { getWebAppId, getAppId, getHost } from "./wxplatform";
import getParams from './qs';
import qs from 'query-string';

export default {
    getHost,
    getAppId,
    getWebAppId,
    getParams,
    getSearchJSON: qs.parse,
}