import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_cAjH-HT_tMMME4bOKjz-QWv-QnsmVnk",
  authDomain: "studio-3271680583-3e41a.firebaseapp.com",
  projectId: "studio-3271680583-3e41a",
  storageBucket: "studio-3271680583-3e41a.firebasestorage.app",
  messagingSenderId: "31890906269",
  appId: "1:31890906269:web:e1fd505b54ede703924874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
