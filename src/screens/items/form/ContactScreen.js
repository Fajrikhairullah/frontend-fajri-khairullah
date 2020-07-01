import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Label, Input, Item, Button, Text } from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { showError } from '../../../utils/toast';
import { save, findById } from '../../../actions/contacts';
import styles from './styles';


class ContactScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.state = {
      id: route.params?.id,
      firstName: '',
      lastName: '',
      age: '',
      photo: ''
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    const { navigation, saveData, saveError, data, error } = this.props;

    if (prevProps.data != data) {
      this.setState({ ...data });
    } else if (prevProps.saveData !== saveData) {

      navigation.goBack();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (saveError && prevProps.saveError !== saveError) {
      showError(saveError);
    }
  }

  onChange = (firstName, value) => {
    this.setState({ [firstName]: value });
  };

  onSubmit = () => {

    this.props.save(this.state);
  }

  render() {
    const { navigation, loading, saveError } = this.props;
    const { id, firstName, lastName, age, photo } = this.state;
    const errorData = saveError?.data;

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Add Contact" />
        <Content style={styles.content}>
          <View>

          </View>
          <View style={{ padding: 20 }}>
            <Form>
              {
                id &&
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input style={styles.input} disabled value={id.toString()} />
                </Item>
              }
              <View>
                <Item floatingLabel>
                  <Label>First Name</Label>
                  <Input style={styles.input} value={firstName} onChangeText={value => this.onChange
                    ('firstName', value)} />

                </Item>
                {errorData?.firstName && <Text style={styles.error}>{errorData.firstName[0]}</Text>}
                <Item floatingLabel>
                  <Label>Last Name</Label>
                  <Input style={styles.input} value={lastName} onChangeText={value => this.onChange
                    ('lastName', value)} />

                </Item>
                {errorData?.lastName && <Text style={styles.error}>{errorData.lastName[0]}</Text>}
                <Item floatingLabel>
                  <Label>Age</Label>
                  <Input style={styles.input} value={age.toString()} onChangeText={value => this.onChange
                    ('age', value)} />

                </Item>
                {errorData?.age && <Text style={styles.error}>{errorData.age[0]}</Text>}
                <Item floatingLabel>
                  <Label>Photo</Label>
                  <Input style={styles.input} value={photo} onChangeText={value => this.onChange
                    ('photo', value)} />

                </Item>
                {errorData?.photo && <Text style={styles.error}>{errorData.photo[0]}</Text>}
              </View>
            </Form>
          </View>

          <Button style={styles.button} onPress={this.onSubmit} disabled={loading} success>
            <Text>save</Text>
          </Button>



        </Content>
      </Container>

    );
  }
}
const mapStateToProps = state => ({
  saveData: state.saveContact.data,
  saveError: state.saveContact.error,
  data: state.contactById.data,
  loading: state.contactById.loading || state.saveContact.loading,
  error: state.contactById.error

});



const mapDispatchToProps = {
  save,
  findById
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);