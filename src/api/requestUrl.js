let domin = '';

//获取公钥
const getPublickeyUrl = () => {
    return domin + '/v1/basic/publickey'
}
//发送短信验证码
const smssend = () => {
    return domin + '/v1/basic/smssend'
}

//握手
const getHandShakeUrl = () => {
    return domin + '/v1/basic/handshake'
}

const APIs = {
    getHandShakeUrl () {
        return domin + '/v1/basic/handshake'
    },
    getRequestSmsCodeUrl() {
        return domin + "/v1/basic/smssend";
    },
    getRequestRegisterSmsCodeUrl() {
        return domin + "/v1/account/sendcaptcha";
    },
    smsLogin() {
        return domin + "/v1/account/smsLogin";
    },
    smsAuth() {
        return domin + "/v1/account/smsAuth";
    },

    smallAccountLogin() {
        return domin + "/v1/account/extendAccLogin";
    },
    querySmallAccount() {
        return domin + "/v1/account/queryExtendAcc";
    },
    modifyExtendAcc() {
        return domin + "/v1/account/modifyExtendAcc";
    },
    getLoginUrl() {
        return domin + "/v1/account/login";
    },
    getAuthUrl() {
        return domin + "/v1/account/pwdAuth";
    },

    getThirdAccountTicketLogin() {
        return domin + "/v1/account/thirdAccountTicketLogin";
    },
    getDaoyuTicketLogin() {
        return domin + "/v1/account/daoyuTicketLogin";
    },
    getAutoLoginUrl() {
        return domin + "/v1/account/loginauto";
    },
    getCheckCodeSendSmsUrl() {
        return domin + "/v1/basic/picCheckSmsSend2";
    },

    getCheckCodeLoginUrl() {
        return domin + "/v1/account/checkCodeLogin";
    },
    getCheckCodeAuthUrl() {
        return domin + "/v1/account/checkCodeAuth";
    },

    getGuestLoginUrl() {
        return domin + "/v1/account/guestLogin";
    },
    getGuestUpgradeUrl() {
        return domin + "/v1/account/guestUpgradeLogin";
    },

    getResetPasswordUrl() {
        return domin + "/v1/account/resetpasswdlogin";
    },
    getFillRealInfoUrl() {
        return domin + "/v1/account/fillRealInfo";
    },

    getActiveUrl() {
        return domin + "/v1/account/active";
    },


    getLogoutUrl() {
        return domin + "/v1/account/logout";
    },
    getTicketUrl() {
        return domin + "/v1/open/getticket2";
    },
    getTicketUrl2() {
        return domin + "/v1/open/getticket";
    },
    getErrorCodeUrl() {
        return domin + "/v1/basic/getcode";
    },
    getActivateCheckUrl() {
        return domin + "/v1/account/activation";
    },

    getCheckTokenUrl() {
        return domin + "/v1/basic/checktoken";
    },
    getGameUpdateUrl(gameVersion) {
        return domin + "/v1/basic/getPackageUrl?gameVersion=" + gameVersion;
    },
    getAreaConfigurationUrl() {
        return domin + "/v1/basic/getAreaList";
    },

    getAppConfigurationUrl() {
        return domin + "/v1/account/queryConfig";
    },

    getProductConfigurationUrl() {
        return domin + "/v1/basic/getProductList";
    },
    getLoginAreaUrl() {
        return domin + "/v1/basic/loginarea";
    },


    getPayResultUrlForOrderId() {
        return domin + "/v1/gchannel/pay/orderstatus";
    },

    getReportRoleUrl() {
        return domin + "/v1/account/reportRole";
    },

    getSetPasswordUrl() {
        return domin + "/v1/account/setAccPassword";
    },
    getFindPasswordUrl() {
        return domin + "v1/account/resetpasswd";
    },


    getRegisterUrl() {
        return domin + "/v1/account/register";
    },
    getIsRegisterUrl() {
        return domin + "/v1/account/status";
    },

    getPayParams() {
        return domin + "/v1/pay/params";
    },
    getPayWeb() {
        return domin + "/v1/pay/entrance";
    },
    getExceptionReportUrl() {
        return domin + "/v1/basic/game/error";
    },

    getCountryCodesUrl() {
        return domin + "/v1/basic/countrycode";
    },

    getAdInfo() {
        return domin + "/v1/basic/getadinfo";
    },

    getPayResultUrl() {
        return domin + "/v1/pay/status";
    },
}

export {
    getPublickeyUrl,
    smssend,
    getHandShakeUrl,
    APIs
}