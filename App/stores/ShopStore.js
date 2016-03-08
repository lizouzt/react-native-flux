var AppDispatcher = require('../dispatcher/AppDispatcher');
var ShopConstants = require('../constants/ShopConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ShopConstants.ActionTypes;

var LOADLISTOVER_EVENT = 'ListOver',
	FORBIDDEN_EVENT = 'forbidden',
	FIRSTPAGELOADOVER_EVT = 'loadEnd';

var _shopInfo = null, _List = {};

function updateDetailinfo (info) {
	_shopInfo = info;
}
function updateItemList (list) {
	_List = {
		list: list || [],
		isFU: list ? false : true
	};
}

var ShopStore = assign({}, EventEmitter.prototype, {
	addFirstPageLoadOver: function (callback) {
		this.on(FIRSTPAGELOADOVER_EVT, callback)
	},
	emitEvent: function (EVT) {
		this.emit(EVT);
	},
	addForbiddenEvtListener: function (callback) {
		this.on(FORBIDDEN_EVENT, callback)
	},
	addListListener: function (callback) {
		this.on(LOADLISTOVER_EVENT, callback)
	},
	getDetailInfo: function (id) {
		return _shopInfo;
	},
	getList: function () {
		return _List;
	},
	getCurShopID: function () {
		return 'sp_codoon_admin';
	},
	refresh: function () {
		window.location.reload();
	}
});

ShopStore.dispatchToken = AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.CLICK_OPEN_ITEM:
			console.log('dispatched click open');
			// window.open('codoon://www.codoon.com/mall/goods_detail?goods_id=' + action.id);
			break;
		case ActionTypes.RECEIVE_DETAIL_INFO_MSG:
			console.log('received detail');
			updateDetailinfo(action.info);
			ShopStore.emitEvent(FIRSTPAGELOADOVER_EVT);
			break;
		case ActionTypes.RECEIVE_LIST_ITEM_MSG:
			updateItemList(action.list);
			ShopStore.emitEvent(LOADLISTOVER_EVENT);
			break;
		case ActionTypes.RELOAD_PAGE:
			ShopStore.refresh();
			break;
		case ActionTypes.FORBIDDEN:
			ShopStore.emitEvent(FORBIDDEN_EVENT);
			break;
		default:
	}
});

module.exports = ShopStore;