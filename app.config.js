import 'dotenv/config'; // Make sure this is at the very top!

export default ({ config }) => {
  // Access the current 'expo' object from the config provided by Expo
  const currentExpoConfig = config.expo || {};

  // Access any existing 'extra' properties, ensuring it's an object even if initially null/undefined
  const existingExtra = currentExpoConfig.extra || {};

  return {
    ...config, // Spread all existing top-level properties from the base config (e.g., hostUri if present)

    // Explicitly define the 'expo' property and structure its content
    expo: {
      // First, spread all existing properties from the 'expo' object (name, slug, plugins, etc.)
      ...currentExpoConfig,

      // Now, define the 'extra' property *inside* 'expo'
      extra: {
        ...existingExtra, 
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
         "adaptiveIcon": {
           "foregroundImage": "./assets/images/AppIcon.png",
           "backgroundColor": "#ffffff"
         },
         "edgeToEdgeEnabled": true
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
             "image": "./assets/images/splash-icon.png",
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