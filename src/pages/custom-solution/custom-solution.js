$(document).ready(function () {
 
    // AJAX Form Submission with Custom Header
    $("#solutionForm").submit(function (e) {
      e.preventDefault();
    
    
    
      const formData = {
        formType: "Custom Solution",
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        "machine-type": $("#machine-type").val(),
        description: $("#description").val(),
      };
    
      if (!validateForm(formData)) return;
      submitForm(formData);
    
    });
    function validateForm({
      name,
      email,
      phone,
      description,
      ["machine-type"]: machineType,
    }) {
      let isValid = true;
      let errorMessage = "";
    
      // Name Validation (Only alphabets and spaces, between 3 and 50 characters)
      if (
        !/^[A-Za-z\s]+$/.test(name.trim()) ||
        name.trim().length < 3 ||
        name.trim().length > 50
      ) {
        errorMessage +=
          "Name should contain only alphabets and spaces, and be between 3 and 50 characters.\n";
        isValid = false;
      }
      // Email Validation (Format)
      if (!validateEmail(email)) {
        errorMessage += "Please enter a valid email address.\n";
        isValid = false;
      }
    
      // Contact Validation (Only numeric values, exactly 10 digits, and not a repetitive or sequential number)
      if (
        !/^\d{10}$/.test(phone) ||
        isRepetitiveNumber(phone) ||
        isSequentialNumber(phone)
      ) {
        errorMessage += "Please enter a valid mobile number.\n";
        isValid = false;
      }
    
      // Machine Type Validation (Only alphabets, at least 3 characters)
      if (
        !machineType ||
        !/^[A-Za-z\s]+$/.test(machineType) ||
        machineType.length < 3
      ) {
        errorMessage +=
          "Machine type/name must contain only alphabets and be at least 3 characters long.\n";
        isValid = false;
      }
    
      // description Validation (Only alphabets, numbers, and spaces, between 10 and 100 characters)
      if (
        !/^[A-Za-z0-9\s]+$/.test(description.trim()) ||
        description.trim().length < 10 ||
        description.trim().length > 100
      ) {
        errorMessage +=
          "description must contain only alphabets, numbers, and spaces, and be between 10 and 100 characters.\n";
        isValid = false;
      }
    
      if (!isValid) {
        alert(errorMessage); // Display error messages
        return false;
      }
      return true;
    }
    
    function validateEmail(email) {
      const allowedTLDs = [
        "com",
        "net",
        "org",
        "edu",
        "gov",
        "co",
        "io",
        "us",
        "info",
      ];
    
      // Regex to validate email format, block consecutive dots, and allow only valid TLDs
      const emailRegex =
        /^[a-zA-Z0-9._-]+(?<!\.\.)@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|co|io|us|info)$/;
    
      if (email.length > 320) {
        return false; // Email exceeds the max allowed length
      }
    
      // Check if email matches the regex
      if (!emailRegex.test(email)) {
        return false;
      }
    
      // Extract TLD and check if it's allowed
      const domainParts = email.split(".");
      const tld = domainParts[domainParts.length - 1].toLowerCase();
      if (!allowedTLDs.includes(tld)) {
        return false;
      }
    
      // Block certain known test emails
      const testEmails = [
        "test@example.com",
        "user@example.com",
        "admin@example.com",
      ];
      if (testEmails.includes(email.toLowerCase())) {
        return false;
      }
    
      return true;
    }
    
    // Check if the phone number is a repetitive sequence (e.g., 1111111111, 2222222222)
    function isRepetitiveNumber(phone) {
      // Matches a number with 10 digits where all digits are the same (e.g., 1111111111, 2222222222, etc.)
      return /^(\d)\1{9}$/.test(phone);
    }
    
    // Check for sequential phone numbers (e.g., 1234567890)
    function isSequentialNumber(phone) {
      const sequentialNumbers = [
        "0123456789",
        "1234567890",
        "2345678901",
        "3456789012",
        "4567890123",
        "5678901234",
        "6789012345",
        "7890123456",
        "8901234567",
        "9012345678",
      ];
      return sequentialNumbers.includes(phone);
    }
    
    // AJAX Form Submission Function
    function submitForm(formData) {
      $.ajax({
        url: "http://localhost:3000/solution/submit-solutionForm", // Your backend endpoint
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "text",  // Expecting a text response
        timeout: 10000, // 10-second timeout for the request
        success: function () {
          alert("Form submitted successfully!"); // Show success message
          $("#solutionForm")[0].reset(); // Reset the form field
          $("#successMessage").fadeIn().delay(3000).fadeOut(); // Display success message
        },
        error: function (xhr, status, error) {
          if (status === "timeout") {
            alert("Request timed out. Please check your internet connection.");
          } else {
            console.error("Error:", error);
            let errorMessage = "An error occurred. Please try again later.";
            // Handle raw response
            alert(xhr.responseText || errorMessage);
          }
        },
      });
    }
       
    
      // Menu toggle functions
      function openMenu() {
        document.getElementById("navbar").classList.add("active");
        document.querySelector(".hamburger").style.display = "none";
        document.querySelector(".close-btn").style.opacity = "1";
      }
    
      function closeMenu() {
        document.getElementById("navbar").classList.remove("active");
        document.querySelector(".hamburger").style.display = "block";
        document.querySelector(".close-btn").style.opacity = "0";
      }
    }
    );