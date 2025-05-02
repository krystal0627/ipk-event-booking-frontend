document.addEventListener("DOMContentLoaded", function () {
    const createEventBtn = document.getElementById("create-event-btn");
    
    if (createEventBtn) {
        createEventBtn.addEventListener("click", function () {
            window.location.href = "eo_create_event.html"; // Replace with your actual filename
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5002/api/events')
        .then(response => response.json())
        .then(events => {
            const container = document.getElementById('eventCardsContainer');
            container.innerHTML = '';  // Clear old content

            events.forEach(event => {
                const card = document.createElement('div');
                card.classList.add('event-card');
                card.innerHTML = `
                    <a href="event_details.html?id=${event.Event_Id}">
                        <img src="${event.Image}" alt="Event Image" style="width: 100%; height: auto;">
                    </a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});
