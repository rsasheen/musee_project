import * as firebase from "firebase/app";
import { collection, getFirestore, setDoc, getDoc, doc , updateDoc, DocumentSnapshot, collectionGroup, Query, limit, getDocs, query } from "@firebase/firestore";
import "firebase/firestore";
import {Alert} from "react-native";
import { firebaseConfig, userId } from "../config/keys";
import { CollectionReference, deleteDoc, getDocsFromCache, onSnapshot, QueryConstraint, where } from "firebase/firestore";
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
      Alert.alert("Error in createUser!!!!");
    }
  }

  export async function updateUserInPrivateMode(userID: any) {
    try {
      
      const db = getFirestore();
  
      await updateDoc(doc(db, "user", userID),
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
      Alert.alert("Error in updateUserInPrivateMode!!!!");
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
  var listOfSongs: any[][] = [];
  
  try {
    const db = getFirestore();

    
    const userRef = collection(db, "user")
    
    const q = query(userRef, limit(4))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      var localList = []
        if(doc.data().location.alt >= (currUserAlt - proxA) && doc.data().location.alt <= (currUserAlt+ proxA)){
              if (doc.data().location.lat >= (currUserLat - proxL) && doc.data().location.lat <= (currUserLat+ proxL) ){
                if (doc.data().location.long >= (currUserLong - proxL) && doc.data().location.long <= (currUserLong+ proxL) ){
                  if ( doc.data().speed >= (currUserSpeed - proxS) && doc.data().speed <= (currUserSpeed + proxS)){
                      
                      localList.push(doc.data().songInfo.songTitle)
                      localList.push(doc.data().songInfo.songArtist)
                      localList.push(doc.data().songInfo.songAlbum)
                      localList.push(doc.data().songInfo.URI)
                      listOfSongs.push(localList)

                    
                  }
                }
              }
        }
    })
    
  }catch (err) {
      Alert.alert("There is something wrong in getListOfUsersSongs!!!!");
    }
    
    return (listOfSongs);
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
    Alert.alert("There is something wrong in currentPosition!!!!");
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
      Alert.alert("Error in currentSongUpdate!!!!");
    }
  }

export async function setSpotifyToken(userID: any, token: any) {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "user", userID),{ spotifyToken: token });
    } catch (err) {
      Alert.alert("Error in setSpotifyToken!!!!");
    }
  }

export async function getSpotifyToken(userID: any){
    try {
        const db = getFirestore();
        const token = (await getDoc(doc(db, "user", userID))).get("spotifyToken");
        return token;
      } catch (err) {
        Alert.alert("Error in getSpotifyToken!!!!");
      }
}

//DELETE USER WHEN DELETE ACC
export async function deleteRecord(userID: any){
  try {
    const db = getFirestore();
    const token = (await deleteDoc(doc(db, "user", userID)))
  } catch (err) {
    Alert.alert("Error in deleteRecord!!!!");
  }
} 


