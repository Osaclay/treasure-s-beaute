// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

      // Firebase configuration
      const firebaseConfig = {
        apiKey: "replace with apiKey",
        authDomain: "replace with authDomain",
        projectId: "replace with projectId",
        storageBucket: "replace with storgeBucket",
        messagingSenderId: "replace with messagingSenderId",
        appId: "replace with appId",
        measurementId: "replace with measurementId"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference for messages in Firebase
const contactFormDB = ref(database, "contactForm");

// Add event listener to the form
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Collect input values
  const name = document.getElementById("name").value;
  const emailid = document.getElementById("emailid").value;
  const msgContent = document.getElementById("msgContent").value;

  // Save the message to Firebase
  saveMessages(name, emailid, msgContent);

  // Alert the user that the message was sent
  alert("Your message has been sent successfully!");

  // Clear the form
  document.getElementById("contactForm").reset();
}

// Save the message to Firebase
function saveMessages(name, emailid, msgContent) {
  const newMessage = push(contactFormDB); // Create a unique entry
  set(newMessage, {
    name: name,
    email: emailid,
    message: msgContent,
  });
}

