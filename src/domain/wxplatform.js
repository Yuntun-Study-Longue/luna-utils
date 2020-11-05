export const getWebAppId = () => {
    let WEB_APP_ID;
    if (window.location.host === "m.yuntun-bj.com") {
        WEB_APP_ID = "wx9b261f80ad7c8c47";
    } else if (window.location.host === "preview.yuntun-bj.com") {
        WEB_APP_ID = "wx426caa9d2378f3a7";
    } else if (window.location.host === "test.yuntun-bj.com") {
        WEB_APP_ID = "wxce66896362b18409";
    } else if (window.location.host === "h5.yuntun-bj.com") {
        WEB_APP_ID = "wxce66896362b18409";
    } else {
        WEB_APP_ID = "wxce66896362b18409";
    }
    return WEB_APP_ID;
}

export const getAppId = () => {
    let APP_ID;
    if (window.location.host === "m.yuntun-bj.com" || window.location.host === "preview.yuntun-bj.com") {
        APP_ID = 'wx2d002942a5be0c90'
    }
    else {
        APP_ID = 'wxb091d7e1d35bb77a'
    }
    return APP_ID;
}