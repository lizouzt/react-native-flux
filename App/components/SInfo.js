import React from 'react-native'

import ShopDetail from './ShopDetail'

let {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
} = React;

var ReactPropTypes = React.PropTypes;

var ShopInfo = React.createClass({
    propTypes: {
        info: ReactPropTypes.object,
        curShopID: ReactPropTypes.string
    },

    navToShopDetail: function () {
        const { navigator } = this.props
        if (navigator) {
            navigator.push({
                name: "店铺详情",
                component: ShopDetail
            })
        }
    },

    render: function() {
        var info = this.props.info;
        return (
            <View style={styles.s_info}>
                <Image style={styles.logo} source={{uri: info.sp_avatar + '!80m80'}}/>

                <View style={styles.infoWrapper}>
                    <TouchableHighlight
                        onPress = {this.navToShopDetail}>
                        <Text style={styles.title}>
                          {info.sp_name}
                        </Text>
                    </TouchableHighlight>

                    <Text style={styles.count}>
                      在售商品: {info.count || 0}
                    </Text>

                    <TouchableHighlight 
                        style={styles.tel} 
                        href={'tel:' + info.mobile}
                        underlayColor="red"
                        onPress={this._call}
                        >
                        <Text style={{color: '#6cbb52'}}>
                            联系卖家
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },

    _call: function () {
        console.log('Calling...' + this.props.info.mobile);
    }
});

let styles = StyleSheet.create({
    s_info: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d7da',
        flexDirection: 'row',
        padding: 10,
        shadowColor: '#aaa',
    },
    infoWrapper: {
        flex: 1,
    },
    logo: {
        backgroundColor: '#eee',
        height: 44,
        marginRight: 14,
        width: 44,
    },
    title: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detail: {

    },
    count: {

    },
    tel: {
        bottom: 0,
        position: 'absolute',
        right: 0,
    },
});

module.exports = ShopInfo;