import { ghhttp, getPhonems, getToken, APIfun } from '@/api/ghhttp.js'
import JSEncrypt from 'JSEncrypt'

let headers={
  'X-APP-ID':100112
};
//登录加密操作
export const PublicKey = (context) => {
  ghhttp((handShakePostStr, res , key) => {
    let encrypt = new JSEncrypt();
    let rsaPublic = res.data.data.key;
    encrypt.setPublicKey(rsaPublic);
    //let data=encryptedString(rsaPublic,handShakePostStr,'OHDave')
    //console.log(data);
    //let key=new RSAKeyPair(rsaPublic,10001,handShakePostStr);
    //console.log(key);
    let rsaStr = encrypt.encrypt(handShakePostStr);
    console.log('加密后字段'+rsaStr);
    let params={
      'signature':rsaStr,
      'timestamp':new Date().getTime()
    };
    var base = new Base64();
    getToken(headers,rsaStr,(res)=>{
      if(res.data.code!= null&&res.data.code==0){
        console.log('返回的3des加密数据：'+res.data.data);
        console.log(key);
        let test= 'helloworld';
        let test2=CryptoJS.enc.Base64.parse(key);
        let return_code=CryptoJS.TripleDES.decrypt(CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Hex.parse(res.data.data)
          }),test2,{
          mode: CryptoJS.mode.ECB,    
          padding: CryptoJS.pad.Pkcs7  
      });
      var keyHex = CryptoJS.enc.Base64.parse('XPuyMQXCDuqiKuzY1laseXHZ&O3ZKt63');
      var encrypted = CryptoJS.TripleDES.encrypt('deviceid=-----1821c7c81e265eca', keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
      console.log(decodeURIComponent(res.data.data));
      //var keyHex1 = CryptoJS.enc.Utf8.parse(key);
      console.log(CryptoJS.enc.Base64.parse(res.data.data));
      console.log(encrypted);
      console.log(encrypted.ciphertext);
      //console.log(keyHex1);
      var decrypted1 = CryptoJS.TripleDES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString())
      }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
      var result_value = decrypted1.toString(CryptoJS.enc.Utf8);
      console.log(result_value);
      //console.log(CryptoJS.enc.Base64.parse(return_code.toString()));
        console.log(return_code);
      }
      //console.log(res);
    },(err)=>{
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

