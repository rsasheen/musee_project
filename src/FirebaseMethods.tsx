import * as firebase from "firebase/app";
import { collection, getFirestore, setDoc, getDoc, doc , updateDoc, DocumentSnapshot, collectionGroup, Query, limit, getDocs, query } from "@firebase/firestore";
import "firebase/firestore";
import {Alert} from "react-native";
import { firebaseConfig, userId } from "../config/keys";
import { CollectionReference, getDocsFromCache, QueryConstraint, where } from "firebase/firestore";
import { useRef } from "react";

const app = firebase.initializeApp(firebaseConfig);

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

  export async function updateUserInPrivateMode(userID: any) {
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
          }
        });
    } catch (err) {
      Alert.alert("There is something wrong with updateUserInPrivateMode!!!!");
    }
  }

export async function userIDExists(userID: any){
    const db = getFirestore();
    const userIdentity = (await getDoc(doc(db, "user",userID))).exists();

    if (userIdentity) {
      console.log("UID EXISTS!!! \n" + await JSON.stringify(userIdentity))
      return true
    } else {
      console.log("UID DOES NOT EXIST!!! \n" + await JSON.stringify(userIdentity))
      return false
    }
}

export async function getListOfUsersSongs(longitude: any, latitude: any, altitude: any, speed: any) {
  var proxL = 5,
  proxA = 3,
  proxS = 3,
  currUserLat = latitude,
  currUserLong = longitude,
  currUserAlt = altitude,
  currUserSpeed = speed 
  console.log("Inside getListOfUsersSongs")
  try {
    const db = getFirestore();
    // console.log("Queried firebase")
    
    
    const userRef = collection(db, "user")
    // console.log("Querying")
    console.log(JSON.stringify(userRef))
    const q = query(userRef, where("speed", '==', "9"),limit(4))
    // const q = query(userRef, where('location.lat ', '>=', currUserLat - proxL),
    //                          where('location.lat', '<=', currUserLat + proxL), limit(4))
                            //  , 
                            //  where('location.long ', '>=', currUserLong - proxL),
                            //  where('location.long', '<=', currUserLong + proxL),
                            //  where('location.alt ', '>=', currUserAlt - proxA),
                            //  where('location.long', '<=', currUserAlt + proxA),
                            //  where('speed ', '>=', currUserSpeed - proxS),
                            //  where('speed', '<=', currUserSpeed + proxS),
                            //  limit(4))
    // console.log("Queried")
    const querySnapshot = await getDocs(q);
    // console.log("Query Snapshot")
    
    if(querySnapshot.empty)
      console.log("querySnapshot is null")
    else { 
      console.log("querySnapshot is not null")
    // console.log(JSON.stringify(querySnapshot))
    // console.log(JSON.stringify(querySnapshot.metadata))
    // console.log(JSON.stringify(querySnapshot.docs))
      querySnapshot.forEach((doc) => {
         console.log("Here " , doc.id, " " , JSON.stringify(doc.data()))
    })}
    console.log("Done")
  }catch (err) {
      Alert.alert("There is something wrong in getListOfUsersSongs!!!!");
    }
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


