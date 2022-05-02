import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import { isAuthenticatedUser } from "./src/screens/Login";
import GeoLocation from "./src/Location";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/keys';

const Stack = createStackNavigator();

var listOfSongs;

export default function App() {
  console.log(isAuthenticatedUser());
  if (!firebase.getApps().length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <NavigationContainer>
        <Stack.Navigator>
        {!true ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
            ) : (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={GeoLocation}
              />
            )}

      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
