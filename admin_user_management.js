document.addEventListener("DOMContentLoaded", function () {
    const createUserBtn = document.getElementById("create-user-btn");
    const usersTableBody = document.getElementById("usersTableBody");

    // Create User button redirect
    createUserBtn.addEventListener("click", function () {
        window.location.href = "admin_create_account.html";
    });

    // Fetch all user data
    fetch("http://localhost:5000/get_all_users")
        .then(response => response.json())
        .then(data => {
            usersTableBody.innerHTML = ""; // Clear original content

            data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.User_id}</td>
                    <td>${user.Name}</td>
                    <td>${user.Email}</td>
                    <td>${user.Class}</td>
                    <td>${user.Role}</td>
                    <td>${user.Contact_no}</td>
                    <td>${user.Emergency_Contact_no}</td>
                    <td>${user.Password}</td>
                    <td><button>Record</button></td>
                    <td>
                        <button class="edit-btn" data-id="${user.User_id}">Edit</button>
                        <button class="delete-btn" data-id="${user.User_id}">Delete</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("❌ Error fetching users:", error);
        });
});

// Edit and Delete button events
document.addEventListener("click", function (e) {
    // Edit User: Redirect to edit page
    if (e.target.classList.contains("edit-btn")) {
        const userId = e.target.getAttribute("data-id");
        window.location.href = `admin_edit_user.html?user_id=${encodeURIComponent(userId)}`;
    }

    // Delete User
    if (e.target.classList.contains("delete-btn")) {
        const userId = e.target.getAttribute("data-id");
        if (confirm("Are you sure to delete this user?")) {
            fetch(`http://localhost:5000/delete_user/${userId}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("User deleted.");
                    location.reload(); // Refresh page
                } else {
                    alert("Delete failed: " + data.message);
                }
            });
        }
    }
});
