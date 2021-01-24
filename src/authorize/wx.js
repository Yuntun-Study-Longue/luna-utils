import Promise from 'bluebird';
import superagent from 'superagent';
import _domainUtils from '../domain';

export const wxThirdPartLogin = (scope = 'snsapi_userinfo', redirect_uri = window.location.href) =>
    new Promise(resolve => {
        // TODO: remove code and STATE params
        const app_id = _domainUtils.getAppId()

        const urlParams = window.location.href.split('?')[1];
        let urlParamsStr = null;
        if (urlParams) {
            const filtered = urlParams.split('&').filter(val => !/^code|^state=\.*/.test(val));
            urlParamsStr = filtered.join('&');
        }
        const _redirect_uri = urlParamsStr ? redirect_uri.split('?')[0] + '?' + urlParamsStr : redirect_uri.split('?')[0];
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${encodeURIComponent(_redirect_uri)}&response_type=code&scope=${scope}&state=${(new Date()).getTime()}#wechat_redirect`;
        console.log(url, '=== url');
        window.location.href = url
    })

export const wxFetchUserInfo = () => 
    new Promise(resolve => {
        const web_app_id = _domainUtils.getWebAppId()
        const code = _domainUtils.getParams('code')
        if (!code) return resolve(null);
        superagent.get(`https://${window.location.host}/webcore/wx/base/${web_app_id}/get_wx_openid`)
        .query({ code, type: "h5", scope: 'snsapi_userinfo' })
        .then(res => {
            if (res.body.errcode === 40163) {
                // 此时代表code已被使用，需要重新授权
                wxThirdPartLogin();
            }
            else if (res.body.data.openid) {
                superagent.get(`https://${window.location.host}/webcore/wx/base/${web_app_id}/get_wx_userinfo`)
                .query({ openid: res.body.data.openid, type: "h5", scope: 'snsapi_userinfo' })
                .then(result => resolve(result.body.data) )
                .catch(() => resolve(null));
            }
            else resolve(null);
        }).catch(() => resolve(null))
    })

export const wxFetchBaseInfo = () =>
    new Promise(resolve => {
        const web_app_id = _domainUtils.getWebAppId()
        const code = _domainUtils.getParams('code')
        if (!code) return wxThirdPartLogin('snsapi_base');
        superagent.get(`https://${window.location.host}/webcore/wx/base/${web_app_id}/get_wx_openid`)
        .query({ code, type: "h5", scope: 'snsapi_base' })
        .then(res => {
            if (res.body.errcode === 40163) {
                // 此时代表code已被使用，需要重新授权
                wxThirdPartLogin('snsapi_base')
            }
            else if (res.body.data.openid) {
                resolve(res.body.data)
            }
            else resolve(null);
        }).catch((e) => resolve(null))
    })