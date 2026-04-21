// We use the web links (CDN) for the imports so the browser understands them
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// YENİ: getDocs buraya eklendi
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"; // YENİ: Auth eklendi

// Your exact Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzCI_RU9eE-MIeR-2jcwaLRz74hmRqnuQ",
  authDomain: "gameoftame-7c63f.firebaseapp.com",
  projectId: "gameoftame-7c63f",
  storageBucket: "gameoftame-7c63f.firebasestorage.app",
  messagingSenderId: "829948418870",
  appId: "1:829948418870:web:02373ec1d4b170049fb197"
};

// Initialize Firebase, Database and Auth
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // YENİ: Auth başlatıldı

// ---------------------------------------------------------
// 🔥 EN ÖNEMLİ KISIM: KAPSAM (SCOPE) ÇÖZÜMÜ
// index.html ve diğer dosyaların bu fonksiyonlara erişebilmesi
// için onları tarayıcının "window" (küresel) objesine atıyoruz.
// ---------------------------------------------------------
window.db = db;
window.collection = collection;
window.getDocs = getDocs;
window.addDoc = addDoc;


// A function to test our connection by writing a fake player to the database
async function testConnection() {
    try {
        // YENİ: Güvenlik kurallarını aşmak için önce gizli bir kimlik alıyoruz
        await signInAnonymously(auth);

        // We are telling it to go to the "players" folder and add this data
        const docRef = await addDoc(collection(db, "players"), {
            username: "TestPlayer01",
            coins: 500,
            inventory: ["Starter_Core"]
        });
        
        console.log("Document written with ID: ", docRef.id);
        
        // Update the screen so you know it worked
        const statusElement = document.getElementById("status-text");
        if(statusElement) {
            statusElement.innerHTML = `
                <span style="color: #00ff00;">BAĞLANTI BAŞARILI! (GİZLİ KİMLİK ONAYLANDI)</span><br><br>
                Player created with ID: ${docRef.id}
            `;
        }
    } catch (e) {
        console.error("Error adding document: ", e);
        
        // Update the screen if it fails
        const statusElement = document.getElementById("status-text");
        if(statusElement) {
            statusElement.innerHTML = `
                <span style="color: #ff0000;">BAĞLANTI FAILED!</span><br><br>
                Güvenlik kurallarında veya Authentication ayarlarında bir sorun var.
            `;
        }
    }
}

// Run the test
testConnection();
