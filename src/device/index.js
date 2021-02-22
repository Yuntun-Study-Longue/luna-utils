import qs from 'query-string';
import { generateSid } from "./sid";
import { generateShortId } from "./shortid";
import { fetchTokenFromCookie } from "./token";

export default {
    generateSid,
    generateShortId,
    fetchTokenFromCookie,
}