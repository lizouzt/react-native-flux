var ShopDetailServerAction = require('../actions/ShopDetailServerAction');
var React = require('react-native');
var ReactPropTypes = React.PropTypes;

let {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;

var NotFound = React.createClass({
	propTypes: {
		text: ReactPropTypes.string
	},

	render: function () {
		return (
			<View style={styles.reloadBtn}>
				<Text>{this.props.text || '数据请求失败^_^'}</Text>
				<TouchableHighlight 
					style={styles.reload}
					onPress={this._refresh}
					underlayColor="transparent">

					<Text style={styles.reloadBtn}>
						重新加载
					</Text>
				</TouchableHighlight>
			</View>
		);
	},

	_refresh: function () {
		ShopDetailServerAction.reloadPage();
	}
});

let styles = StyleSheet.create({
	reload: {

	},
	reloadBtn: {

	},
	J_not_found: {

	}
});

module.exports = NotFound;