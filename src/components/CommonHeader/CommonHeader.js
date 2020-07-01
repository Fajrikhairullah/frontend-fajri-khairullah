import React, { Component } from 'react';
import {
    Body, Button, Header, Icon, Left, Title
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';
import { StatusBar } from 'react-native';

class CommonHeader extends Component {

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { navigation, hideLeftButton, title } = this.props;

        return (

            <Header style={styles.header}>
                <StatusBar backgroundColor="#00C9FF" />

                {!hideLeftButton &&
                    <Left>
                        {
                            typeof navigation.openDrawer === 'function' ?
                                <Button style={styles.menus} onPress={this.onMenuPress} transparent>
                                    <Icon name='home' style={{ color: '#ffff' }} />
                                </Button> :
                                <Button style={styles.menus} onPress={this.onBackPress} transparent>
                                    <Icon name='ios-arrow-back' />
                                </Button>
                        }
                    </Left>
                }
                <Body>
                    <Title style={{ color: '#ffff' }}>{title}</Title>

                </Body>
            </Header>

        );
    }
}
CommonHeader.propTypes = {
    navigation: PropTypes.object.isRequired,
    hideLeftButton: PropTypes.bool,
    title: PropTypes.string
}
export default CommonHeader;