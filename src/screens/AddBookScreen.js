import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import { bookUpdate, bookCreate } from "../actions";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import BookForm from "../components/BookForm";
import ImageUploader from "../components/ImageUploader";

class AddBookScreen extends Component {
  state = {
    emailVerified: false,
    intervalId: -1
  };

  componentDidMount() {
    if (!firebase.auth().currentUser.emailVerified) {
      this.setState({ intervalId: setInterval(this.retryEmail, 10000) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onButtonPress() {
    const {
      author,
      description,
      email,
      location,
      phone,
      pictureUrl,
      price,
      name,
      title,
      messengerName
    } = this.props;
    const date = new Date().getTime();

    this.props.bookCreate({
      author,
      date,
      description,
      email,
      location,
      phone,
      pictureUrl,
      price,
      name,
      title,
      messengerName
    });
  }

  retryEmail = () => {
    firebase
      .auth()
      .currentUser.reload()
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          this.setState({ emailVerified: true });
          clearInterval(this.state.intervalId);
        }
      });
  };

  renderAddBookScreen() {
    if (this.state.emailVerified || firebase.auth().currentUser.emailVerified) {
      return (
        <Card style={{ backgroundColor: "#CFE3E9" }}>
          <ImageUploader />
          <BookForm />
          <CardSection>
            <Button
              raised
              buttonStyle={{ backgroundColor: "#2ecc71" }}
              textStyle={{ textAlign: "center" }}
              backgroundColor="red"
              title={"Lägg upp"}
              onPress={this.onButtonPress.bind(this)}
            />
          </CardSection>
        </Card>
      );
    }

    return (
      <Card style={{ backgroundColor: "#CFE3E9" }}>
        <CardSection>
          <Text>
            För att lägga upp en bok behöver du verifiera din email först. Ett
            mail har skickats till: {firebase.auth().currentUser.email}
          </Text>
          <TouchableOpacity onPress={() => this.retryEmail()}>
            <Text>Testa igen</Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {this.renderAddBookScreen()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    author,
    description,
    email,
    location,
    phone,
    pictureUrl,
    price,
    name,
    title,
    messengerName
  } = state.bookForm;

  return {
    author,
    description,
    email,
    location,
    phone,
    pictureUrl,
    price,
    name,
    title,
    messengerName
  };
};

export default connect(
  mapStateToProps,
  {
    bookUpdate,
    bookCreate
  }
)(AddBookScreen);
