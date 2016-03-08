/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = {
	ActionTypes: keyMirror({
		CLICK_OPEN_ITEM: null,
		RECEIVE_DETAIL_INFO_MSG: null,
		RECEIVE_LIST_ITEM_MSG: null,
		RELOAD_PAGE: null,
		FORBIDDEN: null
	})
};
