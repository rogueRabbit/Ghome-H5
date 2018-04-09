import { RandomUtil, setCookie } from "@/utils/randomUtil.js"
import { getPublickeyUrl, APIs } from './requestUrl'
import JSEncrypt from 'jsencrypt'
import { tripleDESToolEncrypt, tripleDESToolDecrypt, getCookie } from "@/utils/randomUtil.js"
import Toast from '../components/toast';
import Loading from '@/components/loading/'
import { getSessionStorage, setSessionStorage } from '@/utils/Tools';

let config = {
    TOKEN: 1
}

const errorCodeObj = [12, 1, 2, 3];

let APIfun = APIs;
let su = navigator.userAgent.toLowerCase(), mb = ['ipad', 'iphone os', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile', 'Windows NT'];
window.randomKey = '';
window.token = '';
window.deviceid = 10000;
let resetkey_count = 0;
//登录加密操作
const PublicKey = (token, callback) => {
    ghhttp((handShakePostStr, res, key) => {
        let headers = {
            'X-APP-ID': deviceid,
            'X-TOKEN': token
        };
        randomKey = key;
        let encrypt = new JSEncrypt();
        let rsaPublic = res.data.data.key;
        encrypt.setPublicKey(rsaPublic);
        //let data=encryptedString(rsaPublic,handShakePostStr,'OHDave')
        //console.log(data);
        //let key=new RSAKeyPair(rsaPublic,10001,handShakePostStr);
        //console.log(key);
        let rsaStr = encrypt.encrypt(handShakePostStr);
        let params = {
            'signature': rsaStr,
            'timestamp': new Date().getTime()
        };
        PostRequest(APIs.getHandShakeUrl(), headers, rsaStr, (res) => {
            if (res.data.code != null && res.data.code == 0) {
                let returnData = tripleDESToolDecrypt(key, res.data.data);
                window.token = JSON.parse(returnData).token;
                setCookie('token', JSON.parse(returnData).token);
                //commit('getToken', JSON.parse(returnData));
                if (callback) {
                    callback(JSON.parse(returnData).token, randomKey);
                }
            }
            //console.log(res);
        }, (err) => {
            console.log(err);
        })
    });
}
const ghhttp = (callback) => {
    let key = RandomUtil();
    let deviceidStr = '&deviceid=' + deviceid;
    let handShakePostStr = 'randkey=' + encodeURI(key);
    mb.map((item) => {
        if (su.indexOf(item) > 0) {
            deviceidStr = '&deviceid=' + deviceid;
        }
    })
    setSessionStorage('randomKey', key);
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
    let timeStart = new Date().valueOf();
    let loadingTest = Loading(
        {
            message: '',
            duration: 10
        }
    );
    $http({
        url: url,
        method: 'post',
        headers: header,
        data: params
    }).then((res) => {
        loadingTest.close();
        if (window.sdoReport) {
            window.sdoReport({
                b_business: 'GHOME_h5',
                d_interface: url,
                b_return_code: res.data.code,
                b_retrun_msg: encodeURIComponent(res.data.msg),
                d_duration: (new Date()).valueOf() - timeStart
            });
        }
        callback(res)
    }).catch((err) => {
        loadingTest.close();
        errback(err);
        console.log(err);
    });
}

const getPostData = (url, params, dataBack, errBack) => {
    if (getCookie('token') || window.token != '') {
        let randomKey = getSessionStorage('randomKey');
        PostRequest(url, setHeaders(getCookie('token'), sign(randomKey, params)), tripleDESToolEncrypt(randomKey, postDataStr(params)), (res) => {
            if (res.data.code != 0) {
                if (res.data.code == 18) {
                    Toast({
                        message: '用户token过期，请返回首页重新登录',
                        duration: 3000
                    });
                    window.location.href = '/';
                }
                if (errorCodeObj.includes(res.data.code)) {
                    Toast({
                        message: res.data.msg,
                        duration: 3000
                    });
                    if (dataBack) {
                        console.log(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
                        let code = res.data.code;
                        dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)), code, res.data.msg);
                    }
                }else{
                    Toast({
                        message: res.data.msg,
                        duration: 3000
                    });
                    return;
                }
            }else{
                if (dataBack) {
                    console.log(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
                    let code = res.data.code;
                    dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)), code, res.data.msg);
                }
            }
        }, (err) => {
            if (errBack) {
                errBack(err);
            }
        });
    } else {
        let randomKey = window.randomKey;
        PublicKey('', (newtoken, key) => {

            PostRequest(url, setHeaders(newtoken, sign(key, params)), tripleDESToolEncrypt(key, postDataStr(params)), (res) => {
                if (res.data.code == 18) {
                    Toast({
                        message: '用户token过期，请返回首页重新登录',
                        duration: 3000
                    });
                    window.location.href = '/';
                } else if (res.data.code != 0 && errorCodeObj.includes(res.data.code)) {
                    Toast({
                        message: res.data.msg,
                        duration: 3000
                    });
                }
                if (dataBack) {
                    console.log(JSON.parse(tripleDESToolDecrypt(key, res.data.data)));
                    let code = 0;
                    if (errorCodeObj.includes(res.data.code)) {
                        code = res.data.code;
                    }
                    dataBack(JSON.parse(tripleDESToolDecrypt(key, res.data.data)), code, res.data.msg);
                }
            }, (err) => {
                if (errBack) {
                    errBack(err);
                }
            });

        });
    }
}

function getRequestCommonHeader() {
    return {
        'X-APP-ID': config.TOKEN
    }
}


function setHeaders(token, singnResult, moreHeader) {
    //设置请求头配置，用来传递签名
    let headersSet = {
        // 'X-APP-ID': 791000351,
        //'X-APP-ID': 791000070,
        //'X-APP-ID': 791000071,
        //'X-APP-ID': 1017,//
        'X-APP-ID': 1000,
        'X-TOKEN': token,
        'X-SIGNATURE': singnResult,
        'X-HTTP-ENGINE': 'android',
        'X-PROMOTERID': 'android',
        'X-CHANNEL': 'A1',
        'X-CHANNEL-INFO': '',
        'X-DEVICEID': deviceid,
        'X-APP-VERSION': '7.02.0',
        'X-PLATFORM': 2,
        'X-AREA': '231',
        'X-SDK-VERSION': '2.2.0',
        'X-FLOW-ID': '1',
        'Charsert': 'UTF-8',
        'X-DeviceType': 'pc'
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
