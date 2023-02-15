import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAHUM7B2HBkerR64PaCfJ9l7S7D8DT74RU',
  authDomain: 'final-project-itra.firebaseapp.com',
  projectId: 'final-project-itra',
  storageBucket: 'final-project-itra.appspot.com',
  messagingSenderId: '614036444890',
  appId: '1:614036444890:web:1ee8b473af3f2d50d777e3',
};

const app = initializeApp(firebaseConfig);
const storageImages = getStorage(app);

export default storageImages;
