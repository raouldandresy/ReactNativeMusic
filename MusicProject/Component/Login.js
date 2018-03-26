import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Button, Alert, TextInput, Dimensions,Text} from 'react-native';
var Icon = require('react-native-vector-icons/FontAwesome');

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager
} = FBSDK;

export default class Login extends React.Component{
  render(){
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};

LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      alert('Login was successful with permissions: '
        + result.grantedPermissions.toString());
    }
  },
  function(error) {
    alert('Login failed with error: ' + error);
  }
);

