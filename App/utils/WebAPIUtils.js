var ShopDetailServerAction = require('../actions/ShopDetailServerAction');
var NotFound = require('../components/NotFound');
var React = require('react');

var common = require('./common');

var PAGEMAX = 10;
function ruOK (obj) {
	if (obj.status.state == 0 || obj.status.state == "0")
		return true;
	else
		return false;
}

function rendErr (obj) {
	!!obj && console.warn(obj);
	React.render(
		<div className="content">
			<NotFound 
				text="没发现店铺"
			/>
		</div>,
		document.body
	);
}

module.exports = {
	getShopDetail: function (id) {
		lib.api.request({
			api: 'xmall.shop.getInfo',
			data: {"sp_id": id},
			success: function (obj) {
				if (ruOK(obj)) {
					ShopDetailServerAction.receiveDetailInfo(obj.data);
				} else rendErr(obj)
			},
			error: rendErr
		});
	},

	getItemList: function (params) {
		if (!params || params.page_num > PAGEMAX) return false;
		lib.api.request({
			api: 'xmall.shop.itemList',
			data: params,
			success: function (obj) {
				if (ruOK(obj)) {
					ShopDetailServerAction.receiveList(obj.data.list, obj.data.page_total);
				} else if (obj.status.state == 4) { 
					ShopDetailServerAction.forbidden(obj.status.msg || "该商家已倒闭");
				} else console.warn(obj);
			},
			error: function (obj) {
				lib.tip.toggle(obj.status.msg || "获取商品失败，刷新试试吧");
			},
			timeOutCB: function () {
				ShopDetailServerAction.receiveList();
			}
		});
	},

	verify: common.verify
}