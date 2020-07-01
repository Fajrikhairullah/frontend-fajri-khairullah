import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#fff',
        padding: 15
    },
    button: {
        backgroundColor: '#00C9FF',
        borderTopRightRadius: 20
    },
    button1: {
        borderRightWidth: 1,
        backgroundColor: '#00C9FF',
        borderColor: '#000',
        borderTopLeftRadius: 20
    },
    hiddenItem: {
        padding: 10,
        alignItems: "center",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 14,
        color: '#ffff'
    }


});

export default styles;