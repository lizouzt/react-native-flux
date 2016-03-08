var React = require('react-native');

var ShopDetailServerAction = require('../actions/ShopDetailServerAction');

let ReactPropTypes = React.PropTypes;

let {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
} = React;

var List = React.createClass({
	propTypes: {
		item: ReactPropTypes.object.isRequired
	},

	getInitialState: function () {
		var item = this.props.item;
		return {
			id: item.goods_id,
			title: item.goods_desc,
			img: item.pic_url,
			price: (item.price/100).toFixed(2)
		}
	},

	render: function () {
		return (
			<TouchableHighlight 
				style = {styles.item}
				onPress = {this._onClick}>
				<View>
					<Image 
						style = {styles.i_img}
						source = {{uri: this.state.img}}/>
					<Text style = {styles.i_title}>
						{this.state.title}
					</Text>
					<Text style = {styles.i_price}>
						¥{this.state.price}
					</Text>
				</View>
			</TouchableHighlight>
		);
	},

	_onClick: function () {
		ShopDetailServerAction.navToShopDetail(this.state.id);
	}
});

let styles = StyleSheet.create({
	item: {
		flex: 1,
		height: 240,
		backgroundColor: '#fff',
		borderRadius: 4,
		marginBottom: 16,
		marginLeft: 8,
		marginRight: 8,
		shadowColor: '#102390',
		shadowOffset: {
			height: 2,
			width: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
	},
	i_img: {
		borderRadius: 4,
		height: 160,
		resizeMode: "cover"
	},
	i_title: {
		color: '#28293c',
		fontSize: 12,
		height: 33,
		lineHeight: 16,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
	},
	i_price: {
		color: '#f9930f',
		marginLeft: 20,
		marginRight: 20,
	}
})

module.exports = List;