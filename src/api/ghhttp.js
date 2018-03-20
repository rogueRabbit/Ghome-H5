import { RandomUtil } from "@/utils/randomUtil.js"
import tripledes from 'crypto-js/tripledes.js'
import { getPublickeyUrl ,smssend} from './requestUrl'
import JSEncrypt from 'JSEncrypt'
let config = {
    TOKEN: 1
}
let su = navigator.userAgent.toLowerCase(), mb = ['ipad', 'iphone os', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile', 'Windows NT'];
const ghhttp = (callback) => {
    let key = RandomUtil();
    let deviceidStr = '&deviceid=' + encodeURI('unknown-device');;
    let handShakePostStr = 'randkey=' + encodeURI(key);
    mb.map((item) => {
        if (su.indexOf(item) > 0) {
            console.log(item);
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
        let encrypt = new JSEncrypt();
        let rsaPublic=res.data.data.key;
        encrypt.setPublicKey(rsaPublic);
        let rsaStr = encrypt.encrypt(handShakePostStr);
        document.write(rsaStr);
        if(callback){
            callback(res);
        }
        console.log(rsaPublic);
    });
}

const getPhonems=(params,callback)=>{
    $http({
        url: smssend(),
        method: 'post',
        headers: {
            'X-TOKEN': config.token
        },
        data: params
    })
}
function getRequestCommonHeader() {
    return {
        'X-APP-ID': config.TOKEN
    }
}
export { ghhttp ,getPhonems }