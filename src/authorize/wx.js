import Promise, { resolve } from 'bluebird';
import superagent from 'superagent';
import qs from 'query-string';
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
        window.location.href = url
    })

export const wxFetchUserInfo = () => 
    new Promise(resolve => {
        const web_app_id = _domainUtils.getWebAppId()
        const code = _domainUtils.getParams('code')
        if (!code) return resolve(null);
        superagent.get(`${_domainUtils.getHost()}/webcore/wx/base/${web_app_id}/get_wx_openid`)
        .query({ code, type: "h5", scope: 'snsapi_userinfo' })
        .then(res => {
            if (res.body.errcode === 40163|| res.body.errcode === 40029) {
                // 此时代表code已被使用，需要重新授权
                wxThirdPartLogin();
            }
            else if (res.body.data.openid) {
                superagent.get(`${_domainUtils.getHost()}/webcore/wx/base/${web_app_id}/get_wx_userinfo`)
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
        superagent.get(`${_domainUtils.getHost()}/webcore/wx/base/${web_app_id}/get_wx_openid`)
        .query({ code, type: "h5", scope: 'snsapi_base' })
        .then(res => {
            if (!!(window.history && history.pushState)){
                // 支持History API
                // skipEmptyString: {a: 1, b: '', c: '', d: 4} => 'a=1&d=4'
                // skipNull: {a: 1, b: undefined, c: null, d: 4} => 'a=1&d=4'
                let qsObj = qs.parse(window.location.search, { skipNull: true , skipEmptyString: true });
                delete qsObj.code && delete qsObj.state
                const _search = qs.stringify(qsObj);
                if (_search) {
                    history.pushState(null, null, `${location.pathname}?${_search}` )
                }
                else {
                    history.pushState(null, null, location.pathname)
                }
            }
            if (res.body.errcode === 40163 || res.body.errcode === 40029) {
                // 此时代表code已被使用，需要重新授权
                wxThirdPartLogin('snsapi_base')
            }
            else if (res.body.data.openid) {
                resolve(res.body.data)
            }
            else resolve(null);
        }).catch((e) => resolve(null))
    })

export const wxFetchUserInfoByOpenID = (OPEN_ID) =>
    new Promise(resolve => {
        const web_app_id = _domainUtils.getWebAppId()
        superagent.get(`${_domainUtils.getHost()}/webcore/wx/base/${web_app_id}/get_wx_userinfo_by_openid`)
        .query({ OPEN_ID })
        .then(res => resolve(res.body) )
        .catch(e => resolve(null))
    })