import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";


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

// Initialize Firebase app and auth services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes("signup.html")) {
    handleSignupForm();
  } else if (currentPage.includes("login.html")) {
    handleLoginForm();
  } else if (currentPage.includes("account.html")) {
    handleAccountPage();
  }

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User logged in:', user);
    } else {
      console.log('User logged out');
    }
  });
});

// Handle form submission for signup
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      const fullName = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      // Validate form fields
      if (!fullName || !email || !password) {
        alert('Please fill in all fields');
        return;
      }

      try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);

        // After the user is successfully signed up, update the displayName
        const user = userCredential.user;

        // Make sure the user object is properly initialized before updating the profile
        if (user) {
          // Update the displayName using Firebase's updateProfile method
          await updateProfile(user, { displayName: fullName });

          // Ensure the user profile was updated
          console.log('User display name updated:', user.displayName);
        } else {
          console.error('User object is not valid.');
        }

        // Redirect to account.html after successful signup
        alert('Signup successful! Redirecting to your home page.');
        window.location.href = 'index.html'; // Redirect to home page after successful signup
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up: ' + error.message);
      }
    });
  } else {
    console.error("Signup form (#signup-form) not found in the DOM.");
  }
});


// Login form logic
function handleLoginForm() {
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        loginForm.reset();
        window.location.href = 'index.html'; // Redirect to the dashboard after successful login
      } catch (error) {
        console.error('Login failed:', error.message);
        alert('Login failed: ' + error.message);
      }
    });
  }
}

// Account page logic (for logout)
function handleAccountPage() {
  const logoutBtn = document.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        console.log('User logged out');
        window.location.href = 'login.html'; // Redirect to login page
      }).catch((error) => {
        console.error('Error logging out:', error);
      });
    });
  }

  // Display user info in the account page (e.g., name, email)
  const accountInfo = document.querySelector('.account-info');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      accountInfo.querySelector('span:nth-child(1)').innerText = user.displayName || "N/A";
      accountInfo.querySelector('span:nth-child(2)').innerText = user.email;
    } else {
      window.location.href = 'login.html'; // If no user, redirect to login
    }
  });
}

// Error handler for Firebase Auth errors
function handleAuthError(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      alert('Email already in use. Please try logging in instead.');
      break;
    case 'auth/weak-password':
      alert('Password must be at least 6 characters long.');
      break;
    default:
      alert('Error: ' + error.message);
  }
}



// Assuming you already have a signup function with email and password
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Now set the displayName after the user is created
    await updateProfile(userCredential.user, {
      displayName: name
    });

    console.log('User signed up and display name set:', userCredential.user);
    // Redirect to account page after successful signup
    window.location.href = 'index.html'; // Or wherever you want the user to go
  } catch (error) {
    console.error('Error signing up:', error);
    alert('Signup failed: ' + error.message);
  }
});


