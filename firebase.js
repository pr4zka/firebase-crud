// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc

} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcz5nR6BsKTGpxmnszXyIxJ9v2LWDJck4",
  authDomain: "pr4zka-firebasw-crud.firebaseapp.com",
  projectId: "pr4zka-firebasw-crud",
  storageBucket: "pr4zka-firebasw-crud.appspot.com",
  messagingSenderId: "795825535112",
  appId: "1:795825535112:web:94f2fa66e744355b65473d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (title, description) =>
  addDoc(collection(db, "task"), { title, description });

export const getTask = () => getDocs(collection(db, "task"));
export const onGetTask = (callback) => onSnapshot(collection(db, "task"), callback);
export const deleteTask = (id) => deleteDoc(doc(db, "task", id));
export const getTasks = (id) => getDoc(doc(db, "task", id));
export const updateTask = (id, newFields) => updateDoc(doc(db, 'task', id), newFields);