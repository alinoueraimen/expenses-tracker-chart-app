require('dotenv').config();
export default {
  expo: {
    name: "chart-app",
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
      favicon: "./assets/favicon.png"
    },
    extra :{
        dev : process.env.ENV
    }
    
  }
};