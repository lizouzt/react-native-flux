var Store = require('../stores/ShopStore');

var ShopInfo = require('./SInfo');
var ItemList = require('./ItemList');
var NotFound = require('./NotFound');
var React = require('react-native');
var Api = require('../utils/WebAPIUtils');

let {
    StyleSheet,
    Text,
    View,
} = React;

export default class CShopApp extends React.Component{

	constructor(props) {
		super(props)
		this.state = {curShopID: Store.getCurShopID()}
	}

	componentDidMount() {
		Api.getShopDetail(Store.getCurShopID());
		Store.addFirstPageLoadOver(this._onload.bind(this));
	}

	render() {
		if (!this.state.curShopID) {
			
			return this.renderInvalid();

		} else if (this.state.info) {
			
			return (
				<View style = {styles.container}>
					<ShopInfo 
						info = {this.state.info}
						curShopID = {this.state.curShopID}
						navigator = {this.props.navigator}
					/>
					<ItemList 
						curShopID={this.state.curShopID}
					/>
				</View>
			);
		} else {
			return this.renderLoading();
		}
	}

	renderLoading() {
		return (
			<View style={styles.container}>
				<Text>
					Loading...
				</Text>
			</View>
		);
	}

	renderInvalid() {
		return (
			<View style={styles.container}>
				<NotFound 
					text="没发现店铺"
				/>
			</View>
		);
	}

	_onload() {
		this.setState({info: Store.getDetailInfo()})
	}
}

let styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		marginTop: 20,
		flex: 1
	}
});