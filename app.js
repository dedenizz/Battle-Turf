// Firebase temel modüllerini (CDN üzerinden) içeri aktarıyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"; 

// Firebase Yapılandırman (Birebir seninki)
const firebaseConfig = {
  apiKey: "AIzaSyCzCI_RU9eE-MIeR-2jcwaLRz74hmRqnuQ",
  authDomain: "gameoftame-7c63f.firebaseapp.com",
  projectId: "gameoftame-7c63f",
  storageBucket: "gameoftame-7c63f.firebasestorage.app",
  messagingSenderId: "829948418870",
  appId: "1:829948418870:web:02373ec1d4b170049fb197"
};

// 1. Firebase, Veritabanı ve Kimlik Doğrulama (Auth) sistemlerini başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

// 2. index.html ve carrier.html'in kullanabilmesi için bunları "window" (küresel) objesine aktar
window.db = db;
window.auth = auth;
window.collection = collection;
window.getDocs = getDocs;
window.setDoc = setDoc;
window.doc = doc;
window.addDoc = addDoc;

// 3. OTO-GİRİŞ SİSTEMİ (Güvenlik kurallarındaki "request.auth != null" kilidini açar)
// Sayfa yüklendiği anda arka planda oyuncuya anonim bir kimlik veriyoruz.
signInAnonymously(auth)
  .then((userCredential) => {
      // Başarılı olursa konsola bilgi ver
      const uid = userCredential.user.uid;
      console.log("Sistem Aktif: Gizli kimlik doğrulandı! UID:", uid);
  })
  .catch((error) => {
      // Hata olursa konsola yazdır (Genellikle Rules veya Firebase ayarlarından kaynaklanır)
      console.error("Kimlik doğrulama hatası:", error.code, error.message);
  });
