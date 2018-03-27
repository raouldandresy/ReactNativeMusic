import React, { Component } from 'react';
import {
    NativeModules,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator,
    Platform,
    Button,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

const { ReactNativeAudioStreaming } = NativeModules;

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

// UI
const iconSize = 60;

export default class Player extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state = {
            status: STOPPED,
            song: ''
        };
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(
            'AudioBridgeEvent', (evt) => {
                // We just want meta update for song name
                if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
                    this.setState({song: evt.value});
                } else if (evt.status != METADATA_UPDATED) {
                    this.setState(evt);
                }
            }
        );

        ReactNativeAudioStreaming.getStatus((error, status) => {
            (error) ? console.log(error) : this.setState(status)
        });
    }

    _onPress() {
        switch (this.state.status) {
            case PLAYING:
            case STREAMING:
                ReactNativeAudioStreaming.pause();
                break;
            case PAUSED:
                ReactNativeAudioStreaming.resume();
                break;
            case STOPPED:
            case ERROR:
                ReactNativeAudioStreaming.play(this.props.url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
                break;
            case BUFFERING:
                ReactNativeAudioStreaming.stop();
                break;
        }
    }

    render() {


        return (
        <View style={{ flex: 1 }}>
         <Image
                  style={{width: 300, height: 300}}
                  source={{uri: this.props.image}}
          />

         <View  style={styles.container}>
            <Button title='Play' onPress={this.props.play}/>
             <Button title='Stop' onPress={this.props.back}/>

                <View style={styles.textContainer}>
                    <Text style={styles.songName}>{this.props.song}</Text>
                </View>
          </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#000033',
        borderTopWidth: 1,
    },
    textContainer: {
        flexDirection: 'column',
        margin: 10
    },
    textLive: {
        color: '#000',
        marginBottom: 5
    },
    songName: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000'
    }
});

Player.propTypes = {
    url: PropTypes.string.isRequired
};


