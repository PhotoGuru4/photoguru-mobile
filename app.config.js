export default {
  expo: {
    name: "photoguru-mobile",
    slug: "photoguru-mobile",
    version: "1.0.0",
    owner: "holykimsa",

    android: {
      package: "com.holykimsa.photoguru"
    },

    extra: {
      eas: {
        projectId: "b65412a7-df5c-4596-a861-07303c2b2bae"
      },

      apiUrl: process.env.EXPO_PUBLIC_API_URL,

      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket:
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId:
        process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
};