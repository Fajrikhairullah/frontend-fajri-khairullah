import React from 'react';
import { View, ImageBackground } from 'react-native';
import {
    Text
} from 'native-base';
import { Content } from 'native-base';


class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve('result');
            }, 2000),
        );
    };

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <Content>
                <View style={styles.viewStyles}>
                    <ImageBackground
                        source={require('../../../assets/image/inventory.png')}
                        style={styles.image}>
                    </ImageBackground>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>Copyright</Text>
                </View>
            </Content>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    image: {
        flex: 1,
        height: 320,
        marginTop: 120,
        marginLeft: 90,
        marginRight: 90,
        marginBottom: 150,
        justifyContent: "center",
    }
};

export default SplashScreen;