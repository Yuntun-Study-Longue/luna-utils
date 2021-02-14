import Promise from 'bluebird';
import shortid from 'shortid';

export const generateShortId = (phone = '') =>
  new Promise(resolve => {
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
    resolve(shortid.generate());
  })