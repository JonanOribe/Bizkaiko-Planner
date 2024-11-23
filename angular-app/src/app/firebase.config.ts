// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB17Xgl5uI4wpdcEm-Nx5nfffR90-2qBT8",
  authDomain: "bizkaiko-planner.firebaseapp.com",
  projectId: "bizkaiko-planner",
  storageBucket: "bizkaiko-planner.firebasestorage.app",
  messagingSenderId: "31693441589",
  appId: "1:31693441589:web:67fb9e94f41b0d37e77f7c",
  measurementId: "G-RZ4SZ9D1S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
