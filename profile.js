const tabBtn = document.querySelectorAll(".tab");
const tab = document.querySelectorAll(".tabShow");

// Function to handle tab switching
function tabs(panelIndex) {
    tab.forEach(function(node, index) {
        node.style.display = "none"; // Hide all tabs
        tabBtn[index].classList.remove("active"); // Remove active class from all tabs
    });
    tab[panelIndex].style.display = "block"; // Show the selected tab
    tabBtn[panelIndex].classList.add("active"); // Add active class to the clicked tab
}

// Initialize by displaying the first tab
tabs(0);

// Function to show a custom alert message at the top of the page
function showAlert(message) {
    // Check if an alert already exists and remove it
    const existingAlert = document.querySelector(".custom-alert");
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create a new alert element
    const alertBox = document.createElement("div");
    alertBox.className = "custom-alert";
    alertBox.innerText = message;

    // Style the alert box
    alertBox.style.position = "fixed";
    alertBox.style.top = "0";
    alertBox.style.left = "0";
    alertBox.style.right = "0";
    alertBox.style.backgroundColor = "#28a745";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "15px";
    alertBox.style.textAlign = "center";
    alertBox.style.fontSize = "16px";
    alertBox.style.zIndex = "1000";

    // Append the alert to the body
    document.body.appendChild(alertBox);

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Attach the update button click event for all buttons
document.querySelectorAll(".updateButton").forEach(button => {
    button.addEventListener("click", function() {
        showAlert("Updated Successfully!");
    });
});

