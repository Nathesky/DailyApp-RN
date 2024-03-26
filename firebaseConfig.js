import { initializeApp, } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDpTF5QBba8o3UXirR0KvRtL_jzVvyV-Yw",
  authDomain: "daily-1d6f6.firebaseapp.com",
  projectId: "daily-1d6f6",
  storageBucket: "daily-1d6f6.appspot.com",
  messagingSenderId: "687684239417",
  appId: "1:687684239417:web:121eb086aa876bb23ccde8"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default firebaseConfig;