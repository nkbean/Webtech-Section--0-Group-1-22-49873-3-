const form = document.getElementById("loginForm");

let wrongAttempts = 0;
let isLocked = false;

document.getElementById("showPassword").addEventListener("change", function () {
  let password = document.getElementById("password");
  if (this.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  if (isLocked) {
    document.getElementById("passwordError").innerHTML =
      "Login is locked. Try again after 1 minute.";
    return;
  }

  let role = document.querySelector('input[name="role"]:checked');
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let valid = true;

  if (role === null) {
    document.getElementById("roleError").innerHTML = "Please select who you are.";
    valid = false;
  }

  if (username.value.trim() === "") {
    showError(username, "usernameError", "Username is required.");
    valid = false;
  } else if (username.value.trim().length < 3) {
    showError(username, "usernameError", "Username must be at least 3 characters.");
    valid = false;
  } else {
    showSuccess(username);
  }

  if (password.value === "") {
    showError(password, "passwordError", "Password is required.");
    valid = false;
  } else if (password.value.length < 6) {
    showError(password, "passwordError", "Password must be at least 6 characters.");
    valid = false;
  } else {
    showSuccess(password);
  }

  if (valid === false) {
    return;
  }

  let correctUser = "";
  let correctPass = "";
  let nextPage = "";

  if (role.value === "Traveller") {
    correctUser = "shahriar";
    correctPass = "Bhromon@123";
    nextPage = "discover.html";
  } else if (role.value === "Hotel Manager") {
    correctUser = "HTL-1024";
    correctPass = "Hotel@123";
    nextPage = "hotel-dashboard.html";
  } else {
    correctUser = "admin";
    correctPass = "Admin@123";
    nextPage = "admin-dashboard.html";
  }

  if (username.value.trim() === correctUser && password.value === correctPass) {
    wrongAttempts = 0;
    alert("Login successful! Welcome " + role.value + ".");
    window.location.href = nextPage;
  } else {
    wrongAttempts++;
    showError(password, "passwordError",
      "Wrong username or password! Attempt " + wrongAttempts + " of 3.");

    if (wrongAttempts >= 3) {
      isLocked = true;
      document.getElementById("passwordError").innerHTML =
        "Too many wrong attempts, locked for 1 minute.";
      password.disabled = true;

      setTimeout(function () {
        isLocked = false;
        wrongAttempts = 0;
        password.disabled = false;
        document.getElementById("passwordError").innerHTML =
          "Unlocked. Try again.";
      }, 60000);
    }
  }
});

function showError(input, errorId, message) {
  input.classList.add("errorBorder");
  input.classList.remove("successBorder");
  document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
  input.classList.remove("errorBorder");
  input.classList.add("successBorder");
}

function clearErrors() {
  let errors = document.querySelectorAll(".error");
  errors.forEach(function (item) {
    item.innerHTML = "";
  });

  let fields = document.querySelectorAll("input");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}
