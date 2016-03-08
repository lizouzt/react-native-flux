/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 
'use strict';

import React from 'react-native'
import App from './components/CShopApp'

let {
    AppRegistry,
    StyleSheet,
    Navigator,
    View,
    Platform
} = React;

class Application extends React.Component {
    render() {
        let homeName = "店铺"
        let homeConponent = App
        return (
            <Navigator
                initialRoute = {{name: homeName, component: homeConponent}}
                configureScene = {(route) => {
                    return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene = {(route, navigator) => {
                    let Component = route.component
                    return <Component {...route.params} navigator = {navigator} />
                }}/>
        )
    }
};

AppRegistry.registerComponent('Application', () => Application);

let styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    }
});
