/*
* 刷新token操作
*
* 由于页面都会进行hybird init操作，所以这个模块默认不在进行
* */
'use strict';

var DevInfo = {}, 
    _CB = null, 
    _isFirstTimeT2S_ = true, //useless
    isIOS = /iphone|ipod|ipad|itouch/i.test(navigator.userAgent);

var tip = window.lib.tip || {toggle: window.alert};

function getCookie (name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function tokenRefreshCallBack () {
    _CB ? _CB() : window.location.reload();
}

function cookieMapFrame () {
    var token = DevInfo['access_token'] || null;
    if (!token){
      console.error('Token lose');
      return false;
    }

    var iframe = document.createElement('iframe');
    iframe.className = "c_cookie_map";
    iframe.src = "//xmall.codoon.com/xmall/tokensession?token=" + token;
    iframe.onload = function () {
        getCookie('sessionid') ? tokenRefreshCallBack() : (function () {
            // lib.api.refreshToken();
            /*
            * no more refresh request
            * */
            tip.toggle('获取用户数据失败<br>请退出重试');
        })();
    }
    document.body.appendChild(iframe);
}
/*
* Token刷新回调判断
* */
function HybirdCBDeal (data) {
    var _hasStatus_ = "status" in data;
    if (!_hasStatus_ || _hasStatus_ && data.status.state == 0) {
        DevInfo = data;
        cookieMapFrame();
    } else {
        tip.toggle("status" in data.status && !!data.status.msg ? data.status.msg : data.status.msg);
    }
}
/*
* 客户端Hybird调用刷新Token逻辑
*
**/
function HybirdFuFunc () {
    var data = {
        status: {
            state: 0,
            msg: '网络获取失败'
        }
    };
    if (isIOS && window.WebViewJavascriptBridge) {
        WebViewJavascriptBridge.registerHandler("CJB_get_token_refresh_callback", function(response, _callback) {
            HybirdCBDeal(response);
        });
        WebViewJavascriptBridge.callHandler("CJB_get_token_refresh", function(response) {});
    } else if (window.jsObj) {
        window.CJB_get_token_refresh_callback  = function (response) {
            try {
                data = JSON.parse(response);
            } catch (e) {
                console.log(e.msg);
            }
            HybirdCBDeal(data);
        }
        window.jsObj.CJB_get_token_refresh && window.jsObj.CJB_get_token_refresh();
    }
}

/*
* 调用客户端刷新token
* @param {function} callback
**/
function refresh(callback) {
    _CB = callback;

    if (window.WebViewJavascriptBridge || window.jsObj) {
        HybirdFuFunc();
    } else{
        HybirdCBDeal({
            status: {
                state: '1',
                msg: '用户信息获取失败<br>非主客环境'
            }
        })
    }
}

module.exports = refresh;