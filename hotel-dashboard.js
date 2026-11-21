const roomForm = document.getElementById("roomForm");
const profileForm = document.getElementById("profileForm");

roomForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors(roomForm);

  let roomName = document.getElementById("roomName");
  let roomType = document.getElementById("roomType");
  let price = document.getElementById("price");
  let guests = document.getElementById("guests");
  let available = document.getElementById("available");
  let description = document.getElementById("description");
  let facilities = document.querySelectorAll('input[name="facility"]:checked');

  let valid = true;

  if (roomName.value.trim() === "") {
    showError(roomName, "roomNameError", "Room name is required.");
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(roomName.value.trim())) {
    showError(roomName, "roomNameError", "Only letters and spaces are allowed.");
    valid = false;
  } else {
    showSuccess(roomName);
  }

  if (roomType.value === "") {
    showError(roomType, "roomTypeError", "Please select a room type.");
    valid = false;
  } else {
    showSuccess(roomType);
  }

  if (price.value.trim() === "") {
    showError(price, "priceError", "Price is required.");
    valid = false;
  } else if (!/^[0-9]+$/.test(price.value.trim())) {
    showError(price, "priceError", "Price must be a number.");
    valid = false;
  } else if (price.value < 500 || price.value > 50000) {
    showError(price, "priceError", "Price must be between 500 and 50000.");
    valid = false;
  } else {
    showSuccess(price);
  }

  if (guests.value.trim() === "") {
    showError(guests, "guestsError", "Max guests is required.");
    valid = false;
  } else if (!/^[1-6]$/.test(guests.value.trim())) {
    showError(guests, "guestsError", "Guests must be a number from 1 to 6.");
    valid = false;
  } else {
    showSuccess(guests);
  }

  if (available.value.trim() === "") {
    showError(available, "availableError", "Available rooms is required.");
    valid = false;
  } else if (!/^[0-9]+$/.test(available.value.trim())) {
    showError(available, "availableError", "Available rooms must be a number.");
    valid = false;
  } else {
    showSuccess(available);
  }

  if (facilities.length === 0) {
    document.getElementById("facilityError").innerHTML = "Select at least one facility.";
    valid = false;
  }

  if (description.value.trim() === "") {
    showError(description, "descriptionError", "Description is required.");
    valid = false;
  } else if (description.value.trim().length < 10) {
    showError(description, "descriptionError", "Description must be at least 10 characters.");
    valid = false;
  } else {
    showSuccess(description);
  }

  if (valid) {
    let table = document.getElementById("roomTable");
    table.innerHTML += "<tr>" +
      "<td>" + roomName.value.trim() + "</td>" +
      "<td>" + roomType.value + "</td>" +
      "<td>৳ " + price.value.trim() + "</td>" +
      "<td>" + guests.value.trim() + "</td>" +
      "<td>" + available.value.trim() + "</td>" +
      "</tr>";

    alert("Room added successfully!");
    roomForm.reset();
    clearErrors(roomForm);
  }
});

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors(profileForm);

  let hotelName = document.getElementById("hotelName");
  let hotelEmail = document.getElementById("hotelEmail");
  let hotelPhone = document.getElementById("hotelPhone");
  let hotelAddress = document.getElementById("hotelAddress");

  let valid = true;

  if (hotelName.value.trim() === "") {
    showError(hotelName, "hotelNameError", "Hotel name is required.");
    valid = false;
  } else if (hotelName.value.trim().length < 3) {
    showError(hotelName, "hotelNameError", "Hotel name must be at least 3 characters.");
    valid = false;
  } else {
    showSuccess(hotelName);
  }

  if (hotelEmail.value.trim() === "") {
    showError(hotelEmail, "hotelEmailError", "Email is required.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hotelEmail.value.trim())) {
    showError(hotelEmail, "hotelEmailError", "Invalid email address.");
    valid = false;
  } else {
    showSuccess(hotelEmail);
  }

  if (hotelPhone.value.trim() === "") {
    showError(hotelPhone, "hotelPhoneError", "Phone number is required.");
    valid = false;
  } else if (!/^01[0-9]{9}$/.test(hotelPhone.value.trim())) {
    showError(hotelPhone, "hotelPhoneError", "Phone must be 11 digits and start with 01.");
    valid = false;
  } else {
    showSuccess(hotelPhone);
  }

  if (hotelAddress.value.trim() === "") {
    showError(hotelAddress, "hotelAddressError", "Address is required.");
    valid = false;
  } else if (hotelAddress.value.trim().length < 10) {
    showError(hotelAddress, "hotelAddressError", "Address must be at least 10 characters.");
    valid = false;
  } else {
    showSuccess(hotelAddress);
  }

  if (valid) {
    alert("Hotel profile saved successfully!");
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

function clearErrors(form) {
  let errors = form.querySelectorAll(".error");
  errors.forEach(function (item) {
    item.innerHTML = "";
  });

  let fields = form.querySelectorAll("input, select, textarea");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}
