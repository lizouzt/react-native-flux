var AppDispatcher = require('../dispatcher/AppDispatcher');
var ShopConstants = require('../constants/ShopConstants');

var ActionTypes = ShopConstants.ActionTypes;

module.exports = {
	receiveDetailInfo: function (info) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_DETAIL_INFO_MSG,
			info: info
		});
	},
	receiveList: function (list, page_total) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_LIST_ITEM_MSG,
			list: list
		});
	},
	navToShopDetail: function (itemId) {
		if (!itemId) return false;
		AppDispatcher.dispatch({
			type: ActionTypes.CLICK_OPEN_ITEM,
			id: itemId
		})
	},
	reloadPage: function () {
		AppDispatcher.dispatch({
			type: ActionTypes.RELOAD_PAGE
		})
	},
	forbidden: function (msg) {
		AppDispatcher.dispatch({
			type: ActionTypes.FORBIDDEN,
			msg: msg
		})
	}
}