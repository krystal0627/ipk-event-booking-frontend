document.addEventListener("DOMContentLoaded", function () {
    const createEventBtn = document.getElementById("create-event-btn");
    const tableBody = document.getElementById("eventTableBody");

    // Redirect to the creation page
    createEventBtn.addEventListener("click", function () {
        window.location.href = "admin_create_event.html"; 
    });

    // Fetch the event list and render it
    fetch("http://localhost:5002/get_events")
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${event.Event_Id}</td>
                    <td>${event.Event_Name}</td>
                    <td>${event.Event_Type}</td>
                    <td>
                        <select>
                            <option ${event.Status === 'ongoing' ? 'selected' : ''} value="ongoing">Ongoing</option>
                            <option ${event.Status === 'complete' ? 'selected' : ''} value="complete">Complete</option>
                            <option ${event.Status === 'delay' ? 'selected' : ''} value="delay">Delay</option>
                        </select>
                    </td>
                    <td><button>View</button></td>
                    <td>
                        <button class="edit-btn" data-id="${event.Event_Id}">Edit</button>
                        <button class="delete-btn" data-id="${event.Event_Id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Bind the delete button event
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const eventId = this.dataset.id;
                    if (confirm(`Are you sure you want to delete event ${eventId}?`)) {
                        fetch(`http://localhost:5002/delete_event/${eventId}`, {
                            method: 'DELETE'
                        })
                        .then(res => res.json())
                        .then(data => {
                            alert(data.message);
                            location.reload(); // Refresh the page after deletion
                        })
                        .catch(err => console.error("Delete failed:", err));
                    }
                });
            });
        })
        .catch(err => console.error("Error fetching events:", err));
});

// ✅ Event delegation to listen for select status changes
document.getElementById("eventTableBody").addEventListener("change", function (e) {
    if (e.target.tagName === "SELECT") {
        const select = e.target;
        const eventId = select.closest("tr").querySelector(".edit-btn").dataset.id;
        const newStatus = select.value;

        const validStatuses = ['complete', 'ongoing', 'delay'];
        if (!validStatuses.includes(newStatus)) {
            alert("Invalid status selected. Please choose a valid status.");
            return;
        }

        fetch(`http://localhost:5002/update_status/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => console.error("Error updating status:", err));
    }
});

// ✅ Event delegation to listen for clicks on the edit button and redirect to the edit page
document.addEventListener("click", function (e) { 
    if (e.target.classList.contains("edit-btn")) {
        const eventId = e.target.getAttribute("data-id");
        window.location.href = `admin_edit_event.html?event_id=${encodeURIComponent(eventId)}`;
    }
});
