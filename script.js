document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const inputFields = form.querySelectorAll("input");
  const ageDropdown = form.querySelector("select");
  const submitButton = form.querySelector(".submit");
  const modal = document.querySelector(".modal");
  const modalContent = modal.querySelector(".modal-content");
  const closeModalButton = modal.querySelector(".close");

  // Function to display error icon and tooltip
  function showError(input, message) {
    const container = input.parentElement;
    container.insertAdjacentHTML("beforeend", errorIcon);
    const errorIcon = container.querySelector(".error-icon");
    errorIcon.setAttribute("title", message);
  }

  // Function to remove error icon and tooltip
  function removeError(input) {
    const container = input.parentElement;
    const errorIcon = container.querySelector(".error-icon");
    if (errorIcon) {
      errorIcon.remove();
    }
  }

  // Function to validate inputs
  function validateInputs() {
    let isValid = true;
    inputFields.forEach((input) => {
      if (!input.value.trim()) {
        showError(input, "This field is required");
        isValid = false;
      } else {
        removeError(input);
      }
    });

    // Validate age dropdown
    if (ageDropdown.value === "") {
      showError(ageDropdown, "Age group is required");
      isValid = false;
    } else {
      removeError(ageDropdown);
    }

    return isValid;
  }

  // Function to calculate tax
  function calculateTax(income, extraIncome, ageGroup, deductions) {
    // Implement tax calculation logic based on the provided formula
    // Return the calculated tax amount
  }

  // Function to display modal
  function openModal(tax) {
    modalContent.textContent = "Tax Amount: " + tax;
    modal.classList.add("show");
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("show");
  }

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    if (validateInputs()) {
      const income = parseFloat(inputFields[0].value);
      const extraIncome = parseFloat(inputFields[1].value);
      const deductions = parseFloat(inputFields[3].value);
      const ageGroup = parseFloat(ageDropdown.value);

      const tax = calculateTax(income, extraIncome, ageGroup, deductions);

      openModal(tax);
    }
  });

  // Event listener to close modal
  closeModalButton.addEventListener("click", closeModal);
});
