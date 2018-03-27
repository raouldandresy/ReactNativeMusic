import React from 'react';
import {
  TextInput,
  Image,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import ListApp from './ListApp';
import Streaming from './Streaming';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming'


export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {showList: true ,modalVisible: false};
    }

    getTrack = (item) =>{
           this.setState({track: item.preview,image:item.album.cover_big,song:item.title_short,showList:false });
           this.setModalVisible(true);
    }

    back = () =>{
        ReactNativeAudioStreaming.stop();
        this.setState({showList:true,show: false});
        this.setModalVisible(false);
    }

     setModalVisible(visible) {
        this.setState({modalVisible: visible});

      }

      play = () =>{
              ReactNativeAudioStreaming.stop();
              ReactNativeAudioStreaming.play(this.state.track, {showIniOSMediaCenter: false, showInAndroidNotifications: false});

          }

    render() {

      return (
      <View style={{flex: 1, paddingTop: 20}}>
         <ListApp goToTrack = {this.getTrack} enabled={this.state.showList} />
          <Modal
                   animationType="slide"
                   transparent={false}
                   visible={this.state.modalVisible}
                   >
                   <View style={{marginTop: 22, alignItems: 'center', textAlign: 'center'}}>
                     <View>
                        <Streaming onPlay={this.play} back={this.back} song={this.state.song} image={this.state.image}/>
                     </View>
                    </View>
                 </Modal>
          </View>
      );
    }
  }

