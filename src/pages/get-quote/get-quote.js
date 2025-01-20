$(document).ready(function () {
    // Handle form submission
    $("#quoteForm").submit(function (e) {
      e.preventDefault(); // Prevent default form submission behavior
  
      // Prepare form data
      const formData = {
        formType: "quote",
        name: $("#name").val(),
        email: $("#email").val(),
        contact: $("#contact").val(),
        company: $("#company").val(),
        machines: $("#machines").val(),
        message: $("#message").val(),
      };
  
      // Validate form data
      if (!validateForm(formData)) return;
  
      // Submit the form data
      submitForm(formData);
  
    // Function to validate form inputs
    function validateForm({ name, email, contact, company, machines, message }) {
      let isValid = true;
      let errorMessage = "";
  
      // Name validation
      if (!/^[A-Za-z\s]+$/.test(name.trim()) || name.trim().length < 3 || name.trim().length > 50) {
        errorMessage += "Name should contain only alphabets and spaces, and be between 3 and 50 characters.\n";
        isValid = false;
      }
  
      // Email validation
      if (!validateEmail(email)) {
        errorMessage += "Please enter a valid email address.\n";
        isValid = false;
      }
  
      // Contact validation
      if (!/^\d{10}$/.test(contact) || isRepetitiveNumber(contact) || isSequentialNumber(contact)) {
        errorMessage += "Please enter a valid 10-digit mobile number.\n";
        isValid = false;
      }
  
      // Company validation
      if (!/^[A-Za-z\s]+$/.test(company.trim()) || company.trim().length < 3 || company.trim().length > 50) {
        errorMessage += "Company name should contain only alphabets and spaces, and be between 3 and 50 characters.\n";
        isValid = false;
      }
  
      // Message validation
      if (!/^[A-Za-z0-9\s]+$/.test(message.trim()) || message.trim().length < 10 || message.trim().length > 100) {
        errorMessage += "Message should contain only alphabets, numbers, and spaces, and be between 10 and 100 characters.\n";
        isValid = false;
      }
  
      // Machines validation
      if (!machines || machines.length === 0) {
        errorMessage += "Select at least one machine.\n";
        isValid = false;
      }
  
      if (!isValid) {
        alert(errorMessage);
        return false;
      }
      return true;
    }
  
    // Email validation helper
    function validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    // Check for repetitive number
    function isRepetitiveNumber(contact) {
      return /^(\d)\1{9}$/.test(contact);
    }
  
    // Check for sequential number
    function isSequentialNumber(contact) {
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
      return sequentialNumbers.includes(contact);
    }
  
    // Function to submit the form data
    function submitForm(formData) {
      $.ajax({
        url: "http://localhost:3000/quote/submit-quoteForm",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "text",
        timeout: 10000, // Set timeout to 10 seconds
        success: function () {
          
            alert( "Your Quote Request has been submitted successfully!");
            $("#quoteForm")[0].reset(); // Reset the form
            $("#successMessage").fadeIn().delay(3000).fadeOut(); // Display success message
         
        },
        error: function (xhr, status, error) {
          if (status === "timeout") {
            alert("Request timed out. Please check your internet connection.");
          } else {
            console.error("Error:", error);
            let errorMessage = "An error occurred. Please try again later.";
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.error) errorMessage = response.error;
              else if (response.message) errorMessage = response.message;
            } catch (e) {
              console.warn("Failed to parse error response.");
            }
            alert(errorMessage);
          }
        },
      });
    }
  });
  
    
          // Mobile Menu Open
          function openMenu() {
            document.getElementById("navbar").classList.add("active");
            document.querySelector(".hamburger").style.display = "none";
            document.querySelector(".close-btn").style.opacity = "1";
          }
        
  
        // Mobile Menu Close
        function closeMenu() {
          document.getElementById("navbar").classList.remove("active");
          document.querySelector(".hamburger").style.display = "block";
          document.querySelector(".close-btn").style.opacity = "0";
        }
      });
      