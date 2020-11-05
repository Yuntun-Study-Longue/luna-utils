import _dynamicUtils from '../dynamic'

export const init = function () {
    if (window.location.host === "m.yuntun-bj.com") {
        var scriptUrl = "https://cdn.ravenjs.com/3.26.2/raven.min.js";
        _dynamicUtils.loadJs(scriptUrl, () => {
            Raven.config("https://4bb2d779c7e843cfa69ed6d2e92b3463@sentry.pipacoding.com/40").install();
        });
    } else {
        var scriptUrl = "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js";
        _dynamicUtils.loadJs(scriptUrl, () => {
            var vConsole = new VConsole();
        });
    }
}