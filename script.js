// Select all the input fields and the submit button
const incomeInput = document.querySelector(
  ".form input[placeholder='Enter gross annual income']"
);
const extraIncomeInput = document.querySelector(
  ".form input[placeholder='Enter extra income']"
);
const ageInput = document.querySelector(
  ".form input[placeholder='Enter age group']"
);
const deductionsInput = document.querySelector(
  ".form input[placeholder='Enter total applicable deductions']"
);
const submitButton = document.querySelector(".form .submit");

// Select the error icon container elements
const incomeErrorIcon = incomeInput.nextElementSibling;
const extraIncomeErrorIcon = extraIncomeInput.nextElementSibling;
const ageErrorIcon = ageInput.nextElementSibling;
const deductionsErrorIcon = deductionsInput.nextElementSibling;

// Add event listeners to the input fields
incomeInput.addEventListener("input", validateInput);
extraIncomeInput.addEventListener("input", validateInput);
ageInput.addEventListener("input", validateInput);
deductionsInput.addEventListener("input", validateInput);

// Function to validate input fields and show/hide error icons
function validateInput(event) {
  const inputField = event.target;
  const errorIconContainer = inputField.nextElementSibling;

  // Validate the input value
  if (isNaN(inputField.value) || inputField.value < 0) {
    errorIconContainer.style.display = "inline-block";
    errorIconContainer.title = "Please enter a valid number";
  } else {
    errorIconContainer.style.display = "none";
  }
}

// Add event listener to the submit button
submitButton.addEventListener("click", calculateTax);

// Function to calculate the tax and display the results in a modal
function calculateTax(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the user's inputs
  const grossAnnualIncome = parseFloat(incomeInput.value);
  const extraIncome = parseFloat(extraIncomeInput.value);
  const age = parseFloat(ageInput.value);
  const deductions = parseFloat(deductionsInput.value);

  // Validate the age input
  if (
    isNaN(age) ||
    age < 0 ||
    age >= 60 ||
    (age >= 40 && age < 60) ||
    age < 40
  ) {
    ageErrorIcon.style.display = "inline-block";
    ageErrorIcon.title = "Please enter a valid age group";
    return; // Exit the function if the age input is invalid
  } else {
    ageErrorIcon.style.display = "none";
  }

  // Calculate the overall income
  const overallIncome = grossAnnualIncome + extraIncome - deductions;

  // Calculate the tax based on the overall income and age
  let taxRate = 0;
  let taxAmount = 0;

  if (overallIncome <= 800000) {
    taxAmount = 0;
  } else {
    const taxableIncome = overallIncome - 800000;
    if (age < 40) {
      taxRate = 0.3;
    } else if (age >= 40 && age < 60) {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }
    taxAmount = taxableIncome * taxRate;
  }

  // Display the results in a modal
  showResultModal(overallIncome, taxAmount);
}

// Function to show the result modal
function showResultModal(overallIncome, taxAmount) {
  // Create the modal element
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("h2");
  modalHeader.textContent = "Tax Calculation Results";

  const modalBody = document.createElement("div");
  modalBody.innerHTML = `
    <p>Overall Income: ₹${overallIncome.toLocaleString()} Lakhs</p>
    <p>Total Tax: ₹${taxAmount.toLocaleString()} Lakhs</p>
  `;

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  // Add the modal to the document
  document.body.appendChild(modal);

  // Show the modal
  modal.style.display = "block";
}
