import * as firebase from "firebase/app";
import { collection, getFirestore, setDoc, getDoc, doc , updateDoc, DocumentSnapshot} from "@firebase/firestore";
import "firebase/firestore";
import {Alert} from "react-native";

export async function createUser(userID: any, token: any) {
    try {
      
      const db = getFirestore();
  
      await setDoc(doc(db, "user", userID),
      {
          location: {
              alt: 0, 
              lat: 0,
              long: 0
          },
          speed: -1,
          songInfo: {
            URI: "", 
            songAlbum: "",
            songArtist: "",
            songTitle: ""
          },
          spotifyToken: token
        });
    } catch (err) {
      Alert.alert("There is something wrong with createUser!!!!");
    }
  }

export async function userIDExists(userID: any){
    console.log("Inside userIDExists");
    const db = getFirestore();
    console.log("Querying firebase")
    const userIdentity = (await getDoc(doc(db, "user",userID))).get(userID)
        // then((documentSnapshot: { exists: any; data: () => any; }) => {
        //     console.log('User exists: ', documentSnapshot.exists);
    
        //     if (documentSnapshot.exists) {
        //         console.log('User data: ', documentSnapshot.data());
        //         return JSON.stringify(documentSnapshot.data())
        //     }
        //     else {
        //         console.log('User does not exist!!');
        //         return "User does not exist!!"
        //         //set conig variable back to null and have user log in again (?) 
        //     }});
    console.log("Returning from userIDExists");
    return await JSON.stringify(userIdentity);
    // if(!userIdentity){
    //     console.log("User does not exist")
    //     return "User does not exist"
    // }
        
    // else{
    //     console.log("User does exist")
    //     return JSON.stringify(userIdentity);
    // }
        
}

export async function currentPosition(userID: any, longitude: any, latitude: any, altitude: any, speed: any) {
  try {
    
    const db = getFirestore();

    await updateDoc(doc(db, "user", userID),
    {
        location: {
            alt: altitude, 
            lat: latitude,
            long: longitude
        },
        speed: speed,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!");
  }
}

export async function currentSongUpdate(userID: any, URI: any, album: any, artist: any, title: any) {
    try {
      
      const db = getFirestore();
  
      await updateDoc(doc(db, "user", userID),
      {
          songInfo: {
              URI: URI, 
              songAlbum: album,
              songArtist: artist,
              songTitle: title
          }
        });
    } catch (err) {
      Alert.alert("There is something wrong!!!!");
    }
  }

export async function setSpotifyToken(userID: any, token: any) {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "user", userID),{ spotifyToken: token });
    } catch (err) {
      Alert.alert("There is something wrong!!!!");
    }
  }

export async function getSpotifyToken(userID: any){
    try {
        const db = getFirestore();
        const token = (await getDoc(doc(db, "user", userID))).get("spotifyToken");
        return token;
      } catch (err) {
        Alert.alert("There is something wrong!!!!");
      }
}
