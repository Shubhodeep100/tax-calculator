document.addEventListener("DOMContentLoaded", function () {
  setupInputValidation("income", "incomeError");
});
document.addEventListener("DOMContentLoaded", function () {
  setupInputValidation("extraIncome", "extraIncomeError");
});
document.addEventListener("DOMContentLoaded", function () {
  setupInputValidation("deductions", "deductionsError");
});
function setupInputValidation(incomeInputId, incomeErrorId) {
  const incomeInput = document.getElementById(incomeInputId);
  const incomeError = document.getElementById(incomeErrorId);
  hideErrorTooltip();
  function showErrorTooltip() {
    incomeError.style.display = "inline";
    incomeInput.title = "Please enter a valid number";
  }

  function hideErrorTooltip() {
    incomeError.style.display = "none";
    incomeInput.title = "";
  }

  incomeInput.addEventListener("input", function () {
    const value = incomeInput.value;
    const isValidNumber = /^[0-9]*$/.test(value);

    if (!isValidNumber) {
      showErrorTooltip();
    } else {
      hideErrorTooltip();
    }
  });
}

$(document).ready(function () {
  function showErrorIcon(fieldId, message) {
    var errorIcon = $("#" + fieldId + "Error");
    errorIcon.attr("title", message).show();
  }

  function hideErrorIcon(fieldId) {
    var errorIcon = $("#" + fieldId + "Error");
    errorIcon.attr("title", "").hide();
  }
  function validateInputs() {
    var valid = true;
    $("input[type='text']").each(function () {
      var fieldValue = $(this).val();
      if (!/^\d*\.?\d*$/.test(fieldValue)) {
        valid = false;
        showErrorIcon(
          $(this).attr("id"),
          "Invalid input! Please enter a valid number."
        );
      } else {
        hideErrorIcon($(this).attr("id"));
      }
    });
    if ($("#age").val() === "") {
      valid = false;
      showErrorIcon("age", "Age is mandatory!");
    } else {
      hideErrorIcon("age");
    }
    return valid;
  }

  function calculateTax() {
    if (!validateInputs()) {
      return;
    }
    var age = $("#age").val();
    var income = parseFloat($("#income").val());
    var extraIncome = parseFloat($("#extraIncome").val());
    var deductions = parseFloat($("#deductions").val());

    var taxRate = 0;
    if (age === "<40") {
      taxRate = 0.3;
    } else if (age === ">=40&<60") {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }

    var totalIncome = income + extraIncome - deductions;
    var taxAmount = totalIncome > 800000 ? (totalIncome - 800000) * taxRate : 0;

    $("#resultBody").html(
      "<p>" +
        totalIncome.toFixed(2) +
        "</p>" 
        
        // "<p>Tax Amount: " +
        // taxAmount.toFixed(2) +
        // "</p>"
    );
    $("#resultModal").modal("show");
  }

  $("input[type='text']").on("input", function () {
    validateInputs();
  });

  $("#calculateBtn").click(function () {
    calculateTax();
  });
});
