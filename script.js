document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const phoneInput = document.getElementById("phone");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      form.reset();
      successMessage.textContent = "Форма успешно отправлена!";
      successMessage.classList.add("show");
    }
  });

  function validateForm() {
    let isValid = true;

    const nameError = document.getElementById("error-name");
    const emailError = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
    const confirmPasswordError = document.getElementById(
      "error-confirm-password"
    );
    const phoneError = document.getElementById("error-phone");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    phoneError.textContent = "";

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    const phoneValue = phoneInput.value.trim();

    if (nameValue === "") {
      nameError.textContent = "Поле 'Имя' обязательно для заполнения";
      isValid = false;
    }

    if (emailValue === "") {
      emailError.textContent = "Поле 'Email' обязательно для заполнения";
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      emailError.textContent = "Введите корректный адрес электронной почты";
      isValid = false;
    }

    if (passwordValue.length < 6) {
      passwordError.textContent =
        "Поле 'Пароль' должно содержать не менее 6 символов";
      isValid = false;
    }

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordError.textContent = "Пароли не совпадают";
      isValid = false;
    }

    if (phoneValue === "") {
      phoneError.textContent = "Поле 'Телефон' обязательно для заполнения";
      isValid = false;
    } else if (!isValidPhone(phoneValue)) {
      phoneError.textContent =
        "Введите корректный номер телефона начинающийся с +7";
      isValid = false;
    }

    return isValid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  }
});

form.addEventListener("reset", function () {
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));
  successMessage.classList.remove("show");
});
