document.addEventListener('DOMContentLoaded', () => {
    const applyForm = document.getElementById('applyForm');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const formContainer = document.getElementById('application-form-container');
    const successState = document.getElementById('success-state');
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
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                university: document.getElementById('university').value.trim(),
                regNumber: document.getElementById('regNumber').value.trim(),
                github: document.getElementById('github').value.trim(),
                linkedin: document.getElementById('linkedin').value.trim(),
                reason: document.getElementById('reason').value.trim()
            };

            // Loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;

            try {
                // Development API URL (Explicit IPv4 to fix macOS 'Load failed' Safari bug)
                const API_URL = 'http://127.0.0.1:5000/api/apply';

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Redirect to dedicated success page reliably
                    window.location.assign('./success.html');
                } else {
                    throw new Error(data.error || 'Something went wrong. Please try again later.');
                }
            } catch (error) {
                // Error state
                formError.textContent = error.message || 'Failed to connect to the server.';
                formError.style.display = 'block';
                
                // Reset button
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
});
