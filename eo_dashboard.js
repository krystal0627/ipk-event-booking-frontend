document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("user_email");

    if (userEmail) {
        fetch('http://127.0.0.1:5000/get_user_info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: userEmail })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.name) {
                const welcomeText = document.getElementById("welcome-text");
                welcomeText.textContent = `Welcome, ${data.name}!`;
            } else {
                console.warn("User name not found in response.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    } else {
        alert("User not logged in. Redirecting to login page.");
        window.location.href = "login.html";
        
    }

    // 🔁 fetch Announcements
    fetchAnnouncements();

    function fetchAnnouncements() {
        fetch('http://127.0.0.1:5001/api/announcements')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("announcement-list");
                container.innerHTML = "";
                data.forEach(item => {
                    const div = document.createElement("li");
                    div.innerHTML = `<h3>${item.Title}</h3><p>${item.Description}</p>`;
                    container.appendChild(div);
                    const hr = document.createElement("hr");
                    container.appendChild(hr);
                });
            })
            .catch(err => {
                console.error("❌ Failed to fetch announcements:", err);
            });
    }
});
