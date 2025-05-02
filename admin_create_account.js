document.getElementById("createAccountForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Get data from the form
    const form = e.target;
    const formData = {
        Name: form.name.value.trim(),
        User_id: form.user_id.value.trim(),
        Class: form.class.value.trim(),
        Email: form.email.value.trim(),
        Contact_no: form.contact_no.value.trim(),
        Role: form.role.value,
        Emergency_Contact_no: form.emergency_contact.value.trim(),
        Password: form.password.value
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/create_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Account successfully created!");
            form.reset(); // Clear the form
        } else {
            alert("❌ Failed to create account: " + result.message);
        }
    } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert("⚠️ Network or server error.");
    }
});
