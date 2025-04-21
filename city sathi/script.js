
// Show Welcome Popup on Page Load
window.onload = function () {
    setTimeout(function () {
        document.getElementById("welcomePopup").style.display = "flex";

        // Hide the popup after 3 seconds
        setTimeout(function () {
            document.getElementById("welcomePopup").style.display = "none";
        }, 3000); // 3000ms = 3 seconds
    }, 500); // Wait for 500ms after the page loads
};


// Close Popup when user clicks on the close button
document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("welcomePopup").style.display = "none";
});


// Handle Form Submission
document.getElementById("complaintForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form field values
    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("description").value;

    // Validation
    if (category === "" || location === "" || description === "") {
        alert("Please fill in all required fields.");
    } else {
        // If all fields are filled, handle form submission

        // API Endpoint URL for MockAPI
        var url = "
https://68068420e81df7060eb76d18.mockapi.io/citysathi/"; // Replace with your correct MockAPI endpoint URL

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {  // Check if request is completed
                console.log("Response Status: " + xhr.status);
                console.log("Response Text: " + xhr.responseText);

                if (xhr.status == 201) {
                    alert("Your complaint has been submitted successfully!");
                    document.getElementById("complaintForm").reset(); // Reset the form fields
                } else {
                    alert("There was an error submitting your complaint. Status: " + xhr.status + " - " + xhr.statusText);
                }
            }
        };

        // Prepare data to send in JSON format
        var data = JSON.stringify({
            name: name,
            category: category,
            location: location,
            description: description,
            timestamp: new Date().toISOString(), // Add timestamp for when the complaint was submitted
        });

        console.log("Data to Send: ", data);  // Log the data being sent to MockAPI

        // Send data to MockAPI
        xhr.send(data);
    }
});