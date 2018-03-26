import React from 'react';
import { StyleSheet, Text, View, Image,Alert } from 'react-native';
import Home from './Home';
//import Login from './Login';
import { BottomNavigation } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/Entypo'


export default class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {active:'home'};
    }



  render() {

    return (
     <View style={{ flex: 1 }}>
      {this.state.active==='home' ? <Text> Welcome</Text> : null}
      {this.state.active==='music' ? <Home /> : null}

       <BottomNavigation active={this.state.active} hidden={false} style={styles.bottomNavigation}>
              <BottomNavigation.Action
                  key="home"
                  icon={<Icon size={24} color="white" name="home" />}
                  label="Home"
                  onPress={() => this.setState({ active: 'home' })}
              />
              <BottomNavigation.Action
                  key="music"
                  icon={<Icon size={24} color="white" name="music" />}
                  label="Music"
                  onPress={() => this.setState({ active: 'music' })}
              />
          </BottomNavigation>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56
  }
})