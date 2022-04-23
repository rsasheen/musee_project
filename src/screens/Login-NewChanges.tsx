import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createUser, setSpotifyToken, userIDExists } from "./../FirebaseMethods";
import { setUpUserID, userId } from "../../config/keys";
import uID from "../../config/userID.json";

WebBrowser.maybeCompleteAuthSession();

var authenticatedUser = false;

const {width: wWidth, height: wHeight} = Dimensions.get("window");
export default function Login() {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  
  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "<>",
    clientSecret: "<>",
    scopes: ["user-read-currently-playing"],
    usePKCE: false,
    redirectUri: "<>"
  }, discovery);

  useEffect(() => {
    if(response?.type === "success"){
      authenticatedUser = true;
      const {access_token} = response.params;
      
      if(userId != null){
        var min = Math.ceil(0);
	      var max = Math.floor(100000000);
        var id = Math.floor(Math.random() * (max - min + 1)) + min; 
        console.log("USER ID IS NULL: " + JSON.stringify(id));
        createUser(JSON.stringify(id), access_token);
        setUpUserID(JSON.stringify(id))
      }
      else{
       checkExistsUser() 
       checkIfUserJsonSet()
      }
      // callApi(access_token);
    }
    else{
      console.log('Failed to setup with login. Trying Again');
    }
  }, [response]);


  async function checkExistsUser(){
    // console.log("Inside Login.tsx else block: ") 
    try{
      // console.log(await userIDExists("15746922")); // User exists
      console.log(await userIDExists("123456"));  // User does not exists
    }catch(e){
      console.log("Error: ", e);
    }
    // console.log("After the async call for userID")
  }

  async function checkIfUserJsonSet(){
    if(Object.keys(uID).length === 0)
      console.log("User json is empty");
    else
      console.log("User json is has: " + Object.keys(uID));
  }



  const storeToken = async(accessToken: string) => {
    try{
      await AsyncStorage.setItem('@access_token', accessToken);
    }
    catch(e){
      console.log("Error: ", e);
    }
  }

  const callApi = async(access_token: string) => {
    try{
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=ES', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      }).then((response) => {
        console.log(response.json().then(
            (data) => { console.log(
              "\n\n",
              "\nSong Name: ", data.item.name, 
              "\nAlbum Name: ", data.item.album.name, 
              "\nMain Artist Name: ", data.item.artists[0].name, 
              "\nTrack URI: ", data.item.uri, 
              "\n\n") 
            }
        ));
    });
    }
    catch(e){
      console.log("Error: ", e);
    }
  }

  var token = AsyncStorage.getItem("@access_token");
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View style={{backgroundColor:'#1DB954', width:wWidth*0.7, padding:15, alignItems: "center", justifyContent: "center"}}>
            <Text>Login to Spotify</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function isAuthenticatedUser(){
  if(authenticatedUser)
    return true;
  return false;
}
