import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDOrHE8YlvC_Nrmakg6OS7yu-wJFyaJRA",
  authDomain: "codebhumi-fa3bc.firebaseapp.com",
  projectId: "codebhumi-fa3bc",
  storageBucket: "codebhumi-fa3bc.firebasestorage.app",
  messagingSenderId: "394055094132",
  appId: "1:394055094132:web:19614ad65a1fabb9482621",
  measurementId: "G-WFJX0PWBK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const applyForm = document.getElementById('applyForm');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const formError = document.getElementById('form-error');

    if (applyForm) {
        applyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic reset
            formError.style.display = 'none';
            formError.textContent = '';
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                regNumber: document.getElementById('regNumber').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                studyYear: document.getElementById('studyYear').value,
                cgpa: document.getElementById('cgpa').value.trim(),
                github: document.getElementById('github').value.trim(),
                projectName: document.getElementById('projectName').value.trim(),
                projectLink: document.getElementById('projectLink').value.trim(),
                linkedin: document.getElementById('linkedin').value.trim(),
                timestamp: serverTimestamp()
            };

            // Loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;

            try {
                // Check if this Registration ID has already applied
                const q = query(collection(db, "applications"), where("regNumber", "==", formData.regNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Registration ID already exists! Redirect to already-registered page.
                    window.location.assign('./already-registered.html');
                    return;
                }

                // Add a new document with a generated id to "applications" collection
                await addDoc(collection(db, "applications"), formData);
                
                // Success: Redirect to success page
                window.location.assign('./success.html');
            } catch (error) {
                console.error("Error adding document: ", error);
                
                // Reset UI
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show error message
                formError.textContent = `Error submitting application: ${error.message}. Please check your database permissions.`;
                formError.style.display = 'block';
            }
        });
    }
});
