const RandomUtil = () => {
    let RANDOM_RULES = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()";
    let RANDOM_SIZE = 32;
    let rpoint = RANDOM_RULES.length;
    let generateRandStr = '';
    for (let i = 0; i < RANDOM_SIZE; i++) {
        let randNum = Math.floor(Math.random() * rpoint);
        generateRandStr += (RANDOM_RULES.substring(randNum, randNum + 1));
    }
    return generateRandStr;
}

const getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return decodeURIComponent(arr[2]);
    else
        return null;
}

//设置cookie  
const setCookie = function (name, value, seconds) {
    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0  
    var expires = "";
    if (seconds != 0) {      //设置cookie生存时间  
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";   //转码并赋值  
}
const removeCookie = function (name) {
    /* -1 天后过期即删除 */
    setCookie(name, 1, -1);
}
const clearCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}
export { 
    RandomUtil,
    getCookie,
    setCookie,
    removeCookie
}