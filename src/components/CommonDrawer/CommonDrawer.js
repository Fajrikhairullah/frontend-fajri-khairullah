import React, { Component } from 'react';
import {
    Content, ListItem, Left, Icon, Body, Container, Text
} from 'native-base';

import styles from './styles';
import { ImageBackground } from "react-native";


const menus = [
    {
        icon: 'home',
        label: 'Home',
        target: 'Home'
    },
    {
        icon: 'ice-cream',
        label: 'Contacts',
        target: 'Items'
    },
    // {
    //     icon: 'medical',
    //     label: 'Units',
    //     target: 'Units'
    // },
    // {
    //     icon: 'briefcase',
    //     label: 'Stocks',
    //     target: 'Stocks'
    // },
    // {
    //     icon: 'logo-usd',
    //     label: 'Transactions',
    //     target: 'Transactions'
    // },
    // {
    //     icon: 'exit',
    //     label: 'Logout',
    //     target: 'Login'
    // },
    // {
    //     icon: 'logo-usd',
    //     label: 'Transactions Summary',
    //     target: 'TransSummary'
    // },
];

function DrawerItem({ navigation, item }) {

    return (
        <ListItem style={styles.menus} icon onPress={() => navigation.navigate(item.target)}>
            <Left>
                <Icon style={{ color: '#fff' }} name={item.icon} />
            </Left>
            <Body>
                <Text style={{ color: '#fff' }}> {item.label} </Text>
            </Body>
        </ListItem>
    );
}

class CommonDrawer extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content style={styles.content}>
                    <ImageBackground
                        source={require('../../../assets/image/inventory.png')}
                        style={styles.image}>

                    </ImageBackground>
                    {menus.map((item, index) =>
                        <DrawerItem

                            key={index}
                            navigation={navigation}
                            item={item} />
                    )}
                </Content>
            </Container>
        );
    }
}
export default CommonDrawer;