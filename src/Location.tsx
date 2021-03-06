import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Switch, SafeAreaView, FlatList, Linking, RefreshControl, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, ToggleButton } from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import { Banner } from 'react-native-paper';
import { List, Divider } from 'react-native-paper';

import { initializeApp } from "firebase/app";
import { firebaseConfig, userId } from "../config/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { color } from 'react-native-reanimated';
import { backgroundColor } from '@shopify/restyle';

import { currentPosition, currentSongUpdate, getListOfUsersSongs, getSpotifyToken, updateUserInPrivateMode } from './FirebaseMethods';
import { EllipsizeProp } from 'react-native-paper/lib/typescript/types';


const {width: wWidth, height: wHeight} = Dimensions.get("window");

var latitude: any, longitude: any, altitude: any, speed: any;

const wait = (timeout: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const GeoLocation: React.FC = () =>  {

const [isEnabled, setVisuals] = useState(false); 
const [visible, setVisible] = useState(true);
let listOfSongs = useRef({});


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
            
            currentPosition("60609522", location.coords.longitude, 
              location.coords.latitude, 
              location.coords.altitude, 
              location.coords.speed);

            getCurrentSong(await getSpotifyToken("60609522"));

          })();}
          else 
            updateUserInPrivateMode("60609522")
      }, 10000);
      return () => clearInterval(interval);
  }, [isEnabled]);

  function displaySong(){

    console.log("Looping through listOfSongs")
    let parsedListOfSongs = listOfSongs.current as unknown as Array<Array<String>>
    if(isEnabled){
      if(parsedListOfSongs[0] != null){
        console.log(parsedListOfSongs)
        return parsedListOfSongs;
      }
      else{
        console.log("No songs nearby")
        return [["NO SONGS NEARBY","","","::"]];
      }
    }
    else{
      return [["PRIVATE MODE ON, TURN OFF TO DISPLAY","","","::"]];
    }
  }

  useEffect(() => {
    
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
            console.log(listOfSongs)

            
          }
          )();
        }
        else 
          updateUserInPrivateMode("60609522")
      }, 5000);
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
        
        if(JSON.stringify(response.status) == '200'){
          console.log(response.json().then(
            (data) => { 
              currentSongUpdate("60609522", data.item.uri, data.item.album.name, data.item.artists[0].name, data.item.name);
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

  const [Refresh, setRefresh] = useState(false); 
  const changeRefresh = (value: boolean | ((prevState: boolean) => boolean)) => {
    setRefresh(value);
  };

  useEffect(() => {
    console.log("refresh UseEffect");
    (async () => {
      console.log("INSIDE REFRESH")
      listOfSongs.current = await getListOfUsersSongs(longitude, latitude, altitude, speed)

    })();
  }, [Refresh]);

const [, updateState] = useState(useRef({}));


const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

 
type row = "row"
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View>
      <Appbar.Header style={{backgroundColor: '#1DB954'}}>
        <Appbar.Content title='Songs Playing Near You' subtitle="Pull down to refresh"/>
        
      </Appbar.Header>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {displaySong().map(listitem => (
            <View style={{flexDirection:"row", alignItems: 'center', justifyContent: 'center', width:'100%'}}>
      
              <Button mode="outlined" style={{flexWrap:'wrap', alignItems: 'center', width:'100%', justifyContent: 'center', backgroundColor: '#fafafa', borderRadius: 10, marginVertical:10}} 
                  onPress={() => Linking.openURL('https://open.spotify.com/track/'+listitem[3].split(":")[2])}
                  contentStyle={{height:44}}
                  
              >
                  
                {listitem[0]} | {listitem[1]}
              
              </Button>
            
            </View>
            
          ))}
          </ScrollView>
          
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        
          <Banner style={{flex:1,justifyContent:'flex-end',alignItems:'center'}} visible={visible}
          actions={[]}>
             Mus??e broadcasts your music to everyone nearby.
             
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
  </SafeAreaView>
      
  );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'white'
    },
  });
  

  export default GeoLocation;
