require('dotenv').config();
export default {
  expo: {
    name: "chart-app",
    scheme:"chart-app",
    slug: "chart-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.makeathingsup.chartapp",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.makeathingsup.chartapp",
      versionCode: 1,
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png",
      redirectUrl:"chart-app://"
    },
    extra :{
        dev : process.env.ENV,
        projectUrl : process.env.PROJECT_URL,
        projectApiKey : process.env.PROJECT_API_KEY,
        googleClientId : process.env.GOOGLE_CLIENT_ID,
        googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
        SupabaseRedirectLink : process.env.REDIRECT_LINK_SUPABASE,
         ExpoRedirectLink: process.env.REDIRECT_LINK_EXPO
    },
    plugins :[
      "expo-secure-store"
    ]
  }
};