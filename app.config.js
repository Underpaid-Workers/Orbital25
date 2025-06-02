import 'dotenv/config'; // Make sure this is at the very top!

export default ({ config }) => {
  // Access the current 'expo' object from the config provided by Expo
  const currentExpoConfig = config.expo || {};

  // Access any existing 'extra' properties, ensuring it's an object even if initially null/undefined
  const existingExtra = currentExpoConfig.extra || {};

  return {
    expo: {
      extra: {
        ...existingExtra, 
        "eas": {
          "projectId": "357f90cc-93b8-4c08-ad3d-833ebbf6d71a"
        },
        hfToken: process.env.HF_TOKEN,
        hfModelUrl: process.env.HF_MODEL_URL,
      },
       "name": "Orbital25",
       "slug": "Orbital25",
       "version": "1.0.0",
       "orientation": "portrait",
       "icon": "./assets/images/AppIcon.png",
       "scheme": "orbital25",
       "userInterfaceStyle": "automatic",
       "newArchEnabled": true,
       "ios": {
         "supportsTablet": true
       },
       "android": {
        "package": "com.underpaidworkers.ecodex",
         "adaptiveIcon": {
           "foregroundImage": "./assets/images/AppIcon.png",
           "backgroundColor": "#ffffff",
         },
         "edgeToEdgeEnabled": true,
         hfToken: process.env.HF_TOKEN,
         hfModelUrl: process.env.HF_MODEL_URL,
       },
       "web": {
         "bundler": "metro",
         "output": "static",
         "favicon": "./assets/images/favicon.png"
       },
       "plugins": [
         "expo-router",
         [
           "expo-splash-screen",
           {
             "image": "./assets/images/AppIcon.png",
            "imageWidth": 200,
             "resizeMode": "contain",
             "backgroundColor": "#ffffff"
           }
         ],
         "expo-font"
       ],
       "experiments": {
         "typedRoutes": true
       }
    }
  };
};