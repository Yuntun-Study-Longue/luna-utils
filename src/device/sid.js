import Promise from 'bluebird';
import Fingerprint2 from "fingerprintjs2";
import md5 from 'md5';

export const generateSid = (phone = '') =>
    new Promise(resolve => {
        if (window.requestIdleCallback) {
            requestIdleCallback( () => {
                Fingerprint2.get( (components) => {
                  let sid;
                  const webglInf = components.find(item => item.key === 'webglVendorAndRenderer').value;
                  if (webglInf) {
                    sid = md5(phone + webglInf);
                    resolve(sid);
                  }
                })
            })
          } else {
              setTimeout( () => {
                Fingerprint2.get( (components) => {
                  let sid;
                  const webglInf = components.find(item => item.key === 'webglVendorAndRenderer').value;
                  if (webglInf) {
                    sid = md5(phone + webglInf);
                    resolve(sid);
                  }
                })
              }, 500)
          }
    })
