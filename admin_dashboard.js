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


document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-btn");
    const addModal = document.getElementById("addModal");
    const addTitle = document.getElementById("addTitle");
    const addDescription = document.getElementById("addDescription");
    const saveAddButton = document.getElementById("saveAdd");
    const announcementList = document.getElementById("announcement-list");

    // Get the close button
    const closeAddModal = addModal.querySelector(".close");


    let announcements = []; // Store announcement content


    // ✅ "Add" button functionality
    addButton.addEventListener("click", function () {
        addTitle.value = "";
        addDescription.value = "";
        addModal.style.display = "flex";
    });


    // ✅ "Save Add" button functionality
    saveAddButton.addEventListener("click", async function () {
        const title = addTitle.value.trim();
        const description = addDescription.value.trim();
    
        if (title === "" || description === "") {
            alert("⚠️ Please fill in both title and description！");
            return;
        }
    
        try {
            const response = await fetch("http://127.0.0.1:5001/add_announcement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description })
            });
    
            const result = await response.json();
    
            if (result.success) {
                alert("✅ Announcement added!");
                addModal.style.display = "none";
                // Optional: Clear input fields
                addTitle.value = "";
                addDescription.value = "";

                const newDiv = document.createElement("div");
                newDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
                document.getElementById("announcement-list").prepend(newDiv);
            } else {
                alert("❌ Failed to add: " + result.message);
            }
    
        } catch (error) {
            console.error("Error adding announcement:", error);
            alert("⚠️ Error adding announcement.");
        }
    });
    

    // ✅ Close the "Add" modal
    closeAddModal.addEventListener("click", function () {
        addModal.style.display = "none";
    });


    // ✅ Update the announcement list
    function updateAnnouncementList() {
        announcementList.innerHTML = "";


        announcements.forEach(announcement => {
            const announcementItem = document.createElement("li");
            announcementItem.classList.add("announcement-item");
            announcementItem.innerHTML = `
                <p class="announcement-title">${announcement.title}</p>
                <p class="announcement-description">${announcement.description}</p>
            `;


            const separator = document.createElement("hr");
            announcementList.appendChild(announcementItem);
            announcementList.appendChild(separator);
        });
    }
});
