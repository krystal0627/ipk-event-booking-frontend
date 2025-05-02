document.getElementById('eventForm').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:5002/create_event', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert('✅ Event created successfully!');
            form.reset();
        } else {
            alert('❌ Failed: ' + result.error);
        }
    } catch (error) {
        alert('⚠️ Error: ' + error.message);
    }
});
