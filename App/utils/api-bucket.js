/*
 *接口映射表
 *
 {
 devUrl: //开发环境地址
 url: //线上环境地质
 methods: //兼容的HTTP方法
 require: //必填字段
 }
 **/
var hostname = 'xxx.xx';
var APIBucket = {
    'xmall.shop.itemList': {
        devUrl: 'http://ac-OnsG2j7w.clouddn.com/34c234a362afd7f2.json',
        url: 'http://ac-OnsG2j7w.clouddn.com/34c234a362afd7f2.json',
        methods: ['GET'],
        desc: "获取商品单价列表",
    },
    'xmall.shop.getInfo': {
        devUrl: 'http://ac-OnsG2j7w.clouddn.com/d517c60237198f6.json',
        url: 'http://ac-OnsG2j7w.clouddn.com/d517c60237198f6.json',
        methods: ['GET'],
        desc: "获取商品单价列表",
    },
};

module.exports = APIBucket;
