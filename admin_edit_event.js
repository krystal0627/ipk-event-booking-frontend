window.onload = function () {
    // 获取 URL 中的 event_id 参数
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("event_id");

    if (!eventId) {
        alert("Event ID not found in URL");
        return;
    }

    fetch(`http://localhost:5002/get_event_by_id/${eventId}`)
        .then(response => response.json())
        .then(event => {
            if (event.error) {
                alert("Event not found");
                return;
            }

            // 自动填充表单字段
            document.getElementById("event_name").value = event.Event_Name;
            document.getElementById("venue").value = event.Venue;
            document.getElementById("contact_person").value = event.Contact_Person;
            const date = new Date(event.Date);
            const formattedDate = date.toISOString().split('T')[0]; 
            document.getElementById("date").value = formattedDate;
            document.getElementById("event_type").value = event.Event_Type;
            document.getElementById("fee").value = event.Fee_per_pax;
            document.getElementById("description").value = event.Description;
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

    // 提交表单时处理
    document.getElementById('eventForm').addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        const formData = new FormData(this);  // 获取表单数据
        formData.append('event_id', eventId);  // 添加 event_id 到 FormData

        fetch(`http://localhost:5002/update_event/${eventId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert("Event updated successfully!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while updating the event.");
        });
    });
};
