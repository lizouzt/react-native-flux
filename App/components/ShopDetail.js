import React from 'react-native'

import ShopHomeView from './CShopApp'

let {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
} = React

export default class ShopDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

    render() {
    	return (
    		<View style={styles.notice}>
    			<TouchableHighlight
    				underlayColor = "red"
    				onPress = {() => this.props.navigator.push({
    					name: "店铺",
                		component: ShopHomeView
    				})}>
    				<Text
    					style = {{textAlign: 'center', color: 'blue'}}>
    					Nav To Home View
    				</Text>
    			</TouchableHighlight>

    			<TouchableHighlight
    				underlayColor = "blue"
    				onPress = {() => this.props.navigator.jumpBack()}>
    				<Text
    					style = {{textAlign: 'center', color: 'red'}}>
    					Back To Pre View
    				</Text>
    			</TouchableHighlight>
    		</View>
    	)
    }
}

let styles = StyleSheet.create({
	notice: {
		marginTop: 100
	}
})