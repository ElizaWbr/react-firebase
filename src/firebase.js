import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAwMnihyFc9hajw2BD_Pd83OccWh77NvxA",
    authDomain: "curso-udemy-react-b2025.firebaseapp.com",
    projectId: "curso-udemy-react-b2025",
    storageBucket: "curso-udemy-react-b2025.appspot.com",
    messagingSenderId: "436159957141",
    appId: "1:436159957141:web:74b6dadf260285fb55b39c",
    measurementId: "G-5WJ6MFQ30B"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };