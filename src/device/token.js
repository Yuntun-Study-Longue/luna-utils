import Promise from 'bluebird';
import Cookies from 'js-cookie';

export const fetchTokenFromCookie = (key) =>
  new Promise(resolve => {
    const userinfoFromCookie = Cookies.getJSON(key);
    if (userinfoFromCookie) {
      return resolve(userinfoFromCookie.token);
    }
    resolve('wrong token')
  })