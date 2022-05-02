1. Download the project from GitHub
2. Start a new expo project (musee-test) in your local as a blank TypeScript project
3. Copy the following files from the git project to the new expo project 
  - App.tsx
  - app.json
  - package.json
  - src folder
  - tsconfig.json

  - for the config/keys.js file - this is specific to your firebase-firestore account. We set up our account using the follwoing link: https://medium.com/swlh/expo-firebase-authentication-cloud-firestore-using-async-await-react-hooks-700920ad4b2b . This link specifies how to add the keys.js file in the config folder. Currently this file is empty on this github repository for security purposes.

4. Navigate to the folder of the project - "cd musee-test/"
5. Run - "yarn install" - This installs all the node-modules
6. Update the following properties in the src/screen/Login.tsx with the details from your Spotify Application Development Dashboard:
  - CLIENT_ID
  - CLIENT_SECRET
  - REDIRECT_URI (this will be the same as your exp://xxx.xxx.x.xx:xxxxx URL from the terminal when your project runs - it can be found on the line where it tells you 'Metro waiting on ...')

7. Run - "npm start" and deploy the application either on an emulator or on the Expo Go App on your phone

References:

Spotify OAuth Authentication:
1. OAuth logging for Spotify: https://docs.expo.dev/guides/authentication/#spotify
2. Existing project where Spotify OAuth is currently being used: https://github.com/adityakmr7/spotify-clone 

Global variable:
1. https://stackoverflow.com/questions/44125398/how-can-i-declare-a-global-variable-in-typescript 

Firestore documentation:
1. https://firebase.google.com/docs/firestore/manage-data/add-data
2. https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection

Firestore set up:
1. https://medium.com/swlh/expo-firebase-authentication-cloud-firestore-using-async-await-react-hooks-700920ad4b2b

Using firestore with expo:
1. https://medium.com/techtalkers/setting-up-firebase-with-react-native-expo-b9c9eddb8c8b 

Creating firebase admin SDK:
1. https://firebase.google.com/docs/admin/setup#initialize-sdk 

Spotify auth with firebase:
1. https://github.com/firebase/functions-samples/tree/main/spotify-auth 

Firebase reading and writing: 
1. https://docs.expo.dev/guides/using-firebase/

Realtime updates/snapshots/remove data:
1. https://rnfirebase.io/firestore/usage

Change to lock mode from test mode:
1. https://firebase.google.com/docs/database/web/start

Firebase queries:
1. https://firebase.google.com/docs/firestore/query-data/queries

Firebase/firestore documentation for Typescript:
1. https://firebase.google.com/docs/reference/js/firestore_

Using await:
1. https://stackoverflow.com/questions/54495711/async-await-vs-then-which-is-the-best-for-performance 

Location: 
1. https://docs.expo.dev/versions/latest/sdk/location/ 

Getting location with expo: 
1. https://www.youtube.com/watch?v=UcWG2o2gVzw

Toggle button:
1. https://docs.expo.dev/versions/latest/react-native/switch/
2. https://aboutreact.com/react-native-switch/

Intervals:
1. https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks

General concepts: - Use Effects and waiting for promises
1. https://reactjs.org/docs/hooks-effect.html



UI:
1. https://callstack.github.io/react-native-paper/banner.html
2. https://docs.expo.dev/guides/userinterface/
3. https://snack.expo.dev/@aboutreact/safeareaview-example?session_id=snack-session-izmjLQumT
4. https://stackoverflow.com/questions/29447715/react-native-fixed-footer
5. https://docs.expo.dev/versions/latest/react-native/safeareaview/
6. https://flaviocopes.com/jsx-return-multiple-elements/
7. https://vegibit.com/rendering-a-list-with-react/

UI Header:
1. https://callstack.github.io/react-native-paper/appbar-header.html

Changing header color:
1. https://stackoverflow.com/questions/64588933/react-native-paper-header-appbar-content-issue

Pull down to refresh:
1. https://reactnative.dev/docs/refreshcontrol

Text alignment:
1. https://stackoverflow.com/questions/35049262/difference-between-justify-content-vs-align-items

JSONs:
1. https://stackoverflow.com/questions/51633120/react-native-local-json-file
2. https://www.geeksforgeeks.org/how-to-add-data-in-json-file-using-node-js/

Accessing vars outside use effect hooks:
1. https://stackoverflow.com/questions/57842928/react-functional-component-how-to-access-variables-from-outside-useeffect

Linking:
1. https://stackoverflow.com/questions/30540252/how-does-one-display-a-hyperlink-in-react-native-app




