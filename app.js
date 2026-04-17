// We use the web links (CDN) for the imports so the browser understands them
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your exact Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzCI_RU9eE-MIeR-2jcwaLRz74hmRqnuQ",
  authDomain: "gameoftame-7c63f.firebaseapp.com",
  projectId: "gameoftame-7c63f",
  storageBucket: "gameoftame-7c63f.firebasestorage.app",
  messagingSenderId: "829948418870",
  appId: "1:829948418870:web:02373ec1d4b170049fb197"
};

// Initialize Firebase and the Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// A function to test our connection by writing a fake player to the database
async function testConnection() {
    try {
        // We are telling it to go to the "players" folder and add this data
        const docRef = await addDoc(collection(db, "players"), {
            username: "TestPlayer01",
            coins: 500,
            inventory: ["Starter_Core"]
        });
        
        console.log("Document written with ID: ", docRef.id);
        
        // Update the screen so you know it worked
        document.getElementById("status-text").innerHTML = `
            <span style="color: #00ff00;">CONNECTION SUCCESSFUL!</span><br><br>
            Player created with ID: ${docRef.id}
        `;
    } catch (e) {
        console.error("Error adding document: ", e);
        
        // Update the screen if it fails
        document.getElementById("status-text").innerHTML = `
            <span style="color: #ff0000;">CONNECTION FAILED!</span><br><br>
            Did you start the Firestore Database in test mode?
        `;
    }
}

// Run the test
testConnection();
