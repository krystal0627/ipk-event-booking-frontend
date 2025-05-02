document.addEventListener("DOMContentLoaded", function () {
    
    const userEmail = localStorage.getItem("user_email");

    if (userEmail) {
        fetch('http://127.0.0.1:5000/get_user_info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: userEmail })  // Only pass the Email
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("student-id").textContent = data.user_id; // Ensure the data fields match
                document.getElementById("student-name").textContent = data.name;
                document.getElementById("email-address").textContent = data.email;
                document.getElementById("contact-no").value = data.contact_no || "";
                document.getElementById("emergency-contact").value = data.emergency_contact || "";
                document.getElementById("roles").textContent = data.role;
            } else {
                alert("❌ " + data.message);
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    } else {
        alert("User is not logged in.");
    }

    // Save profile update logic
    document.getElementById('save-btn').addEventListener('click', function () {
        const contactNo = document.getElementById('contact-no').value;
        const emergencyContact = document.getElementById('emergency-contact').value;

        if (!contactNo || !emergencyContact) {
            alert('Fields cannot be empty.');
            return;
        }

        fetch('http://127.0.0.1:5000/update_user_profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: userEmail,
                contact_no: contactNo,
                emergency_contact: emergencyContact
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Update error:', error));
    });

    document.getElementById('logout-btn').addEventListener('click', function () {
        localStorage.removeItem("user_email");
        alert("Signed out successfully!");
        window.location.href = "login.html";
    });
});
