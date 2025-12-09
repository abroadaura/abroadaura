// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_API_KEY,
//   authDomain:import.meta.env.VITE_API_AUTH_DOMAIN,
//   databaseURL : "https://console.firebase.google.com/project/abroad-aura-official/database/abroad-aura-official-default-rtdb/data/~2F?fb_gclid=Cj0KCQiArt_JBhCTARIsADQZayld0x60qfWXMlriZ5YHelz_clh3CfYEHeVGvhQrMU3yzMkOD_Cf0hQaAuULEALw_wcB",
//   projectId:import.meta.env.VITE_API_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_API_STORAGE_BUCKET ,
//   messagingSenderId:import.meta.env.VITE_API_MESSAGING_SENDER_ID ,
//   appId:import.meta.env.VITE_API_APP_ID ,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)
// export const googleAuth =new GoogleAuthProvider()

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_API_DATABASE_URL,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getDatabase(app);

