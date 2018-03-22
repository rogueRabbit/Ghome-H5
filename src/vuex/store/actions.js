import { ghhttp, getPhonems, getToken, APIfun } from '@/api/ghhttp.js'
import JSEncrypt from 'JSEncrypt'
import { tripleDESToolEncrypt,tripleDESToolDecrypt } from "@/utils/randomUtil.js"

//登录加密操作
export const PublicKey = ({commit,state}) => {
  ghhttp((handShakePostStr, res, key) => {
    let headers = {
      'X-APP-ID': 100112,
      'X-TOKEN':state.token
    };
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
    var base = new Base64();
    getToken(headers, rsaStr, (res) => {
      if (res.data.code != null && res.data.code == 0) {
        let returnData=tripleDESToolDecrypt(key,res.data.data);
        commit('getToken',JSON.parse(returnData));
      }
      //console.log(res);
    }, (err) => {
      console.log(err);
    })
  });
}

export const getPhonemsAction = (context) => {
  let data = {
    voiceMsg: 0,
    supportPic: 2,
    phone: '+86-18717778365',
    type: 4
  };
  getPhonems(data, (res) => {
  });
}

export const getTokenUrl = () => {
  getToken({}, (res) => {
  })
}
export const increment1 = (context) => {
  console.log(2222);
}
function byteArrayToString(byteArray) {
  var str = "", i;
  for (i = 0; i < byteArray.length; ++i) {
    str += escape(String.fromCharCode(byteArray[i]));
  }
  return str;
}

