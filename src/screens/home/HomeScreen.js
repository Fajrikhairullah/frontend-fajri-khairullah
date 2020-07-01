import React, { Component } from 'react';
import {
    Container, Content, Footer, FooterTab, Button, Text, Fab, Icon, Right, Body, Item, Input, View, ListItem, Left, Thumbnail
} from 'native-base';
import { connect } from 'react-redux';

import { CommonHeader } from '../../components/CommonHeader';
import { deleteById, findAll } from '../../actions/contacts';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RefreshControl, Alert } from 'react-native';
import { showError } from '../../utils/toast';

function RowContact({ contact, onPress }) {
    return (
        <ListItem style={styles.item} onPress={() => onPress(contact)}>


            <Body style={{ backgroundColor: '#00c9ff' }}>

                <Text style={{ color: '#fff' }}>First Name: {contact.firstName}</Text>
                <Text>{contact.lastName}</Text>
                <Text>{contact.age}</Text>
                <Text>{contact.photo}</Text>
            </Body>

            <Right>
                <Icon active name="ios-arrow-forward" />
            </Right>
        </ListItem>
    );
}

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            search: '',
            params: {
                search: '',
                sort: 'asc',
                page: 0,

            }
        };
    }
    componentDidMount() {
        this.reload();
    }

    componentDidUpdate(prevProps, prevState) {
        const { deleteData, deleteError, saveData, data, error } = this.props;

        if (prevProps.data != data) {
            this.setState({
                data: data,

                search: this.state.params.search,
                params: {
                    ...this.state.params,
                    page: data
                }
            });

        } else if (prevProps.deleteData !== deleteData ||
            prevProps.saveData !== saveData) {
            this.onRefresh();
        } else if (error && prevProps.error !== error) {
            showError(error);
        } else if (deleteError && prevProps.deleteError !== deleteError) {
            showError(deleteError);

        }
    }



    reload({ search, sort = 'asc', page = 0 } = {}) {
        this.props.findAll({ search: { name: search }, sort, page });
    }

    onRefresh = () => {
        const { params } = this.state;
        this.setState(
            {
                data: [],
                total: 0,
                params: { ...params, page: 0 }
            },
            () => this.reload(this.state.params)
        );

    }

    onSearch = () => {
        const { search, params } = this.state;
        this.setState(
            {
                data: [],
                total: 0,
                params: { ...params, search: search, page: 0 }
            },
            () => this.reload(this.state.params)
        );

    }

    onDelete = (contact) => {
        Alert.alert(
            "Confirmation",
            "Delete this contact?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Ok", onPress: () => this.props.deleteById(contact.id) }
            ]
        );

    }

    onShowForm = (contact) => {
        this.props.navigation.navigate('ContactScreen', contact ? { id: contact.id } : null);
    }

    onEndReached = () => {
        const { data, total, params } = this.state;
        if (data.length < total) {
            this.reload({ ...params, page: params.page + 1 });
        }
    }
    render() {
        const { navigation, loading } = this.props;
        const { data } = this.state;

        return (
            <Container>

                <CommonHeader navigation={navigation} title="Contact" />

                <SwipeListView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                    }

                    data={data}
                    renderItem={({ item: contact }) => <RowContact contact={contact} onPress={this.onShowForm} />}
                    renderHiddenItem={(data) => (
                        <View style={styles.hiddenItem}>
                            <Button onPress={() => this.onDelete(data.item)} danger>
                                <Icon name='md-trash' />
                            </Button>
                        </View>
                    )}
                    leftOpenValue={75}
                    keyExtractor={contact => contact.id.toString()}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                />

                <Fab onPress={this.onShowForm} style={{ backgroundColor: "#00C9FF" }}>
                    <Icon name="add" />
                </Fab>

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    deleteData: state.deleteContactById.data,
    deleteError: state.deleteContactById.error,
    saveData: state.saveContact.data,
    data: state.contacts.data,
    loading: state.contacts.loading || state.deleteContactById.loading,
    error: state.contacts.error
});

const mapDispatchToProps = {

    deleteById,
    findAll
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
