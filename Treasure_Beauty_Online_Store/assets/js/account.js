// Import Firebase Auth functions
import { getAuth, updatePassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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

// Initialize Firebase app before accessing services
const app = initializeApp(firebaseConfig);

// Initialize Firebase services after app is initialized
const auth = getAuth(app);
const db = getFirestore(app);

// Restrict access to the account page and handle the user state
auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("User is logged in:", user);

    // Display user info
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    // Show the user's name and email, or a fallback if the name is not set
    if (userNameElement && userEmailElement) {
      userNameElement.innerText = user.displayName || "No name set"; // Show name or a default message
      userEmailElement.innerText = user.email;
    } else {
      console.error('User name or email element not found in the DOM');
    }

    // Fetch and display user orders
    await displayUserOrders(user.uid);

    // Set up the logout button
    const logoutBtn = document.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          console.log('User logged out');
          window.location.href = 'login.html'; // Redirect to login page after logout
        }).catch((error) => {
          console.error('Error logging out:', error);
        });
      });
    }
  } else {
    window.location.href = "login.html"; // Redirect to login page if user is not logged in
  }
});

// Fetch and display user's orders
async function displayUserOrders(userId) {
  const ordersTable = document.querySelector('.orders table');

  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      let ordersHtml = '';
      snapshot.forEach((doc) => {
        const order = doc.data();
        ordersHtml += `
          <tr>
            <td>
              <div class="product-info">
                <img src="${order.productImage}" alt="${order.productName}">
                <p class="mt-3">${order.productName}</p>
              </div>
            </td>
            <td>
              <span>${new Date(order.orderDate.seconds * 1000).toLocaleDateString()}</span>
            </td>
          </tr>
        `;
      });
      ordersTable.innerHTML = ordersHtml;
    } else {
      ordersTable.innerHTML = `<tr><td colspan="2">No orders found</td></tr>`;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

// Change password logic
const accountForm = document.querySelector('#account-form');
if (accountForm) {
  accountForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('account-password').value;
    const confirmPassword = document.getElementById('account-password-confirm').value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        alert("Password updated successfully.");
        accountForm.reset();
      } else {
        alert("User not logged in.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password: " + error.message);
    }
  });
}


auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("User is logged in:", user);

    // Reload the user data to ensure displayName is up-to-date
    await user.reload();

    // Get the name and email elements
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    // Check if displayName is available, otherwise fallback to a default message
    if (userNameElement && userEmailElement) {
      userNameElement.innerText = user.displayName || "No name set"; // Show name or a default message
      userEmailElement.innerText = user.email;
    } else {
      console.error('User name or email element not found in the DOM');
    }
  } else {
    window.location.href = "login.html"; // Redirect to login page if user is not logged in
  }
});

