import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Switch, SafeAreaView, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleButton } from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import { Banner } from 'react-native-paper';
import { List, Divider } from 'react-native-paper';

import { initializeApp } from "firebase/app";
import { firebaseConfig, userId } from "../config/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jsonConfig from "../functions/service-account.json";
import { color } from 'react-native-reanimated';
import { backgroundColor } from '@shopify/restyle';

import { currentPosition, currentSongUpdate, getListOfUsersSongs, getSpotifyToken } from './FirebaseMethods';
import { EllipsizeProp } from 'react-native-paper/lib/typescript/types';

// import {listOfSongs} from "../config/global";


const {width: wWidth, height: wHeight} = Dimensions.get("window");

var latitude: any, longitude: any, altitude: any, speed: any;

var songList: any;


export async function getListOfSongs(songs:any){
  songList = songs
}

const GeoLocation: React.FC = () =>  {

const [isEnabled, setVisuals] = useState(false); 
const [visible, setVisible] = useState(true);
let listOfSongs = useRef({});


const storeFireBaseConfigs = async() => {
  try{
    await AsyncStorage.setItem('@firebaseConfig', JSON.stringify(jsonConfig));
  }
  catch(e){
    console.log("Error: ", e);
  }
}

const fireBaseSetUp = initializeApp(firebaseConfig);

const toggleSwitch = (value: boolean | ((prevState: boolean) => boolean)) => {
    setVisuals(value);
  };

useEffect(() => {
    const interval = setInterval(() => {
        if(isEnabled){
        (async () => {
            console.log("Inside async call")
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                  console.log('Permission to access location was denied');
                  return;
                }
            let location = await Location.getCurrentPositionAsync({});
            
            currentPosition("dfxghh", location.coords.longitude, 
              location.coords.latitude, 
              location.coords.altitude, 
              location.coords.speed);

            getCurrentSong(await getSpotifyToken("dfxghh"));
            displaySong();

          })();}
      }, 10000);
      return () => clearInterval(interval);
  }, [isEnabled]);

  function displaySong(){

    console.log("Looping through listOfSongs")
    let parsedListOfSongs = listOfSongs.current as unknown as Array<Array<String>>
    if( parsedListOfSongs[0] != null){
      return parsedListOfSongs;
    }
    else{
      console.log("No songs nearby")
      return [["NO SONGS NEARBY"]];
    }
  }

  useEffect(() => {
    console.log("Second useEffect");
    const interval = setInterval(() => {
        if(isEnabled){
          
          (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                  console.log('Permission to access location was denied');
                  return;
                }
            let location = await Location.getCurrentPositionAsync({});
            
            longitude = location.coords.longitude, 
            latitude = location.coords.latitude, 
            altitude = location.coords.altitude, 
            speed = location.coords.speed

            listOfSongs.current = await getListOfUsersSongs(longitude, latitude, altitude, speed)

            
          })();}
      }, 10000);
      return () => clearInterval(interval);
  }, [isEnabled]);

  async function getCurrentSong(access_token: any) {
    try{
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=ES', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      }).then((response) => {
        console.log(access_token)
        if(JSON.stringify(response.status) == '200'){
          console.log(response.json().then(
            (data) => { 
              currentSongUpdate("dfxghh", data.item.uri, data.item.album.name, data.item.artists[0].name, data.item.name);
            }
          ));
        }
        else{
          console.log("There is no song playing");
        }
      })
    ;
    }
    catch(e){
      console.log("Error: ", e);
    }
  }

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        {displaySong().map(listitem => (
            <List.Item
              title={listitem[0]}
              description={listitem[1]}
              />
          ))}

        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <Text>{(listOfSongs as unknown as Array<Array<String>>)!=undefined? (listOfSongs as unknown as Array<Array<String>>)[0]+"Hello" : "Empty"}</Text>
          <Banner style={{flex:1,justifyContent:'flex-end',alignItems:'center'}} visible={visible}
          actions={[]}>
             Musée broadcasts your music to everyone nearby.
             
          </Banner>
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', backgroundColor:'#ffffff'}}>
            <Text>{isEnabled ? 'Share' : 'Private'}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#95de62' }}
              thumbColor={isEnabled ? '#ffffff' : '#000000'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
     
          </View>
        </View>
      </View>
  </SafeAreaView>
      
  );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });

  export default GeoLocation;

