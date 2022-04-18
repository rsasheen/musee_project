import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Switch } from 'react-native';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleButton } from 'react-native-paper';
import GetLocation from 'react-native-get-location';

const {width: wWidth, height: wHeight} = Dimensions.get("window");

const GeoLocation = () =>  {
const [isEnabled, setVisuals] = useState(false); 

const toggleSwitch = (value: boolean | ((prevState: boolean) => boolean)) => {
    setVisuals(value);
    console.log(isEnabled)
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
            console.log(location)
          })();}
      }, 6000);
      return () => clearInterval(interval);
  }, [isEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
        if(isEnabled){
            console.log("Second useEffect");
        }
      }, 10000);
      return () => clearInterval(interval);
  }, [isEnabled]);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>{isEnabled ? 'Sharing Enabled' : 'Sharing Disabled'}</Text>
      <Switch
      trackColor={{ false: '#767577', true: '#95de62' }}
      thumbColor={isEnabled ? '#ffffff' : '#000000'}
      ios_backgroundColor="#3e3e3e"
      value={isEnabled}
      onValueChange={toggleSwitch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default GeoLocation;