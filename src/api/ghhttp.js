import { RandomUtil } from "@/utils/randomUtil.js"
import { getPublickeyUrl, APIs } from './requestUrl'
import JSEncrypt from 'JSEncrypt'
import { tripleDESToolEncrypt, tripleDESToolDecrypt } from "@/utils/randomUtil.js"
let config = {
    TOKEN: 1
}
let APIfun = APIs;
let su = navigator.userAgent.toLowerCase(), mb = ['ipad', 'iphone os', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile', 'Windows NT'];
const ghhttp = (callback) => {
    let key = RandomUtil();
    let deviceidStr = '&deviceid=' + encodeURI('unknown-device');
    let handShakePostStr = 'randkey=' + encodeURI(key);
    mb.map((item) => {
        if (su.indexOf(item) > 0) {
            deviceidStr = '&deviceid=' + encodeURI(item);
        }
    })
    //handShakePostStr+='&deviceid='+encodeURI(deviceidStr);
    handShakePostStr += deviceidStr;
    handShakePostStr += '&reason=1';
    $http({
        url: getPublickeyUrl(),
        method: 'post',
        headers: {
            'X-TOKEN': config.token
        },
        data: {
        }
    }).then((res) => {
        if (callback) {
            callback(handShakePostStr, res, key);
        }
    });
}

const PostRequest = (url, header, params, callback, errback) => {
    //params 加密参数 header请求头配置
    $http({
        url: url,
        method: 'post',
        headers: header,
        data: params
    }).then((res) => {
        callback(res)
    }).catch((err) => {
        errback(err);
        console.log(err);
    });
}

const getPostData = (url ,params,dataBack, errBack) => {
    PostRequest(url, setHeaders(window.token, sign(randomKey, params)), tripleDESToolEncrypt(randomKey, postDataStr(params)), (res) => {
        if (dataBack) {
            dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
        }
    }, (err) => {
        if (errBack) {
            errBack(err);
        }
    });
}

function getRequestCommonHeader() {
    return {
        'X-APP-ID': config.TOKEN
    }
}


function setHeaders(token, singnResult, moreHeader) {
    //设置请求头配置，用来传递签名
    let headersSet = {
        'X-APP-ID': 1000,
        'X-TOKEN': token,
        'X-SIGNATURE': singnResult,
        'X-HTTP-ENGINE': 'android',
        'X-PROMOTERID': 'android',
        'X-CHANNEL-INFO': '',
        'X-DEVICEID': 1000
    };
    if (moreHeader) {
        for (let i in moreHeader) {
            headersSet[i] = moreHeader[i];
        }
    }
    return headersSet;
}

function sign(random, params) {//数据签名加入X-token
    let mapList = '';
    for (let key in params) {
        mapList = mapList + key + '=' + params[key] + '&';
    }
    if (mapList.length > 0) {
        mapList = mapList.substring(0, mapList.length - 1);
    }
    mapList = (mapList + random).toLowerCase();
    return CryptoJS.MD5(mapList).toString().toUpperCase();
}

function postDataStr(params) {
    let mapList = '';
    for (let key in params) {
        mapList = mapList + key + '=' + params[key] + '&';
    }
    if (mapList.length > 0) {
        mapList = mapList.substring(0, mapList.length - 1);
    }
    return encodeURI(mapList).replace(/\+/g, '%2B')
}
export {
    ghhttp,
    APIfun,
    PostRequest,
    getPostData
}
