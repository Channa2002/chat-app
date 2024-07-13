// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyAEKHJ2uzmkZFdXTDj64xx1QWoSmrTo6jY",
//   authDomain: "chat-app-8682b.firebaseapp.com",
//   projectId: "chat-app-8682b",
//   storageBucket: "chat-app-8682b.appspot.com",
//   messagingSenderId: "464782773393",
//   appId: "1:464782773393:web:4961b74b1887f2106c0330",
//   measurementId: "G-79MLT4JG45"
// };

// async function getAuthApp() {
//     const firebaseApp = await initializeApp(firebaseConfig);
//     const auth = await getAuth(firebaseApp);
//     return auth;
// }

// export default getAuthApp;






// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEKHJ2uzmkZFdXTDj64xx1QWoSmrTo6jY",
    authDomain: "chat-app-8682b.firebaseapp.com",
    projectId: "chat-app-8682b",
    storageBucket: "chat-app-8682b.appspot.com",
    messagingSenderId: "464782773393",
    appId: "1:464782773393:web:4961b74b1887f2106c0330",
    measurementId: "G-79MLT4JG45"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export { auth, app };
