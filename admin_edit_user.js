document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");

    if (!userId) {
        alert("No user ID provided!");
        return;
    }

    // 获取用户数据并填充表单
    fetch(`http://localhost:5000/get_user/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (!user) {
                alert("User not found");
                return;
            }

            document.querySelector("input[name='name']").value = user.Name || "";
            document.querySelector("input[name='user_id']").value = user.User_id || "";
            document.querySelector("input[name='class']").value = user.Class || "";
            document.querySelector("input[name='email']").value = user.Email || "";
            document.querySelector("input[name='contact_no']").value = user.Contact_no || "";
            document.querySelector("select[name='role']").value = user.Role || "";
            document.querySelector("input[name='emergency_contact']").value = user.Emergency_Contact_no || "";
            document.querySelector("input[name='password']").value = user.Password || "";
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            alert("Failed to fetch user info.");
        });

    // 提交更新用户数据
    document.getElementById("createAccountForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedUser = {
            Name: document.querySelector("input[name='name']").value,
            Class: document.querySelector("input[name='class']").value,
            Email: document.querySelector("input[name='email']").value,
            Contact_no: document.querySelector("input[name='contact_no']").value,
            Role: document.querySelector("select[name='role']").value,
            Emergency_Contact_no: document.querySelector("input[name='emergency_contact']").value,
            Password: document.querySelector("input[name='password']").value
        };

        fetch(`http://localhost:5000/update_user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("User updated successfully!");
                window.location.href = "admin_user_management.html";
            } else {
                alert("Update failed: " + data.message);
            }
        })
        .catch(error => {
            console.error("Update error:", error);
            alert("Update failed. Please try again.");
        });
    });
});
