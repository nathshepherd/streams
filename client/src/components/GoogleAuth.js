import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // Loads base Google auth library
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "950993776602-plmugi6l3eh8j126tfmpuphl22bkuq69.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance(); // Grabs important Google auth functionality
          this.onAuthChange(this.auth.isSignedIn.get()); // Gets Login Status
          this.auth.isSignedIn.listen(this.onAuthChange); // Listens for login status change and updates state
        });
    });
  }

  // Helper Functions
  onAuthChange = (isSignedIn) => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // Button functionality
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui blue google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  // Button Rendering
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
