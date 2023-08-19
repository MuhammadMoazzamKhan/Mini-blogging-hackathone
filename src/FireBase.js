
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6j1BRrc6UnCSs4ljiZGKiZi9NM15jzFg",
  authDomain: "hakaton-49213.firebaseapp.com",
  projectId: "hakaton-49213",
  storageBucket: "hakaton-49213.appspot.com",
  messagingSenderId: "847469977799",
  appId: "1:847469977799:web:798c560d53ac9c23011ee2",
  measurementId: "G-SN4GT921GP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export {analytics , app};