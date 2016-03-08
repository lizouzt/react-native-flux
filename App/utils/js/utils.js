/*
* overried
* */
!function (name, context, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else context[name] = definition()
}('utils', this, function(){
  var _ = {};

  _.isFunc = function(a){
    return toString.call(a) === "[object Function]"
  }

  _.isArr = function(a){
    return toString.call(a) === "[object Array]"
  }

  _.isObj = function(a){
    return toString.call(a) === "[object Object]"
  }

  _.isNum = function(a){
    return toString.call(a) === "[object Number]" && a.toString() != "NaN"
  }
  _.isCH = function(a){
    return /[\u4E00-\u9FFF]+/.test(a)
  }

  _.getAnchor = (function (require) {
    /**
    * 获取
    * @param  {[type]} key [description]
    * @return {[type]}     [description]
    *
    * TODO::老版本主客bug，过了这个时期把$!换回#!
    */
    var hash = /\#\!/.test('') ? ''.match(/\#\!(.+)/)[1] : "";
      /\?/.test(hash) && (hash = hash.replace(/\?.*/, ''));
      return function(key){
            var p = hash.split('&');
            var result = '';
            for(var i=0,len=p.length;i<len;i++){
                var obj = p[i].split('=');
                if(obj[0] == key){
                    result = obj[1];
                    break;
                }
            }
            return result;
        }
  })(), 

  _.getParse = (function(){
      var parse = /\?(.+)/.test('') ? (''.match(/\?(.+)/) || [])[1] : "";
      /\#\!/.test(parse) && (parse = parse.replace(/\#\!.*/, ''));
      return (function () {
          var obj = {};
          if (!!parse) {
              var m = parse.split("&");
              for (var i in m) {
                  var t = m[i].split("=");
                  obj[t[0]] = decodeURI(t[1]);
              }
          }
          return obj;
      })()
  })(),
  
  _.each = function(obj, iteratee, context){
    var i, length;
    if (_.isArr(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee.call(context, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        iteratee.call(context, obj[key]);
      }
    }
    return obj;
  }

  _.extend = function (object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1);

    // For each extender, copy their properties on our object.
    for (var i = 0, source; source = args[i]; i++) {
        if (!source) continue;
        for (var property in source) {
            object[property] = source[property];
        }
    }
    
    return object;
  }

  _.extendDeep = function(a, b){
    if ("_" in window) {
      for (var k in b) {
        if ( _.isObj(b[k]) )
          arguments.callee(a[k], b[k]);
        else 
          (a[k] = b[k]);
      }
      return a
    }
  };
  (function(root){
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    },
    htmlUnEscapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#96;': '`'
    };

    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
        reUnescapedHtml = /[&<>"'`]/g;

    function escapeHtmlChar(chr) {
      return htmlEscapes[chr];
    }

    function escape(string) {
      // reset `lastIndex` because in IE < 9 `String#replace` does not
      string = (string == null) ? '' : String(string);
      return string && (reUnescapedHtml.lastIndex = 0, reUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }
    function unescape(string) {
      string = (string == null) ? '' : String(string);
      return string && (reEscapedHtml.lastIndex = 0, reEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, htmlUnEscapes)
        : string;
    }

    var _ = root._ || {};
    _.escape = _.escape || window.escape || escape;
    _.unescape = _.unescape || window.unescape || unescape;
  })(window);

  window._ = (window._ || {});
  window._ = _.extend(window._, _);
  var otherOnload = window.onload;
  window.onload = function () {
    otherOnload && otherOnload();
    window._ = _.extend(window._, _);
  }
});