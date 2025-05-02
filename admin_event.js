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
