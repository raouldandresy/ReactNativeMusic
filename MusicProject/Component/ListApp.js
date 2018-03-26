import React from 'react';
import {View, FlatList, Button, Alert, TextInput, Dimensions,Text} from 'react-native';
import { ListItem } from 'react-native-material-ui';

export default class ListApp extends React.Component {


    constructor(props) {
        super(props);
        this.state = { data: [],text: ''};
        }


        loadResource = () =>{
       let author = this.state.text.trim();
        fetch('https://api.deezer.com/search?q='+author).then(function(response,error) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
          }).then(res => {
                this.setState({data: res.data});
            }).catch(function(error) { console.log(error); });
        }

         _renderItem = ({item,index}) => (
         <View style={{ flex: 1}}>
                    <ListItem
                      id={item.id}
                       divider
                       centerElement={{
                         primaryText: item.title,
                       }}
                      onPress={() => {this.props.goToTrack(item)}}
                    />
                    </View>
                  );


          render() {
          let { dim } = Dimensions.get("window");
            return (
            <View style={{flex: 1, height: dim}}>
            <TextInput
                 style={{height: 50,textAlign: 'center'}}
                 onChangeText={(text) => this.setState({text: text})}
                 value={this.state.text}
                 placeholder="Search and press the track"
             />
            <Button
              raised
              icon={{name: 'load', size: 32}}
              buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
              textStyle={{textAlign: 'center'}}
              title={`Search`}
               onPress={this.loadResource.bind(this)}
            />
             { this.props.enabled ? <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
              />
              : null }
                </View>
            );
          }


  }