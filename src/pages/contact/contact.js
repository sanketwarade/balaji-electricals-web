$(document).ready(function () {
    // AJAX Form Submission without CSRF Header
    $("#Enquiryform").submit(function (e) {
      e.preventDefault();
  
      // Collect and validate form data
      const formData = {
        formType: "enquiry",
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        subject: $("#subject").val(),
      };
  
      if (!validateForm(formData)) return;
  
      submitForm(formData);
    });
  
    // Form Validation
    function validateForm({ name, email, phone, subject }) {
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
  
      // Email Validation (Format + Restrictions)
      if (!validateEmail(email)) {
        errorMessage += "Please enter a valid email address.\n";
        isValid = false;
      }
  
      // Phone Validation (Only numeric, exactly 10 digits, no repetitive/sequential numbers)
      if (
        !/^\d{10}$/.test(phone) ||
        isRepetitiveNumber(phone) ||
        isSequentialNumber(phone)
      ) {
        errorMessage += "Please enter a valid mobile number.\n";
        isValid = false;
      }
  
      // Subject Validation (Alphabets, numbers, spaces, 10-60 characters)
      if (
        !/^[A-Za-z0-9\s]+$/.test(subject.trim()) ||
        subject.trim().length < 10 ||
        subject.trim().length > 60
      ) {
        errorMessage +=
          "Subject must contain only alphabets, numbers, and spaces, and be between 10 and 60 characters.\n";
        isValid = false;
      }
  
      // Show all accumulated errors at once
      if (!isValid) {
        alert(errorMessage);
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
  
    // Check for repetitive phone numbers (e.g., 1111111111)
    function isRepetitiveNumber(phone) {
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
    // Function to submit the form data
   // AJAX Form Submission Function
  function submitForm(formData) {
    $.ajax({
      url: "http://localhost:3000/enquiry/submit-Enquiryform",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      dataType: "text",  // Expecting a text response
      timeout: 10000,  // Set timeout to 10 seconds
      success: function () {
        alert("Thank you for your enquiry! We will get back to you soon."); // Show success message
        $("#Enquiryform")[0].reset(); // Reset the form fields
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
     
      function openMenu() {
      document.getElementById("navbar").classList.add("active");
      document.querySelector(".hamburger").style.display = "none"; // Hide hamburger when menu opens
      document.querySelector(".close-btn").style.opacity = "1"; // Show close button
    }
  
    function closeMenu() {
      document.getElementById("navbar").classList.remove("active");
      document.querySelector(".hamburger").style.display = "block"; // Show hamburger when menu closes
      document.querySelector(".close-btn").style.opacity = "0"; // Hide close button
    }
  });
  