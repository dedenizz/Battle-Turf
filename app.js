import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzCI_RU9eE-MIeR-2jcwaLRz74hmRqnuQ",
  authDomain: "gameoftame-7c63f.firebaseapp.com",
  projectId: "gameoftame-7c63f",
  storageBucket: "gameoftame-7c63f.firebasestorage.app",
  messagingSenderId: "829948418870",
  appId: "1:829948418870:web:02373ec1d4b170049fb197"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Fonksiyonları index.html'den erişilebilir yapıyoruz
window.db = db;
window.auth = auth;
window.provider = provider;
window.signInWithPopup = signInWithPopup;
window.onAuthStateChanged = onAuthStateChanged;

// EKSİK OLAN VE EKLENEN KISIM BURASI:
window.doc = doc;
window.getDoc = getDoc;
window.setDoc = setDoc;
window.getDocs = getDocs;
window.collection = collection;
