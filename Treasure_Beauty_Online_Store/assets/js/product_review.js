// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// DOM Elements
const reviewForm = document.getElementById("review-form");
const reviewNameInput = document.getElementById("review-name");
const reviewTextInput = document.getElementById("review-text");
const reviewsList = document.getElementById("reviews-list");

// Add review to Firestore
const addReview = async (name, text) => {
    try {
        await addDoc(collection(db, "reviews"), {
            productId: productId,
            name: name,
            text: text,
            timestamp: new Date()
        });
        reviewForm.reset();
    } catch (error) {
        console.error("Error adding review: ", error);
    }
};

// Fetch reviews for the specific product
const fetchReviews = async () => {
    reviewsList.innerHTML = "<p class='text-muted'>Loading reviews...</p>";
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        reviewsList.innerHTML = ""; // Clear the loading text
        querySnapshot.forEach((doc) => {
            const review = doc.data();
            const reviewItem = document.createElement("div");
            reviewItem.className = "review-item mb-3";
            reviewItem.innerHTML = `
                <h6><strong>${review.name}</strong></h6>
                <p>${review.text}</p>
                <small class="text-muted">${new Date(review.timestamp.toDate()).toLocaleString()}</small>
                <hr>
            `;
            reviewsList.appendChild(reviewItem);
        });
    } else {
        reviewsList.innerHTML = "<p class='text-muted'>No reviews yet. Be the first to leave a review!</p>";
    }
};

// Real-time listener for reviews
const setupRealtimeListener = () => {
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    onSnapshot(q, (snapshot) => {
        reviewsList.innerHTML = ""; // Clear existing reviews
        if (!snapshot.empty) {
            snapshot.forEach((doc) => {
                const review = doc.data();
                const reviewItem = document.createElement("div");
                reviewItem.className = "review-item mb-3";
                reviewItem.innerHTML = `
                    <h6><strong>${review.name}</strong></h6>
                    <p>${review.text}</p>
                    <small class="text-muted">${new Date(review.timestamp.toDate()).toLocaleString()}</small>
                    <hr>
                `;
                reviewsList.appendChild(reviewItem);
            });
        } else {
            reviewsList.innerHTML = "<p class='text-muted'>No reviews yet. Be the first to leave a review!</p>";
        }
    });
};

// Form submission event
reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = reviewNameInput.value.trim();
    const text = reviewTextInput.value.trim();

    if (name && text) {
        await addReview(name, text);
    } else {
        alert("Please fill in all fields before submitting your review.");
    }
});

// Fetch reviews and setup real-time updates
fetchReviews();
setupRealtimeListener();

