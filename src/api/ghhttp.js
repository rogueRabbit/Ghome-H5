import { RandomUtil } from "@/utils/randomUtil.js"
import tripledes from 'crypto-js/tripledes.js'
import { getPublickeyUrl, smssend, getHandShakeUrl, APIs } from './requestUrl'
import JSEncrypt from 'JSEncrypt'
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
function getRequestCommonHeader() {
    return {
        'X-APP-ID': config.TOKEN
    }
}
export { ghhttp, getPhonems, getToken, APIfun, PostRequest }