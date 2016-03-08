var React = require('react-native');

var Store = require('../stores/ShopStore');
var Api = require('../utils/WebAPIUtils');
var Item = require('./Item');
var XScroll = require("../utils/scrollLoader");

import RefreshableList from "react-native-refreshable-listview"


let ReactPropTypes = React.PropTypes;

let {
    StyleSheet,
    Text,
    ListView,
    ScrollView,
    View,
    TouchableHighlight,
    RecyclerViewBackedScrollView
} = React;

let _page_params = {
	page_size: 10,
	page_num: 1
};

function getNoMoreTip () {
	return (
		<Text style={styles.nomore}>
			没更多宝贝了……^_^
		</Text>
	);
}

var List = React.createClass({
	getInitialState: function (props) {
		 return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.goods_id !== row2.goods_id,
			}),
			list: [],
			_noMoreList: false,
			_isForbidden: false,
			loaded: false
		}
	},

	componentDidMount: function () {
		_.extend(_page_params, {
			sp_id: this.props.curShopID
		});
		Store.addListListener(this._onLoad);
		Store.addForbiddenEvtListener(this._forbidden);
		Api.getItemList(_page_params);
	},

	_loadNextPage: function () {
		Api.getItemList(_page_params);
	},

	_onLoad: function () {
		var newListData = Store.getList();

		if (!newListData.isFU) {
			if (newListData.list.length < _page_params.page_size) {
				/*
				* no more list
				* */
				this.state._noMoreList = true;
			}
			++_page_params.page_num;
		}

		var curListData = this.state.list.concat(newListData.list);
		this.setState({
			itemLength: curListData.length,
			dataSource: this.state.dataSource.cloneWithRows(curListData),
			loaded: true
		});
	},

	_forbidden: function () {
		this.setState({_isForbidden: true});
	},

	getListItem: function(data) {
		return (
			<Item 
				key={data.goods_id}
				item={data}>
			</Item>
		)
	},

	render: function () {
		var noMoreTip = this.state._noMoreList && _page_params.page_num > 2 ? getNoMoreTip() : null;

		if (!this.state.loaded) 
			return (
				<Text>......</Text>
			);

		if ((!this.state.itemLength || this.state.itemLength == 0) && this.state._noMoreList) 
			return (
				<Text style={styles.nomore, styles.empty}>
					该店铺目前没有商品出售
				</Text>
			);
		else if (this.state._isForbidden) 
			return (
				<Text style={styles.nomore, styles.empty}>
					店铺已经关闭了
				</Text>
			);
		else {
			return (
				<RefreshableList 
					dataSource = {this.state.dataSource}
					renderRow = {this.getListItem}
					pageSize = {10}
					onEndReachedThreshold = {200}
					onEndReached = {this._loadNextPage}
					loadData = {this._loadNextPage}
					refreshDescription = "Refresh"
					onChangeVisibleRows = {(e) => {
						console.log(e);
					}}
					onLayout={(event) => {

	                    var layout = event.nativeEvent.layout;

	                    this.setState({
	                        listHeight : layout.height
	                    });
	                }}
					style = {styles.list}/>
			)
		}
	}
});

let styles = StyleSheet.create({
	nomore: {
		alignItems: 'center',
		color: '#a9acb4',
		fontSize: 16,
		justifyContent: 'center',
		marginTop: 20,
		textAlign: 'center'
	},
	empty: {
		marginBottom: 200,
		marginTop: 200,
	},
	list: {
		marginRight: 10,
		marginLeft: 10,
	}
})

module.exports = List;