document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.querySelector(".submitBtn");

    // Fix Eye Icon Toggle Logic
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";  // Show password
            togglePassword.classList.remove("fa-eye-slash");  // Remove closed eye icon
            togglePassword.classList.add("fa-eye"); // Add open eye icon
        } else {
            passwordInput.type = "password";  // Hide password
            togglePassword.classList.remove("fa-eye");  // Remove open eye icon
            togglePassword.classList.add("fa-eye-slash"); // Add closed eye icon
        }
    });

    // Function to Handle Login
    async function login(event) {
        event.preventDefault(); // Prevent form refresh

        const email = document.getElementById("email").value;
        const password = passwordInput.value;

        // Validate input fields
        if (!email || !password) {
            alert("⚠️ Please enter your email and password.");
            return;
        }

        try {
            // Send login request to Flask backend
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            // Handle success or error
            if (response.ok) {
                alert("✅ Login successful! Redirecting...");
                localStorage.setItem("user_email", email);
                window.location.href = data.redirect;
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("⚠️ Login failed. Please try again later.");
        }
    }

    // Attach login function to button
    loginButton.addEventListener("click", login);

});

