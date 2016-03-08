require('./js/utils');
require('./js/tip');
require('./js/api');

/*
*	common config and verify
* */
var bucket = require('./api-bucket');

/*
*	site config
* */
lib.api.config({
	bucket: bucket,
    proHost: 'xmall.codoon.com',
    data: {
        module: "mall"
    }
});


function getCookie (name) {
	var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
	return r ? r[1] : undefined;
}

/*
* Hybird 
* */
var DevInfo = {}, _CB = null, isIOS = /iphone|ipod|ipad|itouch/i.test(navigator.userAgent);

function HybirdMenu (needInit) {
	var options = JSON.stringify({"showShare": 0,"showFeedback": 0});
	if (isIOS && window.WebViewJavascriptBridge) {
		needInit && WebViewJavascriptBridge.init(function(message, responseCallback){});
		WebViewJavascriptBridge.callHandler("web_browser_setting", options);
	} else if (window.jsObj) {
		window.jsObj.web_browser_setting && window.jsObj.web_browser_setting(options);
	}
}

function HybirdFuFunc () {
	if (isIOS && window.WebViewJavascriptBridge) {
		WebViewJavascriptBridge.init(function(message, responseCallback){});
	
		WebViewJavascriptBridge.registerHandler("CJB_get_extra_info_callback", function(response, _callback) {
			DevInfo = response;
			cookieMapFrame();
        });

		WebViewJavascriptBridge.callHandler("CJB_get_extra_info", function(response) {});
	} else if (window.jsObj) {
		window.CJB_get_extra_info_callback  = function (response) {
			try {
				DevInfo = JSON.parse(response);
			} catch (e) {
				console.error(e.msg);
			}
			cookieMapFrame();
		}
		window.jsObj.CJB_get_extra_info && window.jsObj.CJB_get_extra_info();
	}
	HybirdMenu();
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
		getCookie('sessionid') ? _CB() : (function () {
		  	lib.api.refreshToken();
		})();
	}
	document.body.appendChild(iframe);
}

module.exports = {
	
}