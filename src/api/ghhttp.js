import { RandomUtil,setCookie } from "@/utils/randomUtil.js"
import { getPublickeyUrl, APIs } from './requestUrl'
import JSEncrypt from 'JSEncrypt'
import { tripleDESToolEncrypt, tripleDESToolDecrypt ,getCookie} from "@/utils/randomUtil.js"
let config = {
    TOKEN: 1
}

const errorCodeObj = [1023, 12, 1, 2, 3, 54, 94];

let APIfun = APIs;
let su = navigator.userAgent.toLowerCase(), mb = ['ipad', 'iphone os', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile', 'Windows NT'];
const ghhttp = (callback) => {
    let key = RandomUtil();
    let deviceidStr = '&deviceid=' + deviceid;
    let handShakePostStr = 'randkey=' + encodeURI(key);
    mb.map((item) => {
        if (su.indexOf(item) > 0) {
            deviceidStr = '&deviceid=' + deviceid;
        }
    })
    setCookie('randomKey',key);
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
    let randomKey=getCookie('randomKey');
    PostRequest(url, setHeaders(getCookie('token'), sign(randomKey, params)), tripleDESToolEncrypt(randomKey, postDataStr(params)), (res) => {
        if(res.data.code == 18){
            alert('用户token过期，请返回首页重新登录');
            window.location.href = '/';
        }else if(res.data.code != 0 && errorCodeObj.includes(res.data.code)){
            alert(res.data.msg);
        }
        if (dataBack) {
            console.log(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
            let code = 0;
            if(errorCodeObj.includes(res.data.code)){
              code = res.data.code;
            }
            dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)), code);
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
        'X-APP-ID': 791000351,
        // 'X-APP-ID': 791000070,
        //'X-APP-ID': 791000071,
        //'X-APP-ID': 1017,//
        //'X-APP-ID': 1000,
        'X-TOKEN': getCookie('token'),
        'X-SIGNATURE': singnResult,
        'X-HTTP-ENGINE': 'android',
        'X-PROMOTERID': 'android',
        'X-CHANNEL': 'A1',
        'X-CHANNEL-INFO': '',
        'X-DEVICEID': deviceid,
        'X-APP-VERSION':'7.02.0',
        'X-PLATFORM':2,
        'X-AREA':'231',
        'X-SDK-VERSION':'2.2.0',
        'X-FLOW-ID': '1',
        'Charsert':'UTF-8',
        'X-DeviceType':'pc'
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
    let md5String1 = mapList.toString();
    if (md5String1.length > 0) {
        md5String1 = md5String1.substring(0, md5String1.length - 1);
    }
    md5String1 = (md5String1 + random).toLowerCase();
    return CryptoJS.MD5(md5String1).toString().toUpperCase();
}

function postDataStr(params) {
    let mapList = '';
    for (let key in params) {
        mapList = mapList + key + '=' + params[key] + '&';
    }
    if (mapList.length > 0) {
        mapList = mapList.substring(0, mapList.length - 1);
    }
    console.log(encodeURI(mapList).replace(/\+/g, '%2B'));
    return encodeURI(mapList).replace(/\+/g, '%2B')
}
export {
    ghhttp,
    APIfun,
    PostRequest,
    getPostData
}
