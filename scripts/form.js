document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => (el.innerHTML = ""));
    let isValid = true;

    // Get input values
    const nameInput = document.getElementById("fullName").value.trim();
    const emailInput = document.getElementById("email").value.trim();
    const phoneInput = document.getElementById("phone").value.trim();
    const serviceInput = document.getElementById("service").value.trim();
    const messageInput = document.getElementById("message").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,4}\s?\d{7,14}$/;

    // Validate Name
    if (nameInput.length < 2) {
        showError("nameError", "Name must be at least 2 characters");
        isValid = false;
    }

    // Validate Email
    if (!emailRegex.test(emailInput)) {
        showError("emailError", "Enter a valid email address");
        isValid = false;
    }

    // Validate Phone
    if (!phoneRegex.test(phoneInput)) {
        showError("phoneError", "Enter a valid phone number with country code (e.g: +971 123456789)");
        isValid = false;
    }

    // Validate Message
    if (messageInput.length < 10) {
        showError("messageError", "Message must be at least 10 characters");
        isValid = false;
    }

    if (!isValid) return;

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

    const formData = {
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        service: serviceInput,
        message: messageInput,
    };

    try {
        // Send Email using EmailJS
        await emailjs.send("service_964u96r", "template_rxe8d2a", formData);

        // Save data to Google Sheets
        await fetch("https://script.google.com/macros/s/AKfycbxL5e1XC18MAka6_SEJ9taiQzdQ_YQoENctAKBNwz4vr7IJ8iVCVvEgmXQTw-uQGTIC/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            mode: "no-cors"
        });

        // Success alert
        Swal.fire({
            icon: "success",
            title: "Message Submitted!",
            text: "Our team will reach out to you shortly",
            confirmButtonColor: "#3085d6",
        });

        document.getElementById("contactForm").reset();
    } catch (error) {
        // Error alert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
            confirmButtonColor: "#d33",
        });
        console.error("Error:", error);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
    }
});

// Function to show error messages
function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = message;
}

// Initialize EmailJS
(function () {
    emailjs.init("L3yJ5Tdlml9__EWS7"); // Replace with your EmailJS Public Key
})();
