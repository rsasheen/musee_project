1. Download the project from GitHub
2. Start a new expo project (musee-test) in your local as a blank TypeScript project
3. Copy the following files from the git project to the new expo project 
  - App.tsx
  - app.json
  - package.json
  - src folder
  - tsconfig.json

4. Navigate to the folder of the project - "cd musee-test/"
5. Run - "yarn install" - This installs all the node-modules
6. Update the following properties in the src/screen/Login.tsx with the details from your Spotify Application Development Dashboard:
  - CLIENT_ID
  - CLIENT_SECRET
  - REDIRECT_URI (this will be the same as your exp://xxx.xxx.x.xx:xxxxx URL from the terminal when your project runs - it can be found on the line where it tells you 'Metro waiting on ...')

7. Run - "npm start" and deploy the application either on an emulator or on the Expo Go App on your phone



References for the Spotify OAuth Authentication:
1. OAuth logging for Spotify: https://docs.expo.dev/guides/authentication/#spotify
2. Existing project where Spotify OAuth is currently being used: https://github.com/adityakmr7/spotify-clone 
